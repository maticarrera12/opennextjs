export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="[&_article_h1]:text-4xl [&_article_h1]:font-bold [&_article_h1]:mb-4 [&_article_h2]:text-3xl [&_article_h2]:font-semibold [&_article_h2]:mt-8 [&_article_h2]:mb-3 [&_article_h3]:text-2xl [&_article_h3]:font-semibold [&_article_h3]:mt-6 [&_article_h3]:mb-2 [&_article_p]:mb-4 [&_article_p]:leading-7 [&_article_ul]:mb-4 [&_article_ul]:pl-6 [&_article_ul]:list-disc [&_article_li]:mb-2 [&_article_li]:leading-7">
        {children}
      </div>
    </div>
  );
}
