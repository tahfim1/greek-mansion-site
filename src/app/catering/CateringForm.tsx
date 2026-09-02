'use client';

import { useState, FormEvent } from 'react';

export default function CateringForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    // Simulated — in production this would POST to an API route
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl p-8 border border-[#E8DCCB]/60 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="text-xl text-[#1E1C59] mb-2" style={{ fontFamily: "'Marcellus', serif" }}>
          Inquiry Sent!
        </h3>
        <p className="text-[#11102F]/60 text-sm">
          Thank you for your inquiry. We&apos;ll be in touch shortly. You can also reach us at{' '}
          <a href="tel:+14162923333" className="text-[#B18C56] font-semibold">+1 416-292-3333</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 sm:p-8 border border-[#E8DCCB]/60">
      {/* Honeypot */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="catering-name" className="form-label">Full Name *</label>
          <input type="text" id="catering-name" name="name" required className="form-input" autoComplete="name" />
        </div>
        <div>
          <label htmlFor="catering-email" className="form-label">Email *</label>
          <input type="email" id="catering-email" name="email" required className="form-input" autoComplete="email" />
        </div>
        <div>
          <label htmlFor="catering-phone" className="form-label">Phone *</label>
          <input type="tel" id="catering-phone" name="phone" required className="form-input" autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="catering-event-type" className="form-label">Event Type</label>
          <select id="catering-event-type" name="eventType" className="form-input">
            <option value="">Select an option</option>
            <option value="office">Office / Corporate</option>
            <option value="birthday">Birthday / Celebration</option>
            <option value="family">Family Gathering</option>
            <option value="community">Community / Church Event</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label htmlFor="catering-date" className="form-label">Event Date *</label>
          <input type="date" id="catering-date" name="eventDate" required className="form-input" />
        </div>
        <div>
          <label htmlFor="catering-guests" className="form-label">Estimated Guests *</label>
          <input type="number" id="catering-guests" name="guests" required min="1" className="form-input" placeholder="e.g. 20" />
        </div>
        <div>
          <label htmlFor="catering-pickup" className="form-label">Pickup Preference</label>
          <select id="catering-pickup" name="pickup" className="form-input">
            <option value="pickup">Pickup from restaurant</option>
            <option value="discuss">Discuss delivery options</option>
          </select>
        </div>
        <div>
          <label htmlFor="catering-budget" className="form-label">Budget Range (Optional)</label>
          <select id="catering-budget" name="budget" className="form-input">
            <option value="">Select a range</option>
            <option value="under-200">Under $200</option>
            <option value="200-500">$200 – $500</option>
            <option value="500-1000">$500 – $1,000</option>
            <option value="1000+">$1,000+</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="catering-details" className="form-label">Additional Details</label>
        <textarea
          id="catering-details"
          name="details"
          rows={4}
          maxLength={1000}
          className="form-input resize-y"
          placeholder="Tell us about your event, dietary needs, or any questions..."
        />
      </div>

      <div className="mt-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-[#E8DCCB] text-[#1E1C59] focus:ring-[#B18C56]" />
          <span className="text-[#11102F]/60 text-xs leading-relaxed">
            I consent to Greek Mansion Restaurant collecting this information to respond to my catering inquiry. My information will not be shared with third parties.
          </span>
        </label>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-primary !rounded-full flex-1 !justify-center disabled:opacity-60"
        >
          {status === 'sending' ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Sending...
            </span>
          ) : (
            'Send Inquiry'
          )}
        </button>
      </div>

      {status === 'error' && (
        <p className="mt-4 text-red-600 text-sm text-center">
          Something went wrong. Please try again or call us directly.
        </p>
      )}
    </form>
  );
}
