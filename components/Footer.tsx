import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p className="footer-info">
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span className="separator">|</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </p>
        <p className="footer-info">
          &copy; {currentYear} Mabook. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}