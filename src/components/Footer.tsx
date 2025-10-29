import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import BuildStamp from "@/components/BuildStamp";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white/80 pt-16 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-10 px-6">
        <div>
          <h4 className="font-bold mb-3 text-white">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/careers">Careers</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-white">Services</h4>
          <ul className="space-y-2 text-sm">
            <li>AI Brand Systems</li>
            <li>Podcast Production</li>
            <li>Marketing Automation</li>
            <li>Creator Coaching</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/insights">Insights</Link></li>
            <li><Link href="/studio">Studio Tour</Link></li>
            <li><Link href="/newsletter">Newsletter</Link></li>
            <li><Link href="/free-audit">Free AI Audit</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-white">Connect</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="https://www.facebook.com/AudioJones" aria-label="Facebook" target="_blank" rel="me noopener" className="inline-flex items-center gap-2">
                <svg className="h-5 w-5 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.028C18.343 21.128 22 16.991 22 12z" />
                </svg>
                <span>Facebook</span>
              </a>
            </li>
            <li><a href="https://www.instagram.com/audiojones" target="_blank">Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/audiojones" target="_blank">LinkedIn</a></li>
            <li><a href="https://www.youtube.com/@audiojones" target="_blank">YouTube</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/legal/privacy">Privacy Policy</Link></li>
            <li><Link href="/legal/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <NewsletterForm />

      <div className="text-center text-xs text-white/50 mt-2 pb-10">
        <div>© {new Date().getFullYear()} AJ DIGITAL LLC · Audio Jones · All Rights Reserved.</div>
        <div className="mt-2">
          <BuildStamp />
        </div>
      </div>
    </footer>
  );
}

