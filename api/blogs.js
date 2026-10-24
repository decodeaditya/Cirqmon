import Parser from "rss-parser";

const parser = new Parser()

export default async function handler(req, res) {
  const targetUrl = `https://medium.com/@decodeaditya/feed`;

  try {
    const feed = await parser.parseURL(targetUrl);

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(feed.items || []);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
