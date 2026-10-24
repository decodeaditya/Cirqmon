export default async function handler(req, res) {
    const targetUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/@decodeaditya/feed&api_key=${process.env.VITE_RSS_FEED}`;

  try {
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch Medium feed' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data.items || []);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
