import { Typography } from "@material-tailwind/react";

const YEAR = new Date().getFullYear();

const SOCIAL_MEDIA = [
  { icon: "fab fa-github", link: "https://github.com/" },
  { icon: "fab fa-linkedin", link: "https://www.linkedin.com/" },
  { icon: "fab fa-twitter", link: "https://twitter.com/" },
];

const COMPANY = [
  { name: "About ResilienceQ", link: "/about" },
  { name: "Our Mission", link: "/mission" },
  { name: "Research & Publications", link: "/blogs" },
  { name: "Counsellor Network", link: "/counsellors" },
];

const HELP = [
  { name: "FAQs", link: "/faq" },
  { name: "Contact Support", link: "/contact" },
  { name: "Ethical Disclaimer", link: "/ethics" },
  { name: "Crisis Resources", link: "/crisis-support" },
];

const RESOURCES = [
  { name: "Psychological Scales", link: "/scales" },
  { name: "Self-Help Resources", link: "/resources" },
  { name: "Blog & Articles", link: "/blog" },
  { name: "AI Transparency", link: "/ai-transparency" },
];

export function Footer() {
  return (
    <footer className="relative bg-white px-8 pt-16 pb-8 border-t border-blue-gray-100">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      <div className="container mx-auto">
        <div className="flex flex-wrap gap-y-12">
          {/* Brand */}
          <div className="w-full md:w-4/12">
            <Typography
              variant="h4"
              className="mb-3 font-bold tracking-tight text-blue-gray-900"
            >
              ResilienceQ
            </Typography>

            <Typography className="text-sm leading-relaxed text-gray-600 max-w-sm">
              An AI-enabled digital platform for assessing psychological
              resilience using standardized, research-backed scales.
              <span className="font-medium">
                {" "}
                Designed for insight, not diagnosis.
              </span>
            </Typography>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {SOCIAL_MEDIA.map(({ icon, link }, key) => (
                <a
                  key={key}
                  href={link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                >
                  <i className={`${icon} text-base`} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="ml-auto w-full md:w-7/12">
            <div className="flex flex-wrap">
              <FooterColumn title="Platform" items={COMPANY} />
              <FooterColumn title="Help & Safety" items={HELP} />
              <FooterColumn title="Resources" items={RESOURCES} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-blue-gray-100" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Typography className="text-sm text-gray-600">
            © {YEAR} <span className="font-medium">ResilienceQ</span>. All
            rights reserved.
          </Typography>

          <Typography className="text-xs leading-relaxed text-gray-500 max-w-2xl text-center md:text-right">
            ResilienceQ is a self-assessment and educational platform. It does
            not provide medical diagnosis or emergency services. If you are in
            distress, please seek support from a qualified professional.
          </Typography>
        </div>
      </div>
    </footer>
  );
}

/* Reusable Footer Column */
function FooterColumn({ title, items }) {
  return (
    <div className="w-6/12 md:w-3/12 mb-8">
      <span className="mb-4 block text-sm font-semibold tracking-wide text-blue-gray-900">
        {title}
      </span>
      <ul className="space-y-2">
        {items.map(({ name, link }, key) => (
          <li key={key}>
            <a
              href={link}
              className="text-sm text-gray-600 transition hover:text-blue-600 hover:translate-x-1 inline-block"
            >
              {name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Footer;
