import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { BagSilhouette, bagSvgs } from "./catalog";
import lvTwist from "../assets/twist.avif";
import lvLoop from "../assets/loop.avif";
import lvSpeedy from "../assets/speedy.avif";
import lvOnthego from "../assets/onthego.avif";

const SUPA_URL = "https://ldvsjfgeornlispaefjf.supabase.co";
const SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdWJhYmFzZSIsInJlZiI6ImxkdnNqZmdlb3JubGlzcGFlZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4OTIwODAsImV4cCI6MjA5MzQ2ODA4MH0.IpT6BlTpWekM8nbk21gtkkkv_693wR8nRP6uuN32YTY";
const supaHeaders = { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` };
async function supaFetch(path) {
  const response = await fetch(`${SUPA_URL}/rest/v1/${path}`, { headers: supaHeaders });
  return response.json();
}

export default function HomePage({ setPage, theme }) {
  const [previews, setPreviews] = useState(null);

  useEffect(() => {
    supabase.from("collections").select("id, name, image_url")
      .order("created_at", { ascending: false }).limit(3)
      .then(({ data, error }) => {
        if (!error && data?.length > 0) setPreviews(data);
        else setPreviews(null);
      })
      .catch(() => setPreviews(null));
  }, []);

  const goCollection = () => { setPage("collection"); window.scrollTo({ top: 0 }); };
  const goContact    = () => { setPage("contact");    window.scrollTo({ top: 0 }); };

  const defaultPreviews = [
    { id: "d1", image_url: lvTwist, name: "Vanity Chain Collection" },
    { id: "d2", image_url: lvLoop, name: "Loop Monogram" },
    { id: "d3", image_url: lvSpeedy, name: "Speedy Soft 30" },
  ];
  const displayPreviews = previews ?? defaultPreviews;

  const isLight      = theme === 'light';
  const heritageBg   = isLight ? 'var(--tc-surface, #DFD3C1)' : 'black';
  const previewBg    = isLight ? 'var(--tc-bg, #EDE5D8)' : '#050403';
  const headingColor = isLight ? 'var(--tc-heading, #201812)' : '#f0e4cc';
  const accentSpan   = isLight ? 'var(--tc-heading, #201812)' : '#ffffff';
  const bodyTextClr  = isLight ? 'var(--tc-text, #635140)' : '#9a8a70';
  const goldClr      = isLight ? 'var(--tc-gold, #9E6728)' : '#c59c55';

  return (
    <div className="hero-bg relative w-full min-h-screen flex flex-col overflow-hidden" style={{ fontFamily: "'Montserrat', sans-serif" }}>
      <div className="grain-overlay"/>

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16" style={{ paddingTop: "120px" }}>
        <div className="hero-eyebrow fade-in delay-1 mb-6">

        </div>
        <h1 className="fade-in delay-2 mb-2">
          <span className="hero-title-main block">Tiffany &amp; Cris</span>
          <span className="hero-title-sub block">Luxury Collections</span>
        </h1>
        <p className="hero-desc fade-in delay-3 mt-6 mb-10">
          Hand-crafted bags forged in midnight and gold â€” for those who wear elegance like a second skin.
        </p>
        <div className="fade-in delay-4 flex flex-wrap gap-4 justify-center">
          <button className="btn-primary" onClick={goCollection}>Explore Collection</button>
          <button className="btn-secondary" onClick={goContact}>Private Viewing</button>
        </div>
        <div className="fade-in delay-5 mt-16 flex items-center gap-4" style={{ color: isLight ? "var(--tc-muted, #9C8B77)" : "#ddd9d2", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" }}>
          <span style={{ width: 60, height: 1, background: isLight ? "var(--tc-border, rgba(158,103,40,0.3))" : "rgba(235,221,221,0.2)", display: "inline-block" }}/>
          Exclusively Crafted
          <span style={{ width: 60, height: 1, background: isLight ? "var(--tc-border, rgba(158,103,40,0.3))" : "rgba(228,220,207,0.2)", display: "inline-block" }}/>
        </div>
      </div>

      <section className="w-full py-40 px-6 text-center border-t border-[rgba(197,156,85,0.08)]" style={{ background: heritageBg }}>
        <div className="max-w-3xl mx-auto">
          <div style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: goldClr, marginBottom: "20px", fontFamily: "'Montserrat', sans-serif" }}>Our Heritage</div>
          <h2 className="font-cormorant" style={{ fontSize: "56px", color: headingColor, fontWeight: 400, lineHeight: 1.2, marginBottom: "24px" }}>
            Where <span style={{ color: accentSpan }}>obsidian</span> meets <span style={{ color: goldClr }}>gold.</span>
          </h2>
          <p style={{ color: bodyTextClr, fontSize: "15px", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto", fontFamily: "'Montserrat', sans-serif" }}>
            Each Tiffany &amp; Cris piece is carefully curated from the world's most renowned ateliers â€” from the finest Italian leathers to Parisian hand-finished clasps â€” ensuring every item reflects timeless luxury and craftsmanship.
          </p>
        </div>
      </section>

      <section className="w-full py-40 px-6 text-center border-t border-[rgba(197,156,85,0.08)]" style={{ background: previewBg }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: goldClr, marginBottom: "18px", fontFamily: "'Montserrat', sans-serif" }}>Collections Preview</div>
          <h2 className="font-cormorant" style={{ fontSize: "54px", color: headingColor, fontWeight: 400, marginBottom: "60px", lineHeight: 1.2 }}>
            A glimpse into <span style={{ color: goldClr }}>timeless pieces</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {displayPreviews.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={goCollection}>
                <div className="h-[380px] border border-[rgba(197,156,85,0.15)] relative overflow-hidden">
                  <img src={item.image_url} alt={`${item.name} â€” Tiffany & Cris luxury collection`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c59c55", border: "1px solid rgba(197,156,85,0.6)", padding: "10px 18px", background: "rgba(5,4,3,0.85)", width: "100%", textAlign: "center", display: "block" }}>View Collection â†’</span>
                  </div>
                </div>
                <p className="mt-4 text-sm font-montserrat tracking-widest uppercase" style={{ color: isLight ? "var(--tc-muted, #9C8B77)" : "#9a8a70" }}>{item.name}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "52px" }}>
            <button className="btn-secondary" onClick={goCollection}>View Full Collection</button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* â”€â”€ WISHLIST PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
