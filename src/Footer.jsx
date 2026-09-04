export default function Footer({ setPage, onOpenLegal, theme = "dark" }) {
  const isLight = theme === "light";

  const handleNav = (p) => {
    if (setPage) setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLegal = (tabKey) => {
    if (onOpenLegal) {
      onOpenLegal(tabKey);
    } else if (setPage) {
      setPage("legal");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="ct-footer-strip" style={{
      background: isLight ? "var(--tc-surface, #DFD3C1)" : "#080603",
      borderTop: isLight ? "1px solid var(--tc-border, rgba(158,103,40,0.22))" : "1px solid rgba(197,156,85,0.08)",
      padding: "64px 32px 32px",
      transition: "background 0.3s, border-color 0.3s"
    }}>
      <div className="ct-footer-grid">
        <div>
          <div className="ct-f-brand" style={{ color: isLight ? "var(--tc-heading, #201812)" : "#f0e4c8" }}>
            Tiffany &amp; Cris
          </div>
          <div className="ct-f-brandtag" style={{ color: isLight ? "var(--tc-muted, #9C8B77)" : "#5a4a30" }}>
            Luxury Collections Atelier
          </div>
          <p className="ct-f-about" style={{ color: isLight ? "var(--tc-text, #635140)" : "#8a7a60", maxWidth: "340px", lineHeight: 1.8 }}>
            Curated authentic luxury designer handbags, vintage treasures, and sourced collector pieces based in Bonifacio Global City, Metro Manila.
          </p>
          <div style={{ marginTop: "16px", display: "flex", gap: "10px" }}>
            <span style={{
              fontSize: "10px",
              fontFamily: "'Montserrat', sans-serif",
              color: isLight ? "var(--tc-gold, #9E6728)" : "#c59c55",
              letterSpacing: "0.15em",
              textTransform: "uppercase"
            }}>
              ✦ 100% Authenticity Guaranteed
            </span>
          </div>
        </div>

        {/* Column: Navigate */}
        <div>
          <div className="ct-f-col-title">Navigate</div>
          <button className="ct-f-link" type="button" onClick={() => handleNav("home")}>
            Home
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleNav("collection")}>
            The Collection
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleNav("contact")}>
            Private Atelier
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleNav("contact")}>
            Contact &amp; Inquiries
          </button>
        </div>

        {/* Column: Legal Policies */}
        <div>
          <div className="ct-f-col-title">Legal &amp; Policies</div>
          <button className="ct-f-link" type="button" onClick={() => handleLegal("terms")}>
            Terms &amp; Conditions
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleLegal("shipping")}>
            Shipping &amp; Delivery
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleLegal("returns")}>
            Returns &amp; Refunds
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleLegal("authenticity")}>
            Authenticity Guarantee
          </button>
          <button className="ct-f-link" type="button" onClick={() => handleLegal("terms")}>
            Privacy &amp; Data Protection
          </button>
        </div>

        {/* Column: Connect */}
        <div>
          <div className="ct-f-col-title">Atelier Connect</div>
          <button
            className="ct-f-link"
            type="button"
            onClick={() => window.open("https://www.instagram.com/tiffanyandcris", "_blank")}
          >
            Instagram ↗
          </button>
          <button
            className="ct-f-link"
            type="button"
            onClick={() => window.open("https://www.facebook.com/tiffanyandcris", "_blank")}
          >
            Facebook ↗
          </button>
          <a
            className="ct-f-link"
            href="mailto:hello@tiffanyandcris.com"
            style={{ textDecoration: "none" }}
          >
            hello@tiffanyandcris.com
          </a>
          <div style={{
            fontSize: "11px",
            fontFamily: "'Montserrat', sans-serif",
            color: isLight ? "#7a6a50" : "#6a5a40",
            marginTop: "8px",
            lineHeight: 1.5
          }}>
            Bonifacio Global City<br />Taguig, Metro Manila
          </div>
        </div>
      </div>

      <div className="ct-f-bottom" style={{
        color: isLight ? "var(--tc-muted, #9C8B77)" : "#5a4a30",
        borderTopColor: isLight ? "var(--tc-border, rgba(158,103,40,0.22))" : "rgba(197,156,85,0.07)",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <span>© {new Date().getFullYear()} Tiffany &amp; Cris Luxury Collection. All rights reserved.</span>
        <span style={{ letterSpacing: "0.25em" }}>✦ Manila · Paris · Milan ✦</span>
        <span style={{ fontSize: "9px", opacity: 0.8 }}>RA 11967 &amp; RA 7394 Compliant</span>
      </div>
    </footer>
  );
}
