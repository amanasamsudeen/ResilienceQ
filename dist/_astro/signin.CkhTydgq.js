import { j as e, r as s } from "./index.BaM2DRbY.js";
import { T as p } from "./theme-provider.DE2wROqN.js";
import { r as a } from "./index.L0DL-mCJ.js";
import { F as x, a as g, b as f } from "./LockClosedIcon.D9QC_GPc.js";
function j({ title: t, titleId: n, ...o }, r) {
  return a.createElement(
    "svg",
    Object.assign(
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        "aria-hidden": "true",
        "data-slot": "icon",
        ref: r,
        "aria-labelledby": n,
      },
      o,
    ),
    t ? a.createElement("title", { id: n }, t) : null,
    a.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: "M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z",
    }),
  );
}
const b = a.forwardRef(j);
function S() {
  const [t, n] = a.useState({ email: "", password: "" }),
    [o, r] = a.useState(""),
    [i, c] = a.useState(""),
    m = (l) => {
      n({ ...t, [l.target.name]: l.target.value });
    },
    h = async (l) => {
      (l.preventDefault(), r(""), c(""));
      try {
        const d = await fetch("http://localhost:8000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(t),
          }),
          u = await d.json();
        if (!d.ok) {
          r(u.detail || "Login failed");
          return;
        }
        (c("Login successful!"),
          setTimeout(() => {
            window.location.href = "";
          }, 1500));
      } catch {
        r("Server not reachable");
      }
    };
  return e.jsx(p, {
    children: e.jsxs("section", {
      className: "grid h-screen items-center lg:grid-cols-2 bg-gray-50",
      children: [
        e.jsxs("div", {
          className: "my-auto p-8 sm:p-12 md:p-20 xl:px-32",
          children: [
            e.jsxs(s.Typography, {
              variant: "h3",
              className: "mb-2 font-semibold text-blue-gray-900",
              children: [
                "Welcome Back to ",
                e.jsx("span", {
                  className: "text-blue-600",
                  children: "ResilienceQ",
                }),
              ],
            }),
            e.jsx(s.Typography, {
              className: "mb-12 text-blue-gray-700",
              children:
                "Sign in to continue your resilience assessment journey.",
            }),
            e.jsxs("form", {
              className: "mx-auto max-w-[24rem]",
              onSubmit: h,
              children: [
                e.jsx("div", {
                  className: "mb-6",
                  children: e.jsx(s.Input, {
                    size: "lg",
                    label: "Email",
                    type: "email",
                    name: "email",
                    icon: e.jsx(x, { className: "h-5 w-5" }),
                    onChange: m,
                    required: !0,
                  }),
                }),
                e.jsx("div", {
                  className: "mb-6",
                  children: e.jsx(s.Input, {
                    size: "lg",
                    label: "Password",
                    type: "password",
                    name: "password",
                    icon: e.jsx(g, { className: "h-5 w-5" }),
                    onChange: m,
                    required: !0,
                  }),
                }),
                o &&
                  e.jsx(s.Typography, {
                    className: "mb-3 text-sm text-red-500",
                    children: o,
                  }),
                i &&
                  e.jsx(s.Typography, {
                    className: "mb-3 text-sm text-green-600",
                    children: i,
                  }),
                e.jsxs(s.Button, {
                  color: "black",
                  size: "lg",
                  fullWidth: !0,
                  type: "submit",
                  className: "mt-4 flex items-center justify-center gap-2",
                  children: [e.jsx(f, { className: "h-5 w-5" }), "Sign In"],
                }),
                e.jsxs(s.Typography, {
                  className: "mt-6 text-center text-sm text-blue-gray-700",
                  children: [
                    "Don't have an account?",
                    e.jsxs("a", {
                      href: "signup",
                      className:
                        "ml-2 inline-flex items-center gap-1 font-medium text-blue-600 hover:underline",
                      children: [e.jsx(b, { className: "h-4 w-4" }), "Sign Up"],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
        e.jsx("img", {
          src: "resilience.jpg",
          alt: "Resilience background",
          className: "hidden h-screen w-full object-cover lg:block",
        }),
      ],
    }),
  });
}
export { S as default };
