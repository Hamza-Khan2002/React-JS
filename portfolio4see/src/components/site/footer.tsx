import {FaFacebook, FaInstagram, FaLinkedin} from "react-icons/fa";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

import { Logo } from "./logo";

const SITEMAP = [
  { label: "Home", href: "#top" },
  { label: "Team", href: "#team" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

/* [EDIT ME] real social + contact links */
const SOCIALS = [
  { label: "Email 4See", href: "mailto:hello@4see.dev", icon: Mail },
  { label: "4See on LinkedIn", href: "https://www.linkedin.com/company/4see-digital-agency/", icon: FaLinkedin },
  { label: "4See on Facebook", href: "https://facebook.com/profile.php?id=61595620587896", icon: FaFacebook },
  { label: "4See on Instagram", href: "https://instagram.com/4see.agency/", icon: FaInstagram },
];

export function SiteFooter() {
  return (
    <footer className="px-5 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <Logo showTagline />

        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-3">
          {SITEMAP.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="interactive text-sm text-muted-foreground hover:text-label"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ul className="flex gap-2">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                aria-label={social.label}
                className="interactive flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-label hover:text-label"
              >
                <social.icon className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} 4See. See beyond. Build better.
      </div>
    </footer>
  );
}