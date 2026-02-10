import { j as e, r as s } from "./index.BaM2DRbY.js";
import "./index.L0DL-mCJ.js";
const o = new Date().getFullYear(),
  c = [
    { icon: "fab fa-github", link: "https://github.com/" },
    { icon: "fab fa-linkedin", link: "https://www.linkedin.com/" },
    { icon: "fab fa-twitter", link: "https://twitter.com/" },
  ],
  m = [
    { name: "About PsyConnect AI", link: "/about" },
    { name: "Our Mission", link: "/mission" },
    { name: "Research & Publications", link: "/research" },
    { name: "Counsellor Network", link: "/counsellors" },
  ],
  d = [
    { name: "FAQs", link: "/faq" },
    { name: "Contact Support", link: "/contact" },
    { name: "Ethical Disclaimer", link: "/ethics" },
    { name: "Crisis Resources", link: "/crisis-support" },
  ],
  x = [
    { name: "Psychological Scales", link: "/scales" },
    { name: "Self-Help Resources", link: "/resources" },
    { name: "Blog & Articles", link: "/blog" },
    { name: "AI Transparency", link: "/ai-transparency" },
  ];
function p() {
  return e.jsxs("footer", {
    className:
      "relative bg-white px-8 pt-16 pb-8 border-t border-blue-gray-100",
    children: [
      e.jsx("div", {
        className:
          "absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500",
      }),
      e.jsxs("div", {
        className: "container mx-auto",
        children: [
          e.jsxs("div", {
            className: "flex flex-wrap gap-y-12",
            children: [
              e.jsxs("div", {
                className: "w-full md:w-4/12",
                children: [
                  e.jsx(s.Typography, {
                    variant: "h4",
                    className:
                      "mb-3 font-bold tracking-tight text-blue-gray-900",
                    children: "ResilienceQ",
                  }),
                  e.jsxs(s.Typography, {
                    className: "text-sm leading-relaxed text-gray-600 max-w-sm",
                    children: [
                      "An AI-enabled digital platform for assessing psychological resilience using standardized, research-backed scales.",
                      e.jsxs("span", {
                        className: "font-medium",
                        children: [" ", "Designed for insight, not diagnosis."],
                      }),
                    ],
                  }),
                  e.jsx("div", {
                    className: "mt-6 flex gap-3",
                    children: c.map(({ icon: a, link: l }, t) =>
                      e.jsx(
                        "a",
                        {
                          href: l,
                          target: "_blank",
                          rel: "noreferrer",
                          className:
                            "flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600",
                          children: e.jsx("i", { className: `${a} text-base` }),
                        },
                        t,
                      ),
                    ),
                  }),
                ],
              }),
              e.jsx("div", {
                className: "ml-auto w-full md:w-7/12",
                children: e.jsxs("div", {
                  className: "flex flex-wrap",
                  children: [
                    e.jsx(i, { title: "Platform", items: m }),
                    e.jsx(i, { title: "Help & Safety", items: d }),
                    e.jsx(i, { title: "Resources", items: x }),
                  ],
                }),
              }),
            ],
          }),
          e.jsx("hr", { className: "my-8 border-blue-gray-100" }),
          e.jsxs("div", {
            className:
              "flex flex-col md:flex-row items-center justify-between gap-4",
            children: [
              e.jsxs(s.Typography, {
                className: "text-sm text-gray-600",
                children: [
                  "© ",
                  o,
                  " ",
                  e.jsx("span", {
                    className: "font-medium",
                    children: "ResilienceQ",
                  }),
                  ". All rights reserved.",
                ],
              }),
              e.jsx(s.Typography, {
                className:
                  "text-xs leading-relaxed text-gray-500 max-w-2xl text-center md:text-right",
                children:
                  "ResilienceQ is a self-assessment and educational platform. It does not provide medical diagnosis or emergency services. If you are in distress, please seek support from a qualified professional.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
function i({ title: a, items: l }) {
  return e.jsxs("div", {
    className: "w-6/12 md:w-3/12 mb-8",
    children: [
      e.jsx("span", {
        className:
          "mb-4 block text-sm font-semibold tracking-wide text-blue-gray-900",
        children: a,
      }),
      e.jsx("ul", {
        className: "space-y-2",
        children: l.map(({ name: t, link: r }, n) =>
          e.jsx(
            "li",
            {
              children: e.jsx("a", {
                href: r,
                className:
                  "text-sm text-gray-600 transition hover:text-blue-600 hover:translate-x-1 inline-block",
                children: t,
              }),
            },
            n,
          ),
        ),
      }),
    ],
  });
}
export { p as default };
