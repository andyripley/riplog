// Global site config. Edit me!
export const SITE = {
  title: "Riplog",
  tagline: "Ramblings on tech, hobbies, and life",
  description: "Best viewed in Netscape Navigator 4.0.",
  author: "Andy Ripley",
  email: "andy@ley.rip",
  // Shown in footer, like every good 90s site
  lastUpdated: new Date(),
};

export const NAV = [
  { href: "/", label: "Home", enable: true },
  { href: "/about/", label: "About", enable: true },
  { href: "/blog/", label: "Blog", enable: true },
  { href: "/links/", label: "Links", enable: false },
  { href: "/guestbook/", label: "Guestbook", enable: false },
] as const;
