import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import { siteConfig } from '../data/siteConfig';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  // This form links to mailto: since there is no backend.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    const subject2 = encodeURIComponent(subject || 'Contact from XYZ Games.site');
    window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject2}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with the XYZ Games.site team."
        url="/contact"
      />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-brand-muted">Questions, feedback or game submissions — we're here.</p>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card p-10 text-center"
          >
            <CheckCircle className="w-14 h-14 text-green-400 mx-auto mb-4" />
            <h2 className="font-display text-2xl font-bold mb-2">Message ready!</h2>
            <p className="text-brand-muted text-sm">Your mail client should have opened with your message pre-filled.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            <FormField
              label="Your Name"
              id="name"
              type="text"
              value={form.name}
              onChange={v => setForm(f => ({ ...f, name: v }))}
              required
              icon={<MessageSquare className="w-4 h-4" />}
            />
            <FormField
              label="Email Address"
              id="email"
              type="email"
              value={form.email}
              onChange={v => setForm(f => ({ ...f, email: v }))}
              required
              icon={<Mail className="w-4 h-4" />}
            />
            <FormField
              label="Subject"
              id="subject"
              type="text"
              value={form.subject}
              onChange={v => setForm(f => ({ ...f, subject: v }))}
            />
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-brand-muted mb-1.5">
                Message <span className="text-brand-purple">*</span>
              </label>
              <textarea
                id="message"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={6}
                placeholder="How can we help you?"
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3
                           text-sm text-brand-text placeholder-brand-dim resize-none
                           focus:outline-none focus:border-brand-purple transition-colors"
              />
            </div>
            <button type="submit" className="btn-primary w-full justify-center">
              <Send className="w-4 h-4" />
              Send Message
            </button>
            <p className="text-xs text-brand-dim text-center">
              Or email us directly at{' '}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-brand-purple hover:underline">
                {siteConfig.contact.email}
              </a>
            </p>
          </form>
        )}
      </main>
    </>
  );
}

interface FormFieldProps {
  label:    string;
  id:       string;
  type:     string;
  value:    string;
  onChange: (v: string) => void;
  required?: boolean;
  icon?:    React.ReactNode;
}

function FormField({ label, id, type, value, onChange, required, icon }: FormFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-brand-muted mb-1.5">
        {label} {required && <span className="text-brand-purple">*</span>}
      </label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-dim pointer-events-none">
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          required={required}
          className={`w-full bg-brand-bg border border-brand-border rounded-xl py-3
                      text-sm text-brand-text placeholder-brand-dim
                      focus:outline-none focus:border-brand-purple transition-colors
                      ${icon ? 'pl-10 pr-4' : 'px-4'}`}
          placeholder={label}
        />
      </div>
    </div>
  );
}
