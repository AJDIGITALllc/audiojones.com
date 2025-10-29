import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
        {/* Company */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/careers" className="hover:text-white">Careers</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/services/ai-brand-systems" className="hover:text-white">AI Brand Systems</a></li>
            <li><a href="/services/podcast-production" className="hover:text-white">Podcast Production</a></li>
            <li><a href="/services/marketing-automation" className="hover:text-white">Marketing Automation</a></li>
            <li><a href="/services/creator-coaching" className="hover:text-white">Creator Coaching</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="/insights" className="hover:text-white">Insights</a></li>
            <li><a href="/studio" className="hover:text-white">Studio Tour</a></li>
            <li><a href="/newsletter" className="hover:text-white">Newsletter</a></li>
            <li><a href="/free-ai-audit" className="hover:text-white">Free AI Audit</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-white/80">
            <li><a href="https://www.youtube.com/@audiojones" target="_blank" rel="noopener noreferrer" className="hover:text-white">YouTube</a></li>
            <li><a href="https://www.instagram.com/audiojones" target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/audiojones" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a></li>
            <li><a href="https://x.com/audiojones" target="_blank" rel="noopener noreferrer" className="hover:text-white">X (Twitter)</a></li>
            <li><a href="https://www.facebook.com/share/1MgYVfPi6e/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="hover:text-white">Facebook</a></li>
          </ul>
        </div>
      </div>

      {/* Map + Address */}
      <div className="mx-auto max-w-7xl px-6 pb-10 text-center">
        <p className="mb-4 text-sm text-white/70">
          <strong>Miami Office — Circle House Studios</strong><br />
          13700 NW 1st Ave, Miami, FL 33168<br />
          <a
            href="https://www.google.com/maps/search/?api=1&query=13700+NW+1st+Ave,+Miami,+FL+33168"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FFD700] hover:underline"
          >
            View on Google Maps
          </a>
        </p>
        <div className="w-full max-w-xl mx-auto mb-6 rounded-lg overflow-hidden border border-white/10 shadow-lg">
          <iframe
            title="Audio Jones — Circle House Studios Map"
            src="https://www.google.com/maps?q=13700+NW+1st+Ave,+Miami,+FL+33168&output=embed"
            width="100%"
            height="220"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="text-xs text-white/60">
          © {new Date().getFullYear()} Audio Jones / AJ Digital LLC. All rights reserved.
        </p>
      </div>
    </footer>
  );
}