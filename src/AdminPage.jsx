import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabase";

const CATS = ["Handbag", "Shoulder Bag", "Tote Bag", "Crossbody"];
const SPEC_KEYS = ["Material", "Lining", "Hardware", "Size", "Origin"];
const emptyForm = {
  name: "", category: "Handbag", price: "", badge: "", badge_type: "gold",
  description: "", tagline: "", image_url: "",
  specs: { Material: "", Lining: "", Hardware: "", Size: "", Origin: "" },
};

/* ─── STYLES ─────────────────────────────────────────────────────────── */
const S = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Inter:wght@300;400;500;600&display=swap');
  .adm * { box-sizing: border-box; }
  .adm { display: flex; min-height: 100vh; background: #f1f5f9; font-family: 'Inter', sans-serif; color: #1e293b; }

  /* Sidebar */
  .adm-sb { width: 240px; min-height: 100vh; background: #fff; border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; position: fixed; top: 0; left: 0; bottom: 0; z-index: 50; }
  .adm-sb-brand { padding: 22px 20px; border-bottom: 1px solid #f1f5f9; }
  .adm-sb-name { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 400; color: #1e293b; }
  .adm-sb-sub { font-size: 9px; font-weight: 500; letter-spacing: 0.3em; text-transform: uppercase; color: #94a3b8; margin-top: 3px; }
  .adm-sb-nav { flex: 1; padding: 14px 10px; overflow-y: auto; }
  .adm-sb-sec { font-size: 9px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #cbd5e1; padding: 10px 10px 6px; }
  .adm-sb-item { display: flex; align-items: center; gap: 10px; width: 100%; padding: 9px 12px; border-radius: 6px; border: none; background: none; font-family: 'Inter', sans-serif; font-size: 13.5px; color: #64748b; cursor: pointer; transition: all 0.15s; text-align: left; margin-bottom: 1px; }
  .adm-sb-item:hover { background: #f8fafc; color: #1e293b; }
  .adm-sb-item.on { background: #fffbf5; color: #b8893d; font-weight: 500; }
  .adm-sb-footer { padding: 12px 10px; border-top: 1px solid #f1f5f9; display: flex; flex-direction: column; gap: 2px; }

  /* Main */
  .adm-main { margin-left: 240px; flex: 1; display: flex; flex-direction: column; min-height: 100vh; }
  .adm-topbar { background: #fff; border-bottom: 1px solid #e2e8f0; padding: 0 28px; height: 56px; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; z-index: 30; }
  .adm-topbar-title { font-size: 15px; font-weight: 600; color: #1e293b; }
  .adm-user-pill { font-size: 12px; color: #64748b; background: #f8fafc; border: 1px solid #e2e8f0; padding: 5px 12px; border-radius: 20px; }
  .adm-content { padding: 28px; flex: 1; }

  /* Stats */
  .adm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 24px; }
  .adm-stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px 24px; position: relative; overflow: hidden; }
  .adm-stat::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: #c59c55; }
  .adm-stat-label { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; margin-bottom: 8px; }
  .adm-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 40px; font-weight: 300; color: #1e293b; line-height: 1; }
  .adm-stat-hint { font-size: 11px; color: #c59c55; margin-top: 6px; }

  /* Card */
  .adm-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; margin-bottom: 20px; }
  .adm-card-head { padding: 14px 20px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
  .adm-card-title { font-size: 14px; font-weight: 600; color: #1e293b; }

  /* Table */
  .adm-table { width: 100%; border-collapse: collapse; }
  .adm-th { font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; padding: 11px 16px; text-align: left; background: #f8fafc; border-bottom: 1px solid #e2e8f0; white-space: nowrap; }
  .adm-td { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #374151; vertical-align: middle; }
  .adm-tr:last-child .adm-td { border-bottom: none; }
  .adm-tr:hover .adm-td { background: #fafafa; }
  .adm-thumb { width: 44px; height: 36px; object-fit: cover; border-radius: 4px; background: #f1f5f9; display: block; }
  .adm-thumb-ph { width: 44px; height: 36px; border-radius: 4px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; color: #cbd5e1; font-size: 18px; }
  .adm-badge-gold { display: inline-block; font-size: 10px; font-weight: 500; padding: 2px 8px; border-radius: 12px; background: #fdf8f0; color: #c59c55; border: 1px solid rgba(197,156,85,0.3); }
  .adm-tag { display: inline-block; font-size: 11px; padding: 2px 8px; border-radius: 12px; background: #f1f5f9; color: #64748b; }
  .adm-actions { display: flex; gap: 6px; }

  /* Buttons */
  .adm-btn { font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; border: none; border-radius: 5px; padding: 8px 14px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: all 0.15s; white-space: nowrap; }
  .adm-btn-gold { background: #c59c55; color: #fff; }
  .adm-btn-gold:hover { background: #b08a44; }
  .adm-btn-gold:disabled { background: #d1d5db; cursor: not-allowed; }
  .adm-btn-white { background: #fff; color: #374151; border: 1px solid #e2e8f0; }
  .adm-btn-white:hover { background: #f8fafc; }
  .adm-btn-red { background: #fff; color: #ef4444; border: 1px solid #fecaca; }
  .adm-btn-red:hover { background: #fef2f2; }
  .adm-btn-sm { font-size: 11px; padding: 6px 10px; }

  /* Search */
  .adm-search { position: relative; }
  .adm-search svg { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
  .adm-search input { font-family: 'Inter', sans-serif; font-size: 13px; color: #1e293b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 7px 12px 7px 30px; width: 200px; outline: none; transition: all 0.15s; }
  .adm-search input:focus { border-color: #c59c55; background: #fff; box-shadow: 0 0 0 2px rgba(197,156,85,0.1); }
  .adm-search input::placeholder { color: #cbd5e1; }

  /* Slide Panel */
  .adm-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.4); z-index: 100; }
  .adm-panel { position: fixed; top: 0; right: 0; bottom: 0; width: 500px; max-width: 100%; background: #fff; box-shadow: -12px 0 40px rgba(0,0,0,0.12); z-index: 101; overflow-y: auto; display: flex; flex-direction: column; }
  .adm-panel::-webkit-scrollbar { width: 4px; }
  .adm-panel::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
  .adm-panel-head { padding: 18px 22px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #fff; z-index: 1; }
  .adm-panel-title { font-size: 15px; font-weight: 600; color: #1e293b; }
  .adm-panel-body { padding: 22px; flex: 1; }
  .adm-panel-footer { padding: 14px 22px; border-top: 1px solid #f1f5f9; display: flex; gap: 10px; position: sticky; bottom: 0; background: #fff; }

  /* Form Fields */
  .adm-label { display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 5px; }
  .adm-input { width: 100%; font-family: 'Inter', sans-serif; font-size: 13px; color: #1e293b; background: #fff; border: 1px solid #e2e8f0; border-radius: 5px; padding: 9px 11px; outline: none; transition: all 0.15s; }
  .adm-input:focus { border-color: #c59c55; box-shadow: 0 0 0 2px rgba(197,156,85,0.1); }
  .adm-input::placeholder { color: #cbd5e1; }
  .adm-textarea { width: 100%; font-family: 'Inter', sans-serif; font-size: 13px; color: #1e293b; background: #fff; border: 1px solid #e2e8f0; border-radius: 5px; padding: 9px 11px; outline: none; resize: none; height: 80px; line-height: 1.6; transition: all 0.15s; }
  .adm-textarea:focus { border-color: #c59c55; box-shadow: 0 0 0 2px rgba(197,156,85,0.1); }
  .adm-textarea::placeholder { color: #cbd5e1; }
  .adm-select { width: 100%; font-family: 'Inter', sans-serif; font-size: 13px; color: #1e293b; background: #fff; border: 1px solid #e2e8f0; border-radius: 5px; padding: 9px 11px; outline: none; appearance: none; cursor: pointer; transition: all 0.15s; }
  .adm-select:focus { border-color: #c59c55; }
  .adm-field { margin-bottom: 14px; }
  .adm-row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .adm-form-sep { font-size: 10px; font-weight: 600; letter-spacing: 0.15em; text-transform: uppercase; color: #c59c55; padding: 14px 0 10px; border-bottom: 1px solid #f1f5f9; margin-bottom: 14px; }

  /* Image Upload */
  .adm-img-toggle { display: flex; border: 1px solid #e2e8f0; border-radius: 5px; overflow: hidden; margin-bottom: 10px; }
  .adm-img-toggle button { flex: 1; padding: 7px; font-size: 11px; font-weight: 500; font-family: 'Inter', sans-serif; border: none; cursor: pointer; background: #f8fafc; color: #94a3b8; transition: all 0.15s; }
  .adm-img-toggle button.on { background: #fffbf5; color: #c59c55; }
  .adm-dropzone { border: 2px dashed #e2e8f0; border-radius: 6px; padding: 28px 20px; text-align: center; cursor: pointer; position: relative; background: #fafafa; transition: all 0.15s; }
  .adm-dropzone:hover { border-color: #c59c55; background: #fffbf5; }
  .adm-dropzone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; }
  .adm-dropzone-text { font-size: 13px; color: #94a3b8; line-height: 1.8; }
  .adm-dropzone-text b { color: #c59c55; }
  .adm-img-prev { width: 100%; height: 150px; object-fit: cover; border-radius: 5px; margin-top: 10px; border: 1px solid #e2e8f0; display: block; }
  .adm-prog { height: 3px; border-radius: 2px; background: #e2e8f0; margin-top: 8px; overflow: hidden; }
  .adm-prog-bar { height: 100%; background: #c59c55; border-radius: 2px; transition: width 0.3s; }
  .adm-img-hint { font-size: 11px; color: #94a3b8; margin-top: 6px; line-height: 1.5; }

  /* Login */
  .adm-login-page { min-height: 100vh; background: #f1f5f9; display: flex; align-items: center; justify-content: center; padding: 24px; }
  .adm-login-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 44px 40px; width: 100%; max-width: 400px; box-shadow: 0 4px 24px rgba(0,0,0,0.06); }
  .adm-login-brand { font-family: 'Cormorant Garamond', serif; font-size: 26px; font-weight: 300; color: #1e293b; margin-bottom: 4px; }
  .adm-login-hint { font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #94a3b8; margin-bottom: 28px; }
  .adm-login-label { display: block; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #64748b; margin-bottom: 5px; }
  .adm-login-input { width: 100%; font-family: 'Inter', sans-serif; font-size: 13px; color: #1e293b; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 10px 12px; outline: none; margin-bottom: 14px; transition: all 0.15s; }
  .adm-login-input:focus { border-color: #c59c55; background: #fff; box-shadow: 0 0 0 2px rgba(197,156,85,0.1); }
  .adm-login-input::placeholder { color: #cbd5e1; }
  .adm-login-err { font-size: 12px; color: #ef4444; margin-bottom: 8px; }

  /* Toast */
  .adm-toast { position: fixed; bottom: 20px; right: 20px; background: #1e293b; color: #fff; padding: 11px 16px; border-radius: 6px; font-size: 13px; z-index: 999; box-shadow: 0 4px 16px rgba(0,0,0,0.2); animation: tin 0.25s ease; }
  @keyframes tin { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }

  /* Confirm Modal */
  .adm-modal-bg { position: fixed; inset: 0; background: rgba(15,23,42,0.5); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .adm-modal { background: #fff; border-radius: 8px; padding: 28px; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.2); }
  .adm-modal h3 { font-size: 16px; font-weight: 600; color: #1e293b; margin-bottom: 8px; }
  .adm-modal p { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 20px; }
  .adm-modal-btns { display: flex; justify-content: flex-end; gap: 8px; }

  /* Misc */
  .adm-empty { padding: 52px 20px; text-align: center; color: #cbd5e1; font-size: 13px; }
  .adm-loading { padding: 52px 20px; text-align: center; color: #94a3b8; font-size: 13px; }
  .adm-login-page { flex: 1; }

  /* ── DARK MODE ────────────────────────────────────────── */
  .adm.dark { background: #0f172a; color: #e2e8f0; }
  .adm.dark .adm-sb { background: #1e293b; border-right-color: #334155; }
  .adm.dark .adm-sb-brand { border-bottom-color: #334155; }
  .adm.dark .adm-sb-name { color: #f1f5f9; }
  .adm.dark .adm-sb-sub { color: #64748b; }
  .adm.dark .adm-sb-sec { color: #475569; }
  .adm.dark .adm-sb-item { color: #94a3b8; }
  .adm.dark .adm-sb-item:hover { background: #334155; color: #f1f5f9; }
  .adm.dark .adm-sb-item.on { background: #0f172a; color: #c59c55; }
  .adm.dark .adm-sb-footer { border-top-color: #334155; }
  .adm.dark .adm-topbar { background: #1e293b; border-bottom-color: #334155; }
  .adm.dark .adm-topbar-title { color: #f1f5f9; }
  .adm.dark .adm-user-pill { background: #0f172a; border-color: #334155; color: #94a3b8; }
  .adm.dark .adm-stat { background: #1e293b; border-color: #334155; }
  .adm.dark .adm-stat-val { color: #f1f5f9; }
  .adm.dark .adm-card { background: #1e293b; border-color: #334155; }
  .adm.dark .adm-card-head { border-bottom-color: #334155; }
  .adm.dark .adm-card-title { color: #f1f5f9; }
  .adm.dark .adm-th { background: #0f172a; color: #64748b; border-bottom-color: #334155; }
  .adm.dark .adm-td { color: #cbd5e1; border-bottom-color: #334155; }
  .adm.dark .adm-tr:hover .adm-td { background: #334155; }
  .adm.dark .adm-thumb-ph { background: #334155; color: #475569; }
  .adm.dark .adm-tag { background: #334155; color: #94a3b8; }
  .adm.dark .adm-label { color: #94a3b8; }
  .adm.dark .adm-input { background: #0f172a; border-color: #334155; color: #e2e8f0; }
  .adm.dark .adm-input:focus { border-color: #c59c55; }
  .adm.dark .adm-input::placeholder { color: #475569; }
  .adm.dark .adm-textarea { background: #0f172a; border-color: #334155; color: #e2e8f0; }
  .adm.dark .adm-textarea::placeholder { color: #475569; }
  .adm.dark .adm-select { background: #0f172a; border-color: #334155; color: #e2e8f0; }
  .adm.dark .adm-search input { background: #0f172a; border-color: #334155; color: #e2e8f0; }
  .adm.dark .adm-search input::placeholder { color: #475569; }
  .adm.dark .adm-btn-white { background: #1e293b; color: #cbd5e1; border-color: #334155; }
  .adm.dark .adm-btn-white:hover { background: #334155; }
  .adm.dark .adm-btn-red { background: #1e293b; border-color: #334155; }
  .adm.dark .adm-btn-red:hover { background: #334155; }
  .adm.dark .adm-overlay { background: rgba(0,0,0,0.65); }
  .adm.dark .adm-panel { background: #1e293b; box-shadow: -12px 0 40px rgba(0,0,0,0.5); }
  .adm.dark .adm-panel::-webkit-scrollbar-thumb { background: #334155; }
  .adm.dark .adm-panel-head { background: #1e293b; border-bottom-color: #334155; }
  .adm.dark .adm-panel-title { color: #f1f5f9; }
  .adm.dark .adm-panel-footer { background: #1e293b; border-top-color: #334155; }
  .adm.dark .adm-form-sep { border-bottom-color: #334155; }
  .adm.dark .adm-dropzone { background: #0f172a; border-color: #334155; }
  .adm.dark .adm-dropzone:hover { border-color: #c59c55; background: #0f172a; }
  .adm.dark .adm-dropzone-text { color: #64748b; }
  .adm.dark .adm-modal { background: #1e293b; }
  .adm.dark .adm-modal h3 { color: #f1f5f9; }
  .adm.dark .adm-modal p { color: #94a3b8; }
  .adm.dark .adm-login-page { background: #0f172a; }
  .adm.dark .adm-login-card { background: #1e293b; border-color: #334155; box-shadow: 0 4px 24px rgba(0,0,0,0.5); }
  .adm.dark .adm-login-brand { color: #f1f5f9; }
  .adm.dark .adm-login-hint { color: #64748b; }
  .adm.dark .adm-login-label { color: #94a3b8; }
  .adm.dark .adm-login-input { background: #0f172a; border-color: #334155; color: #e2e8f0; }
  .adm.dark .adm-login-input:focus { border-color: #c59c55; }
  .adm.dark .adm-toast { background: #334155; }
  .adm.dark .adm-empty { color: #475569; }
  .adm.dark .adm-loading { color: #64748b; }
`;

/* ─── ICONS ──────────────────────────────────────────────────────────── */
const Ico = {
  grid:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  users:   <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  home:    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  plus:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  x:       <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  search:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  logout:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  eye:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  edit:    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash:   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  upload:  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
};

/* ─── TOAST ──────────────────────────────────────────────────────────── */
function Toast({ msg, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 3000); return () => clearTimeout(t); }, [onDone]);
  return <div className="adm-toast">{msg}</div>;
}

/* ─── CONFIRM MODAL ──────────────────────────────────────────────────── */
function Confirm({ title, msg, onOk, onCancel }) {
  return (
    <div className="adm-modal-bg" onClick={onCancel}>
      <div className="adm-modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{msg}</p>
        <div className="adm-modal-btns">
          <button className="adm-btn adm-btn-white" onClick={onCancel}>Cancel</button>
          <button className="adm-btn adm-btn-red" onClick={onOk}>Delete</button>
        </div>
      </div>
    </div>
  );
}

/* ─── LOGIN ──────────────────────────────────────────────────────────── */
function LoginScreen({ onExit }) {
  const [mode, setMode] = useState("signin"); // "signin" | "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function switchMode(m) {
    setMode(m); setErr(""); setSuccess("");
    setEmail(""); setPassword(""); setConfirm("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErr(""); setSuccess(""); setLoading(true);
    if (mode === "signup") {
      if (password !== confirm) { setErr("Passwords do not match."); setLoading(false); return; }
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErr(error.message);
      else {
        const { data: existing } = await supabase.from("Users").select("id").eq("email", email).maybeSingle();
        if (existing) {
          await supabase.from("Users").update({ is_admin: true }).eq("email", email);
        } else {
          await supabase.from("Users").insert([{ email, is_admin: true, created_at: new Date().toISOString() }]);
        }
        setSuccess("Account created! You can now sign in.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErr(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="adm-login-page">
      <div className="adm-login-card">
        <div className="adm-login-brand">Tiffany &amp; Cris</div>
        <div className="adm-login-hint">Admin Dashboard</div>

        <div style={{ display: "flex", border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden", marginBottom: 24 }}>
          {["signin", "signup"].map(m => (
            <button key={m} type="button"
              onClick={() => switchMode(m)}
              style={{ flex: 1, padding: "8px", fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 500, border: "none", cursor: "pointer", background: mode === m ? "#fffbf5" : "#f8fafc", color: mode === m ? "#c59c55" : "#94a3b8", transition: "all 0.15s" }}>
              {m === "signin" ? "Sign In" : "Sign Up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label className="adm-login-label">Email</label>
          <input className="adm-login-input" type="email" placeholder="admin@email.com" value={email} onChange={e => setEmail(e.target.value)} required autoFocus />
          <label className="adm-login-label">Password</label>
          <input className="adm-login-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} required />
          {mode === "signup" && (
            <>
              <label className="adm-login-label">Confirm Password</label>
              <input className="adm-login-input" type="password" placeholder="••••••••" value={confirm} onChange={e => setConfirm(e.target.value)} required />
            </>
          )}
          {err && <div className="adm-login-err">{err}</div>}
          {success && <div style={{ fontSize: 12, color: "#16a34a", marginBottom: 8 }}>{success}</div>}
          <button className="adm-btn adm-btn-gold" style={{ width: "100%", marginTop: "12px", justifyContent: "center" }} disabled={loading}>
            {loading ? "Please wait..." : mode === "signin" ? "Sign In" : "Create Account"}
          </button>
        </form>

        <div style={{ marginTop: "14px", textAlign: "center" }}>
          <button className="adm-btn adm-btn-white adm-btn-sm" onClick={onExit}>← Back to Site</button>
        </div>
      </div>
    </div>
  );
}

/* ─── SIDEBAR ────────────────────────────────────────────────────────── */
function Sidebar({ tab, setTab, user, onSignOut, onExit }) {
  const navItems = [
    { key: "overview",     label: "Overview",     icon: Ico.home },
    { key: "collections",  label: "Collections",  icon: Ico.grid },
    { key: "users",        label: "Users",        icon: Ico.users },
    { key: "requests",     label: "Requests",     icon: Ico.eye },
  ];
  return (
    <aside className="adm-sb">
      <div className="adm-sb-brand">
        <div className="adm-sb-name">Tiffany &amp; Cris</div>
        <div className="adm-sb-sub">Admin Dashboard</div>
      </div>
      <nav className="adm-sb-nav">
        <div className="adm-sb-sec">Menu</div>
        {navItems.map(({ key, label, icon }) => (
          <button key={key} className={`adm-sb-item${tab === key ? " on" : ""}`} onClick={() => setTab(key)}>
            {icon} {label}
          </button>
        ))}
      </nav>
      <div className="adm-sb-footer">
        <button className="adm-sb-item" onClick={onExit}>{Ico.eye} View Site</button>
        <button className="adm-sb-item" onClick={onSignOut}>{Ico.logout} Sign Out</button>
      </div>
    </aside>
  );
}

/* ─── COLLECTION FORM PANEL ──────────────────────────────────────────── */
function CollectionForm({ editItem, onSave, onClose }) {
  const isEdit = Boolean(editItem?.id);
  const [form, setForm] = useState(isEdit ? {
    name: editItem.name || "", category: editItem.category || "Handbag",
    price: editItem.price || "", badge: editItem.badge || "",
    badge_type: editItem.badge_type || "gold",
    description: editItem.description || "", tagline: editItem.tagline || "",
    image_url: editItem.image_url || "",
    specs: { ...emptyForm.specs, ...(editItem.specs || {}) },
  } : emptyForm);

  const [imgMode, setImgMode] = useState("url");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(editItem?.image_url || null);
  const [progress, setProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  function handleFileChange(e) {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function uploadImage(file) {
    const path = `images/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    setProgress(30);
    const { data, error } = await supabase.storage.from("collections").upload(path, file, { upsert: true });
    if (error) throw new Error(error.message);
    setProgress(90);
    const { data: { publicUrl } } = supabase.storage.from("collections").getPublicUrl(data.path);
    setProgress(100);
    return publicUrl;
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      let image_url = form.image_url;
      if (imgMode === "upload" && file) image_url = await uploadImage(file);
      await onSave({ ...form, price: Number(form.price), image_url });
    } catch (err) {
      alert("Error saving: " + err.message);
    }
    setSaving(false);
  }

  return (
    <>
      <div className="adm-overlay" onClick={onClose} />
      <div className="adm-panel">
        <div className="adm-panel-head">
          <div className="adm-panel-title">{isEdit ? "Edit Collection" : "New Collection"}</div>
          <button className="adm-btn adm-btn-white adm-btn-sm" onClick={onClose}>{Ico.x}</button>
        </div>

        <form className="adm-panel-body" onSubmit={handleSave} id="col-form">
          <div className="adm-form-sep">Image</div>
          <div className="adm-img-toggle">
            <button type="button" className={imgMode === "url" ? "on" : ""} onClick={() => setImgMode("url")}>Paste URL</button>
            <button type="button" className={imgMode === "upload" ? "on" : ""} onClick={() => setImgMode("upload")}>Upload File</button>
          </div>

          {imgMode === "url" ? (
            <div className="adm-field">
              <input className="adm-input" placeholder="https://..." value={form.image_url}
                onChange={e => { setForm(f => ({ ...f, image_url: e.target.value })); setPreview(e.target.value); }} />
              {preview && <img src={preview} className="adm-img-prev" alt="" onError={e => e.target.style.display = "none"} />}
            </div>
          ) : (
            <div className="adm-field">
              <div className="adm-dropzone">
                <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
                {preview
                  ? <img src={preview} style={{ width: "100%", height: 150, objectFit: "cover", borderRadius: 5, marginTop: 0 }} alt="" />
                  : <div className="adm-dropzone-text">{Ico.upload}<br /><b>Click to upload</b> or drag image here</div>
                }
              </div>
              {progress > 0 && progress < 100 && (
                <div className="adm-prog"><div className="adm-prog-bar" style={{ width: `${progress}%` }} /></div>
              )}
              <div className="adm-img-hint">Requires a public <strong>Collection</strong> bucket in Supabase Storage.</div>
            </div>
          )}

          <div className="adm-form-sep">Details</div>
          <div className="adm-row2">
            <div className="adm-field">
              <label className="adm-label">Name</label>
              <input className="adm-input" placeholder="Twist MM" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div className="adm-field">
              <label className="adm-label">Category</label>
              <select className="adm-select" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="adm-row2">
            <div className="adm-field">
              <label className="adm-label">Price (USD)</label>
              <input className="adm-input" type="number" placeholder="3200" value={form.price}
                onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required />
            </div>
            <div className="adm-field">
              <label className="adm-label">Badge (optional)</label>
              <input className="adm-input" placeholder="New Arrival" value={form.badge}
                onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />
            </div>
          </div>
          <div className="adm-field">
            <label className="adm-label">Description</label>
            <textarea className="adm-textarea" placeholder="Describe the piece..." value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
          </div>
          <div className="adm-field">
            <label className="adm-label">Tagline</label>
            <input className="adm-input" placeholder="Power distilled into perfect structure." value={form.tagline}
              onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} />
          </div>

          <div className="adm-form-sep">Specifications</div>
          <div className="adm-row2">
            {SPEC_KEYS.map(key => (
              <div className="adm-field" key={key}>
                <label className="adm-label">{key}</label>
                <input className="adm-input" placeholder={key} value={form.specs[key] || ""}
                  onChange={e => setForm(f => ({ ...f, specs: { ...f.specs, [key]: e.target.value } }))} />
              </div>
            ))}
          </div>
        </form>

        <div className="adm-panel-footer">
          <button type="submit" form="col-form" className="adm-btn adm-btn-gold" style={{ flex: 1, justifyContent: "center" }} disabled={saving}>
            {saving ? "Saving..." : isEdit ? "Update Collection" : "Add to Collection"}
          </button>
          <button type="button" className="adm-btn adm-btn-white" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </>
  );
}

/* ─── OVERVIEW PANEL ─────────────────────────────────────────────────── */
function OverviewPanel({ colCount, userCount, recent }) {
  return (
    <div>
      <div className="adm-stats">
        <div className="adm-stat">
          <div className="adm-stat-label">Total Collections</div>
          <div className="adm-stat-val">{colCount}</div>
          <div className="adm-stat-hint">Active pieces</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat-label">Registered Users</div>
          <div className="adm-stat-val">{userCount}</div>
          <div className="adm-stat-hint">All time</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat-label">Categories</div>
          <div className="adm-stat-val">{CATS.length}</div>
          <div className="adm-stat-hint">Collection types</div>
        </div>
      </div>

      {recent.length > 0 && (
        <div className="adm-card">
          <div className="adm-card-head">
            <span className="adm-card-title">Recent Collections</span>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th className="adm-th">Image</th>
                <th className="adm-th">Name</th>
                <th className="adm-th">Category</th>
                <th className="adm-th">Price</th>
                <th className="adm-th">Added</th>
              </tr>
            </thead>
            <tbody>
              {recent.slice(0, 5).map(c => (
                <tr key={c.id} className="adm-tr">
                  <td className="adm-td">
                    {c.image_url ? <img src={c.image_url} className="adm-thumb" alt="" /> : <div className="adm-thumb-ph">—</div>}
                  </td>
                  <td className="adm-td" style={{ fontWeight: 500 }}>{c.name}</td>
                  <td className="adm-td"><span className="adm-tag">{c.category}</span></td>
                  <td className="adm-td" style={{ color: "#c59c55", fontWeight: 500 }}>${c.price?.toLocaleString()}</td>
                  <td className="adm-td" style={{ color: "#94a3b8", fontSize: "12px" }}>{new Date(c.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

/* ─── COLLECTIONS PANEL ──────────────────────────────────────────────── */
function CollectionsPanel({ onCountChange }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [formItem, setFormItem] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("collections").select("*").order("created_at", { ascending: false });
    setItems(data || []);
    onCountChange(data?.length || 0);
    setLoading(false);
  }

  const filtered = items.filter(i => {
    const matchCat = catFilter === "All" || i.category === catFilter;
    const matchSearch = i.name?.toLowerCase().includes(search.toLowerCase()) ||
      i.category?.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  async function handleSave(data) {
    if (formItem?.id) {
      await supabase.from("collections").update(data).eq("id", formItem.id);
      setToast("Collection updated.");
    } else {
      await supabase.from("collections").insert([{ ...data, created_at: new Date().toISOString() }]);
      setToast("Collection added.");
    }
    setFormItem(null);
    load();
  }

  async function handleDelete(item) {
    await supabase.from("collections").delete().eq("id", item.id);
    setItems(prev => prev.filter(i => i.id !== item.id));
    onCountChange(items.length - 1);
    setConfirm(null);
    setToast("Collection deleted.");
  }

  return (
    <div>
      <div className="adm-card">
        <div className="adm-card-head">
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <span className="adm-card-title">Collections ({items.length})</span>
            <div style={{ display: "flex", gap: "6px" }}>
              {["All", ...CATS].map(c => (
                <button key={c} className={`adm-btn adm-btn-sm ${catFilter === c ? "adm-btn-gold" : "adm-btn-white"}`}
                  onClick={() => setCatFilter(c)}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div className="adm-search">
              {Ico.search}
              <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <button className="adm-btn adm-btn-gold" onClick={() => setFormItem({})}>
              {Ico.plus} Add New
            </button>
          </div>
        </div>

        {loading ? (
          <div className="adm-loading">Loading collections...</div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty">No collections found.</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th className="adm-th">Image</th>
                <th className="adm-th">Name</th>
                <th className="adm-th">Category</th>
                <th className="adm-th">Price</th>
                <th className="adm-th">Badge</th>
                <th className="adm-th">Date Added</th>
                <th className="adm-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.id} className="adm-tr">
                  <td className="adm-td">
                    {item.image_url ? <img src={item.image_url} className="adm-thumb" alt="" /> : <div className="adm-thumb-ph">—</div>}
                  </td>
                  <td className="adm-td" style={{ fontWeight: 500, color: "#1e293b" }}>{item.name}</td>
                  <td className="adm-td"><span className="adm-tag">{item.category}</span></td>
                  <td className="adm-td" style={{ color: "#c59c55", fontWeight: 500 }}>${item.price?.toLocaleString()}</td>
                  <td className="adm-td">{item.badge ? <span className="adm-badge-gold">{item.badge}</span> : <span style={{ color: "#e2e8f0" }}>—</span>}</td>
                  <td className="adm-td" style={{ color: "#94a3b8", fontSize: "12px" }}>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="adm-td">
                    <div className="adm-actions">
                      <button className="adm-btn adm-btn-white adm-btn-sm" onClick={() => setFormItem(item)}>{Ico.edit} Edit</button>
                      <button className="adm-btn adm-btn-red adm-btn-sm" onClick={() => setConfirm(item)}>{Ico.trash} Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {formItem !== null && (
        <CollectionForm editItem={formItem?.id ? formItem : null} onSave={handleSave} onClose={() => setFormItem(null)} />
      )}
      {confirm && (
        <Confirm title="Delete Collection" msg={`Delete "${confirm.name}"? This cannot be undone.`}
          onOk={() => handleDelete(confirm)} onCancel={() => setConfirm(null)} />
      )}
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </div>
  );
}

/* ─── USERS PANEL ────────────────────────────────────────────────────── */
function UsersPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [err, setErr] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    supabase.from("Users").select("*").order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) setErr(error.message);
        else setUsers(data || []);
        setLoading(false);
      });
  }, []);

  async function toggleAdmin(u) {
    const next = !u.is_admin;
    await supabase.from("Users").update({ is_admin: next }).eq("id", u.id);
    setUsers(prev => prev.map(x => x.id === u.id ? { ...x, is_admin: next } : x));
    setToast(`${u.email} is now ${next ? "Admin" : "Customer"}`);
  }

  const filtered = users.filter(u => u.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <>
      <div className="adm-card">
        <div className="adm-card-head">
          <span className="adm-card-title">Users ({users.length})</span>
          <div className="adm-search">
            {Ico.search}
            <input placeholder="Search by email..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <div className="adm-loading">Loading users...</div>
        ) : err ? (
          <div className="adm-empty" style={{ color: "#ef4444" }}>
            Could not load users.<br />
            <span style={{ fontSize: "12px" }}>Make sure the <strong>Users</strong> table has an <strong>is_admin</strong> column. Run: <code>alter table "Users" add column if not exists is_admin boolean default false;</code></span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="adm-empty">No users found.</div>
        ) : (
          <table className="adm-table">
            <thead>
              <tr>
                <th className="adm-th">Email</th>
                <th className="adm-th">Role</th>
                <th className="adm-th">User ID</th>
                <th className="adm-th">Joined</th>
                <th className="adm-th">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(u => (
                <tr key={u.id} className="adm-tr">
                  <td className="adm-td" style={{ fontWeight: 500 }}>{u.email || "—"}</td>
                  <td className="adm-td">
                    <span style={{
                      display: "inline-block", fontSize: 10, fontWeight: 500,
                      padding: "3px 10px", borderRadius: 12, textTransform: "capitalize",
                      ...(u.is_admin
                        ? { background: "#fffbf0", color: "#c59c55", border: "1px solid rgba(197,156,85,0.3)" }
                        : { background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0" })
                    }}>
                      {u.is_admin ? "Admin" : "Customer"}
                    </span>
                  </td>
                  <td className="adm-td" style={{ color: "#94a3b8", fontSize: "11px", fontFamily: "monospace" }}>{u.id}</td>
                  <td className="adm-td" style={{ color: "#94a3b8", fontSize: "12px" }}>{new Date(u.created_at).toLocaleDateString()}</td>
                  <td className="adm-td">
                    <button
                      className={`adm-btn adm-btn-sm ${u.is_admin ? "adm-btn-red" : "adm-btn-gold"}`}
                      onClick={() => toggleAdmin(u)}
                    >
                      {u.is_admin ? "Make Customer" : "Make Admin"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {toast && <Toast msg={toast} onDone={() => setToast(null)} />}
    </>
  );
}

/* ─── REQUESTS PANEL ─────────────────────────────────────────────────── */
const STATUS_STYLE = {
  pending:   { bg: "#fffbf0", color: "#c59c55", border: "rgba(197,156,85,0.3)" },
  confirmed: { bg: "#f0fdf4", color: "#16a34a", border: "rgba(22,163,74,0.3)" },
  completed: { bg: "#f8fafc", color: "#64748b", border: "#e2e8f0" },
  declined:  { bg: "#fef2f2", color: "#ef4444", border: "#fecaca" },
};

function RequestsPanel({ onCountChange }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("viewing_requests").select("*").order("created_at", { ascending: false });
    setRequests(data || []);
    onCountChange?.(data?.length || 0);
    setLoading(false);
  }

  async function updateStatus(id, status) {
    await supabase.from("viewing_requests").update({ status }).eq("id", id);
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  }

  const filtered = requests.filter(r => {
    const q = search.toLowerCase();
    const matchSearch = r.user_email?.toLowerCase().includes(q) || r.collection_name?.toLowerCase().includes(q);
    const matchStatus = statusFilter === "All" || r.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="adm-card">
      <div className="adm-card-head">
        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          <span className="adm-card-title">Viewing Requests ({requests.length})</span>
          <div style={{ display: "flex", gap: "6px" }}>
            {["All", "pending", "confirmed", "completed", "declined"].map(s => (
              <button key={s} className={`adm-btn adm-btn-sm ${statusFilter === s ? "adm-btn-gold" : "adm-btn-white"}`}
                onClick={() => setStatusFilter(s)} style={{ textTransform: "capitalize" }}>{s}</button>
            ))}
          </div>
        </div>
        <div className="adm-search">
          {Ico.search}
          <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      {loading ? (
        <div className="adm-loading">Loading requests...</div>
      ) : filtered.length === 0 ? (
        <div className="adm-empty">No viewing requests found.</div>
      ) : (
        <table className="adm-table">
          <thead>
            <tr>
              <th className="adm-th">User</th>
              <th className="adm-th">Item</th>
              <th className="adm-th">Message</th>
              <th className="adm-th">Status</th>
              <th className="adm-th">Date</th>
              <th className="adm-th">Update</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => {
              const sc = STATUS_STYLE[r.status] || STATUS_STYLE.pending;
              return (
                <tr key={r.id} className="adm-tr">
                  <td className="adm-td" style={{ fontWeight: 500 }}>{r.user_email || "—"}</td>
                  <td className="adm-td"><span className="adm-tag">{r.collection_name || "—"}</span></td>
                  <td className="adm-td" style={{ maxWidth: 180, fontSize: 12, color: "#64748b" }}>{r.message || <span style={{ color: "#e2e8f0" }}>—</span>}</td>
                  <td className="adm-td">
                    <span style={{ display: "inline-block", fontSize: 10, fontWeight: 500, padding: "3px 10px", borderRadius: 12, textTransform: "capitalize", background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>{r.status}</span>
                  </td>
                  <td className="adm-td" style={{ color: "#94a3b8", fontSize: 12 }}>{new Date(r.created_at).toLocaleDateString()}</td>
                  <td className="adm-td">
                    <select className="adm-select" value={r.status} onChange={e => updateStatus(r.id, e.target.value)} style={{ width: "auto", padding: "5px 8px", fontSize: 11 }}>
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirm</option>
                      <option value="completed">Complete</option>
                      <option value="declined">Decline</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────────────── */
export default function AdminPage({ onExit }) {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [tab, setTab] = useState("overview");
  const [colCount, setColCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [recentCols, setRecentCols] = useState([]);
  const [reqCount, setReqCount] = useState(0);
  const [adminTheme, setAdminTheme] = useState(() => localStorage.getItem("adm-theme") || "light");

  function toggleAdminTheme() {
    setAdminTheme(t => {
      const next = t === "light" ? "dark" : "light";
      localStorage.setItem("adm-theme", next);
      return next;
    });
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    supabase.from("collections").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setColCount(data?.length || 0); setRecentCols(data || []); });
    supabase.from("Users").select("id")
      .then(({ data }) => setUserCount(data?.length || 0));
  }, [user]);

  const titles = { overview: "Overview", collections: "Collections", users: "Users", requests: "Viewing Requests" };

  const darkClass = adminTheme === "dark" ? " dark" : "";

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", background: adminTheme === "dark" ? "#0f172a" : "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", fontFamily: "Inter, sans-serif", fontSize: "13px" }}>
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <style>{S}</style>
        <div className={"adm" + darkClass}>
          <LoginScreen onExit={onExit} />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{S}</style>
      <div className={"adm" + darkClass}>
        <Sidebar tab={tab} setTab={setTab} user={user} onSignOut={async () => { await supabase.auth.signOut(); window.location.href = "/"; }} onExit={onExit} />
        <div className="adm-main">
          <div className="adm-topbar">
            <div className="adm-topbar-title">{titles[tab]}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <button
                className="adm-btn adm-btn-white adm-btn-sm"
                onClick={toggleAdminTheme}
                title="Toggle theme"
                style={{ fontSize: "15px", padding: "5px 10px" }}
              >
                {adminTheme === "dark" ? "☀" : "☾"}
              </button>
              <div className="adm-user-pill">{user.email}</div>
            </div>
          </div>
          <div className="adm-content">
            {tab === "overview"    && <OverviewPanel colCount={colCount} userCount={userCount} recent={recentCols} />}
            {tab === "collections" && <CollectionsPanel onCountChange={setColCount} />}
            {tab === "users"       && <UsersPanel />}
            {tab === "requests"    && <RequestsPanel onCountChange={setReqCount} />}
          </div>
        </div>
      </div>
    </>
  );
}
