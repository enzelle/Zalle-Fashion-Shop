// src/Product.js
import React, { useMemo, useState } from "react";

/* map the slug to product details + image file in /public */
const CATALOG = [
  { t: "Leather Bomber Jacket", img: "leather-bomber jacket.png", price: "₱ 35,100",
    desc: "Jacket made from 100% leather. High collar and long sleeves finished with cuffs and pleats. Front pockets. Shoulder tab detail. Front zip fastening with snap buttons hidden by a placket." },
  { t: "Sheer Puff Sleeve", img: "sheer-puff sleeve.png", price: "₱ 17,100",
    desc: "Ethereal sheer top with voluminous sleeves and subtle texture. Perfect for layering and evening looks." },
  { t: "Double-Breasted Blazer", img: "double-breasted blazer.png", price: "₱ 29,900",
    desc: "Tailored double-breasted blazer with peak lapels and refined structure for modern silhouettes." },
  { t: "Belted Jacket", img: "belted-jacket.png", price: "₱ 22,400",
    desc: "Utility-inspired jacket with removable belt, flap pockets and a flattering mid-length cut." },
  { t: "Long Waistcoat", img: "long-waistcoat.png", price: "₱ 19,800",
    desc: "Streamlined long waistcoat, minimalist edges and deep V neckline for layered styling." },
  { t: "Wool Jacket", img: "wool-jacket.png", price: "₱ 25,600",
    desc: "Warm wool jacket with smooth lining and structured shoulders; a polished cold-weather staple." },
  { t: "Denim Polo Shirt", img: "denim-poloshirt.png", price: "₱ 14,500",
    desc: "Soft denim knit polo with a casual collar and refined placket; sharp with trousers or shorts." },
  { t: "Floral Denim Jacket", img: "floral-denimjacket.png", price: "₱ 16,900",
    desc: "Classic trucker fit in washed denim overlaid with tonal floral pattern for a subtle statement." },
  { t: "Print Overshirt", img: "print-overshirt.png", price: "₱ 3,200",
    desc: "Lightweight printed overshirt with button front and relaxed fit." },
  // Accessories
  { t: "Leather Bucket Bag", img: "leather-bucket bag.png", price: "₱ 14,500",
    desc: "Supple leather bucket bag with adjustable strap and cinch closure." },
  { t: "Rigid Bracelets", img: "rigid-bracelets.png", price: "₱ 3,200",
    desc: "Polished metal bangles, stackable and sleek." },
  { t: "Black Cap", img: "blackcap.png", price: "₱ 1,200",
    desc: "Structured black cap with tonal logo detail." },
  { t: "Handbag", img: "handbag.png", price: "₱ 1,700",
    desc: "Compact handbag with detachable strap and internal pocket." },
  { t: "Rockstar Choker", img: "rockstar choker.png", price: "₱ 1,500",
    desc: "Statement choker with metal hardware for bold looks." },
  { t: "BRIKO® Sunglasses", img: "briko® sunglasses.png", price: "₱ 9,900",
    desc: "Sport-inspired BRIKO® frames with UV protection lenses." },
];

const toSlug = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Product({ asset, slug }) {
  const product = useMemo(() => {
    const found = CATALOG.find((p) => toSlug(p.t) === slug);
    return found || CATALOG[0];
  }, [slug]);

  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);

  return (
    <main
      className="p-wrap"
      style={{
        "--glitter": `url(${asset("glitter star background.png")})`,
      }}
    >
      {/* Crumbs */}
      <nav className="p-crumbs">
        <a href="#/">Home</a>
        <span>/</span>
        <a href="#/shop">Collection</a>
        <span>/</span>
        <span className="active">{product.t}</span>
      </nav>

      {/* Star field + red gradient background */}
      <div className="p-bg" aria-hidden="true" />

      <section className="p-grid">
        {/* Image */}
        <div className="p-image">
          <img src={asset(product.img)} alt={product.t} />
        </div>

        {/* Details */}
        <div className="p-details">
          <h1 className="p-title">{product.t}</h1>
          <div className="p-price">{product.price}</div>

          <div className="p-label">Size</div>
          <div className="p-sizes">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                className={`p-size ${size === s ? "is-active" : ""} ${s === "XL" ? "is-hot" : ""}`}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="p-label">Quantity</div>
          <div className="p-qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <input value={qty} readOnly />
            <button onClick={() => setQty((q) => q + 1)}>＋</button>
          </div>

          <a className="p-add" href="#/">
            Add to Bag
          </a>

          <p className="p-desc">{product.desc}</p>
        </div>
      </section>

      {/* Lower page links row (like your mock) */}
      <div className="p-links">
        <a href="/#">Contact Information</a>
        <a href="/#">Refund Policy</a>
        <a href="/#">Privacy Policy</a>
        <a href="/#">Terms of Service</a>
      </div>
    </main>
  );
}
