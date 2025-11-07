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
            <li><a href="https://www.youtube.com/@audiojones" target="_blank">YouTube</a></li>
            <li><a href="https://www.instagram.com/audiojones" target="_blank">Instagram</a></li>
            <li><a href="https://www.linkedin.com/in/audiojones" target="_blank">LinkedIn</a></li>
            <li><a href="https://x.com/audiojones" target="_blank">X (Twitter)</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-white">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-of-service">Terms of Service</Link></li>
            <li><Link href="/cancellation-policy">Cancellation Policy</Link></li>
            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
            <li><Link href="/studio-policy">Studio Policy</Link></li>
          </ul>
        </div>
      </div>

      <NewsletterForm />

      <div className="text-center text-xs text-white/50 mt-8 pb-10">
        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto mb-6 text-white/40">
          <p className="mb-3">
            <strong>Disclaimer:</strong> Audio Jones (AJ Digital LLC) provides marketing, automation, and
            creative services for informational and educational purposes. We make no guarantees of specific
            financial or ranking outcomes. Results vary based on client effort, competition, and market
            conditions.
          </p>
          <p>
            All operations are governed by Florida law. In-person sessions occur inside Circle House Studios,
            13700 NW 1st Ave, Miami, FL 33168.
          </p>
        </div>
        
        {/* Copyright */}
        <div>© {new Date().getFullYear()} AJ DIGITAL LLC · Audio Jones · All Rights Reserved.</div>
        <div className="mt-2">
          <BuildStamp />
        </div>
      </div>
    </footer>
  );
}

