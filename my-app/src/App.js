// src/App.js
import React, { useEffect, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Shop from "./Shop";
import Accessories from "./Accessories";
import Product from "./Product";
import "./App.css";

/* helper to read assets from /public exactly by filename */
const asset = (file) => `${process.env.PUBLIC_URL}/${file}`;

const PINK_GLOW = "pinkshade-background.png";

function Home({ setCartOpen, cartItems }) {
  // Newsletter email + ui state
  const [newsEmail, setNewsEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [newsMsg, setNewsMsg] = useState("");

  // very light email sanity check
  const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = newsEmail.trim();
    if (!email || !isValidEmail(email) || isSending) return;

    setIsSending(true);
    setNewsMsg("");

    try {
      const resp = await fetch("/api/send-welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!resp.ok) {
        const text = await resp.text().catch(() => "");
        throw new Error(text || "Email send failed");
      }

      setNewsMsg("Thanks! Check your inbox for a welcome email.");
      setNewsEmail("");
    } catch (err) {
      console.error(err);
      setNewsMsg("Sorry, something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* SCROLLING PAGE BACKDROP (star donut) */}
      <div
        className="bg-star"
        style={{ backgroundImage: `url(${asset("stardonut-background.png")})` }}
        aria-hidden="true"
      />

      {/* HERO */}
      <section className="hero">
        <div className="hero-copy">
          <h2 className="hero-eyebrow">SPRING–SUMMER 2025</h2>
          <h1 className="hero-script">Dans Boutiques</h1>
          <p className="hero-desc">
            Imbued with the artistic spirit of the Villa Noailles in the south of France, the Zalle Spring–Summer 2025 Ready-to-Wear Collection Campaign
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn-outline" href="#/shop">SHOP COLLECTION</a>
            <a className="btn-outline" href="#/accessories">ACCESSORIES</a>
          </div>
        </div>
        <div className="hero-image">
          <img src={asset("zallestore.png")} alt="store" />
        </div>
      </section>
      <br /><br /><br />

      {/* THE FUSION OF INNOVATION */}
      <section className="fusion">
        <h2 className="fusion-title">THE FUSION OF<br />INNOVATION</h2>
        <p className="fusion-text">
          AT ZALLE, OUR PASSION AS AN ARTIST MANAGEMENT COMPANY IS TO CREATE EXPERIENCES THAT TRANSCEND GENRES AND CONNECT GENERATIONS.
          OUR CORE LIES IN RELENTLESS INNOVATION AND A COMMITMENT TO AUTHENTICITY. WE’RE NOT JUST PUSHING BOUNDARIES; WE’RE REDEFINING THEM.
        </p>
      </section>
      <br /><br /><br /><br /><br /><br /><br /><br />

      {/* SHOP BY CATEGORY */}
      <section
        className="sbc"
        style={{ "--tilted-star": `url(${asset("tiltedstar-background.png")})` }}
      >
        <h3 className="sbc-title">SHOP BY CATEGORY</h3>
        <p className="sbc-sub">EXPLORE OUR CAREFULLY CURATED COLLECTIONS DESIGNED FOR THE MODERN LIFESTYLE</p>

        <div className="sbc-row">
          <CategoryCard
            img={asset("lisa.png")}
            title="WOMEN’S FASHION"
            desc="Elegant dresses, chic blouses, and sophisticated outerwear"
          />
          <CategoryCard
            img={asset("ken.png")}
            title="MEN’S COLLECTION"
            desc="Tailored suits, casual wear, and premium accessories"
          />
          <CategoryCard
            img={asset("jewelry.png")}
            title="LUXURY ACCESSORIES"
            desc="Handbags, jewelry, and statement pieces"
            light
          />
        </div>
      </section>

      <br /><br /><br /><br /><br /><br /><br />

      {/* FEATURED PRODUCTS */}
      <section className="featured">
        <h3 className="feat-title">Featured Products</h3>
        <p className="feat-sub">Handpicked favorites from our latest collection</p>

        <div className="feat-grid">
          <ProductCard title="Leather Jacket"   price="₱ 35,100" tag="new"  image={asset("leather jacket.png")}  glow={asset(PINK_GLOW)} />
          <ProductCard title="Black Mini Dress" price="₱ 17,100" tag="new"  image={asset("black mini dress.png")} glow={asset(PINK_GLOW)} />
          <ProductCard title="Elevator Shoes"   price="₱ 12,100" tag="new"  image={asset("elevator shoes.png")}  glow={asset(PINK_GLOW)} />
          <ProductCard title="Rockstar Choker"  price="₱ 1,500" tag="sale" image={asset("rockstar choker.png")} glow={asset(PINK_GLOW)} />
          <ProductCard title="Handbag"          price="₱ 1,700" tag="sale" image={asset("handbag.png")}        glow={asset(PINK_GLOW)} />
          <ProductCard title="Grey Hoodie"      price="₱ 8,900" tag="sale" image={asset("grey hoodie.png")}    glow={asset(PINK_GLOW)} />
        </div>
      </section>

      {/* NEWSLETTER – Nodemailer via /api/send-welcome */}
      <section
        className="news-hero"
        style={{ backgroundImage: `url(${asset("newsletter-background.png")})` }}
      >
        <div className="news-overlay" />
        <div className="news-grid">
          {/* Left */}
          <div className="news-left">
            <div className="news-script">Stay in Style</div>
            <p className="news-left-copy">
              ELEVATING YOUR STYLE WITH PREMIUM FASHION AND ACCESSORIES. DISCOVER<br />
              TIMELESS PIECES THAT DEFINE MODERN ELEGANCE.
            </p>
          </div>

          {/* Right */}
          <div className="news-right">
            <p className="news-right-copy">
              SUBSCRIBE TO OUR NEWSLETTER AND BE THE FIRST TO KNOW ABOUT NEW ARRIVALS,
              EXCLUSIVE OFFERS, AND STYLE INSPIRATION.
            </p>

            <form className="news-form-inline" onSubmit={handleSubscribe}>
              <label htmlFor="news-email" className="sr-only">Email address</label>
              <input
                id="news-email"
                type="email"
                required
                className="news-input-inline"
                placeholder="Your email address"
                value={newsEmail}
                onChange={(e) => setNewsEmail(e.target.value)}
                disabled={isSending}
              />
              <button className="news-btn" type="submit" disabled={isSending}>
                {isSending ? "Sending..." : "Subscribe"}
              </button>
            </form>

            {newsMsg && (
              <div style={{ marginTop: 10, fontFamily: "var(--bebas)", letterSpacing: ".09em", color: "#ddd" }}>
                {newsMsg}
              </div>
            )}
          </div>
        </div>

        {/* Bottom-right logo (absolute) */}
        <div className="news-logo-wrap">
          <img src={asset("Zalle logo.png")} alt="ZALLE" className="news-logo" />
        </div>
      </section>
    </>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartItems] = useState(0);

  // super-lightweight hash router
  const [route, setRoute] = useState(window.location.hash || "#/");
  useEffect(() => {
    const onHash = () => setRoute(window.location.hash || "#/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // detect product detail route (#/product/:slug) to avoid double footer
  const productMatch = route.match(/^#\/product\/(.+)$/);

  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="navbar">
        <img src={asset("Zalle logo.png")} alt="ZALLE" className="brand-logo" />

        <nav className="nav-links">
          <a href="#/" className="nav-item">HOME</a>
          <a href="#/shop" className="nav-item">SHOP COLLECTION</a>
          <a href="#/accessories" className="nav-item">ACCESSORIES</a>
        </nav>

        <div className="icons">
          <button onClick={() => setSearchOpen((s) => !s)} aria-label="Search">
            <img src={asset("search.png")} alt="search" className="icon-24" />
          </button>
          <button onClick={() => setCartOpen(true)} aria-label="Cart" className="icon-btn">
            <img src={asset("shoppingbag.png")} alt="bag" className="icon-24" />
            {cartItems > 0 && <span className="badge">{cartItems}</span>}
          </button>
          <button className="hamburger" onClick={() => setMobileNavOpen((m) => !m)} aria-label="Menu">☰</button>
        </div>
      </header>

      {/* Mobile nav */}
      {mobileNavOpen && (
        <div className="mobile-nav">
          <a href="#/">HOME</a>
          <a href="#/shop">SHOP COLLECTION</a>
          <a href="#/accessories">ACCESSORIES</a>
        </div>
      )}

      {/* Search */}
      {searchOpen && (
        <div className="search-wrap">
          <input className="search-input" placeholder="Search..." />
        </div>
      )}

      {/* ROUTES */}
      {route === "#/shop" ? (
        <Shop asset={asset} />
      ) : route === "#/accessories" ? (
        <Accessories asset={asset} />
      ) : productMatch ? (
        <Product asset={asset} slug={productMatch[1]} />
      ) : (
        <Home setCartOpen={setCartOpen} cartItems={cartItems} />
      )}

      {/* FOOTER (hidden on product detail pages to prevent doubling) */}
      {!productMatch && (
        <footer className="footer">
          <div className="foot-kicker">get connected</div>
          <div className="foot-links">
            <a href="/#">Contact Information</a>
            <a href="/#">Refund Policy</a>
            <a href="/#">Privacy Policy</a>
            <a href="/#">Terms of Service</a>
          </div>
          <div className="foot-socials">
            <a href="/#"><img src={asset("facebook.png")} alt="facebook" className="icon-24" /></a>
            <a href="/#"><img src={asset("instagram.png")} alt="instagram" className="icon-24" /></a>
          </div>
        </footer>
      )}

      {/* CART MODAL */}
      <Transition appear show={cartOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setCartOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="modal">
                  <Dialog.Title className="modal-title">Shopping Bag</Dialog.Title>
                  <p className="modal-copy">You have {cartItems} item(s) in your bag.</p>
                  <div className="modal-actions">
                    <button className="btn-primary" onClick={() => setCartOpen(false)}>Continue Shopping</button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

/* === Reused Cards for Home === */
function ProductCard({ title, price, tag, image, glow }) {
  const isSale = String(tag).toLowerCase() === "sale";
  return (
    <div className="prod">
      <div className="prod-pad">
        <div className="prod-img-wrap">
          {/* glow layer */}
          <span
            className="prod-glow"
            style={{ backgroundImage: `url(${glow})` }}
            aria-hidden="true"
          />
          {/* product */}
          <img src={image} alt={title} className="prod-img" />
          {tag && <span className={`prod-tag ${isSale ? "is-sale" : ""}`}>{tag}</span>}
        </div>
        <div className="prod-meta">
          <div className="prod-title">{title}</div>
          <div className="prod-price">{price}</div>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ img, title, desc, light }) {
  const imgClass = `cat-img ${light ? "contain" : "portrait"}`;
  const wrapClass = `cat-img-wrap ${light ? "is-light" : ""}`;

  return (
    <article className="cat">
      <div className={wrapClass}>
        <img src={img} alt={title} className={imgClass} />
      </div>
      <div className="cat-band">
        <h4 className="cat-title">{title}</h4>
        <p className="cat-desc">{desc}</p>
      </div>
    </article>
  );
}
