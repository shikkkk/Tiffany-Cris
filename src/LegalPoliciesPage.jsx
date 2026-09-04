import { useState, useEffect, useMemo } from "react";

export default function LegalPoliciesPage({ initialTab = "terms", onTabChange, theme = "dark" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSectionId, setActiveSectionId] = useState("");

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  const handleTabSwitch = (tabKey) => {
    setActiveTab(tabKey);
    setSearchQuery("");
    if (onTabChange) onTabChange(tabKey);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isLight = theme === "light";

  // Navigation tabs metadata
  const tabs = [
    { id: "terms", label: "Terms & Conditions", badge: "22 Sections" },
    { id: "shipping", label: "Shipping Policy", badge: "Delivery & Transit" },
    { id: "returns", label: "Returns & Refunds", badge: "Consumer Remedies" },
    { id: "authenticity", label: "Authenticity Guarantee", badge: "100% Money-Back" },
  ];

  const currentTabInfo = tabs.find((t) => t.id === activeTab) || tabs[0];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSectionId(id);
    }
  };

  return (
    <div className="legal-page" style={{ paddingTop: "110px", paddingBottom: "100px", minHeight: "100vh" }}>
      {/* ── HERO BANNER ── */}
      <section className="legal-hero" style={{
        padding: "40px 24px 50px",
        textAlign: "center",
        borderBottom: isLight ? "1px solid rgba(158,103,40,0.22)" : "1px solid rgba(197,156,85,0.12)",
        background: isLight
          ? "radial-gradient(ellipse 65% 50% at 50% 30%, rgba(158,103,40,0.08) 0%, transparent 70%), #EDE5D8"
          : "radial-gradient(ellipse 65% 50% at 50% 30%, rgba(197,156,85,0.09) 0%, transparent 70%), #050403"
      }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{
            fontSize: "11px",
            letterSpacing: "0.38em",
            textTransform: "uppercase",
            color: isLight ? "#9E6728" : "#c59c55",
            marginBottom: "14px",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 600
          }}>
            Tiffany &amp; Cris Luxury Collection • Atelier Policy Pack
          </div>

          <h1 className="font-cormorant" style={{
            fontSize: "clamp(34px, 5vw, 56px)",
            fontWeight: 400,
            lineHeight: 1.15,
            color: isLight ? "#201812" : "#f5ede0",
            marginBottom: "18px"
          }}>
            Legal Policies &amp; <span style={{ color: isLight ? "#9E6728" : "#c59c55", fontStyle: "italic" }}>Consumer Charter</span>
          </h1>

          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            lineHeight: 1.8,
            color: isLight ? "#635140" : "#a89880",
            maxWidth: "680px",
            margin: "0 auto 24px"
          }}>
            Our standards of transparency, lawful fair dealing, verified authenticity, insured nationwide logistics, and non-waivable Philippine consumer protections.
          </p>

          {/* Compliance badging */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginTop: "16px"
          }}>
            {[
              "Republic Act No. 11967 (ITA 2023)",
              "Consumer Act of the Philippines (RA 7394)",
              "Data Privacy Act of 2012 (RA 10173)",
              "Entrupy Verified Supporting Partner"
            ].map((badge) => (
              <span key={badge} style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "5px 12px",
                borderRadius: "2px",
                border: isLight ? "1px solid rgba(158,103,40,0.3)" : "1px solid rgba(197,156,85,0.3)",
                background: isLight ? "rgba(158,103,40,0.06)" : "rgba(197,156,85,0.08)",
                color: isLight ? "#9E6728" : "#c59c55"
              }}>
                ✦ {badge}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── TAB SELECTOR STRIP ── */}
      <nav aria-label="Policy tabs" style={{
        position: "sticky",
        top: "70px",
        zIndex: 40,
        backdropFilter: "blur(16px)",
        background: isLight ? "rgba(237,229,216,0.95)" : "rgba(5,4,3,0.92)",
        borderBottom: isLight ? "1px solid rgba(158,103,40,0.22)" : "1px solid rgba(197,156,85,0.12)",
        padding: "0 16px"
      }}>
        <div style={{
          maxWidth: "1160px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          overflowX: "auto",
          padding: "12px 0"
        }}>
          {tabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  fontWeight: isSelected ? 600 : 400,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "10px 20px",
                  border: isSelected
                    ? "1px solid #c59c55"
                    : isLight
                      ? "1px solid rgba(197,156,85,0.2)"
                      : "1px solid rgba(197,156,85,0.15)",
                  background: isSelected
                    ? (isLight ? "rgba(197,156,85,0.14)" : "rgba(197,156,85,0.18)")
                    : "transparent",
                  color: isSelected
                    ? "#c59c55"
                    : isLight ? "#5a4a30" : "#a89880",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  whiteSpace: "nowrap",
                  borderRadius: "2px"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* ── MAIN CONTENT CONTAINER ── */}
      <div style={{ maxWidth: "1200px", margin: "40px auto 0", padding: "0 24px" }}>
        {/* Search bar inside policy tab */}
        <div style={{
          marginBottom: "36px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: isLight ? "#ffffff" : "#0d0b08",
          border: isLight ? "1px solid rgba(197,156,85,0.25)" : "1px solid rgba(197,156,85,0.2)",
          padding: "12px 20px",
          borderRadius: "3px"
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c59c55" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder={`Search within ${currentTabInfo.label} (e.g. unboxing, refund, Entrupy, courier)...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              outline: "none",
              color: isLight ? "#1a1208" : "#f5ede0",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "12px"
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "none",
                border: "none",
                color: "#c59c55",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "'Montserrat', sans-serif",
                textTransform: "uppercase"
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Dynamic active policy view */}
        {activeTab === "terms" && (
          <TermsPolicyView
            searchQuery={searchQuery}
            isLight={isLight}
            onScrollTo={scrollToSection}
            activeSectionId={activeSectionId}
          />
        )}
        {activeTab === "shipping" && (
          <ShippingPolicyView
            searchQuery={searchQuery}
            isLight={isLight}
            onScrollTo={scrollToSection}
            activeSectionId={activeSectionId}
          />
        )}
        {activeTab === "returns" && (
          <ReturnsPolicyView
            searchQuery={searchQuery}
            isLight={isLight}
            onScrollTo={scrollToSection}
            activeSectionId={activeSectionId}
          />
        )}
        {activeTab === "authenticity" && (
          <AuthenticityPolicyView
            searchQuery={searchQuery}
            isLight={isLight}
            onScrollTo={scrollToSection}
            activeSectionId={activeSectionId}
          />
        )}

        {/* ── ASSISTANCE CALLOUT ── */}
        <section style={{
          marginTop: "70px",
          padding: "40px",
          background: isLight ? "rgba(197,156,85,0.06)" : "rgba(197,156,85,0.05)",
          border: "1px solid rgba(197,156,85,0.25)",
          textAlign: "center",
          borderRadius: "3px"
        }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#c59c55",
            marginBottom: "10px"
          }}>
            Client Concierge &amp; Redress
          </div>
          <h3 className="font-cormorant" style={{
            fontSize: "28px",
            color: isLight ? "#1a1208" : "#f5ede0",
            marginBottom: "14px"
          }}>
            Have inquiries regarding our legal policies or order terms?
          </h3>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            color: isLight ? "#6a5a40" : "#a89880",
            maxWidth: "640px",
            margin: "0 auto 24px",
            lineHeight: 1.7
          }}>
            Our client support team is committed to fair, prompt, and transparent resolutions. We acknowledge all formal requests within two (2) business days.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="mailto:hello@tiffanyandcris.com"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                background: "#c59c55",
                color: "#050403",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px"
              }}
            >
              Contact Legal &amp; Support
            </a>
            <a
              href="mailto:claims@tiffanyandcris.com"
              style={{
                display: "inline-block",
                padding: "12px 28px",
                border: "1px solid #c59c55",
                color: "#c59c55",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                textDecoration: "none",
                borderRadius: "2px"
              }}
            >
              File Authenticity Claim
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   1. TERMS & CONDITIONS VIEW
   ═══════════════════════════════════════════════════════════════════ */
function TermsPolicyView({ searchQuery, isLight, onScrollTo, activeSectionId }) {
  const sections = useMemo(() => [
    {
      id: "sec-seller-info",
      num: "1",
      title: "Seller Information",
      content: (
        <div>
          <p>The seller is <strong>Tiffany &amp; Cris Luxury Collection</strong> (“T&amp;C,” “we,” “us,” or “our”), with atelier and business address at <strong>Bonifacio Global City, Taguig, Metro Manila, Philippines</strong>, telephone number <strong>+63 917 123 4567</strong>, and customer-service email <strong>hello@tiffanyandcris.com</strong>.</p>
          <p style={{ marginTop: "10px" }}>Business registration and tax details: <em>DTI/SEC Registered Entity under Tiffany &amp; Cris Luxury Collection [Certificate &amp; Tax ID on file / available upon request]</em>.</p>
        </div>
      )
    },
    {
      id: "sec-eligibility",
      num: "2",
      title: "Eligibility and Customer Responsibility",
      content: (
        <div>
          <p>You must have legal capacity to enter into a contract. If you are below eighteen (18) years old, a parent or legal guardian must place the order.</p>
          <p style={{ marginTop: "10px" }}>You must provide complete, current, and accurate billing, contact, and delivery information and must promptly correct any error before parcel dispatch.</p>
        </div>
      )
    },
    {
      id: "sec-nature-of-products",
      num: "3",
      title: "Nature of Our Products",
      content: (
        <div>
          <p>We sell authentic new, unused, pre-owned, vintage, consigned, and/or sourced luxury goods, as identified in each listing. <strong>Unless expressly stated, T&amp;C is an independent reseller and is not affiliated with, authorized by, or endorsed by the luxury brands whose trademarks appear on the products. Brand names are used solely to identify and describe products.</strong></p>
          <p style={{ marginTop: "10px" }}>Pre-owned and vintage pieces may show natural age, odor, patina, scratches, tarnish, glazing wear, hardware wear, interior marks, storage effects, repairs, replaced components, or other signs of prior ownership. These are not defects when accurately disclosed or reasonably visible in the listing photographs, video, or live presentation. Color tone and scale may vary slightly across different viewing screens.</p>
        </div>
      )
    },
    {
      id: "sec-listings-inspection",
      num: "4",
      title: "Product Listings and Inspection Before Purchase",
      content: (
        <div>
          <p>Each listing forms part of the contract. Customers should thoroughly review the description, condition rating, measurements, inclusions, photographs, videos, disclosed repairs or alterations, and authentication information before purchase.</p>
          <p style={{ marginTop: "10px" }}>Clients are warmly encouraged to ask questions or request additional images before paying. If an obvious typographical, inventory, or pricing error occurs, we may cancel the order before shipment and promptly refund all amounts paid without penalty.</p>
        </div>
      )
    },
    {
      id: "sec-orders-formation",
      num: "5",
      title: "Orders and Contract Formation",
      content: (
        <div>
          <p>Adding an item to a cart, sending a message, or receiving an automated acknowledgement does not reserve the item. An order becomes binding only when we confirm acceptance and payment is successfully received or otherwise approved.</p>
          <p style={{ marginTop: "10px" }}>Because most luxury pieces are unique, one-of-a-kind inventory items, a piece may sell through another channel before confirmation. If this happens after payment is remitted, we will immediately issue a 100% full refund through the original or agreed payment method.</p>
        </div>
      )
    },
    {
      id: "sec-prices-payment",
      num: "6",
      title: "Prices, Taxes, and Payment",
      content: (
        <div>
          <p>Prices are denominated in Philippine pesos (PHP) unless stated otherwise. Applicable taxes will be reflected as required by Philippine regulations.</p>
          <p style={{ marginTop: "10px" }}>Shipping, insurance, authentication upgrades, duties, and payment-provider charges, if any, are clearly disclosed before order confirmation. We accept only the payment methods shown at checkout or in our written official invoice. We reserve the right to verify identity, payment authority, billing information, or high-risk transactions before parcel release.</p>
        </div>
      )
    },
    {
      id: "sec-reservations-layaway",
      num: "7",
      title: "Reservations, Deposits, and Layaway",
      content: (
        <div>
          <p>A reservation or layaway arrangement is available only when confirmed in writing. The confirmation must clearly state the deposit amount, installment dates, final payment date, cancellation consequences, and whether any amount is non-refundable.</p>
          <p style={{ marginTop: "10px" }}>Any forfeiture will apply only to the extent clearly disclosed, proportionate to legitimate administrative losses or holding costs, and permitted by law. Failure to pay by the agreed deadline may result in order cancellation after formal notice. These reservation terms do not limit your statutory remedies for counterfeit, materially misdescribed, defective, damaged, lost, or incorrect items.</p>
        </div>
      )
    },
    {
      id: "sec-cancellations",
      num: "8",
      title: "Order Cancellation",
      content: (
        <div>
          <p>Before dispatch, order cancellation may be approved subject to disclosed, reasonable, non-recoverable payment processing transaction costs, unless cancellation is due to our error or a statutory legal right, in which case no deduction applies.</p>
          <p style={{ marginTop: "10px" }}>Once an order is paid and in transit, cancellation is governed by applicable Philippine law, carrier status, and the Returns &amp; Refund Policy. We may cancel an order for suspected fraud, payment reversal, prohibited conduct, inventory discrepancy, or inability to complete lawful verification, and will promptly return amounts properly due.</p>
        </div>
      )
    },
    {
      id: "sec-authenticity-clause",
      num: "9",
      title: "Authenticity",
      content: (
        <div>
          <p>We guarantee that every branded luxury item sold by T&amp;C is authentic under the separate Authenticity Guarantee incorporated into these Terms.</p>
          <p style={{ marginTop: "10px" }}>Authentication certificates, including any Entrupy certificate, represent supporting professional evidence and do not constitute a manufacturer warranty or corporate brand affiliation. If an item is established as counterfeit under our claim process, the customer is entitled to the remedies stated in the Authenticity Guarantee and any greater non-waivable remedy under Philippine law.</p>
        </div>
      )
    },
    {
      id: "sec-shipping-clause",
      num: "10",
      title: "Shipping, Delivery, and Risk",
      content: (
        <div>
          <p>Shipping is governed by our separate Shipping Policy. We will deliver the item in the exact condition, type, quantity, quality, and with all inclusions described in the listing.</p>
          <p style={{ marginTop: "10px" }}>Risk of loss or damage remains allocated as required by applicable Philippine law and is not shifted to the customer merely because a third-party courier is utilized. The client must provide safe, accurate delivery details and reasonably cooperate with delivery confirmation and carrier claim investigations.</p>
        </div>
      )
    },
    {
      id: "sec-returns-clause",
      num: "11",
      title: "Returns and Refunds",
      content: (
        <div>
          <p>Returns are governed by the separate Returns &amp; Refund Policy. We generally do not accept returns solely for change of mind, buyer’s remorse, personal preference, fit, or condition characteristics that were clearly disclosed and accurately shown prior to purchase.</p>
          <p style={{ marginTop: "10px" }}>This policy does not exclude, limit, or waive your statutory rights for counterfeit goods, wrong items, transit loss or damage, undisclosed material nonconformity, or any other mandatory remedy provided under Philippine consumer protection laws.</p>
        </div>
      )
    },
    {
      id: "sec-promotions",
      num: "12",
      title: "Promotions, Gifts, and Discount Codes",
      content: (
        <div>
          <p>Promotion-specific terms and mechanics form part of these Terms. Eligibility criteria, promotion period, quantity caps, brand exclusions, and redemption conditions will be stated clearly.</p>
          <p style={{ marginTop: "10px" }}>Unless prohibited by law, discount codes cannot be converted to cash, duplicated, transferred, or applied retroactively to previously completed purchases. If promotion terms conflict with these Terms, the specific promotion mechanics control only for that promotion.</p>
        </div>
      )
    },
    {
      id: "sec-ip",
      num: "13",
      title: "Intellectual Property",
      content: (
        <div>
          <p>The website design, original studio photographs, video reels, creative copy, logos, branding graphics, and compilations are owned by or licensed to Tiffany &amp; Cris Luxury Collection and may not be copied, republished, scraped, modified, sold, or commercially used without prior written authorization.</p>
          <p style={{ marginTop: "10px" }}>All third-party luxury brand names, trademarks, logotypes, and emblems remain the exclusive property of their respective trademark holders.</p>
        </div>
      )
    },
    {
      id: "sec-reviews",
      num: "14",
      title: "Reviews and User Content",
      content: (
        <div>
          <p>If you submit a testimonial, review, photograph, video, or comment, you confirm it is truthful, lawful, and does not violate any third party’s intellectual property or privacy rights. You grant T&amp;C a non-exclusive, royalty-free, revocable-for-future-use license to display and adapt that content across our channels, subject to Philippine privacy laws.</p>
          <p style={{ marginTop: "10px" }}>We reserve the right to moderate spam, threats, unlawful content, or personal private data, but will not suppress a genuine negative review merely because it is unfavorable.</p>
        </div>
      )
    },
    {
      id: "sec-prohibited-conduct",
      num: "15",
      title: "Prohibited Conduct",
      content: (
        <div>
          <p>Clients and website visitors must not engage in any of the following activities:</p>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", lineHeight: "1.8" }}>
            <li>Using stolen payment credentials, false identities, fabricated documents, or abusive chargeback requests.</li>
            <li>Substituting, tampering with, altering, damaging, or removing identifying hardware, serial numbers, or date codes from an item submitted for return or authentication review.</li>
            <li>Reselling or misrepresenting T&amp;C certificates, documentation, or packaging in a deceptive or fraudulent manner.</li>
            <li>Interfering with website infrastructure, harvesting customer data, introducing malicious code, or violating applicable Philippine laws.</li>
          </ul>
        </div>
      )
    },
    {
      id: "sec-privacy",
      num: "16",
      title: "Privacy and Security",
      content: (
        <div>
          <p>Personal data is handled in strict accordance with Republic Act No. 10173 (Data Privacy Act of 2012) and National Privacy Commission directives. We collect only information reasonably necessary for processing orders, fulfilling deliveries, fraud prevention, legal compliance, and customer-requested services.</p>
          <p style={{ marginTop: "10px" }}>Marketing communications require explicit customer consent. Payment processing is handled through secure third-party payment gateways conforming to industry encryption standards.</p>
        </div>
      )
    },
    {
      id: "sec-liability",
      num: "17",
      title: "Limitation of Liability",
      content: (
        <div>
          <p>To the fullest extent permitted by Philippine law, T&amp;C is not liable for indirect, incidental, special, punitive, or consequential losses, lost resale profit, lost business opportunity, emotional distress, or fluctuations in secondary market valuation.</p>
          <p style={{ marginTop: "10px" }}>For any claim arising from a particular product, T&amp;C’s aggregate contractual liability will not exceed the amount actually paid for that product, except where a larger liability or mandatory remedy cannot lawfully be excluded under Philippine consumer law. <strong>Nothing in these Terms excludes liability for fraud, willful misconduct, gross negligence, counterfeit goods, or any non-waivable statutory right.</strong></p>
        </div>
      )
    },
    {
      id: "sec-indemnity",
      num: "18",
      title: "Indemnity",
      content: (
        <div>
          <p>To the extent permitted by law, you agree to reimburse T&amp;C for reasonable losses directly caused by your proven fraud, unlawful conduct, intentional item substitution, malicious tampering, or material breach of these Terms. This clause does not apply to a good-faith consumer complaint or lawful exercise of consumer rights.</p>
        </div>
      )
    },
    {
      id: "sec-dispute",
      num: "19",
      title: "Complaints and Dispute Resolution",
      content: (
        <div>
          <p>Send formal complaints to <strong>hello@tiffanyandcris.com</strong> with your order number, detailed concern, requested remedy, and supporting photo/video evidence.</p>
          <p style={{ marginTop: "10px" }}>We will acknowledge receipt within <strong>two (2) business days</strong> and aim to provide an initial resolution within <strong>seven (7) business days</strong>, subject to physical item inspection or third-party authentication. The parties agree to first utilize this accessible internal redress process in good faith. Unresolved matters may be referred to the Department of Trade and Industry (DTI) Fair Trade Enforcement Bureau or mediation agencies with jurisdiction.</p>
        </div>
      )
    },
    {
      id: "sec-governing-law",
      num: "20",
      title: "Governing Law",
      content: (
        <div>
          <p>These Terms are governed by and construed in accordance with the laws of the Republic of the Philippines. Any venue provision applies only to the extent permitted by Philippine consumer-protection and civil procedural law. If any clause is held invalid or unenforceable, it will be severed without affecting the validity of remaining provisions.</p>
        </div>
      )
    },
    {
      id: "sec-changes",
      num: "21",
      title: "Changes to These Terms",
      content: (
        <div>
          <p>We may update these Terms prospectively. The version accepted at the time an order is placed governs that transaction, unless a subsequent change is required by law or is more favorable to the consumer. Material revisions will be posted with an updated effective date.</p>
        </div>
      )
    },
    {
      id: "sec-entire-agreement",
      num: "22",
      title: "Entire Agreement and Contact",
      content: (
        <div>
          <p>These Terms, the item listing, written order confirmation, and incorporated policies constitute the entire agreement between you and Tiffany &amp; Cris regarding the transaction. No waiver of any term is effective unless executed in writing.</p>
          <div style={{ marginTop: "12px", padding: "14px 18px", background: isLight ? "#f5ede0" : "#14100b", borderLeft: "3px solid #c59c55" }}>
            <p style={{ margin: 0, fontSize: "12px" }}>
              <strong>Official Contact Details:</strong><br />
              Email: <a href="mailto:hello@tiffanyandcris.com" style={{ color: "#c59c55" }}>hello@tiffanyandcris.com</a> | Telephone: +63 917 123 4567<br />
              Atelier Address: Bonifacio Global City, Taguig, Metro Manila, Philippines
            </p>
          </div>
        </div>
      )
    }
  ], [isLight]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter((s) => s.title.toLowerCase().includes(q) || (typeof s.content === "string" ? s.content.toLowerCase().includes(q) : true));
  }, [sections, searchQuery]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }} className="policy-grid">
      {/* ── STICKY INDEX (Desktop) ── */}
      <aside style={{
        position: "sticky",
        top: "140px",
        maxHeight: "calc(100vh - 170px)",
        overflowY: "auto",
        padding: "20px",
        background: isLight ? "#ffffff" : "#0d0b08",
        border: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.15)",
        borderRadius: "3px"
      }} className="policy-sidebar">
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#c59c55",
          marginBottom: "14px",
          paddingBottom: "8px",
          borderBottom: "1px solid rgba(197,156,85,0.15)"
        }}>
          Table of Contents
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onScrollTo(s.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  color: activeSectionId === s.id ? "#c59c55" : isLight ? "#6a5a40" : "#a0907a",
                  fontWeight: activeSectionId === s.id ? 600 : 400,
                  transition: "color 0.2s"
                }}
              >
                {s.num}. {s.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── CLAUSES BODY ── */}
      <div style={{ minWidth: 0 }}>
        {/* Highlight Callout Card */}
        <div style={{
          padding: "24px 28px",
          marginBottom: "36px",
          background: isLight ? "rgba(197,156,85,0.08)" : "rgba(197,156,85,0.06)",
          borderLeft: "3px solid #c59c55",
          borderTop: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
          borderRight: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
          borderBottom: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
        }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c59c55",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            Key Legal Commitments
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            lineHeight: 1.7,
            color: isLight ? "#3a2e1e" : "#d8cbb8",
            margin: 0
          }}>
            Tiffany &amp; Cris operates under strict compliance with Philippine consumer law. While accurate condition disclosures mean sales are final for change-of-mind, this never overrides your non-waivable statutory rights for counterfeit goods, transit damages, or material nonconformity.
          </p>
        </div>

        {/* Section List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {filteredSections.map((sec) => (
            <article
              id={sec.id}
              key={sec.id}
              style={{
                padding: "28px",
                background: isLight ? "#ffffff" : "#0d0b08",
                border: isLight ? "1px solid rgba(197,156,85,0.18)" : "1px solid rgba(197,156,85,0.12)",
                borderRadius: "2px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#c59c55",
                  letterSpacing: "0.1em"
                }}>
                  Section {sec.num}
                </span>
                <h2 className="font-cormorant" style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: isLight ? "#1a1208" : "#f5ede0",
                  margin: 0
                }}>
                  {sec.title}
                </h2>
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "13px",
                lineHeight: 1.8,
                color: isLight ? "#5a4a35" : "#b0a088"
              }}>
                {sec.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   2. SHIPPING POLICY VIEW
   ═══════════════════════════════════════════════════════════════════ */
function ShippingPolicyView({ searchQuery, isLight, onScrollTo, activeSectionId }) {
  const sections = useMemo(() => [
    {
      id: "ship-methods",
      num: "1",
      title: "Service Area and Methods",
      content: (
        <div>
          <p>We ship nationwide throughout the Philippines via <strong>LBC Express</strong> and authorized high-security couriers. For clients within Metro Manila, same-day white-glove dispatch is available via <strong>Lalamove</strong> or scheduled private courier.</p>
          <p style={{ marginTop: "10px" }}>International shipping requires separate prior written confirmation and quote. Applicable methods, charges, declared value insurance, and estimated transit times are displayed at checkout or detailed on the official invoice.</p>
        </div>
      )
    },
    {
      id: "ship-processing",
      num: "2",
      title: "Processing and Dispatch Time",
      content: (
        <div>
          <p>Orders are prepared for dispatch following confirmed payment clearance and completion of any identity or fraud review. Typical atelier dispatch occurs within <strong>one to three (1–3) business days</strong>.</p>
          <p style={{ marginTop: "10px" }}>Saturdays, Sundays, Philippine public holidays, requested Entrupy authentication upgrades, severe typhoons, and high-value security protocol checks may affect dispatch schedules. Delivery dates are estimates unless explicitly guaranteed in writing.</p>
        </div>
      )
    },
    {
      id: "ship-address",
      num: "3",
      title: "Address and Authorized Recipient",
      content: (
        <div>
          <p>The client must provide a complete, verified delivery address, landmark, active mobile number, and authorized recipient name. Address modifications after parcel handover may not be feasible.</p>
          <p style={{ marginTop: "10px" }}>For high-value luxury parcels, we or the courier may require government ID presentation, signature, or OTP confirmation prior to release. Redelivery resulting from incorrect recipient details, refusal, or repeated customer unavailability may incur courier redelivery fees.</p>
        </div>
      )
    },
    {
      id: "ship-packaging",
      num: "4",
      title: "Packaging and Photographic Documentation",
      content: (
        <div>
          <p>Each luxury item is inspected, serial-verified, carefully cushioned, and packaged securely. Identifying hardware numbers, micro-features, inclusions, and package handover are systematically photographed and archived before dispatch.</p>
          <p style={{ marginTop: "10px" }}>Outer shipping cartons are discreetly sealed for high-value security. Designer boxes, dust bags, authenticity cards, and ribbons are included only when explicitly specified in the product listing.</p>
        </div>
      )
    },
    {
      id: "ship-charges",
      num: "5",
      title: "Shipping Charges and Transit Insurance",
      content: (
        <div>
          <p>All shipping charges and insurance options are disclosed before purchase confirmation. When declared value transit insurance is provided, its coverage details are stated clearly.</p>
          <p style={{ marginTop: "10px" }}>The choice or lack of optional supplemental insurance does not remove the legal responsibility that Philippine law places on T&amp;C for loss, damage, or nonconformity occurring before proper delivery to the customer.</p>
        </div>
      )
    },
    {
      id: "ship-tracking",
      num: "6",
      title: "Tracking and Delivery Verification",
      content: (
        <div>
          <p>Official courier tracking numbers and links are transmitted promptly upon parcel handover. A courier scan status of “Delivered” serves as prima facie evidence of receipt, but is not conclusive where the client promptly raises a credible non-delivery dispute.</p>
          <p style={{ marginTop: "10px" }}>In such cases, we coordinate directly with courier management to review GPS coordinates, recipient signature logs, and building security records.</p>
        </div>
      )
    },
    {
      id: "ship-unboxing",
      num: "7",
      title: "Inspection Upon Receipt & Recommended Unboxing Video",
      content: (
        <div>
          <p>Please inspect your parcel upon arrival. <strong>We strongly advise clients to record a continuous, unedited unboxing video</strong> beginning with the unopened exterior carton showing the shipping label, turning all sides, opening the seal, and displaying the handbag, date code, hardware, and accessories.</p>
          <p style={{ marginTop: "10px" }}>While an unboxing video greatly accelerates claim investigations with couriers and insurers, <em>a legally valid consumer claim will not be rejected solely because an unboxing video is unavailable</em>, provided credible objective evidence is presented.</p>
        </div>
      )
    },
    {
      id: "ship-damages",
      num: "8",
      title: "Loss, Visible Damage, Wrong Item, or Missing Inclusions",
      content: (
        <div>
          <p>Notify our atelier team as soon as reasonably possible—<strong>preferably within forty-eight (48) hours of delivery</strong>—at <strong>hello@tiffanyandcris.com</strong>.</p>
          <p style={{ marginTop: "10px" }}>Please provide your order number, clear photographs of the carton, courier label, luxury piece, and all inclusions. Preserve all original packaging materials and do not use, wear, clean, or repair the item while the claim is under assessment.</p>
        </div>
      )
    },
    {
      id: "ship-failed-delivery",
      num: "9",
      title: "Failed Delivery and Return to Sender",
      content: (
        <div>
          <p>If a parcel is returned to our atelier due to inaccurate customer information, consignee refusal, or repeated delivery failure, we will contact you immediately to arrange reshipment. Reasonable redelivery fees may apply where permitted. If the return occurred due to our atelier’s or the courier’s error, the customer will not bear any additional costs.</p>
        </div>
      )
    },
    {
      id: "ship-risk",
      num: "10",
      title: "Transfer of Risk",
      content: (
        <div>
          <p>Risk of loss or damage passes to the client upon proper physical delivery to the designated delivery address or authorized recipient. Where the client independently designates a custom courier not arranged by T&amp;C, risk allocation will be evaluated under the parties’ written agreement and applicable Philippine civil law.</p>
        </div>
      )
    }
  ], [isLight]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter((s) => s.title.toLowerCase().includes(q) || (typeof s.content === "string" ? s.content.toLowerCase().includes(q) : true));
  }, [sections, searchQuery]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }} className="policy-grid">
      <aside style={{
        position: "sticky",
        top: "140px",
        maxHeight: "calc(100vh - 170px)",
        overflowY: "auto",
        padding: "20px",
        background: isLight ? "#ffffff" : "#0d0b08",
        border: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.15)",
        borderRadius: "3px"
      }} className="policy-sidebar">
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#c59c55",
          marginBottom: "14px",
          paddingBottom: "8px",
          borderBottom: "1px solid rgba(197,156,85,0.15)"
        }}>
          Shipping Index
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onScrollTo(s.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  color: activeSectionId === s.id ? "#c59c55" : isLight ? "#6a5a40" : "#a0907a",
                  fontWeight: activeSectionId === s.id ? 600 : 400
                }}
              >
                {s.num}. {s.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div style={{ minWidth: 0 }}>
        {/* Highlight Callout */}
        <div style={{
          padding: "24px 28px",
          marginBottom: "36px",
          background: isLight ? "rgba(197,156,85,0.08)" : "rgba(197,156,85,0.06)",
          borderLeft: "3px solid #c59c55",
          borderTop: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
          borderRight: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
          borderBottom: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
        }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c59c55",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            Secure Luxury Courier Network
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            lineHeight: 1.7,
            color: isLight ? "#3a2e1e" : "#d8cbb8",
            margin: 0
          }}>
            Every parcel is packed with triple-layer security seals, photographed prior to courier handover, and tracked end-to-end. We partner with LBC Express nationwide and offer discreet same-day delivery throughout Metro Manila.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {filteredSections.map((sec) => (
            <article
              id={sec.id}
              key={sec.id}
              style={{
                padding: "28px",
                background: isLight ? "#ffffff" : "#0d0b08",
                border: isLight ? "1px solid rgba(197,156,85,0.18)" : "1px solid rgba(197,156,85,0.12)",
                borderRadius: "2px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#c59c55",
                  letterSpacing: "0.1em"
                }}>
                  Section {sec.num}
                </span>
                <h2 className="font-cormorant" style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: isLight ? "#1a1208" : "#f5ede0",
                  margin: 0
                }}>
                  {sec.title}
                </h2>
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "13px",
                lineHeight: 1.8,
                color: isLight ? "#5a4a35" : "#b0a088"
              }}>
                {sec.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   3. RETURNS & REFUND POLICY VIEW
   ═══════════════════════════════════════════════════════════════════ */
function ReturnsPolicyView({ searchQuery, isLight, onScrollTo, activeSectionId }) {
  const sections = useMemo(() => [
    {
      id: "ret-general-rule",
      num: "1",
      title: "General Rule for Curated Luxury Pieces",
      content: (
        <div>
          <p>Because each luxury piece is unique and many items are pre-owned or vintage, <strong>all sales are final for change of mind, buyer’s remorse, personal preference, sizing/fit, minor color discrepancies caused by screen calibration, or wear accurately disclosed prior to purchase</strong>.</p>
          <p style={{ marginTop: "10px" }}>Crucially, “all sales are final” does <strong>never</strong> apply to a counterfeit item, wrong item, material undisclosed nonconformity, transit loss or damage without customer fault, or failure to conform to express written warranties.</p>
        </div>
      )
    },
    {
      id: "ret-eligible-claims",
      num: "2",
      title: "Eligible Claims for Redress",
      content: (
        <div>
          <p>A return, replacement, or refund is fully honored under the following circumstances:</p>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", lineHeight: "1.8" }}>
            <li>The received item is not the model or specification ordered.</li>
            <li>The item materially differs from its listing description, condition disclosure, photos, or agreed specifications.</li>
            <li>A disclosed inclusion (e.g. strap, lock, key, dust bag) is missing due to atelier error.</li>
            <li>The item arrives damaged in transit without customer fault.</li>
            <li>The item is proven counterfeit under our Authenticity Guarantee.</li>
            <li>Another remedy, replacement, or refund is required by Philippine consumer law.</li>
          </ul>
        </div>
      )
    },
    {
      id: "ret-notify",
      num: "3",
      title: "How to Notify the Atelier",
      content: (
        <div>
          <p>Contact <strong>hello@tiffanyandcris.com</strong> promptly upon identifying the issue. For delivery condition concerns, notice within <strong>forty-eight (48) hours</strong> is requested; for hidden defects, notify us promptly upon discovery. Authenticity claims follow the separate Authenticity Guarantee and are not limited to 48 hours.</p>
          <p style={{ marginTop: "10px" }}>State your order number, clear explanation of the defect, discovery date, requested remedy, and provide supporting high-resolution photos or video.</p>
        </div>
      )
    },
    {
      id: "ret-rma",
      num: "4",
      title: "Return Authorization (RMA) Requirement",
      content: (
        <div>
          <p>Please do not ship an item back without formal written Return Authorization instructions from our team. We will furnish the designated secure return address, packing instructions, and insurance guidelines.</p>
          <p style={{ marginTop: "10px" }}>For verified eligible claims attributable to T&amp;C, we will arrange or reimburse reasonable tracked and insured return shipping costs as required by law.</p>
        </div>
      )
    },
    {
      id: "ret-condition",
      num: "5",
      title: "Condition of Returned Item",
      content: (
        <div>
          <p>The client must return the exact same item, together with all original inclusions, Entrupy certificates, tags, dust bags, accessories, and packaging reasonably available. Clients must not wear, use beyond reasonable inspection, clean, polish, repair, alter, resize, or allow third-party tampering.</p>
          <p style={{ marginTop: "10px" }}>A client is responsible for any proven reduction in value caused by handling beyond what was reasonably necessary to inspect the piece.</p>
        </div>
      )
    },
    {
      id: "ret-anti-substitution",
      num: "6",
      title: "Inspection and Anti-Substitution Controls",
      content: (
        <div>
          <p>Upon receipt, our atelier compares serial or date codes, hardware stamps, microscopic stitching, leather grain, and pre-dispatch security records. Return unboxing is video-recorded under controlled conditions.</p>
          <p style={{ marginTop: "10px" }}>If a returned piece is not the same item or has been intentionally substituted or altered, the claim will be denied and evidence preserved for lawful reporting. A good-faith difference of expert opinion is not treated as fraud.</p>
        </div>
      )
    },
    {
      id: "ret-remedies",
      num: "7",
      title: "Available Remedies",
      content: (
        <div>
          <p>Depending on the nature of the claim and statutory rights, the remedy may be repair, replacement, price reduction, or a full refund. For rare, unique pre-owned pieces, replacement may not be possible, in which case a refund is granted.</p>
          <p style={{ marginTop: "10px" }}><strong>We will never force a client to accept store credit where the customer is legally entitled to a monetary refund under Philippine law.</strong></p>
        </div>
      )
    },
    {
      id: "ret-timing",
      num: "8",
      title: "Refund Timing and Payment Method",
      content: (
        <div>
          <p>Once eligibility and return of the verified item are confirmed, approved refunds will be initiated within <strong>seven (7) business days</strong>.</p>
          <p style={{ marginTop: "10px" }}>Refunds are issued through the original payment method or another mutually agreed traceable bank transfer. No deductions apply for our error, counterfeit goods, or reasonable inspection.</p>
        </div>
      )
    },
    {
      id: "ret-abusive",
      num: "9",
      title: "Refused, Abusive, or Fraudulent Claims",
      content: (
        <div>
          <p>We may refuse a voluntary return supported by materially false statements, fabricated reports, intentional damage, item substitution, or refusal to surrender the item after a refund. Statutory consumer rights remain protected at all times.</p>
        </div>
      )
    },
    {
      id: "ret-chargebacks",
      num: "10",
      title: "Chargebacks and Internal Redress",
      content: (
        <div>
          <p>Before filing a payment dispute or chargeback with your card issuer, we request clients utilize our internal redress process. A chargeback does not entitle a customer to retain both the handbag and the purchase funds.</p>
        </div>
      )
    }
  ], [isLight]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter((s) => s.title.toLowerCase().includes(q) || (typeof s.content === "string" ? s.content.toLowerCase().includes(q) : true));
  }, [sections, searchQuery]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }} className="policy-grid">
      <aside style={{
        position: "sticky",
        top: "140px",
        maxHeight: "calc(100vh - 170px)",
        overflowY: "auto",
        padding: "20px",
        background: isLight ? "#ffffff" : "#0d0b08",
        border: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.15)",
        borderRadius: "3px"
      }} className="policy-sidebar">
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#c59c55",
          marginBottom: "14px",
          paddingBottom: "8px",
          borderBottom: "1px solid rgba(197,156,85,0.15)"
        }}>
          Returns Index
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onScrollTo(s.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  color: activeSectionId === s.id ? "#c59c55" : isLight ? "#6a5a40" : "#a0907a",
                  fontWeight: activeSectionId === s.id ? 600 : 400
                }}
              >
                {s.num}. {s.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div style={{ minWidth: 0 }}>
        {/* Highlight Callout */}
        <div style={{
          padding: "24px 28px",
          marginBottom: "36px",
          background: isLight ? "rgba(197,156,85,0.08)" : "rgba(197,156,85,0.06)",
          borderLeft: "3px solid #c59c55",
          borderTop: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
          borderRight: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
          borderBottom: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.12)",
        }}>
          <div style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "10px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#c59c55",
            fontWeight: 600,
            marginBottom: "8px"
          }}>
            Fair Remedies &amp; Zero Forced Store Credits
          </div>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "13px",
            lineHeight: 1.7,
            color: isLight ? "#3a2e1e" : "#d8cbb8",
            margin: 0
          }}>
            When a valid claim is confirmed (material nonconformity, transit damage, or authenticity defect), we process a full monetary refund within seven business days via the original payment channel. We do not enforce store credits when monetary remedies are legally due.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {filteredSections.map((sec) => (
            <article
              id={sec.id}
              key={sec.id}
              style={{
                padding: "28px",
                background: isLight ? "#ffffff" : "#0d0b08",
                border: isLight ? "1px solid rgba(197,156,85,0.18)" : "1px solid rgba(197,156,85,0.12)",
                borderRadius: "2px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#c59c55",
                  letterSpacing: "0.1em"
                }}>
                  Section {sec.num}
                </span>
                <h2 className="font-cormorant" style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: isLight ? "#1a1208" : "#f5ede0",
                  margin: 0
                }}>
                  {sec.title}
                </h2>
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "13px",
                lineHeight: 1.8,
                color: isLight ? "#5a4a35" : "#b0a088"
              }}>
                {sec.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   4. AUTHENTICITY GUARANTEE VIEW
   ═══════════════════════════════════════════════════════════════════ */
function AuthenticityPolicyView({ searchQuery, isLight, onScrollTo, activeSectionId }) {
  const sections = useMemo(() => [
    {
      id: "auth-scope",
      num: "1",
      title: "Scope of the Guarantee",
      content: (
        <div>
          <p>The guarantee applies to the specific branded luxury item identified on the official Tiffany &amp; Cris invoice or verified order record and purchased directly from T&amp;C. It covers an objective determination that the item itself is counterfeit.</p>
          <p style={{ marginTop: "10px" }}>The guarantee continues <strong>for as long as the original buyer owns the item</strong>, provided the piece can still be reliably identified and has not been materially altered or dismantled.</p>
        </div>
      )
    },
    {
      id: "auth-limitations",
      num: "2",
      title: "What the Guarantee Does Not Mean",
      content: (
        <div>
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            <li>It is not a manufacturer warranty and does not imply direct brand affiliation or sponsorship.</li>
            <li>It does not guarantee future secondary resale value, liquidity, durability, or acceptance by any random platform or pawnshop.</li>
            <li>A luxury brand boutique's refusal to authenticate or service pre-owned pieces is standard brand policy and does not constitute evidence of counterfeit status.</li>
            <li>Differences in vintage production batches, artisan variances, replaced non-brand zip pulls, or disclosed repairs are not counterfeit findings (though addressed under the Returns policy if misdescribed).</li>
          </ul>
        </div>
      )
    },
    {
      id: "auth-who",
      num: "3",
      title: "Who May Claim",
      content: (
        <div>
          <p>The original named buyer may claim. A lawful transferee, heir, or recipient may be considered if they provide the original order record, proof of legitimate transfer, identity, and a reliable chain of custody.</p>
          <p style={{ marginTop: "10px" }}>Refunds are paid only once, directly to the original payer or lawful successor through a traceable bank method.</p>
        </div>
      )
    },
    {
      id: "auth-starting",
      num: "4",
      title: "Starting an Authenticity Claim",
      content: (
        <div>
          <p>Email our specialized claims division at <strong>claims@tiffanyandcris.com</strong> (or hello@tiffanyandcris.com) with:</p>
          <ul style={{ paddingLeft: "20px", marginTop: "8px", lineHeight: "1.8" }}>
            <li>Buyer name and contact telephone number.</li>
            <li>Order or invoice number.</li>
            <li>Complete high-resolution photographs of the item, serial/date codes, hardware, stitching, interior, exterior, and inclusions.</li>
            <li>The specific reason for concern and any written authentication reports.</li>
            <li>The item’s custody and repair history since purchase.</li>
          </ul>
          <p style={{ marginTop: "10px" }}>We will acknowledge receipt within <strong>two (2) business days</strong> with next steps.</p>
        </div>
      )
    },
    {
      id: "auth-evidence",
      num: "5",
      title: "Credible Authentication Evidence",
      content: (
        <div>
          <p>Claims should be supported by a signed or digitally verifiable written report from a qualified, independent luxury authentication provider (such as <strong>Entrupy</strong>, Bababebi, Real Authentication, or equivalent recognized category specialist).</p>
          <p style={{ marginTop: "10px" }}>The report should specify the exact item, micro-features reviewed, and verifiable authenticator credentials. An anonymous forum comment or verbal opinion is not conclusive, but will be evaluated in good faith.</p>
        </div>
      )
    },
    {
      id: "auth-tiebreaker",
      num: "6",
      title: "T&C Review and Independent Tie-Breaker",
      content: (
        <div>
          <p>We may inspect the piece and submit it to our own master authenticator or Entrupy laboratory. If qualified experts reach conflicting conclusions, the parties will mutually select an independent specialist for a fresh review.</p>
          <p style={{ marginTop: "10px" }}>T&amp;C will advance the reasonable tie-breaker fee. A genuine client with an unsuccessful claim will never be penalized.</p>
        </div>
      )
    },
    {
      id: "auth-return-chain",
      num: "7",
      title: "Return and Chain of Custody",
      content: (
        <div>
          <p>The claimed item must be returned for controlled atelier inspection. We provide insured return instructions and cover reasonable return courier charges for credible claims.</p>
          <p style={{ marginTop: "10px" }}>The client must not use, clean, repair, alter, or treat the handbag after opening a claim.</p>
        </div>
      )
    },
    {
      id: "auth-anti-sub",
      num: "8",
      title: "Identity Verification and Prohibited Substitution",
      content: (
        <div>
          <p>Returned items are compared against high-resolution pre-dispatch records, archival serial codes, and non-public microscopic features. The guarantee is void as to any substituted piece or altered identifier.</p>
        </div>
      )
    },
    {
      id: "auth-remedy",
      num: "9",
      title: "Remedy When Counterfeit is Confirmed",
      content: (
        <div>
          <p>Once counterfeit status is confirmed and the item returned, <strong>T&amp;C will refund 100% of the amount actually paid to T&amp;C for the item, plus reasonable return shipping charges and any other remedy mandated by Philippine law</strong>.</p>
          <p style={{ marginTop: "10px" }}>The counterfeit item must be surrendered to T&amp;C so it can be permanently removed from commerce, preserved as evidence, or lawfully disposed of.</p>
        </div>
      )
    },
    {
      id: "auth-no-double",
      num: "10",
      title: "No Double Recovery",
      content: (
        <div>
          <p>A client may not retain both the luxury item and a full refund, or recover the same loss simultaneously from T&amp;C, a payment gateway, and an insurance carrier.</p>
        </div>
      )
    },
    {
      id: "auth-timing",
      num: "11",
      title: "Claim Timing & Statutory Rights",
      content: (
        <div>
          <p>There is no arbitrary short deadline imposed by T&amp;C for an authenticity claim by the original purchaser while the item remains reliably identifiable. Prompt notice is encouraged to ensure evidence preservation.</p>
        </div>
      )
    },
    {
      id: "auth-decision",
      num: "12",
      title: "Decision Timeline and Escalation",
      content: (
        <div>
          <p>We aim to issue a formal written decision within <strong>fifteen (15) business days</strong> following physical receipt of the item and complete evidence. If unresolved, clients may escalate through the dispute resolution procedure in our Terms &amp; Conditions or Philippine DTI mediation.</p>
        </div>
      )
    }
  ], [isLight]);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return sections;
    const q = searchQuery.toLowerCase();
    return sections.filter((s) => s.title.toLowerCase().includes(q) || (typeof s.content === "string" ? s.content.toLowerCase().includes(q) : true));
  }, [sections, searchQuery]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: "40px", alignItems: "start" }} className="policy-grid">
      <aside style={{
        position: "sticky",
        top: "140px",
        maxHeight: "calc(100vh - 170px)",
        overflowY: "auto",
        padding: "20px",
        background: isLight ? "#ffffff" : "#0d0b08",
        border: isLight ? "1px solid rgba(197,156,85,0.2)" : "1px solid rgba(197,156,85,0.15)",
        borderRadius: "3px"
      }} className="policy-sidebar">
        <div style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "10px",
          fontWeight: 600,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#c59c55",
          marginBottom: "14px",
          paddingBottom: "8px",
          borderBottom: "1px solid rgba(197,156,85,0.15)"
        }}>
          Authenticity Index
        </div>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "6px" }}>
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => onScrollTo(s.id)}
                style={{
                  background: "none",
                  border: "none",
                  padding: "4px 0",
                  textAlign: "left",
                  width: "100%",
                  cursor: "pointer",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "11px",
                  lineHeight: "1.4",
                  color: activeSectionId === s.id ? "#c59c55" : isLight ? "#6a5a40" : "#a0907a",
                  fontWeight: activeSectionId === s.id ? 600 : 400
                }}
              >
                {s.num}. {s.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <div style={{ minWidth: 0 }}>
        {/* ── OUR PROMISE HERO CARD ── */}
        <div style={{
          padding: "32px",
          marginBottom: "36px",
          background: isLight
            ? "linear-gradient(135deg, rgba(197,156,85,0.15) 0%, rgba(255,255,255,0.9) 100%)"
            : "linear-gradient(135deg, rgba(197,156,85,0.18) 0%, rgba(13,11,8,0.9) 100%)",
          border: "1px solid rgba(197,156,85,0.4)",
          borderRadius: "3px",
          boxShadow: isLight ? "0 4px 20px rgba(197,156,85,0.1)" : "0 4px 25px rgba(0,0,0,0.5)"
        }}>
          <div style={{
            display: "inline-block",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#c59c55",
            fontWeight: 700,
            marginBottom: "12px",
            fontFamily: "'Montserrat', sans-serif"
          }}>
            ✦ Lifetime Guarantee Promise
          </div>
          <h2 className="font-cormorant" style={{
            fontSize: "32px",
            fontWeight: 400,
            color: isLight ? "#1a1208" : "#f5ede0",
            marginBottom: "16px",
            lineHeight: 1.2
          }}>
            100% Authentic or Your Money Back
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "14px",
            lineHeight: 1.8,
            color: isLight ? "#4a3b25" : "#d0c0a8",
            margin: 0
          }}>
            <strong>OUR PROMISE:</strong> Every branded luxury piece sold by Tiffany &amp; Cris Luxury Collection is guaranteed authentic. If an item is established as counterfeit through our fair claim process, we will refund 100% of the purchase price and cover reasonable return shipping, without limiting any greater remedy required under Philippine law.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {filteredSections.map((sec) => (
            <article
              id={sec.id}
              key={sec.id}
              style={{
                padding: "28px",
                background: isLight ? "#ffffff" : "#0d0b08",
                border: isLight ? "1px solid rgba(197,156,85,0.18)" : "1px solid rgba(197,156,85,0.12)",
                borderRadius: "2px"
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "14px" }}>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#c59c55",
                  letterSpacing: "0.1em"
                }}>
                  Section {sec.num}
                </span>
                <h2 className="font-cormorant" style={{
                  fontSize: "24px",
                  fontWeight: 500,
                  color: isLight ? "#1a1208" : "#f5ede0",
                  margin: 0
                }}>
                  {sec.title}
                </h2>
              </div>
              <div style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "13px",
                lineHeight: 1.8,
                color: isLight ? "#5a4a35" : "#b0a088"
              }}>
                {sec.content}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
