export default defineEventHandler((event) => {
  const url = getRequestURL(event);
  if (url.pathname === "/guestbook" || url.pathname === "/guestbook/") {
    setResponseHeader(event, "x-robots-tag", "noindex, nofollow");
    throw createError({ statusCode: 410, statusMessage: "Guestbook removed" });
  }

  if (
    url.pathname !== "/" &&
    url.pathname.endsWith("/") &&
    !url.pathname.startsWith("/_nuxt/")
  ) {
    return sendRedirect(
      event,
      `${url.pathname.replace(/\/+$/, "")}${url.search}`,
      308,
    );
  }
});
