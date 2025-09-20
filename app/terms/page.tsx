'use client';

import Link from 'next/link';
import PolicyPageLayout from '@/components/PolicyPageLayout';

// Navigation items for the sidebar
const navItems = [
  { href: '#agreement', label: 'Agreement to Terms' },
  { href: '#service-desc', label: 'Service Description' },
  { href: '#privacy-data', label: 'Privacy and User Data' },
  { href: '#disclaimer', label: 'Disclaimer of Warranties' },
  { href: '#modifications', label: 'Service Modifications' },
  { href: '#prohibited-use', label: 'Prohibited Use' },
  { href: '#governing-law', label: 'Governing Law' },
  { href: '#changes', label: 'Changes to These Terms' },
  { href: '#contact-us', label: 'Contact Us' },
];

export default function TermsPage() {
  return (
    <PolicyPageLayout navItems={navItems} pageTitle="Terms of Service">
        <p className="italic text-gray-500 mb-8">Last Updated: September 19, 2025</p>
      
        <section id="agreement" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Agreement to Terms</h2>
            <p>By accessing and using the MaBook website (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these terms, you must not use our Service.</p>
        </section>

      <section id="service-desc" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Service Description</h2>
        <p className="text-gray-700 leading-relaxed">MaBook provides an AI-powered book discovery platform. Our Service analyzes your text prompts to deliver personalized book recommendations and relevant highlights designed to help you find solutions and insights for your specific needs. The Service is accessible without a user account.</p>
      </section>

      <section id="privacy-data" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Privacy and User Data</h2>
        <p className="text-gray-700 leading-relaxed">Your privacy is important to us. We handle your information as described in our <Link href="/privacy" className="text-classic-green font-semibold hover:underline">Privacy Policy</Link>. As we work to continuously improve our AI, our data practices may evolve. We are committed to transparency and will update our Privacy Policy to reflect any changes in how we improve our service for you in the future.</p>
      </section>

      <section id="disclaimer" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Disclaimer of Warranties</h2>
        <p className="text-gray-700 leading-relaxed">The Service is provided on an "AS IS" and "AS AVAILABLE" basis. While we are confident in our AI's ability to provide relevant and insightful book recommendations, all content is for informational purposes only. We strive for accuracy and excellence, but we cannot guarantee that every recommendation will be a perfect fit for your individual needs.</p>
      </section>

      <section id="modifications" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Service Modifications</h2>
        <p className="text-gray-700 leading-relaxed">We are constantly working to improve the MaBook experience. We reserve the right to modify, update, or discontinue features of the Service at any time without prior notice. These changes are part of our ongoing effort to enhance our AI and provide you with better recommendations every day.</p>
      </section>

      <section id="prohibited-use" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Prohibited Use</h2>
        <p className="text-gray-700 leading-relaxed">You agree not to use the Service for any unlawful purpose or to engage in any activity that could harm, disrupt, or impair our website or AI. Prohibited activities include, but are not limited to, using automated scripts or bots to scrape data or overwhelm our servers.</p>
      </section>

      <section id="governing-law" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Governing Law</h2>
        <p className="text-gray-700 leading-relaxed">These Terms shall be governed and construed in accordance with the laws of the Republic of Indonesia, without regard to its conflict of law provisions.</p>
      </section>

      <section id="changes" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Changes to These Terms</h2>
        <p className="text-gray-700 leading-relaxed">We reserve the right to modify these Terms at any time. We will notify users by updating the "Last Updated" date at the top of this page. Your continued use of the Service after any changes constitutes your acceptance of the new Terms.</p>
      </section>

      <section id="contact-us" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us at <a href="mailto:mabook.official@gmail.com" className="text-classic-green font-semibold hover:underline">mabook.official@gmail.com</a>.</p>
        </section>
    </PolicyPageLayout>
  );
}