'use client';

import Link from 'next/link';
import PolicyPageLayout from '@/components/PolicyPageLayout';

// Define the navigation items for the sidebar
const navItems = [
  { href: '#introduction', label: 'Introduction' },
  { href: '#information-collection', label: 'Information We Collect' },
  { href: '#information-use', label: 'How We Use Information' },
  { href: '#information-sharing', label: 'Information Sharing' },
  { href: '#data-retention', label: 'Data Retention' },
  { href: '#data-security', label: 'Data Security' },
  { href: '#childrens-privacy', label: 'Children\'s Privacy' },
  { href: '#contact-us', label: 'Contact Us' },
];

export default function PrivacyPage() {
  return (
    <PolicyPageLayout navItems={navItems} pageTitle="Privacy Policy">
      <p className="italic text-gray-500 mb-8">Last Updated: September 19, 2025</p>
      
      <section id="introduction" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Introduction</h2>
        <p>Welcome to MaBook ("we," "us," or "our"). We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our AI-powered book recommendation service (the "Service").</p>
      </section>

      <section id="information-collection" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Information We Collect</h2>
        <p className="text-gray-700 leading-relaxed">We believe in data minimization. Our Service does not require you to create an account, and we do not collect any personal information like your name, email address, or IP address.</p>
        <p className="text-gray-700 leading-relaxed mt-4">The only information we process is the <strong>User Prompt</strong>: the text query you voluntarily submit to our search box to receive a book recommendation. We strongly advise you not to include any sensitive personal data in your prompts.</p>
      </section>

      <section id="information-use" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">How We Use Your Information</h2>
        <p className="text-gray-700 leading-relaxed">Your prompt is used exclusively to generate a book recommendation in a single session. This is an automated, multi-step process:</p>
        <ol className="list-decimal list-inside mt-4 space-y-2 text-gray-700">
            <li>Your prompt is sent to a third-party AI service to determine its language and identify relevant book genres.</li>
            <li>We use these genres to find matching books from our database.</li>
            <li>Highlights from those books are sent back to the AI, along with your original prompt, to be ranked for relevance and translated if necessary.</li>
        </ol>
      </section>

      <section id="information-sharing" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Information Sharing and Third Parties</h2>
        <p className="text-gray-700 leading-relaxed">To provide our Service, your prompt is shared with our third-party AI provider for processing. We do not sell, rent, or share your prompts with any other third parties.</p>
      </section>

      <section id="data-retention" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Data Retention</h2>
        <p className="text-gray-700 leading-relaxed"><strong>Currently, we do not store your prompts after your session ends.</strong> However, to make our AI smarter and more helpful, we plan to save prompts in the future. This will allow us to use feedback to improve the quality of our recommendations. If our data handling practices change, we will update this policy.</p>
      </section>

      <section id="data-security" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Data Security</h2>
        <p className="text-gray-700 leading-relaxed">We implement reasonable security measures to protect the information during transmission. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee its absolute security.</p>
      </section>

      <section id="childrens-privacy" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Children's Privacy</h2>
        <p className="text-gray-700 leading-relaxed">Our Service is available to a general audience. We do not knowingly collect any personally identifiable information from children under the age of 13. If you believe your child has provided us with information, please contact us, and we will take steps to remove it.</p>
      </section>
      
       <section id="contact-us" className="mb-12 scroll-mt-20">
        <h2 className="text-3xl font-serif text-classic-green border-b pb-2 mb-4">Contact Us</h2>
        <p>If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:mabook.official@gmail.com" className="text-classic-green font-semibold hover:underline">mabook.official@gmail.com</a>.</p>
      </section>
    </PolicyPageLayout>
  );
}