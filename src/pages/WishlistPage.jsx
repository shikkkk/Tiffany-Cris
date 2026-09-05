import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { bagSvgs } from "./catalog";

const SUPA_URL = "https://ldvsjfgeornlispaefjf.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhYmFzZSIsInJlZiI6ImxkdnNqZmdlb3JubGlzcGFlZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTIwODAsImV4cCI6MjA5MzQ2ODA4MH0.IpT6BlTpWekM8nbk21gtkkkv_693wR8nRP6uuN32YTY";
const supaHeaders = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` };
async function supaFetch(path) {
  const response = await fetch(`${SUPA_URL}/rest/v1/${path}`, { headers: supaHeaders });
  return response.json();
}

export default function WishlistPage({ user, wishlistIds, setPage, onWishlistToggle, onViewingRequest, onAuthRequired }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [wishCarouselIdx, setWishCarouselIdx] = useState(0);

  useEffect(() => { setWishCarouselIdx(0); }, [modal?.id]);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    if (wishlistIds.size === 0) { setItems([]); setLoading(false); return; }
    const ids = [...wishlistIds].join(",");
    supaFetch(`collections?select=*&id=in.(${ids})`)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setItems(data.map(item => ({
            id: item.id, name: item.name, cat: item.category, price: item.price,
            img: item.image_url,
            imgs: item.images?.length ? item.images : item.image_url ? [item.image_url] : [],
            specs: item.specs || {}, tagline: item.tagline,
          })));
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [wishlistIds, user]);

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "20px", paddingTop: "80px" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "32px", color: "#c59c55" }}>Your Wishlist</div>
        <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#6a5a40" }}>Sign in to view your saved pieces.</p>
        <button className="btn-primary" onClick={onAuthRequired}>Sign In</button>
      </div>
    );
  }

  return (
    <div className="col-page">
      <div className="col-hero">
        <div className="col-hero-eyebrow">Member Collection</div>
        <h1 className="col-hero-title">My <em>Wishlist</em></h1>
        <p className="col-hero-sub">Your curated selection of timeless pieces.</p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "80px", fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#6a5a40" }}>Loading...</div>
      ) : items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#c59c55", marginBottom: "16px" }}>Your wishlist is empty</div>
          <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "13px", color: "#6a5a40", marginBottom: "32px" }}>Save pieces you love by clicking the heart on any item.</p>
          <button className="btn-secondary" onClick={() => setPage("collection")}>Browse Collection</button>
        </div>
      ) : (
        <div className="product-grid-wrap">
          <div className="product-count">{items.length} saved piece{items.length !== 1 ? "s" : ""}</div>
          <div className="product-grid">
            {items.map(bag => (
              <div className="product-card" key={bag.id} onClick={() => setModal(bag)}>
                <div className="pc-img">
                  {bag.img
                    ? <img className="pc-img-inner" src={bag.img} alt={`${bag.name} luxury ${bag.cat} â€” Tiffany & Cris`} loading="lazy" />
                    : <div className="pc-img-inner" />
                  }
                  <button className="pc-wish-btn on" onClick={e => { e.stopPropagation(); onWishlistToggle(bag.id); }} aria-label={`Remove ${bag.name} from wishlist`}>â™¥</button>
                </div>
                <div className="pc-info">
                  <div className="pc-cat">{bag.cat}</div>
                  <div className="pc-name">{bag.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`modal-bg${modal ? " open" : ""}`} onClick={e => { if (e.target.classList.contains("modal-bg")) setModal(null); }}>
        {modal && (
          <div className="modal-box">
            <button className="modal-close-btn" onClick={() => setModal(null)}>âœ• Close</button>
            <div className="modal-img-side">
              {(modal.imgs?.length > 0 || modal.img) ? (
                <>
                  <img
                    src={modal.imgs?.length > 0 ? modal.imgs[wishCarouselIdx] : modal.img}
                    alt={`${modal.name} luxury ${modal.cat} â€” Tiffany & Cris`}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
                  />
                  {modal.imgs?.length > 1 && (
                    <>
                      <button className="modal-carousel-arrow modal-carousel-prev" onClick={() => setWishCarouselIdx(i => (i - 1 + modal.imgs.length) % modal.imgs.length)}>â€¹</button>
                      <button className="modal-carousel-arrow modal-carousel-next" onClick={() => setWishCarouselIdx(i => (i + 1) % modal.imgs.length)}>â€º</button>
                      <div className="modal-carousel-dots">
                        {modal.imgs.map((_, i) => (
                          <button key={i} className={`modal-carousel-dot${i === wishCarouselIdx ? " active" : ""}`} onClick={() => setWishCarouselIdx(i)} />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : null}
            </div>
            <div className="modal-info-side">
              <div>
                <div className="modal-cat">{modal.cat}</div>
                <div className="modal-name">{modal.name}</div>
                <div className="modal-tagline">{modal.tagline}</div>
                <div className="modal-specs">
                  {Object.entries(modal.specs).filter(([, v]) => v).map(([k, v]) => (
                    <div className="modal-spec-row" key={k}>
                      <span className="ms-label">{k}</span><span className="ms-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <button className="modal-btn-primary" onClick={() => { onWishlistToggle(modal.id); setModal(null); }}>â™¥ Remove from Wishlist</button>
                <button className="modal-btn-ghost" onClick={() => { onViewingRequest(modal); setModal(null); }}>Request Private Viewing</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* â”€â”€ COLLECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
