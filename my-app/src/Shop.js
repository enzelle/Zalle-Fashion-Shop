import React from "react";

const PINK_GLOW = "pinkshade-background.png";

const toSlug = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Shop({ asset }) {
  const items = [
    { t: "Leather Bomber Jacket",  img: "leather-bomber jacket.png",  price: "₱ 35,100" },
    { t: "Sheer Puff Sleeve",      img: "sheer-puff sleeve.png",      price: "₱ 17,100" },
    { t: "Double-Breasted Blazer", img: "double-breasted blazer.png", price: "₱ 29,900" },
    { t: "Belted Jacket",          img: "belted-jacket.png",          price: "₱ 22,400" },
    { t: "Long Waistcoat",         img: "long-waistcoat.png",         price: "₱ 19,800" },
    { t: "Wool Jacket",            img: "wool-jacket.png",            price: "₱ 25,600" },
    { t: "Denim Polo Shirt",       img: "denim-poloshirt.png",        price: "₱ 14,500" },
    { t: "Floral Denim Jacket",    img: "floral-denimjacket.png",     price: "₱ 16,900" },
    { t: "Print Overshirt",        img: "print-overshirt.png",        price: "₱ 3,200"  },
  ];

  return (
    <main
      className="shop-wrap"
      style={{
        "--glitter": `url(${asset("glitter star background.png")})`,
        "--tilted-star": `url(${asset("tiltedstar-background.png")})`,
        position: "relative",
      }}
    >
      <header className="shop-hero" style={{ position: "relative", zIndex: 1 }}>
        <h1 className="shop-title">Shop Collection</h1>
        <p className="shop-sub">Discover the latest jackets, tailoring, footwear, bags, and jewelry.</p>
      </header>

      <section className="shop-grid" style={{ position: "relative", zIndex: 1 }}>
        {items.map((it) => (
          <a key={it.t} href={`#/product/${toSlug(it.t)}`} className="shop-card link-unstyled">
            <div className="shop-card-pad">
              <div className="shop-img-wrap">
                <span className="shop-glow" style={{ backgroundImage: `url(${asset(PINK_GLOW)})` }} aria-hidden="true" />
                <img src={asset(it.img)} alt={it.t} className="shop-img" loading="lazy" />
              </div>
              <div className="shop-meta">
                <div className="shop-name">{it.t}</div>
                <div className="shop-price">{it.price}</div>
              </div>
            </div>
          </a>
        ))}
      </section>
    </main>
  );
}
