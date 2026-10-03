import { useState, useEffect, useMemo, lazy, Suspense } from "react";
import { supabase } from "./supabase";

const AdminPage = lazy(() => import("./pages/AdminPage"));
const LegalPoliciesPage = lazy(() => import("./pages/LegalPoliciesPage"));
import Footer from "./Footer";
import siteLogo from "./assets/tiff logo.png";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import WishlistPage from "./pages/WishlistPage";
import ContactPage from "./pages/ContactPage";

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL STYLES — All styles for nav, home, collection, contact
   ═══════════════════════════════════════════════════════════════════ */
const globalStyles = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: #050403; color: #e8dcc8; }

  .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  .font-montserrat { font-family: 'Montserrat', sans-serif; }

  /* ── NAVBAR ────────────────────────────────────────── */
  .tc-navbar {
    position: fixed; top: 0; left: 0; width: 100%; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 48px;
    transition: background 0.4s, border-color 0.4s, backdrop-filter 0.4s;
    border-bottom: 1px solid transparent;
  }
  .tc-navbar.scrolled {
    background: rgba(5,4,3,0.94);
    backdrop-filter: blur(14px);
    border-bottom-color: rgba(197,156,85,0.1);
  }
  .tc-nav-links { display: flex; gap: 36px; }
  .tc-nav-link {
    font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #7a6a50;
    background: none; border: none; cursor: pointer; transition: color 0.2s;
    padding: 0;
  }
  .tc-nav-link:hover, .tc-nav-link.active { color: #c59c55; }
  .tc-brand { text-align: center; cursor: pointer; position: absolute; left: 50%; transform: translateX(-50%); }
  .tc-brand-name {
    font-family: 'Cormorant Garamond', serif; font-size: 22px;
    font-weight: 400; letter-spacing: 0.08em; color: #f0e4c8;
  }
  .tc-brand-sub {
    font-family: 'Montserrat', sans-serif; font-size: 8px; font-weight: 500;
    letter-spacing: 0.48em; text-transform: uppercase; color: #5a4a28;
    margin-top: 2px;
  }
  .tc-logo { height: 75px; width: auto; object-fit: contain; mix-blend-mode: multiply; display: block; }
  [data-theme="light"] .tc-logo { mix-blend-mode: multiply; filter: brightness(0.38) sepia(0.3); }
  body:not([data-theme="light"]) .tc-logo { mix-blend-mode: screen; }

  /* ── HOME ──────────────────────────────────────────── */
  .hero-bg {
    background-color: #0a0704;
    background-image:
      radial-gradient(ellipse 70% 60% at 50% 45%, rgba(180,120,20,0.38) 0%, rgba(120,70,10,0.18) 40%, transparent 75%),
      radial-gradient(ellipse 40% 40% at 50% 30%, rgba(220,160,40,0.12) 0%, transparent 60%);
  }
  .bag-silhouette {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -52%);
    width: 420px; height: 480px; opacity: 0.18; pointer-events: none;
  }
  .grain-overlay {
    position: absolute; inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none; opacity: 0.35;
  }
  .hero-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.4em; text-transform: uppercase; color: #c59c55; }
  .hero-title-main { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 8vw, 96px); font-weight: 400; color: #f0e4cc; line-height: 1.0; letter-spacing: -0.01em; }
  .hero-title-sub  { font-family: 'Cormorant Garamond', serif; font-size: clamp(52px, 8vw, 96px); font-weight: 400; font-style: italic; color: #c59c55; line-height: 1.0; letter-spacing: -0.01em; }
  .hero-desc { font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 300; color: #9a8a70; line-height: 1.7; letter-spacing: 0.02em; max-width: 440px; margin: 0 auto; }
  .btn-primary {
    font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600;
    letter-spacing: 0.3em; text-transform: uppercase;
    background: #c59c55; color: #1a1208; border: none;
    padding: 16px 36px; cursor: pointer; transition: background 0.25s, transform 0.15s;
  }
  .btn-primary:hover { background: #d4aa65; transform: translateY(-1px); }
  .btn-secondary {
    font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600;
    letter-spacing: 0.3em; text-transform: uppercase;
    background: rgba(10,8,4,0.7); color: #c59c55; border: 1px solid #c59c55;
    padding: 16px 36px; cursor: pointer; transition: background 0.25s, transform 0.15s;
  }
  .btn-secondary:hover { background: rgba(197,156,85,0.1); transform: translateY(-1px); }
  .fade-in { opacity: 0; transform: translateY(18px); animation: fadeUp 0.8s ease forwards; }
  @keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
  .delay-1{animation-delay:0.1s;} .delay-2{animation-delay:0.25s;} .delay-3{animation-delay:0.4s;} .delay-4{animation-delay:0.6s;} .delay-5{animation-delay:0.8s;}
  .divider-dot { width: 4px; height: 4px; border-radius: 50%; background: #c59c55; display: inline-block; margin: 0 10px; vertical-align: middle; }

  /* ── COLLECTION ────────────────────────────────────── */
  .col-page { background: #050403; min-height: 100vh; }
  .col-hero {
    position: relative; padding: 160px 48px 80px; text-align: center;
    background: #050403; border-bottom: 1px solid rgba(197,156,85,0.08); overflow: hidden;
  }
  .col-hero::before {
    content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 700px; height: 400px;
    background: radial-gradient(ellipse, rgba(197,156,85,0.07) 0%, transparent 70%);
    pointer-events: none;
  }
  .col-hero-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.42em; text-transform: uppercase; color: #c59c55; margin-bottom: 18px; }
  .col-hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(42px, 6vw, 72px); font-weight: 300; color: #f0e4cc; line-height: 1.1; margin-bottom: 20px; }
  .col-hero-title em { font-style: italic; color: #c59c55; }
  .col-hero-sub { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 300; color: #6a5a40; letter-spacing: 0.06em; max-width: 480px; margin: 0 auto; line-height: 1.8; }

  .filter-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 48px; background: #080603;
    border-bottom: 1px solid rgba(197,156,85,0.08);
    position: sticky; top: 64px; z-index: 50; backdrop-filter: blur(10px);
  }
  .filter-tabs { display: flex; }
  .filter-tab {
    font-family: 'Montserrat', sans-serif; font-size: 9.5px; font-weight: 500;
    letter-spacing: 0.22em; text-transform: uppercase; color: #4a3e28;
    padding: 18px 20px; border: none; background: none; cursor: pointer;
    border-bottom: 2px solid transparent; transition: color 0.2s, border-color 0.2s;
  }
  .filter-tab:hover { color: #c59c55; }
  .filter-tab.active { color: #c59c55; border-bottom-color: #c59c55; }
  .filter-sort {
    font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase; color: #4a3e28;
    background: transparent; border: 1px solid rgba(197,156,85,0.2);
    padding: 8px 16px; cursor: pointer; appearance: none; outline: none;
    transition: border-color 0.2s, color 0.2s;
  }
  .filter-sort:hover { border-color: #c59c55; color: #c59c55; }

  .product-grid-wrap { padding: 50px 64px 100px; max-width: 1280px; margin: 0 auto; }
  .product-count { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #3a3020; margin-bottom: 36px; }
  .product-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px 24px; background: transparent; border: none; }

  .product-card { background: transparent; cursor: pointer; transition: opacity 0.3s; position: relative; }
  .product-card:hover { opacity: 0.92; }
  .product-card:hover .pc-img-inner { transform: scale(1.03); }
  .product-card:hover .pc-name { color: #c59c55; }

  .pc-img { aspect-ratio: 4/5; position: relative; overflow: hidden; background: #0d0a05; display: flex; align-items: center; justify-content: center; }
  .pc-img-inner { width: 100%; height: 100%; transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); display: flex; align-items: center; justify-content: center; background-size: cover; background-position: center; }
  img.pc-img-inner { object-fit: cover; object-position: center; display: block; }

  .pc-info { padding: 14px 2px 0; }
  .pc-cat { font-family: 'Montserrat', sans-serif; font-size: 7.5px; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; color: #6a5a38; margin-bottom: 5px; }
  .pc-name { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 400; color: #d4c4a0; line-height: 1.3; transition: color 0.25s; }

  /* ── HAMBURGER / MOBILE MENU ─────────────────────── */
  .tc-ham { display: none; background: none; border: none; cursor: pointer; color: #7a6a50; padding: 4px; line-height: 1; z-index: 101; }
  .tc-mobile-menu {
    position: fixed; inset: 0; background: rgba(5,4,3,0.97); z-index: 99;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px;
    animation: fadeUp 0.2s ease;
  }
  .tc-mobile-link {
    font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.32em; text-transform: uppercase; color: #7a6a50;
    background: none; border: none; cursor: pointer; padding: 8px 0; transition: color 0.2s;
  }
  .tc-mobile-link:hover { color: #c59c55; }
  [data-theme="light"] .tc-mobile-menu { background: rgba(250,248,244,0.98); }
  [data-theme="light"] .tc-ham { color: #4a3e28; }

  /* Responsive */
  @media (max-width: 1100px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 720px)  { .product-grid { grid-template-columns: repeat(2, 1fr); } .product-grid-wrap { padding: 40px 24px 80px; } }

  @media (max-width: 768px) {
    .tc-navbar { padding: 16px 20px; }
    .tc-nav-links { display: none; }
    .tc-ham { display: flex; align-items: center; }
    .tc-brand { position: static; transform: none; }
    .col-hero { padding: 110px 24px 56px; }
    .col-hero-title { font-size: 36px; }
    .filter-bar { padding: 0 16px; overflow-x: auto; flex-wrap: nowrap; justify-content: flex-start; gap: 8px; }
    .filter-tabs { flex-wrap: nowrap; }
    .filter-tab { padding: 14px 12px; white-space: nowrap; }
    .filter-sort { display: none; }
    .modal-box { grid-template-columns: 1fr; max-width: 420px; }
    .modal-img-side { min-height: 220px; }
    .modal-info-side { padding: 24px 20px; }
    .modal-name { font-size: 28px; }
    .ct-body { grid-template-columns: 1fr; padding: 48px 20px 64px; gap: 40px; }
    .ct-row { grid-template-columns: 1fr; }
    .ct-footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
    .ct-footer-strip { padding: 44px 20px 24px; }
    .ct-f-bottom { flex-direction: column; gap: 8px; text-align: center; }
    .ct-hero { padding: 120px 20px 56px; }
    .hero-bg { padding: 0; }
    .btn-primary, .btn-secondary { padding: 14px 24px; }
  }

  @media (max-width: 480px) {
    .product-grid { grid-template-columns: repeat(2, 1fr); gap: 16px 12px; }
    .product-grid-wrap { padding: 32px 16px 64px; }
    .ct-footer-grid { grid-template-columns: 1fr; }
    .modal-box { max-width: 100%; margin: 0; }
    .modal-bg { padding: 0; align-items: flex-end; }
    .modal-box { border-radius: 12px 12px 0 0; max-height: 92vh; }
    .modal-img-side { min-height: 180px; }
    .auth-card { padding: 32px 20px; }
  }

  /* MODAL */
  .modal-bg { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 200; align-items: center; justify-content: center; padding: 24px; }
  .modal-bg.open { display: flex; }
  .modal-box { background: #0a0804; border: 1px solid rgba(197,156,85,0.15); max-width: 760px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; max-height: 90vh; overflow-y: auto; position: relative; }
  .modal-close-btn { position: absolute; top: 14px; right: 16px; background: none; border: none; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #4a3e28; cursor: pointer; transition: color 0.2s; z-index: 5; }
  .modal-close-btn:hover { color: #c59c55; }
  .modal-img-side { position: relative; background: #0d0a05; display: flex; align-items: center; justify-content: center; min-height: 380px; overflow: hidden; }
  .modal-info-side { padding: 40px 32px; display: flex; flex-direction: column; justify-content: space-between; }
  .modal-cat { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.36em; text-transform: uppercase; color: #c59c55; margin-bottom: 10px; }
  .modal-name { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; color: #f0e4cc; line-height: 1.1; margin-bottom: 8px; }
  .modal-tagline { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-style: italic; color: #5a4a2a; margin-bottom: 24px; line-height: 1.5; }
  .modal-specs { border-top: 1px solid rgba(197,156,85,0.1); padding-top: 18px; margin-bottom: 24px; }
  .modal-spec-row { display: flex; justify-content: space-between; padding: 9px 0; border-bottom: 1px solid rgba(197,156,85,0.06); font-family: 'Montserrat', sans-serif; }
  .modal-spec-row:last-child { border-bottom: none; }
  .ms-label { font-size: 8.5px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #3a3020; }
  .ms-val { font-size: 11px; font-weight: 300; color: #9a8a70; }
  .modal-price { font-family: 'Cormorant Garamond', serif; font-size: 32px; font-weight: 600; color: #c59c55; margin-bottom: 20px; }
  .modal-btn-primary { width: 100%; font-family: 'Montserrat', sans-serif; font-size: 9.5px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; background: #c59c55; color: #0a0704; border: none; padding: 15px; cursor: pointer; margin-bottom: 10px; transition: background 0.2s; }
  .modal-btn-primary:hover { background: #d4aa65; }
  .modal-btn-ghost { width: 100%; font-family: 'Montserrat', sans-serif; font-size: 9.5px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: #c59c55; background: transparent; border: 1px solid rgba(197,156,85,0.35); padding: 14px; cursor: pointer; transition: border-color 0.2s, background 0.2s; }
  .modal-btn-ghost:hover { border-color: #c59c55; background: rgba(197,156,85,0.06); }
  .modal-carousel-arrow { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(0,0,0,0.55); border: 1px solid rgba(197,156,85,0.3); color: #c59c55; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 20px; line-height: 1; z-index: 2; transition: background 0.2s; padding: 0; }
  .modal-carousel-arrow:hover { background: rgba(197,156,85,0.25); }
  .modal-carousel-prev { left: 10px; }
  .modal-carousel-next { right: 10px; }
  .modal-carousel-dots { position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%); display: flex; gap: 6px; z-index: 2; }
  .modal-carousel-dot { width: 6px; height: 6px; border-radius: 50%; background: rgba(197,156,85,0.35); border: none; cursor: pointer; padding: 0; transition: background 0.2s; }
  .modal-carousel-dot.active { background: #c59c55; }

  /* ── CONTACT ───────────────────────────────────────── */
  .contact-page { background: #050403; min-height: 100vh; }
  .ct-hero { position: relative; padding: 160px 48px 80px; text-align: center; background: #050403; border-bottom: 1px solid rgba(197,156,85,0.08); overflow: hidden; }
  .ct-hero::before { content: ''; position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 600px; height: 360px; background: radial-gradient(ellipse, rgba(197,156,85,0.06) 0%, transparent 70%); pointer-events: none; }
  .ct-eyebrow { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.42em; text-transform: uppercase; color: #c59c55; margin-bottom: 18px; }
  .ct-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(40px, 6vw, 68px); font-weight: 300; color: #f0e4cc; line-height: 1.1; margin-bottom: 18px; }
  .ct-title em { font-style: italic; color: #c59c55; }
  .ct-sub { font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 300; color: #6a5a40; letter-spacing: 0.05em; max-width: 440px; margin: 0 auto; line-height: 1.8; }

  .ct-body { display: grid; grid-template-columns: 1fr 1fr; max-width: 1100px; margin: 0 auto; padding: 80px 48px 100px; gap: 80px; }
  .ct-section-label { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.38em; text-transform: uppercase; color: #c59c55; margin-bottom: 28px; }
  .ct-form { display: flex; flex-direction: column; gap: 0; }
  .ct-field { margin-bottom: 20px; }
  .ct-label { display: block; font-family: 'Montserrat', sans-serif; font-size: 8.5px; font-weight: 500; letter-spacing: 0.28em; text-transform: uppercase; color: #4a3e28; margin-bottom: 8px; }
  .ct-input, .ct-textarea, .ct-select {
    width: 100%; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 300;
    color: #c8b890; letter-spacing: 0.04em; background: #0a0804;
    border: 1px solid rgba(197,156,85,0.15); padding: 14px 16px;
    outline: none; appearance: none; transition: border-color 0.25s;
  }
  .ct-input:focus, .ct-textarea:focus, .ct-select:focus { border-color: rgba(197,156,85,0.55); }
  .ct-input::placeholder, .ct-textarea::placeholder { color: #3a3020; }
  .ct-textarea { resize: none; height: 130px; line-height: 1.7; }
  .ct-select { color: #3a3020; cursor: pointer; }
  .ct-select option { background: #0a0804; color: #c8b890; }
  .ct-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  .ct-submit {
    font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600;
    letter-spacing: 0.32em; text-transform: uppercase;
    background: #c59c55; color: #0a0704; border: none;
    padding: 16px 40px; cursor: pointer; width: 100%;
    margin-top: 8px; transition: background 0.2s, transform 0.15s;
  }
  .ct-submit:hover { background: #d4aa65; transform: translateY(-1px); }
  .ct-submit:disabled { background: #4a3e28; color: #2a2018; cursor: not-allowed; transform: none; }

  .ct-success { display: none; text-align: center; padding: 40px 20px; }
  .ct-success.show { display: block; }
  .ct-success-icon { width: 52px; height: 52px; border-radius: 50%; border: 1px solid #c59c55; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; }
  .ct-success-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #f0e4cc; margin-bottom: 10px; }
  .ct-success-msg { font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 300; color: #6a5a40; line-height: 1.8; }

  .ct-info-wrap { display: flex; flex-direction: column; gap: 40px; }
  .ct-info-card { border: 1px solid rgba(197,156,85,0.1); padding: 32px 28px; background: #0a0804; position: relative; overflow: hidden; transition: border-color 0.3s; }
  .ct-info-card:hover { border-color: rgba(197,156,85,0.28); }
  .ct-info-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: linear-gradient(to bottom, #c59c55, transparent); opacity: 0; transition: opacity 0.3s; }
  .ct-info-card:hover::before { opacity: 1; }
  .ct-info-icon { width: 38px; height: 38px; margin-bottom: 16px; opacity: 0.7; }
  .ct-info-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 400; color: #e8dcc8; margin-bottom: 8px; }
  .ct-info-text { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 300; color: #5a4a30; line-height: 1.8; letter-spacing: 0.03em; }
  .ct-info-link { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #c59c55; text-decoration: none; display: inline-block; margin-top: 12px; transition: opacity 0.2s; cursor: pointer; background: none; border: none; padding: 0; }
  .ct-info-link:hover { opacity: 0.7; }

  .ct-locations { border-top: 1px solid rgba(197,156,85,0.08); padding-top: 32px; }
  .ct-locations-title { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.36em; text-transform: uppercase; color: #c59c55; margin-bottom: 20px; }
  .ct-location-item { display: flex; align-items: flex-start; gap: 14px; padding: 16px 0; border-bottom: 1px solid rgba(197,156,85,0.06); }
  .ct-location-item:last-child { border-bottom: none; }
  .ct-loc-dot { width: 7px; height: 7px; border-radius: 50%; background: #c59c55; margin-top: 5px; flex-shrink: 0; opacity: 0.6; }
  .ct-loc-city { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 400; color: #c8b890; margin-bottom: 2px; }
  .ct-loc-addr { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 300; color: #4a3a24; letter-spacing: 0.04em; line-height: 1.6; }

  .ct-footer-strip { background: #080603; border-top: 1px solid rgba(197,156,85,0.08); padding: 60px 48px 32px; }
  .ct-footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; max-width: 1100px; margin: 0 auto 40px; }
  .ct-f-brand { font-family: 'Cormorant Garamond', serif; font-size: 24px; font-weight: 400; color: #f0e4c8; margin-bottom: 4px; }
  .ct-f-brandtag { font-family: 'Montserrat', sans-serif; font-size: 8px; font-weight: 500; letter-spacing: 0.45em; text-transform: uppercase; color: #3a3020; margin-bottom: 14px; }
  .ct-f-about { font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 300; color: #3a3020; line-height: 1.8; }
  .ct-f-col-title { font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; color: #c59c55; margin-bottom: 16px; }
  .ct-f-link { display: block; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 300; color: #3a3020; margin-bottom: 10px; letter-spacing: 0.04em; cursor: pointer; text-decoration: none; transition: color 0.2s; background: none; border: none; padding: 0; text-align: left; width: 100%; }
  .ct-f-link:hover { color: #c59c55; }
  .ct-f-bottom { display: flex; justify-content: space-between; align-items: center; max-width: 1100px; margin: 0 auto; padding-top: 24px; border-top: 1px solid rgba(197,156,85,0.07); font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 400; color: #2a2018; letter-spacing: 0.1em; }

  /* ── LIGHT MODE (Vintage Parchment & Tuscan Cognac) ── */
  [data-theme="light"] {
    --tc-bg: #EDE5D8;
    --tc-bg-rgb: 237, 229, 216;
    --tc-surface: #DFD3C1;
    --tc-card: #F5EFE5;
    --tc-heading: #201812;
    --tc-text: #635140;
    --tc-muted: #9C8B77;
    --tc-gold: #9E6728;
    --tc-gold-rgb: 158, 103, 40;
    --tc-border: rgba(158, 103, 40, 0.22);
    --tc-btn-sec-bg: rgba(158, 103, 40, 0.08);
  }

  [data-theme="light"] .tc-navbar.scrolled { background: rgba(var(--tc-bg-rgb), 0.96) !important; border-bottom-color: var(--tc-border) !important; }
  [data-theme="light"] .tc-nav-link { color: var(--tc-text); }
  [data-theme="light"] .tc-nav-link:hover, [data-theme="light"] .tc-nav-link.active { color: var(--tc-gold); }
  [data-theme="light"] .tc-brand-name { color: var(--tc-heading); }
  [data-theme="light"] .tc-brand-sub { color: var(--tc-muted); }
  [data-theme="light"] .hero-bg { background-color: var(--tc-bg) !important; background-image: radial-gradient(ellipse 70% 60% at 50% 45%, rgba(var(--tc-gold-rgb), 0.12) 0%, transparent 75%) !important; }
  [data-theme="light"] .hero-title-main { color: var(--tc-heading); }
  [data-theme="light"] .hero-title-sub  { color: var(--tc-gold) !important; }
  [data-theme="light"] .hero-desc { color: var(--tc-text); }
  [data-theme="light"] .btn-primary { background: var(--tc-gold); color: #1a1208; }
  [data-theme="light"] .btn-primary:hover { filter: brightness(1.08); }
  [data-theme="light"] .btn-secondary { background: var(--tc-btn-sec-bg); color: var(--tc-heading); border-color: var(--tc-gold); }
  [data-theme="light"] .btn-secondary:hover { background: rgba(var(--tc-gold-rgb), 0.18); }
  [data-theme="light"] .pc-wish-btn { background: var(--tc-btn-sec-bg); border-color: var(--tc-border); color: var(--tc-text); }
  [data-theme="light"] .pc-wish-btn:hover { background: rgba(var(--tc-gold-rgb), 0.16); color: var(--tc-gold); border-color: var(--tc-gold); }
  [data-theme="light"] .grain-overlay { opacity: 0.04; }
  [data-theme="light"] .col-page { background: var(--tc-bg); }
  [data-theme="light"] .col-hero { background: var(--tc-bg) !important; border-bottom-color: var(--tc-border); }
  [data-theme="light"] .col-hero-title { color: var(--tc-heading); }
  [data-theme="light"] .col-hero-title em { color: var(--tc-gold); }
  [data-theme="light"] .col-hero-sub { color: var(--tc-text); }
  [data-theme="light"] .filter-bar { background: var(--tc-surface) !important; border-bottom-color: var(--tc-border); }
  [data-theme="light"] .filter-tab { color: var(--tc-text); }
  [data-theme="light"] .filter-tab:hover, [data-theme="light"] .filter-tab.active { color: var(--tc-gold); border-bottom-color: var(--tc-gold); }
  [data-theme="light"] .product-count { color: var(--tc-muted); }
  [data-theme="light"] .pc-img { background: var(--tc-surface); }
  [data-theme="light"] .pc-name { color: var(--tc-heading); }
  [data-theme="light"] .modal-box { background: var(--tc-card) !important; border: 1px solid var(--tc-border); }
  [data-theme="light"] .modal-img-side { background-color: var(--tc-surface) !important; }
  [data-theme="light"] .modal-name { color: var(--tc-heading); }
  [data-theme="light"] .modal-tagline { color: var(--tc-muted); }
  [data-theme="light"] .ms-val { color: var(--tc-heading); }
  [data-theme="light"] .contact-page { background: var(--tc-bg); }
  [data-theme="light"] .ct-hero { background: var(--tc-bg) !important; border-bottom-color: var(--tc-border); }
  [data-theme="light"] .ct-title { color: var(--tc-heading); }
  [data-theme="light"] .ct-sub { color: var(--tc-text); }
  [data-theme="light"] .ct-label { color: var(--tc-text); }
  [data-theme="light"] .ct-input, [data-theme="light"] .ct-textarea, [data-theme="light"] .ct-select { background: var(--tc-card) !important; color: var(--tc-heading) !important; border-color: var(--tc-border) !important; }
  [data-theme="light"] .ct-input::placeholder, [data-theme="light"] .ct-textarea::placeholder { color: var(--tc-muted); }
  [data-theme="light"] .ct-info-card { background: var(--tc-card) !important; border-color: var(--tc-border) !important; }
  [data-theme="light"] .ct-info-title { color: var(--tc-heading); }
  [data-theme="light"] .ct-info-text { color: var(--tc-text); }
  [data-theme="light"] .ct-loc-city { color: var(--tc-heading); }
  [data-theme="light"] .ct-loc-addr { color: var(--tc-muted); }
  [data-theme="light"] .ct-footer-strip { background: var(--tc-surface) !important; border-top-color: var(--tc-border) !important; }
  [data-theme="light"] .ct-f-brand { color: var(--tc-heading); }
  [data-theme="light"] .ct-f-about { color: var(--tc-text); }
  [data-theme="light"] .ct-f-link { color: var(--tc-text); }
  [data-theme="light"] .ct-f-bottom { color: var(--tc-muted); border-top-color: var(--tc-border); }
  [data-theme="light"] .ct-success-title { color: var(--tc-heading); }
  [data-theme="light"] .ct-success-msg { color: var(--tc-text); }

  /* Modal Light Mode */
  [data-theme="light"] .modal-bg { background: rgba(32, 24, 18, 0.48); backdrop-filter: blur(8px); }
  [data-theme="light"] .modal-close-btn { color: var(--tc-muted); }
  [data-theme="light"] .modal-close-btn:hover { color: var(--tc-gold); }
  [data-theme="light"] .modal-btn-ghost { color: var(--tc-gold); border-color: var(--tc-border); }
  [data-theme="light"] .modal-btn-ghost:hover { border-color: var(--tc-gold); background: rgba(var(--tc-gold-rgb), 0.08); }
  [data-theme="light"] .modal-btn-primary { background: var(--tc-gold); color: #ffffff; }
  [data-theme="light"] .modal-price { color: var(--tc-gold); }
  [data-theme="light"] .modal-cat { color: var(--tc-gold); }
  [data-theme="light"] .ms-label { color: var(--tc-muted); }

  /* Auth Modal Light Mode */
  [data-theme="light"] .auth-overlay { background: rgba(32, 24, 18, 0.52); backdrop-filter: blur(8px); }
  [data-theme="light"] .auth-card { background: var(--tc-card) !important; border: 1px solid var(--tc-border) !important; box-shadow: 0 25px 70px rgba(32, 24, 18, 0.25) !important; }
  [data-theme="light"] .auth-brand { color: var(--tc-heading) !important; }
  [data-theme="light"] .auth-hint { color: var(--tc-muted) !important; }
  [data-theme="light"] .auth-tabs { border-color: var(--tc-border) !important; background: rgba(158, 103, 40, 0.06); }
  [data-theme="light"] .auth-tab { color: var(--tc-text) !important; }
  [data-theme="light"] .auth-tab.on { background: rgba(var(--tc-gold-rgb), 0.18) !important; color: var(--tc-gold) !important; font-weight: 600; }
  [data-theme="light"] .auth-label { color: var(--tc-text) !important; }
  [data-theme="light"] .auth-input { background: var(--tc-bg) !important; color: var(--tc-heading) !important; border-color: var(--tc-border) !important; }
  [data-theme="light"] .auth-input:focus { border-color: var(--tc-gold) !important; box-shadow: 0 0 0 1px var(--tc-gold); }
  [data-theme="light"] .auth-input::placeholder { color: var(--tc-muted) !important; }
  [data-theme="light"] .auth-submit { background: var(--tc-gold) !important; color: #ffffff !important; font-weight: 600; }
  [data-theme="light"] .auth-submit:hover { filter: brightness(1.08); }
  [data-theme="light"] .auth-submit:disabled { background: rgba(var(--tc-gold-rgb), 0.3) !important; color: var(--tc-muted) !important; }
  [data-theme="light"] .auth-back { color: var(--tc-muted) !important; }
  [data-theme="light"] .auth-back:hover { color: var(--tc-gold) !important; }

  /* ── AUTH MODAL ────────────────────────────────────────── */
  .auth-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.88);
    backdrop-filter: blur(8px);
    z-index: 500;
    display: flex; align-items: center; justify-content: center;
    padding: 24px;
    transition: background 0.3s;
  }
  .auth-card { background: #0a0804; border: 1px solid rgba(197,156,85,0.2); border-radius: 8px; padding: 44px 40px; width: 100%; max-width: 400px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); }
  .auth-brand { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: #f0e4cc; margin-bottom: 4px; }
  .auth-hint { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #5a4a30; margin-bottom: 28px; font-family: 'Montserrat', sans-serif; }
  .auth-tabs { display: flex; border: 1px solid rgba(197,156,85,0.2); border-radius: 4px; overflow: hidden; margin-bottom: 24px; }
  .auth-tab { flex: 1; padding: 8px; font-size: 11px; font-weight: 500; font-family: 'Montserrat', sans-serif; letter-spacing: 0.1em; text-transform: uppercase; border: none; cursor: pointer; background: transparent; color: #5a4a30; transition: all 0.15s; }
  .auth-tab.on { background: rgba(197,156,85,0.1); color: #c59c55; }
  .auth-label { display: block; font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #5a4a30; margin-bottom: 6px; }
  .auth-input { width: 100%; font-family: 'Montserrat', sans-serif; font-size: 13px; color: #e8dcc8; background: #050403; border: 1px solid rgba(197,156,85,0.15); padding: 11px 14px; outline: none; margin-bottom: 14px; transition: border-color 0.2s; display: block; }
  .auth-input:focus { border-color: rgba(197,156,85,0.5); }
  .auth-input::placeholder { color: #3a3020; }
  .auth-err { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #ef4444; margin-bottom: 10px; }
  .auth-ok  { font-family: 'Montserrat', sans-serif; font-size: 11px; color: #22c55e; margin-bottom: 10px; }
  .auth-submit { width: 100%; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.3em; text-transform: uppercase; background: #c59c55; color: #0a0704; border: none; padding: 15px; cursor: pointer; margin-top: 4px; transition: background 0.2s; }
  .auth-submit:hover { background: #d4aa65; }
  .auth-submit:disabled { background: #3a2a14; color: #1a1208; cursor: not-allowed; }
  .auth-back { background: none; border: none; color: #4a3e28; font-family: 'Montserrat', sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; cursor: pointer; transition: color 0.2s; }
  .auth-back:hover { color: #c59c55; }

  /* ── WISHLIST HEART BUTTON ─────────────────────────────── */
  .pc-wish-btn { position: absolute; top: 10px; right: 10px; width: 34px; height: 34px; background: rgba(5,4,3,0.78); border: 1px solid rgba(197,156,85,0.2); border-radius: 50%; color: #5a4a30; font-size: 17px; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.2s; z-index: 10; padding: 0; line-height: 1; }
  .product-card:hover .pc-wish-btn { opacity: 1; }
  .pc-wish-btn.on { opacity: 1; color: #c59c55; border-color: rgba(197,156,85,0.5); }
  .pc-wish-btn:hover { background: rgba(197,156,85,0.15); color: #c59c55; border-color: #c59c55; }

  /* ── ADMIN NAVIGATION & FLOATING RETURN PILL ── */
  .tc-nav-admin-link {
    color: #c59c55 !important;
    border: 1px solid rgba(197, 156, 85, 0.45);
    padding: 6px 12px;
    border-radius: 2px;
    font-weight: 600 !important;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: rgba(197, 156, 85, 0.08);
    transition: all 0.25s ease;
  }
  .tc-nav-admin-link:hover {
    background: rgba(197, 156, 85, 0.22);
    border-color: #c59c55;
    box-shadow: 0 0 12px rgba(197, 156, 85, 0.35);
    color: #ffffff !important;
  }
  [data-theme="light"] .tc-nav-admin-link {
    color: #8c5a20 !important;
    border-color: rgba(140, 90, 32, 0.45);
    background: rgba(140, 90, 32, 0.08);
  }
  [data-theme="light"] .tc-nav-admin-link:hover {
    background: rgba(140, 90, 32, 0.18);
    color: #3b2813 !important;
  }
  .tc-admin-floating-pill {
    position: fixed;
    bottom: 28px;
    right: 28px;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(10, 8, 5, 0.94);
    border: 1px solid #c59c55;
    padding: 10px 18px;
    border-radius: 9999px;
    color: #f5eedf;
    font-family: 'Montserrat', sans-serif;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    text-decoration: none;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.7), 0 0 16px rgba(197, 156, 85, 0.25);
    backdrop-filter: blur(12px);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  }
  .tc-admin-floating-pill:hover {
    transform: translateY(-2px);
    background: rgba(20, 16, 10, 0.98);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.85), 0 0 24px rgba(197, 156, 85, 0.5);
    color: #ffffff;
  }
  .tc-admin-floating-icon {
    color: #c59c55;
    font-size: 13px;
    line-height: 1;
  }
  [data-theme="light"] .tc-admin-floating-pill {
    background: rgba(245, 238, 227, 0.95);
    border-color: #9E6728;
    color: #201812;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15), 0 0 12px rgba(158, 103, 40, 0.2);
  }
  [data-theme="light"] .tc-admin-floating-pill:hover {
    background: #ffffff;
    color: #000000;
  }
  [data-theme="light"] .tc-admin-floating-icon {
    color: #9E6728;
  }
`;

/* ── AUTH MODAL ──────────────────────────────────────────── */
function AuthModal({ mode, onClose, onSuccess }) {
  const [tab, setTab] = useState(mode || "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [loading, setLoading] = useState(false);

  function switchTab(t) { setTab(t); setErr(""); setOk(""); }

  async function submit(e) {
    e.preventDefault();
    setErr(""); setLoading(true);
    if (tab === "signup") {
      if (password !== confirm) { setErr("Passwords don't match."); setLoading(false); return; }
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setErr(error.message);
      } else {
        const { data: existing } = await supabase.from("Users").select("id").eq("email", email).maybeSingle();
        if (!existing) {
          await supabase.from("Users").insert([{ email, is_admin: false, created_at: new Date().toISOString() }]);
        }
        // Stay on signup tab — show confirmation email notice, don't imply they can sign in immediately
        setOk("✓ Account created! Check your email inbox and click the confirmation link before signing in.");
        setPassword(""); setConfirm("");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message === "Email not confirmed") {
          setErr("Your email hasn't been confirmed yet. Check your inbox for a confirmation link.");
        } else {
          setErr(error.message);
        }
      } else {
        const { data: existing } = await supabase.from("Users").select("id").eq("email", email).maybeSingle();
        if (!existing) {
          await supabase.from("Users").insert([{ email, is_admin: false, created_at: new Date().toISOString() }]);
        }
        onSuccess();
      }
    }
    setLoading(false);
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card" onClick={e => e.stopPropagation()}>
        <div className="auth-brand">Tiffany &amp; Cris</div>
        <div className="auth-hint">Member Access</div>
        <div className="auth-tabs">
          {["signin", "signup"].map(t => (
            <button key={t} type="button" className={`auth-tab${tab === t ? " on" : ""}`} onClick={() => switchTab(t)}>
              {t === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>
        <form onSubmit={submit}>
          <label className="auth-label">Email</label>
          <input className="auth-input" type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          <label className="auth-label">Password</label>
          <input className="auth-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          {tab === "signup" && (
            <>
              <label className="auth-label">Confirm Password</label>
              <input className="auth-input" type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            </>
          )}
          {err && <div className="auth-err">{err}</div>}
          {ok  && <div className="auth-ok">{ok}</div>}
          <button className="auth-submit" disabled={loading}>
            {loading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>
        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <button className="auth-back" onClick={onClose}>← Back to Site</button>
        </div>
      </div>
    </div>
  );
}

/* ── VIEWING REQUEST MODAL ───────────────────────────────── */
function ViewingRequestModal({ item, user, onClose }) {
  const pieceName = typeof item === "object" ? item.name : (item || "General Atelier Viewing");
  const pieceCat = typeof item === "object" ? item.cat : "Luxury Piece";
  const pieceImg = typeof item === "object" ? (item.img || item.imgs?.[0]) : null;

  const [location, setLocation] = useState("Manila BGC Atelier");
  const [preferredDate, setPreferredDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Afternoon (2:00 PM – 5:00 PM)");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState("");

  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");

    const details = [
      `Location: ${location}`,
      preferredDate ? `Date: ${preferredDate}` : null,
      `Time Slot: ${timeSlot}`,
      notes.trim() ? `Notes: ${notes.trim()}` : null
    ].filter(Boolean).join(" | ");

    const { error } = await supabase.from("viewing_requests").insert([{
      user_email: user.email,
      collection_name: pieceName,
      message: details,
      status: "pending",
      created_at: new Date().toISOString(),
    }]);

    setLoading(false);
    if (error) {
      setErr("Failed to submit request. Please try again or reach out to our concierge.");
    } else {
      setSubmitted(true);
    }
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-card" style={{ maxWidth: "460px" }} onClick={e => e.stopPropagation()}>
        <div className="auth-brand">Tiffany &amp; Cris</div>
        <div className="auth-hint">Private Atelier Viewing</div>

        {/* Piece Preview Card */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          padding: "12px",
          background: "rgba(197, 156, 85, 0.08)",
          border: "1px solid rgba(197, 156, 85, 0.25)",
          borderRadius: "6px",
          marginBottom: "20px"
        }}>
          {pieceImg && (
            <img
              src={pieceImg}
              alt={pieceName}
              style={{ width: "52px", height: "52px", objectFit: "cover", borderRadius: "4px" }}
            />
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "8.5px", letterSpacing: "0.25em", textTransform: "uppercase", color: "#c59c55" }}>
              {pieceCat}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "19px", color: "inherit", fontWeight: 500 }}>
              {pieceName}
            </div>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <label className="auth-label">Atelier Location</label>
            <select
              className="auth-input ct-select"
              value={location}
              onChange={e => setLocation(e.target.value)}
              style={{ cursor: "pointer" }}
            >
              <option value="Manila BGC Atelier">Manila BGC Atelier (By Appointment)</option>
              <option value="Virtual Video Consultation">Virtual Video Consultation</option>
            </select>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label className="auth-label">Preferred Date</label>
                <input
                  type="date"
                  className="auth-input"
                  min={tomorrowStr}
                  value={preferredDate}
                  onChange={e => setPreferredDate(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="auth-label">Time Window</label>
                <select
                  className="auth-input ct-select"
                  value={timeSlot}
                  onChange={e => setTimeSlot(e.target.value)}
                  style={{ cursor: "pointer" }}
                >
                  <option value="Morning (10:00 AM – 1:00 PM)">Morning (10 AM – 1 PM)</option>
                  <option value="Afternoon (2:00 PM – 5:00 PM)">Afternoon (2 PM – 5 PM)</option>
                  <option value="Evening (6:00 PM – 8:00 PM)">Evening (6 PM – 8 PM)</option>
                </select>
              </div>
            </div>

            <label className="auth-label">Special Requests / Notes (Optional)</label>
            <textarea
              className="auth-input"
              rows={2}
              placeholder="e.g. Specific hardware preference, anniversary celebration..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{ resize: "none", height: "65px", paddingTop: "8px" }}
            />

            {err && <div className="auth-err">{err}</div>}

            <button className="auth-submit" disabled={loading}>
              {loading ? "Submitting..." : "Confirm Viewing Request"}
            </button>

            <div style={{ textAlign: "center", marginTop: "14px" }}>
              <button type="button" className="auth-back" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div style={{ textAlign: "center", padding: "12px 0 6px" }}>
            <div style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              border: "1px solid #c59c55",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <svg viewBox="0 0 24 24" fill="none" width="22" height="22">
                <path d="M5 12 L10 17 L19 7" stroke="#c59c55" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 400, color: "inherit", marginBottom: "8px" }}>
              Viewing Requested
            </h3>
            <p style={{ fontSize: "12px", lineHeight: "1.7", color: "#94a3b8", marginBottom: "22px", fontFamily: "'Montserrat', sans-serif" }}>
              Thank you, our private concierge will reach out to <strong style={{ color: "#c59c55" }}>{user.email}</strong> within 24 hours to confirm your reservation and arrange private access details.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <a
                href="https://www.facebook.com/tiffanyandcris"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ textAlign: "center", textDecoration: "none", display: "block", fontSize: "9px" }}
              >
                Connect on Facebook Messenger →
              </a>
              <button className="btn-primary" onClick={onClose} style={{ fontSize: "9px" }}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function Navbar({ page, setPage, theme, toggleTheme, user, userIsAdmin, onAuthOpen, onSignOut, onOpenLegal }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); setMenuOpen(false); };
  return (
    <>
      <nav className={`tc-navbar${scrolled ? " scrolled" : ""}`}>
        <div className="tc-nav-links">
          <button className={`tc-nav-link${page === "home" ? " active" : ""}`} onClick={() => go("home")}>Home</button>
          <button className={`tc-nav-link${page === "collection" ? " active" : ""}`} onClick={() => go("collection")}>Collection</button>
        </div>
        <div className="tc-brand" onClick={() => go("home")}>
          <img src={siteLogo} alt="Tiffany & Cris" className="tc-logo" />
        </div>
        <div className="tc-nav-links">
          {userIsAdmin && (
            <a
              href="/?admin"
              className="tc-nav-link tc-nav-admin-link"
              title="Return to Admin Atelier Dashboard"
            >
              ✦ Admin Atelier
            </a>
          )}
          {user ? (
            <>
              <button className={`tc-nav-link${page === "wishlist" ? " active" : ""}`} onClick={() => go("wishlist")}>Wishlist</button>
              <button className="tc-nav-link" onClick={onSignOut}>Sign Out</button>
            </>
          ) : (
            <button className="tc-nav-link" onClick={onAuthOpen}>Sign In</button>
          )}
          <button className={`tc-nav-link${page === "contact" ? " active" : ""}`} onClick={() => go("contact")}>Contact</button>
          <button className="tc-nav-link" onClick={toggleTheme} title="Toggle theme" style={{ fontSize: "15px", letterSpacing: 0 }}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
        <button className="tc-ham" onClick={() => setMenuOpen(m => !m)} aria-label="Menu">
          {menuOpen
            ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          }
        </button>
      </nav>
      {menuOpen && (
        <div className="tc-mobile-menu" onClick={() => setMenuOpen(false)}>
          <button className="tc-mobile-link" onClick={() => go("home")}>Home</button>
          <button className="tc-mobile-link" onClick={() => go("collection")}>Collection</button>
          {userIsAdmin && (
            <a
              href="/?admin"
              className="tc-mobile-link"
              style={{ color: "#c59c55", fontWeight: 600, border: "1px solid rgba(197,156,85,0.3)", padding: "10px", margin: "6px 0", textAlign: "center", textDecoration: "none" }}
            >
              ✦ Return to Admin Atelier →
            </a>
          )}
          {user ? (
            <>
              <button className="tc-mobile-link" onClick={() => go("wishlist")}>Wishlist</button>
              <button className="tc-mobile-link" onClick={() => { onSignOut(); setMenuOpen(false); }}>Sign Out</button>
            </>
          ) : (
            <button className="tc-mobile-link" onClick={() => { onAuthOpen(); setMenuOpen(false); }}>Sign In</button>
          )}
          <button className="tc-mobile-link" onClick={() => go("contact")}>Contact</button>
          <button className="tc-mobile-link" onClick={() => { if (onOpenLegal) onOpenLegal("terms"); else go("legal"); setMenuOpen(false); }}>Terms &amp; Policies</button>
          <button className="tc-mobile-link" onClick={() => { toggleTheme(); setMenuOpen(false); }} style={{ fontSize: "20px" }}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
        </div>
      )}
    </>
  );
}


export default function SiteRouter() {
  const [page, setPage] = useState("home");
  const [policyTab, setPolicyTab] = useState("terms");
  const [theme, setTheme] = useState(() => localStorage.getItem("tc-theme") || "dark");
  const [user, setUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [authModal, setAuthModal] = useState(null);
  const [viewingRequestItem, setViewingRequestItem] = useState(null);
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const isAdmin = window.location.search.includes("admin");

  useEffect(() => {
    const titles = {
      home: "Tiffany & Cris | Luxury Designer Bag Collections Manila",
      collection: "The Collection | Tiffany & Cris Luxury Bags",
      contact: "Contact Us | Tiffany & Cris Atelier Manila",
      wishlist: "My Wishlist | Tiffany & Cris",
      legal: "Legal Policies & Terms | Tiffany & Cris Luxury Collection",
    };
    document.title = titles[page] || "Tiffany & Cris";
  }, [page]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const policyParam = params.get("policy");
    if (policyParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPage("legal");
      setPolicyTab(policyParam);
    }
    const handlePop = () => {
      const p = new URLSearchParams(window.location.search);
      const pol = p.get("policy");
      if (pol) {
        setPage("legal");
        setPolicyTab(pol);
      }
    };
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  function handleOpenLegal(tab = "terms") {
    setPolicyTab(tab);
    setPage("legal");
    const url = new URL(window.location);
    url.searchParams.set("policy", tab);
    window.history.pushState({}, "", url);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    async function checkAdmin(u) {
      if (!u) {
        setUserIsAdmin(false);
        return;
      }
      try {
        const { data } = await supabase.from("Users").select("is_admin").eq("email", u.email).limit(1).maybeSingle();
        setUserIsAdmin(Boolean(data?.is_admin));
      } catch (err) {
        console.error("Error checking admin status:", err);
        setUserIsAdmin(false);
      }
    }

    supabase.auth.getSession().then(({ data: { session } = {} }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) checkAdmin(u);
    }).catch(() => {});

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      setTimeout(() => {
        checkAdmin(u);
      }, 0);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!user) { setWishlistIds(new Set()); return; }
    supabase.from("wishlists").select("collection_id").eq("user_id", user.id)
      .then(({ data }) => setWishlistIds(new Set(data?.map(w => String(w.collection_id)) || [])));
  }, [user]);

  useEffect(() => {
    document.body.style.background = theme === "light" ? "#EDE5D8" : "#050403";
    document.body.style.color      = theme === "light" ? "#201812" : "#e8dcc8";
  }, [theme]);

  function toggleTheme() {
    setTheme(t => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("tc-theme", next);
      return next;
    });
  }

  async function handleWishlistToggle(collectionId) {
    if (!user) { setAuthModal("signin"); return; }
    const id = String(collectionId);
    if (wishlistIds.has(id)) {
      await supabase.from("wishlists").delete().eq("user_id", user.id).eq("collection_id", id);
      setWishlistIds(prev => { const n = new Set(prev); n.delete(id); return n; });
    } else {
      await supabase.from("wishlists").insert([{ user_id: user.id, collection_id: id }]);
      setWishlistIds(prev => new Set([...prev, id]));
    }
  }

  function handleViewingRequest(item) {
    if (!user) {
      setAuthModal("signin");
      return;
    }
    setViewingRequestItem(item || "General Atelier Viewing");
  }

  if (isAdmin) {
    return (
      <Suspense fallback={
        <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", color: "#c59c55", fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>
          Loading Admin Atelier...
        </div>
      }>
        <AdminPage onExit={() => window.location.href = "/"} initialUser={user} initialIsAdmin={userIsAdmin} />
      </Suspense>
    );
  }

  return (
    <div data-theme={theme} style={{ minHeight: "100vh" }}>
      <style>{globalStyles}</style>
      <header>
        <Navbar
          page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme}
          user={user} userIsAdmin={userIsAdmin} onAuthOpen={() => setAuthModal("signin")} onSignOut={() => { supabase.auth.signOut().catch(() => {}); localStorage.clear(); sessionStorage.clear(); window.location.href = "/"; }}
          onOpenLegal={handleOpenLegal}
        />
      </header>
      <main id="main-content">
        {page === "home"     && <HomePage setPage={setPage} theme={theme} onViewingRequest={handleViewingRequest}/>}
        {page === "collection" && (
          <CollectionPage
            user={user} wishlistIds={wishlistIds}
            onWishlistToggle={handleWishlistToggle}
            onViewingRequest={handleViewingRequest}
            onAuthRequired={() => setAuthModal("signin")}
          />
        )}
        {page === "wishlist" && (
          <WishlistPage
            user={user} wishlistIds={wishlistIds} setPage={setPage}
            onWishlistToggle={handleWishlistToggle}
            onViewingRequest={handleViewingRequest}
            onAuthRequired={() => setAuthModal("signin")}
          />
        )}
        {page === "contact"  && <ContactPage onViewingRequest={handleViewingRequest}/>}
        {page === "legal"    && (
          <Suspense fallback={
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#c59c55", fontFamily: "'Montserrat', sans-serif", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Loading Policies...
            </div>
          }>
            <LegalPoliciesPage
              initialTab={policyTab}
              onTabChange={(tab) => {
                setPolicyTab(tab);
                const url = new URL(window.location);
                url.searchParams.set("policy", tab);
                window.history.pushState({}, "", url);
              }}
              theme={theme}
            />
          </Suspense>
        )}
      </main>

      <Footer setPage={setPage} onOpenLegal={handleOpenLegal} theme={theme} />

      {viewingRequestItem && user && (
        <ViewingRequestModal
          item={viewingRequestItem}
          user={user}
          onClose={() => setViewingRequestItem(null)}
        />
      )}

      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSuccess={() => setAuthModal(null)} />
      )}

      {userIsAdmin && (
        <a
          href="/?admin"
          className="tc-admin-floating-pill"
          title="Return to Admin Atelier Dashboard"
        >
          <span className="tc-admin-floating-icon">✦</span>
          <span>Admin Atelier</span>
        </a>
      )}
    </div>
  );
}
