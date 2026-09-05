import lvTwist from "../assets/twist.avif";
import lvLoop from "../assets/loop.avif";
import lvSpeedy from "../assets/speedy.avif";
import lvOnthego from "../assets/onthego.avif";

export const bags = [
  {
    id: 1, name: "Twist", cat: "Handbag", price: 3200,
    badge: "New Arrival", badgeType: "gold",
    desc: "This glamourous Twist MM handbag is made from deep-dyed Epi grained leather and adorned with a detachable chunky gold-color chain, braided with leather.",
    tagline: "Power distilled into perfect structure.",
    img: lvTwist,
    colors: ["#1a1208", "#2a1e14", "#c59c55"],
    specs: { Material: "Full-grain calfskin", Lining: "Silk jacquard", Hardware: "18k gold-plated", Size: "28 Ã— 20 Ã— 10 cm", Origin: "Florence, Italy" }
  },
  {
    id: 2, name: "Loop Monogram", cat: "Shoulder Bag", price: 2450,
    badge: null, badgeType: null,
    desc: "Created by Nicolas GhesquiÃ¨re for the Cruise 2022 Collection, the Loop handbag features a half-moon silhouette, inspired by the Croissant bag from the House archives.",
    tagline: "Effortless. Enduring. Unmistakably yours.",
    img: lvLoop,
    colors: ["#3a2a14", "#1a1208"],
    specs: { Material: "Pebbled lambskin", Lining: "Suede", Hardware: "Antique brass", Size: "32 Ã— 24 Ã— 10 cm", Origin: "France" }
  },
  {
    id: 3, name: "Speedy Soft 30", cat: "Tote Bag", price: 2890,
    badge: "Bestseller", badgeType: "dark",
    desc: "The Speedy Soft 30 is reimagined for the anniversary collection of the Louis Vuitton Monogram, marking 130 years of the iconic House signature. ",
    tagline: "The bag that defined an era. Reimagined.",
    img: lvSpeedy,
    colors: ["#2a1408", "#1a1a14", "#c59c55"],
    specs: { Material: "Supple calfskin", Lining: "Cotton canvas", Hardware: "Palladium", Size: "30 Ã— 21 Ã— 17 cm", Origin: "Italy" }
  },
  {
    id: 4, name: "OnTheGo PM", cat: "Handbag", price: 3600,
    badge: null, badgeType: null,
    desc: "Inspired by Louis Vuitton's famous Sac Plat from 1968, the OnTheGo PM tote is fashioned in Monogram Empreinte leather, embossed with a Medium Bicolor Monogram pattern. This smaller version of the original OnTheGo fits essentials such as a mini tablet. ",
    tagline: "Architecture you can carry.",
    img: lvOnthego,
    colors: ["#0a0a0a", "#1a1208"],
    specs: { Material: "Box calfskin", Lining: "Silk satin", Hardware: "Black chrome", Size: "25 Ã— 19 Ã— 11.5 cm", Origin: "Italy" }
  },
];

export const TABS = ["All", "Handbag", "Shoulder Bag", "Tote Bag", "Crossbody"];

export const bagSvgs = {
  4: <svg viewBox="0 0 180 200" fill="none" style={{width:"60%",height:"60%"}}><path d="M52 56 C52 32 128 32 128 56" stroke="#c59c55" strokeWidth="5" fill="none" strokeLinecap="round"/><rect x="16" y="56" width="148" height="128" rx="10" fill="#1a1a1a" stroke="#c59c55" strokeWidth="0.8"/><rect x="16" y="56" width="148" height="30" rx="6" fill="rgba(0,0,0,0.2)"/><rect x="74" y="100" width="32" height="22" rx="3" fill="none" stroke="#c59c55" strokeWidth="1"/><path d="M82 100 C82 90 98 90 98 100" stroke="#c59c55" strokeWidth="1" fill="none"/></svg>,
  5: <svg viewBox="0 0 180 200" fill="none" style={{width:"60%",height:"60%"}}><rect x="20" y="58" width="140" height="118" rx="12" fill="#1a2010" stroke="#c59c55" strokeWidth="0.8"/><path d="M48 58 Q90 44 132 58" stroke="#c59c55" strokeWidth="1.2" fill="none" strokeDasharray="4 3"/><circle cx="90" cy="96" r="8" fill="none" stroke="#c59c55" strokeWidth="1"/><line x1="90" y1="88" x2="90" y2="58" stroke="#c59c55" strokeWidth="1" strokeDasharray="3 2"/><path d="M12 110 Q20 104 28 110 Q36 116 44 110" stroke="#c59c55" strokeWidth="1.6" fill="none"/></svg>,
  6: <svg viewBox="0 0 180 200" fill="none" style={{width:"60%",height:"60%"}}><rect x="10" y="60" width="160" height="124" rx="8" fill="#2a1e08" stroke="#c59c55" strokeWidth="0.8"/><path d="M40 60 L30 36 Q90 26 150 36 L140 60" stroke="#c59c55" strokeWidth="1.4" fill="none"/><line x1="10" y1="90" x2="170" y2="90" stroke="#c59c55" strokeWidth="0.5" opacity="0.4"/><rect x="72" y="110" width="36" height="22" rx="4" fill="none" stroke="#c59c55" strokeWidth="0.9"/><line x1="90" y1="110" x2="90" y2="102" stroke="#c59c55" strokeWidth="1"/><circle cx="90" cy="100" r="3" fill="none" stroke="#c59c55" strokeWidth="0.9"/></svg>,
};

export const infoCards = [
  {
    title: "Private Atelier",
    text: "Visit our invite-only atelier in Manila for a bespoke consultation. By appointment only â€” reach out to reserve your exclusive session.",
    link: "Book an Appointment",
    icon: (
      <svg viewBox="0 0 38 38" fill="none" className="ct-info-icon">
        <circle cx="19" cy="19" r="17" stroke="#c59c55" strokeWidth="1"/>
        <rect x="11" y="13" width="16" height="13" rx="2" stroke="#c59c55" strokeWidth="1" fill="none"/>
        <line x1="15" y1="11" x2="15" y2="15" stroke="#c59c55" strokeWidth="1"/>
        <line x1="23" y1="11" x2="23" y2="15" stroke="#c59c55" strokeWidth="1"/>
      </svg>
    )
  },
  {
    title: "General Enquiries",
    text: "For product questions, shipping, authenticity certificates, or press enquiries, our atelier team responds within 24 hours.",
    link: "hello@tiffanyandcris.com",
    icon: (
      <svg viewBox="0 0 38 38" fill="none" className="ct-info-icon">
        <circle cx="19" cy="19" r="17" stroke="#c59c55" strokeWidth="1"/>
        <rect x="9" y="13" width="20" height="14" rx="2" stroke="#c59c55" strokeWidth="1" fill="none"/>
        <path d="M9 15 L19 21 L29 15" stroke="#c59c55" strokeWidth="1" fill="none"/>
      </svg>
    )
  },
];

export const locations = [
  { city: "Manila", addr: "Bonifacio Global City\nTaguig, Metro Manila" },
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   COMPONENTS
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

export function BagSilhouette() {
  return (
    <svg className="bag-silhouette" viewBox="0 0 300 340" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 90 C100 50 200 50 200 90" stroke="#c59c55" strokeWidth="8" fill="none" strokeLinecap="round"/>
      <rect x="30" y="90" width="240" height="220" rx="12" fill="#c59c55"/>
      <rect x="30" y="90" width="240" height="50" rx="6" fill="rgba(0,0,0,0.15)"/>
      <rect x="128" y="175" width="44" height="34" rx="4" fill="rgba(0,0,0,0.25)"/>
      <path d="M140 175 C140 162 160 162 160 175" stroke="rgba(0,0,0,0.3)" strokeWidth="5" fill="none"/>
      <rect x="44" y="104" width="212" height="192" rx="8" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2" strokeDasharray="6 4"/>
    </svg>
  );
}

/* â”€â”€ AUTH MODAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
