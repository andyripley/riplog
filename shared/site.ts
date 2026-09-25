export const SITE = {
  title: "Riplog",
  tagline: "Ramblings on tech, hobbies, and life",
  description: "Best viewed in Netscape Navigator 4.0.",
  author: "Andy Ripley",
  email: "andy@ley.rip",
  url: "https://ley.rip",
  lastUpdated: new Date(),
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
] as const;
