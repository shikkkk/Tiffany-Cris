import { useState, useEffect } from "react";
import { supabase } from "./supabase";
import AdminPage from "./AdminPage";
import lvTwist from "./assets/twist.avif";
import lvLoop from "./assets/loop.avif";
import lvSpeedy from "./assets/speedy.avif";
import lvOnthego from "./assets/onthego.avif";

/* ═══════════════════════════════════════════════════════════════════
   GLOBAL STYLES — All styles for nav, home, collection, contact
   ═══════════════════════════════════════════════════════════════════ */
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Montserrat:wght@300;400;500;600&display=swap');
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

  .pc-info { padding: 14px 2px 0; }
  .pc-cat { font-family: 'Montserrat', sans-serif; font-size: 7.5px; font-weight: 500; letter-spacing: 0.32em; text-transform: uppercase; color: #6a5a38; margin-bottom: 5px; }
  .pc-name { font-family: 'Cormorant Garamond', serif; font-size: 15px; font-weight: 400; color: #d4c4a0; line-height: 1.3; transition: color 0.25s; }

  /* Responsive */
  @media (max-width: 1100px) { .product-grid { grid-template-columns: repeat(3, 1fr); } }
  @media (max-width: 720px)  { .product-grid { grid-template-columns: repeat(2, 1fr); } .product-grid-wrap { padding: 40px 24px 80px; } }

  /* MODAL */
  .modal-bg { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.92); z-index: 200; align-items: center; justify-content: center; padding: 24px; }
  .modal-bg.open { display: flex; }
  .modal-box { background: #0a0804; border: 1px solid rgba(197,156,85,0.15); max-width: 760px; width: 100%; display: grid; grid-template-columns: 1fr 1fr; max-height: 90vh; overflow-y: auto; position: relative; }
  .modal-close-btn { position: absolute; top: 14px; right: 16px; background: none; border: none; font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #4a3e28; cursor: pointer; transition: color 0.2s; z-index: 5; }
  .modal-close-btn:hover { color: #c59c55; }
  .modal-img-side { background: #0d0a05; display: flex; align-items: center; justify-content: center; min-height: 380px; background-size: cover; background-position: center; }
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
  .ct-info-link { font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500; letter-spacing: 0.2em; text-transform: uppercase; color: #c59c55; text-decoration: none; display: inline-block; margin-top: 12px; transition: opacity 0.2s; cursor: pointer; }
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
  .ct-f-link { display: block; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 300; color: #3a3020; margin-bottom: 10px; letter-spacing: 0.04em; cursor: pointer; text-decoration: none; transition: color 0.2s; }
  .ct-f-link:hover { color: #c59c55; }
  .ct-f-bottom { display: flex; justify-content: space-between; align-items: center; max-width: 1100px; margin: 0 auto; padding-top: 24px; border-top: 1px solid rgba(197,156,85,0.07); font-family: 'Montserrat', sans-serif; font-size: 9px; font-weight: 400; color: #2a2018; letter-spacing: 0.1em; }

  /* ── LIGHT MODE ────────────────────────────────────── */
  [data-theme="light"] .tc-navbar.scrolled { background: rgba(250,248,244,0.96) !important; border-bottom-color: rgba(197,156,85,0.15) !important; }
  [data-theme="light"] .tc-nav-link { color: #6a5a40; }
  [data-theme="light"] .tc-brand-name { color: #1a1208; }
  [data-theme="light"] .tc-brand-sub { color: #9a8a70; }
  [data-theme="light"] .hero-bg { background-color: #faf8f4 !important; background-image: radial-gradient(ellipse 70% 60% at 50% 45%, rgba(197,156,85,0.1) 0%, transparent 75%) !important; }
  [data-theme="light"] .hero-title-main { color: #1a1208; }
  [data-theme="light"] .hero-desc { color: #6a5a40; }
  [data-theme="light"] .grain-overlay { opacity: 0.05; }
  [data-theme="light"] .col-page { background: #faf8f4; }
  [data-theme="light"] .col-hero { background: #faf8f4 !important; border-bottom-color: rgba(197,156,85,0.1); }
  [data-theme="light"] .col-hero-title { color: #1a1208; }
  [data-theme="light"] .col-hero-sub { color: #6a5a40; }
  [data-theme="light"] .filter-bar { background: #f0ebe0 !important; }
  [data-theme="light"] .filter-tab { color: #6a5a40; }
  [data-theme="light"] .product-count { color: #9a8a70; }
  [data-theme="light"] .pc-img { background: #f0ebe0; }
  [data-theme="light"] .pc-name { color: #1a1208; }
  [data-theme="light"] .modal-box { background: #faf8f4 !important; }
  [data-theme="light"] .modal-img-side { background-color: #f0ebe0 !important; }
  [data-theme="light"] .modal-name { color: #1a1208; }
  [data-theme="light"] .modal-tagline { color: #8a7a60; }
  [data-theme="light"] .ms-val { color: #4a3a28; }
  [data-theme="light"] .contact-page { background: #faf8f4; }
  [data-theme="light"] .ct-hero { background: #faf8f4 !important; border-bottom-color: rgba(197,156,85,0.1); }
  [data-theme="light"] .ct-title { color: #1a1208; }
  [data-theme="light"] .ct-sub { color: #6a5a40; }
  [data-theme="light"] .ct-label { color: #6a5a40; }
  [data-theme="light"] .ct-input, [data-theme="light"] .ct-textarea, [data-theme="light"] .ct-select { background: #fff !important; color: #1a1208 !important; border-color: rgba(197,156,85,0.2) !important; }
  [data-theme="light"] .ct-input::placeholder, [data-theme="light"] .ct-textarea::placeholder { color: #c0b090; }
  [data-theme="light"] .ct-info-card { background: #fff !important; border-color: rgba(197,156,85,0.15) !important; }
  [data-theme="light"] .ct-info-title { color: #1a1208; }
  [data-theme="light"] .ct-info-text { color: #6a5a40; }
  [data-theme="light"] .ct-loc-city { color: #1a1208; }
  [data-theme="light"] .ct-loc-addr { color: #8a7a60; }
  [data-theme="light"] .ct-footer-strip { background: #f0ebe0 !important; }
  [data-theme="light"] .ct-f-brand { color: #1a1208; }
  [data-theme="light"] .ct-f-about { color: #6a5a40; }
  [data-theme="light"] .ct-f-link { color: #6a5a40; }
  [data-theme="light"] .ct-f-bottom { color: #9a8a70; }
  [data-theme="light"] .ct-success-title { color: #1a1208; }
  [data-theme="light"] .ct-success-msg { color: #6a5a40; }

  /* ── AUTH MODAL ────────────────────────────────────────── */
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
`;

/* ═══════════════════════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════════════════════ */
const bags = [
  {
    id: 1, name: "Twist", cat: "Handbag", price: 3200,
    badge: "New Arrival", badgeType: "gold",
    desc: "This glamourous Twist MM handbag is made from deep-dyed Epi grained leather and adorned with a detachable chunky gold-color chain, braided with leather.",
    tagline: "Power distilled into perfect structure.",
    img: lvTwist,
    colors: ["#1a1208", "#2a1e14", "#c59c55"],
    specs: { Material: "Full-grain calfskin", Lining: "Silk jacquard", Hardware: "18k gold-plated", Size: "28 × 20 × 10 cm", Origin: "Florence, Italy" }
  },
  {
    id: 2, name: "Loop Monogram", cat: "Shoulder Bag", price: 2450,
    badge: null, badgeType: null,
    desc: "Created by Nicolas Ghesquière for the Cruise 2022 Collection, the Loop handbag features a half-moon silhouette, inspired by the Croissant bag from the House archives.",
    tagline: "Effortless. Enduring. Unmistakably yours.",
    img: lvLoop,
    colors: ["#3a2a14", "#1a1208"],
    specs: { Material: "Pebbled lambskin", Lining: "Suede", Hardware: "Antique brass", Size: "32 × 24 × 10 cm", Origin: "France" }
  },
  {
    id: 3, name: "Speedy Soft 30", cat: "Tote Bag", price: 2890,
    badge: "Bestseller", badgeType: "dark",
    desc: "The Speedy Soft 30 is reimagined for the anniversary collection of the Louis Vuitton Monogram, marking 130 years of the iconic House signature. ",
    tagline: "The bag that defined an era. Reimagined.",
    img: lvSpeedy,
    colors: ["#2a1408", "#1a1a14", "#c59c55"],
    specs: { Material: "Supple calfskin", Lining: "Cotton canvas", Hardware: "Palladium", Size: "30 × 21 × 17 cm", Origin: "Italy" }
  },
  {
    id: 4, name: "OnTheGo PM", cat: "Handbag", price: 3600,
    badge: null, badgeType: null,
    desc: "Inspired by Louis Vuitton's famous Sac Plat from 1968, the OnTheGo PM tote is fashioned in Monogram Empreinte leather, embossed with a Medium Bicolor Monogram pattern. This smaller version of the original OnTheGo fits essentials such as a mini tablet. ",
    tagline: "Architecture you can carry.",
    img: lvOnthego,
    colors: ["#0a0a0a", "#1a1208"],
    specs: { Material: "Box calfskin", Lining: "Silk satin", Hardware: "Black chrome", Size: "25 × 19 × 11.5 cm", Origin: "Italy" }
  },
];

const TABS = ["All", "Handbag", "Shoulder Bag", "Tote Bag", "Crossbody"];

const bagSvgs = {
  4: <svg viewBox="0 0 180 200" fill="none" style={{width:"60%",height:"60%"}}><path d="M52 56 C52 32 128 32 128 56" stroke="#c59c55" strokeWidth="5" fill="none" strokeLinecap="round"/><rect x="16" y="56" width="148" height="128" rx="10" fill="#1a1a1a" stroke="#c59c55" strokeWidth="0.8"/><rect x="16" y="56" width="148" height="30" rx="6" fill="rgba(0,0,0,0.2)"/><rect x="74" y="100" width="32" height="22" rx="3" fill="none" stroke="#c59c55" strokeWidth="1"/><path d="M82 100 C82 90 98 90 98 100" stroke="#c59c55" strokeWidth="1" fill="none"/></svg>,
  5: <svg viewBox="0 0 180 200" fill="none" style={{width:"60%",height:"60%"}}><rect x="20" y="58" width="140" height="118" rx="12" fill="#1a2010" stroke="#c59c55" strokeWidth="0.8"/><path d="M48 58 Q90 44 132 58" stroke="#c59c55" strokeWidth="1.2" fill="none" strokeDasharray="4 3"/><circle cx="90" cy="96" r="8" fill="none" stroke="#c59c55" strokeWidth="1"/><line x1="90" y1="88" x2="90" y2="58" stroke="#c59c55" strokeWidth="1" strokeDasharray="3 2"/><path d="M12 110 Q20 104 28 110 Q36 116 44 110" stroke="#c59c55" strokeWidth="1.6" fill="none"/></svg>,
  6: <svg viewBox="0 0 180 200" fill="none" style={{width:"60%",height:"60%"}}><rect x="10" y="60" width="160" height="124" rx="8" fill="#2a1e08" stroke="#c59c55" strokeWidth="0.8"/><path d="M40 60 L30 36 Q90 26 150 36 L140 60" stroke="#c59c55" strokeWidth="1.4" fill="none"/><line x1="10" y1="90" x2="170" y2="90" stroke="#c59c55" strokeWidth="0.5" opacity="0.4"/><rect x="72" y="110" width="36" height="22" rx="4" fill="none" stroke="#c59c55" strokeWidth="0.9"/><line x1="90" y1="110" x2="90" y2="102" stroke="#c59c55" strokeWidth="1"/><circle cx="90" cy="100" r="3" fill="none" stroke="#c59c55" strokeWidth="0.9"/></svg>,
};

const infoCards = [
  {
    title: "Private Atelier",
    text: "Visit our invite-only atelier in Manila for a bespoke consultation. By appointment only — reach out to reserve your exclusive session.",
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

const locations = [
  { city: "Manila", addr: "Bonifacio Global City\nTaguig, Metro Manila" },
];

/* ═══════════════════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */

function BagSilhouette() {
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
      if (error) setErr(error.message);
      else { setOk("Account created! You can now sign in."); switchTab("signin"); setPassword(""); setConfirm(""); }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
      else onSuccess();
    }
    setLoading(false);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={onClose}>
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
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    await supabase.from("viewing_requests").insert([{
      user_id: user.id,
      user_email: user.email,
      collection_id: String(item.id),
      collection_name: item.name,
      message: message || null,
      status: "pending",
    }]);
    setDone(true);
    setLoading(false);
    setTimeout(onClose, 2500);
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.88)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }} onClick={onClose}>
      <div className="auth-card" style={{ maxWidth: "440px" }} onClick={e => e.stopPropagation()}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: 300, color: "#c59c55", marginBottom: "14px" }}>Request Received</div>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "12px", color: "#6a5a40", lineHeight: 1.9 }}>
              We'll contact you at <strong style={{ color: "#c59c55" }}>{user.email}</strong> within 24 hours to arrange your private viewing of the <em>{item.name}</em>.
            </p>
          </div>
        ) : (
          <>
            <div className="auth-brand" style={{ fontSize: "22px" }}>Private Viewing</div>
            <div className="auth-hint">{item.name}</div>
            <form onSubmit={submit}>
              <label className="auth-label">Your Email</label>
              <input className="auth-input" type="email" value={user.email} disabled style={{ opacity: 0.55, cursor: "default" }} />
              <label className="auth-label">Message (Optional)</label>
              <textarea className="auth-input" placeholder="Any preferences or questions for the atelier..." value={message} onChange={e => setMessage(e.target.value)} style={{ height: "90px", resize: "none", lineHeight: 1.7 }} />
              <button className="auth-submit" disabled={loading}>{loading ? "Submitting..." : "Submit Request"}</button>
            </form>
            <div style={{ textAlign: "center", marginTop: "14px" }}>
              <button className="auth-back" onClick={onClose}>Cancel</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Navbar({ page, setPage, theme, toggleTheme, user, onAuthOpen, onSignOut }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (p) => { setPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <nav className={`tc-navbar${scrolled ? " scrolled" : ""}`}>
      <div className="tc-nav-links">
        <button className={`tc-nav-link${page === "home" ? " active" : ""}`} onClick={() => go("home")}>Home</button>
        <button className={`tc-nav-link${page === "collection" ? " active" : ""}`} onClick={() => go("collection")}>Collection</button>
      </div>
      <div className="tc-brand" onClick={() => go("home")}>
        <div className="tc-brand-name">Tiffany &amp; Cris</div>
        <div className="tc-brand-sub">Luxury Collections</div>
      </div>
      <div className="tc-nav-links">
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
    </nav>
  );
}

/* ── HOME ────────────────────────────────────────────── */
function Home({ setPage, theme }) {
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
  const heritageBg   = isLight ? '#f5f0e8' : 'black';
  const previewBg    = isLight ? '#faf8f4' : '#050403';
  const headingColor = isLight ? '#1a1208' : '#f0e4cc';
  const accentSpan   = isLight ? '#1a1208' : '#ffffff';
  const bodyTextClr  = isLight ? '#6a5a40' : '#9a8a70';

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
          Hand-crafted bags forged in midnight and gold — for those who wear elegance like a second skin.
        </p>
        <div className="fade-in delay-4 flex flex-wrap gap-4 justify-center">
          <button className="btn-primary" onClick={goCollection}>Explore Collection</button>
          <button className="btn-secondary" onClick={goContact}>Private Viewing</button>
        </div>
        <div className="fade-in delay-5 mt-16 flex items-center gap-4" style={{ color: "#ddd9d2", fontSize: "9px", letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "'Montserrat', sans-serif" }}>
          <span style={{ width: 60, height: 1, background: "rgba(235,221,221,0.2)", display: "inline-block" }}/>
          Exclusively Crafted
          <span style={{ width: 60, height: 1, background: "rgba(228,220,207,0.2)", display: "inline-block" }}/>
        </div>
      </div>

      <section className="w-full py-40 px-6 text-center border-t border-[rgba(197,156,85,0.08)]" style={{ background: heritageBg }}>
        <div className="max-w-3xl mx-auto">
          <div style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#c59c55", marginBottom: "20px", fontFamily: "'Montserrat', sans-serif" }}>Our Heritage</div>
          <h2 className="font-cormorant" style={{ fontSize: "56px", color: headingColor, fontWeight: 400, lineHeight: 1.2, marginBottom: "24px" }}>
            Where <span style={{ color: accentSpan }}>obsidian</span> meets <span style={{ color: "#c59c55" }}>gold.</span>
          </h2>
          <p style={{ color: bodyTextClr, fontSize: "15px", lineHeight: 1.8, maxWidth: "520px", margin: "0 auto", fontFamily: "'Montserrat', sans-serif" }}>
            Each Tiffany &amp; Cris piece is carefully curated from the world's most renowned ateliers — from the finest Italian leathers to Parisian hand-finished clasps — ensuring every item reflects timeless luxury and craftsmanship.
          </p>
        </div>
      </section>

      <section className="w-full py-40 px-6 text-center border-t border-[rgba(197,156,85,0.08)]" style={{ background: previewBg }}>
        <div className="max-w-6xl mx-auto">
          <div style={{ fontSize: "11px", letterSpacing: "0.4em", textTransform: "uppercase", color: "#c59c55", marginBottom: "18px", fontFamily: "'Montserrat', sans-serif" }}>Collections Preview</div>
          <h2 className="font-cormorant" style={{ fontSize: "54px", color: headingColor, fontWeight: 400, marginBottom: "60px", lineHeight: 1.2 }}>
            A glimpse into <span style={{ color: "#c59c55" }}>timeless pieces</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {displayPreviews.map((item) => (
              <div key={item.id} className="group cursor-pointer" onClick={goCollection}>
                <div className="h-[380px] border border-[rgba(197,156,85,0.15)] relative overflow-hidden"
                  style={{ backgroundImage: `url(${item.image_url})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <div className="absolute inset-0 bg-black/40 flex items-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#c59c55", border: "1px solid rgba(197,156,85,0.6)", padding: "10px 18px", background: "rgba(5,4,3,0.85)", width: "100%", textAlign: "center", display: "block" }}>View Collection →</span>
                  </div>
                </div>
                <p className="mt-4 text-sm text-[#9a8a70] font-montserrat tracking-widest uppercase">{item.name}</p>
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

/* ── WISHLIST PAGE ───────────────────────────────────────── */
function WishlistPage({ user, wishlistIds, setPage, onWishlistToggle, onViewingRequest, onAuthRequired }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    if (wishlistIds.size === 0) { setItems([]); setLoading(false); return; }
    supabase.from("collections").select("*").in("id", [...wishlistIds])
      .then(({ data, error }) => {
        if (!error && data) {
          setItems(data.map(item => ({
            id: item.id, name: item.name, cat: item.category, price: item.price,
            img: item.image_url, specs: item.specs || {}, tagline: item.tagline,
          })));
        }
        setLoading(false);
      });
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
                  <div className="pc-img-inner" style={bag.img ? { backgroundImage: `url(${bag.img})` } : {}} />
                  <button className="pc-wish-btn on" onClick={e => { e.stopPropagation(); onWishlistToggle(bag.id); }}>♥</button>
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
            <button className="modal-close-btn" onClick={() => setModal(null)}>✕ Close</button>
            <div className="modal-img-side" style={modal.img ? { backgroundImage: `url(${modal.img})` } : {}} />
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
                <button className="modal-btn-primary" onClick={() => { onWishlistToggle(modal.id); setModal(null); }}>♥ Remove from Wishlist</button>
                <button className="modal-btn-ghost" onClick={() => { onViewingRequest(modal); setModal(null); }}>Request Private Viewing</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── COLLECTION ──────────────────────────────────────── */
function Collection({ user, wishlistIds, onWishlistToggle, onViewingRequest, onAuthRequired }) {
  const [activeTab, setActiveTab] = useState("All");
  const [sort, setSort] = useState("");
  const [modal, setModal] = useState(null);
  const [liveBags, setLiveBags] = useState(null);

  useEffect(() => {
    supabase.from("collections").select("*").order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data?.length > 0) {
          setLiveBags(data.map(item => ({
            id: item.id, name: item.name, cat: item.category, price: item.price,
            badge: item.badge, badgeType: item.badge_type, desc: item.description,
            tagline: item.tagline, img: item.image_url, specs: item.specs || {}, colors: [],
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
      <div className="col-hero">
        <div className="col-hero-eyebrow">Tiffany &amp; Cris</div>
        <h1 className="col-hero-title">The <em>Collection</em></h1>
        <p className="col-hero-sub">
          Each piece is a testament to restraint, material mastery,
          and the belief that true luxury requires no announcement.
        </p>
      </div>

      <div className="filter-bar">
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
        <div className="product-grid">
          {filtered.map(bag => (
            <div className="product-card" key={bag.id} onClick={() => setModal(bag)}>
              <div className="pc-img">
                <div className="pc-img-inner" style={bag.img ? { backgroundImage: `url(${bag.img})` } : {}}>
                  {!bag.img && bagSvgs[bag.id]}
                </div>
                <button
                  className={`pc-wish-btn${inWishlist(bag.id) ? " on" : ""}`}
                  onClick={e => { e.stopPropagation(); onWishlistToggle ? onWishlistToggle(bag.id) : onAuthRequired?.(); }}
                  title={inWishlist(bag.id) ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {inWishlist(bag.id) ? "♥" : "♡"}
                </button>
              </div>
              <div className="pc-info">
                <div className="pc-cat">{bag.cat}</div>
                <div className="pc-name">{bag.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`modal-bg${modal ? " open" : ""}`} onClick={e => { if (e.target.classList.contains("modal-bg")) setModal(null); }}>
        {modal && (
          <div className="modal-box">
            <button className="modal-close-btn" onClick={() => setModal(null)}>✕ Close</button>
            <div className="modal-img-side" style={modal.img ? { backgroundImage: `url(${modal.img})` } : {}}>
              {!modal.img && bagSvgs[modal.id]}
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
                  {inWishlist(modal.id) ? "♥ Saved to Wishlist" : "♡ Add to Wishlist"}
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

/* ── CONTACT ─────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1400);
  };

  return (
    <div className="contact-page">
      <div className="ct-hero">
        <div className="ct-eyebrow">Tiffany &amp; Cris</div>
        <h1 className="ct-title">Reach the <em>Atelier</em></h1>
        <p className="ct-sub">
          We believe every conversation deserves the same care
          we pour into every stitch. We'd love to hear from you.
        </p>
      </div>

      <div className="ct-body">
        <div>
          <div className="ct-section-label">Send a Message</div>
          {!submitted ? (
            <form className="ct-form" onSubmit={handleSubmit}>
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label">First Name</label>
                  <input className="ct-input" name="name" placeholder="Tiffany" value={form.name} onChange={handleChange} required/>
                </div>
                <div className="ct-field">
                  <label className="ct-label">Email Address</label>
                  <input className="ct-input" name="email" type="email" placeholder="you@email.com" value={form.email} onChange={handleChange} required/>
                </div>
              </div>
              <div className="ct-row">
                <div className="ct-field">
                  <label className="ct-label">Phone (Optional)</label>
                  <input className="ct-input" name="phone" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={handleChange}/>
                </div>
                <div className="ct-field">
                  <label className="ct-label">Subject</label>
                  <select className="ct-select" name="subject" value={form.subject} onChange={handleChange} required>
                    <option value="" disabled>Select a subject</option>
                    <option>General Enquiry</option>
                    <option>Private Viewing</option>
                    <option>Bespoke Commission</option>
                    <option>Restoration & Care</option>
                    <option>Press & Partnerships</option>
                    <option>Order Support</option>
                  </select>
                </div>
              </div>
              <div className="ct-field">
                <label className="ct-label">Your Message</label>
                <textarea className="ct-textarea" name="message" placeholder="Tell us how we can help you..." value={form.message} onChange={handleChange} required/>
              </div>
              <button className="ct-submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          ) : (
            <div className="ct-success show">
              <div className="ct-success-icon">
                <svg viewBox="0 0 24 24" fill="none" width="20" height="20">
                  <path d="M5 12 L10 17 L19 7" stroke="#c59c55" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="ct-success-title">Message Received</div>
              <p className="ct-success-msg">
                Thank you for reaching out. Our atelier team will<br/>
                respond personally within 24 hours.
              </p>
            </div>
          )}
        </div>

        <div className="ct-info-wrap">
          <div className="ct-section-label">How to Reach Us</div>
          {infoCards.map(card => (
            <div className="ct-info-card" key={card.title}>
              {card.icon}
              <div className="ct-info-title">{card.title}</div>
              <p className="ct-info-text">{card.text}</p>
              <a className="ct-info-link">{card.link} →</a>
            </div>
          ))}

          <div className="ct-locations">
            <div className="ct-locations-title">Our Locations</div>
            {locations.map(loc => (
              <div className="ct-location-item" key={loc.city}>
                <div className="ct-loc-dot"/>
                <div>
                  <div className="ct-loc-city">{loc.city}</div>
                  <div className="ct-loc-addr" style={{ whiteSpace: "pre-line" }}>{loc.addr}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ct-footer-strip">
        <div className="ct-footer-grid">
          <div>
            <div className="ct-f-brand">Tiffany &amp; Cris</div>
            <div className="ct-f-brandtag">Luxury Collections</div>
            <p className="ct-f-about">Handcrafted luxury bags born in Manila, finished in Florence — for those who carry the world beautifully.</p>
          </div>
          {[
            { title: "Navigate", links: ["Home", "Collection", "Our Story", "Private Viewing"] },
            { title: "Legal",    links: ["Privacy Policy", "Terms of Service", "Authenticity", "Returns"] },
            { title: "Follow",   links: ["Instagram", "Pinterest", "Facebook", "TikTok"] },
          ].map(col => (
            <div key={col.title}>
              <div className="ct-f-col-title">{col.title}</div>
              {col.links.map(l => <a key={l} className="ct-f-link">{l}</a>)}
            </div>
          ))}
        </div>
        <div className="ct-f-bottom">
          <span>© 2025 Tiffany &amp; Cris. All rights reserved.</span>
          <span style={{ letterSpacing: "0.35em" }}>✦ Manila · Paris · Milan ✦</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   ROOT APP
   ═══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  const [theme, setTheme] = useState(() => localStorage.getItem("tc-theme") || "dark");
  const [user, setUser] = useState(null);
  const [wishlistIds, setWishlistIds] = useState(new Set());
  const [authModal, setAuthModal] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const isAdmin = window.location.search.includes("admin");

  useEffect(() => {
    const alreadyAdmin = window.location.search.includes("admin");
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u && !alreadyAdmin) {
        const { data } = await supabase.from("Users").select("is_admin").eq("email", u.email).maybeSingle();
        if (data?.is_admin) { window.location.href = "/?admin"; }
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (event === "SIGNED_IN" && u && !alreadyAdmin) {
        const { data } = await supabase.from("Users").select("is_admin").eq("email", u.email).maybeSingle();
        if (data?.is_admin) { window.location.href = "/?admin"; }
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) { setWishlistIds(new Set()); return; }
    supabase.from("wishlists").select("collection_id").eq("user_id", user.id)
      .then(({ data }) => setWishlistIds(new Set(data?.map(w => String(w.collection_id)) || [])));
  }, [user]);

  useEffect(() => {
    document.body.style.background = theme === "light" ? "#faf8f4" : "#050403";
    document.body.style.color      = theme === "light" ? "#1a1208"  : "#e8dcc8";
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
    if (!user) { setAuthModal("signin"); return; }
    setViewingItem(item);
  }

  if (isAdmin) {
    return <AdminPage onExit={() => window.location.href = "/"} />;
  }

  return (
    <div data-theme={theme} style={{ minHeight: "100vh" }}>
      <style>{globalStyles}</style>
      <Navbar
        page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme}
        user={user} onAuthOpen={() => setAuthModal("signin")} onSignOut={() => supabase.auth.signOut()}
      />
      {page === "home"     && <Home setPage={setPage} theme={theme}/>}
      {page === "collection" && (
        <Collection
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
      {page === "contact"  && <Contact/>}

      {authModal && (
        <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSuccess={() => setAuthModal(null)} />
      )}
      {viewingItem && user && (
        <ViewingRequestModal item={viewingItem} user={user} onClose={() => setViewingItem(null)} />
      )}
    </div>
  );
}