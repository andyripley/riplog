export default defineEventHandler(async (event) => {
  prepareHitResponse(event);
  return { count: await readHitCount() };
});
