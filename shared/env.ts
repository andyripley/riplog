import { z } from "zod";

export const localDatabaseId = "00000000-0000-0000-0000-000000000000";

const envSchema = z
  .object({
    WORKERS_CI: z.string().optional(),
    NUXT_HUB_CLOUDFLARE_DATABASE_ID: z.uuid().optional(),
    NUXT_STUDIO_REPOSITORY_OWNER: z.string().min(1).optional(),
    NUXT_STUDIO_REPOSITORY_NAME: z.string().min(1).optional(),
    NUXT_STUDIO_REPOSITORY_PRIVATE: z.enum(["true", "false"]).optional(),
  })
  .superRefine((env, ctx) => {
    if (!env.WORKERS_CI) return;
    const required = [
      "NUXT_HUB_CLOUDFLARE_DATABASE_ID",
      "NUXT_STUDIO_REPOSITORY_OWNER",
      "NUXT_STUDIO_REPOSITORY_NAME",
    ] as const;
    for (const key of required) {
      if (!env[key]) {
        ctx.addIssue({
          code: "custom",
          path: [key],
          message: `${key} is required in Workers Builds`,
        });
      }
    }
  })
  .transform((env) => ({
    databaseId: env.NUXT_HUB_CLOUDFLARE_DATABASE_ID ?? localDatabaseId,
    repositoryOwner: env.NUXT_STUDIO_REPOSITORY_OWNER ?? "local",
    repositoryName: env.NUXT_STUDIO_REPOSITORY_NAME ?? "riplog",
    repositoryPrivate: env.NUXT_STUDIO_REPOSITORY_PRIVATE !== "false",
  }));

const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(
    `Invalid environment variables:\n${z.prettifyError(parsed.error)}`,
  );
}

export const env = parsed.data;
