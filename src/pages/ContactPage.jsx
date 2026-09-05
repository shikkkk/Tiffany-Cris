import { useState } from "react";
import { supabase } from "../supabase";
import { infoCards, locations } from "./catalog";

export default function ContactPage() {
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
      <section className="ct-hero" aria-label="Contact header">
        <div className="ct-eyebrow">Tiffany &amp; Cris</div>
        <h1 className="ct-title">Reach the <em>Atelier</em></h1>
        <p className="ct-sub">
          We believe every conversation deserves the same care
          we pour into every stitch. We'd love to hear from you.
        </p>
      </section>

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
              <button className="ct-info-link" type="button">{card.link} â†’</button>
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
    </div>
  );
}

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ROOT APP
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

