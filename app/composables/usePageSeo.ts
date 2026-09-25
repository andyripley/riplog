import { SITE } from "~/../shared/site";

interface ArticleSeo {
  publishedTime: Date | string;
  modifiedTime?: Date | string;
  tags?: string[];
}

export function usePageSeo(
  title: string | undefined,
  description: string = SITE.description,
  article?: ArticleSeo,
) {
  const route = useRoute();
  const canonical = computed(() => new URL(route.path, SITE.url).toString());
  const fullTitle = title ? `${title} :: ${SITE.title}` : SITE.title;

  useSeoMeta({
    title,
    description,
    ogTitle: fullTitle,
    ogDescription: description,
    ogUrl: canonical,
    ogType: article ? "article" : "website",
    articlePublishedTime: article
      ? new Date(article.publishedTime).toISOString()
      : undefined,
    articleModifiedTime: article?.modifiedTime
      ? new Date(article.modifiedTime).toISOString()
      : undefined,
    articleTag: article?.tags,
  });

  useHead({
    link: [{ rel: "canonical", href: canonical }],
    script: article
      ? [
          {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: title,
              description,
              datePublished: new Date(article.publishedTime).toISOString(),
              dateModified: new Date(
                article.modifiedTime ?? article.publishedTime,
              ).toISOString(),
              author: { "@type": "Person", name: SITE.author },
              mainEntityOfPage: canonical.value,
            }).replaceAll("<", "\\u003c"),
          },
        ]
      : [],
  });
}
