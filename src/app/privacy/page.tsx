import type { Metadata } from 'next';
import { BUSINESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <section className="pt-32 pb-20 bg-[#F7F3EA]">
      <div className="container-custom mx-auto px-4 sm:px-6 max-w-3xl">
        <h1 className="text-4xl text-[#1E1C59] mb-8" style={{ fontFamily: "'Marcellus', serif" }}>
          Privacy Policy
        </h1>
        <div className="prose prose-sm max-w-none text-[#11102F]/70">
          <p>
            {BUSINESS.name} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This policy explains what information we collect when you use our website and ordering platform.
          </p>
          <h2 className="text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Information We Collect</h2>
          <p>When you place an order or submit an inquiry, we collect your name, email, phone number, and any other details you provide. This information is used solely to process your order or respond to your inquiry.</p>
          <h2 className="text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>How We Use Your Information</h2>
          <p>We use your information to process orders, communicate about your order status, respond to catering inquiries, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
          <h2 className="text-[#1E1C59]" style={{ fontFamily: "'Marcellus', serif" }}>Contact</h2>
          <p>If you have questions about this policy, contact us at {BUSINESS.phone} or visit us at {BUSINESS.address.full}.</p>
        </div>
      </div>
    </section>
  );
}
