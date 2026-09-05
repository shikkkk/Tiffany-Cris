import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { bags, bagSvgs, TABS } from "./catalog";

const SUPA_URL = "https://ldvsjfgeornlispaefjf.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhYmFzZSIsInJlZiI6ImxkdnNqZmdlb3JubGlzcGFlZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTIwODAsImV4cCI6MjA5MzQ2ODA4MH0.IpT6BlTpWekM8nbk21gtkkkv_693wR8nRP6uuN32YTY";
const supaHeaders = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` };
async function supaFetch(path) {
  const response = await fetch(`${SUPA_URL}/rest/v1/${path}`, { headers: supaHeaders });
  return response.json();
}

export default function CollectionPage({ user, wishlistIds, onWishlistToggle, onViewingRequest, onAuthRequired }) {
  const [activeTab, setActiveTab] = useState("All");
  const [sort, setSort] = useState("");
  const [modal, setModal] = useState(null);
  const [liveBags, setLiveBags] = useState(null);
  const [carouselIdx, setCarouselIdx] = useState(0);

  useEffect(() => { setCarouselIdx(0); }, [modal?.id]);

  useEffect(() => {
    supaFetch("collections?select=*&order=created_at.desc")
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveBags(data.map(item => ({
            id: item.id, name: item.name, cat: item.category, price: item.price,
            badge: item.badge, badgeType: item.badge_type, desc: item.description,
            tagline: item.tagline, img: item.image_url,
            imgs: item.images?.length ? item.images : item.image_url ? [item.image_url] : [],
            specs: item.specs || {}, colors: [],
          })));
        } else { setLiveBags(null); }
      })
      .catch(() => setLiveBags(null));
  }, []);

  const source = liveBags ?? bags;
  const filtered = source
    .filter(b => activeTab === "All" || b.cat === activeTab)
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const inWishlist = (id) => wishlistIds?.has(String(id));

  return (
    <div className="col-page">
      <section className="col-hero" aria-label="Collection header">
        <div className="col-hero-eyebrow">Tiffany &amp; Cris</div>
        <h1 className="col-hero-title">The <em>Collection</em></h1>
        <p className="col-hero-sub">
          Each piece is a testament to restraint, material mastery,
          and the belief that true luxury requires no announcement.
        </p>
      </section>

      <div className="filter-bar" role="toolbar" aria-label="Filter and sort products">
        <div className="filter-tabs">
          {TABS.map(tab => (
            <button key={tab} className={`filter-tab${activeTab === tab ? " active" : ""}`} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <select className="filter-sort" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">Sort By</option>
          <option value="price-asc">Price: Low - High</option>
          <option value="price-desc">Price: High - Low</option>
          <option value="name">Name A - Z</option>
        </select>
      </div>

      <div className="product-grid-wrap">
        <div className="product-count">{filtered.length} piece{filtered.length !== 1 ? "s" : ""}</div>
        <div className="product-grid" role="list">
          {filtered.map(bag => (
            <article className="product-card" key={bag.id} onClick={() => setModal(bag)} role="listitem" aria-label={`${bag.name} â€” ${bag.cat}`}>
              <div className="pc-img">
                {bag.img
                  ? <img className="pc-img-inner" src={bag.img} alt={`${bag.name} luxury ${bag.cat} â€” Tiffany & Cris`} loading="lazy" />
                  : <div className="pc-img-inner">{bagSvgs[bag.id]}</div>
                }
                <button
                  className={`pc-wish-btn${inWishlist(bag.id) ? " on" : ""}`}
                  onClick={e => { e.stopPropagation(); onWishlistToggle ? onWishlistToggle(bag.id) : onAuthRequired?.(); }}
                  aria-label={inWishlist(bag.id) ? `Remove ${bag.name} from wishlist` : `Add ${bag.name} to wishlist`}
                >
                  {inWishlist(bag.id) ? "â™¥" : "â™¡"}
                </button>
              </div>
              <div className="pc-info">
                <div className="pc-cat">{bag.cat}</div>
                <div className="pc-name">{bag.name}</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={`modal-bg${modal ? " open" : ""}`} onClick={e => { if (e.target.classList.contains("modal-bg")) setModal(null); }}>
        {modal && (
          <div className="modal-box">
            <button className="modal-close-btn" onClick={() => setModal(null)}>âœ• Close</button>
            <div className="modal-img-side">
              {(modal.imgs?.length > 0 || modal.img) ? (
                <>
                  <img
                    src={modal.imgs?.length > 0 ? modal.imgs[carouselIdx] : modal.img}
                    alt={`${modal.name} luxury ${modal.cat} â€” Tiffany & Cris`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                  {modal.imgs?.length > 1 && (
                    <>
                      <button className="modal-carousel-arrow modal-carousel-prev" onClick={() => setCarouselIdx(i => (i - 1 + modal.imgs.length) % modal.imgs.length)}>â€¹</button>
                      <button className="modal-carousel-arrow modal-carousel-next" onClick={() => setCarouselIdx(i => (i + 1) % modal.imgs.length)}>â€º</button>
                      <div className="modal-carousel-dots">
                        {modal.imgs.map((_, i) => (
                          <button key={i} className={`modal-carousel-dot${i === carouselIdx ? " active" : ""}`} onClick={() => setCarouselIdx(i)} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : bagSvgs[modal.id]}
            </div>
            <div className="modal-info-side">
              <div>
                <div className="modal-cat">{modal.cat}</div>
                <div className="modal-name">{modal.name}</div>
                <div className="modal-tagline">{modal.tagline}</div>
                <div className="modal-specs">
                  {Object.entries(modal.specs).filter(([, v]) => v).map(([k, v]) => (
                    <div className="modal-spec-row" key={k}>
                      <span className="ms-label">{k}</span>
                      <span className="ms-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button className="modal-btn-primary" onClick={() => onWishlistToggle ? onWishlistToggle(modal.id) : onAuthRequired?.()}>
                  {inWishlist(modal.id) ? "â™¥ Saved to Wishlist" : "â™¡ Add to Wishlist"}
                </button>
                <button className="modal-btn-ghost" onClick={() => { onViewingRequest ? onViewingRequest(modal) : onAuthRequired?.(); setModal(null); }}>
                  Request Private Viewing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* â”€â”€ CONTACT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
