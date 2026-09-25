export default defineAppConfig({
  site: {
    title: "Riplog",
    tagline: "Ramblings on tech, hobbies, and life",
    description: "Best viewed in Netscape Navigator 4.0.",
    author: "Andy Ripley",
    email: "andy@ley.rip",
    url: "https://ley.rip",
    lastUpdated: new Date(),
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ],
});
