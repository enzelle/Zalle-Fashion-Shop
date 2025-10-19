// Serverless function (Node) for Vercel
// CommonJS form to avoid ESM config headaches.
const nodemailer = require("nodemailer");

function buildTransporter() {
  const host = process.env.SMTP_HOST || "smtp.gmail.com";
  const port = Number(process.env.SMTP_PORT || 465); // implicit TLS
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP_USER or SMTP_PASS");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: true,                // IMPORTANT for port 465
    auth: { user, pass },
    // If your provider requires it, you could relax TLS:
    // tls: { rejectUnauthorized: false },
  });
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Use POST" });
    return;
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const email = (body?.email || "").trim();
    if (!email) {
      res.status(400).json({ error: "Missing email" });
      return;
    }

    const transporter = buildTransporter();
    await transporter.verify(); // helpful diagnostics

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    const html = `
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#111;padding:24px 0">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#151515;border:1px solid #2a2a2a;border-radius:12px;color:#ddd;font-family:Arial,Helvetica,sans-serif">
            <tr>
              <td style="padding:24px 28px;text-align:right">
                <img src="https://zalle-fashion-shop.vercel.app/Zalle%20logo.png" alt="ZALLE" width="96" style="display:block;margin-left:auto">
              </td>
            </tr>
            <tr><td style="padding:4px 28px 0">
              <div style="font-size:28px;line-height:1.2;color:#fff">Stay in Style</div>
            </td></tr>
            <tr><td style="padding:10px 28px 6px;letter-spacing:.12em;text-transform:uppercase;color:#cfcfcf;font-size:13px;line-height:1.6">
              Welcome to <strong style="color:#fff">ZALLE</strong> — your sign-up is confirmed.
              Be first to know about new arrivals, exclusive offers, and style inspiration.
            </td></tr>
            <tr><td style="padding:18px 28px 8px">
              <a href="https://zalle-fashion-shop.vercel.app/#/shop"
                 style="display:inline-block;background:#F06161;color:#fff;text-decoration:none;
                        padding:12px 22px;border-radius:24px;letter-spacing:.12em;text-transform:uppercase;font-size:16px;">
                SHOP COLLECTION
              </a>
            </td></tr>
            <tr><td style="padding:14px 28px 26px;color:#ddd;font-size:14px;line-height:1.7">
              If you have questions, just reply to this email — we’re here to help.
            </td></tr>
            <tr><td style="padding:16px 28px 26px;color:#9a9a9a;font-size:12px;border-top:1px solid #2a2a2a">
              © 2025 ZALLE. You’re receiving this because you subscribed on our website.
              Want fewer emails? Reply with “unsubscribe” at any time.
            </td></tr>
          </table>
        </td></tr>
      </table>
    `;

    const info = await transporter.sendMail({
      from,
      to: email,               // send to subscriber
      subject: "Welcome to ZALLE",
      html,
    });

    res.status(200).json({ ok: true, id: info.messageId });
  } catch (err) {
    console.error("send-welcome error:", err);
    res.status(500).send(err?.message || "Email send failed");
  }
};
