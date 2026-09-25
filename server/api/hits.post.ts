export default defineEventHandler(async (event) => {
  const origin = getHeader(event, "origin");
  if (origin !== getRequestURL(event).origin) {
    throw createError({ statusCode: 403, statusMessage: "Invalid origin" });
  }
  prepareHitResponse(event);
  return { count: await incrementHitCount() };
});
