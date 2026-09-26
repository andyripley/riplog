const KEY = "blog:hits";

interface HitRecord {
  hits: number;
}

export async function readHitCount() {
  const keyExist = await kv.has(KEY);
  if (keyExist === false) {
    await kv.set(KEY, { hits: 0 });
  }
  const hitCount = await kv.get<HitRecord>(KEY);
  return hitCount?.hits ?? 0;
}

export async function incrementHitCount() {
  const hitCount = await readHitCount();
  await kv.set(KEY, { hits: hitCount + 1 });
  const newHitCount = await readHitCount();
  return newHitCount;
}
