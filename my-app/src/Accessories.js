// src/Accessories.js
import React from "react";

const PINK_GLOW = "pinkshade-background.png";
const toSlug = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function Accessories({ asset }) {
  const items = [
    { t: "Leather Bucket Bag",   img: "leather-bucket bag.png",   price: "₱ 14,500" },
    { t: "Rigid Bracelets",      img: "rigid-bracelets.png",      price: "₱ 3,200"  },
    { t: "Black Cap",            img: "blackcap.png",             price: "₱ 1,200"  },
    { t: "Handbag",              img: "handbag.png",              price: "₱ 1,700"  },
    { t: "Rockstar Choker",      img: "rockstar choker.png",      price: "₱ 1,500"  },
    { t: "BRIKO® Sunglasses",    img: "briko® sunglasses.png",    price: "₱ 9,900"  },
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
        <h1 className="shop-title">Accessories</h1>
        <p className="shop-sub">Finish the look with bags, jewelry, eyewear, and more.</p>
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
