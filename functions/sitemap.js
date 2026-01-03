export async function onRequest(context) {
  const baseUrl = "https://asset-garden.pages.dev";

  // プロジェクト内の全ファイルを取得
  const files = await context.env.ASSETS.list();

  // HTML ファイルだけ抽出
  const urls = files.objects
    .filter(obj => obj.key.endsWith(".html"))
    .map(obj => `${baseUrl}/${obj.key}`);

  // sitemap.xml を生成
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(url => `  <url><loc>${url}</loc></url>`)
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml"
    }
  });
}
