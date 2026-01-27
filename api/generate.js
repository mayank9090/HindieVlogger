export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { topic } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API Key missing in Vercel Settings!' });
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: `Write a viral Instagram reel script about: ${topic}. Make it engaging and high-energy.` }] }]
      })
    });

    const data = await response.json();
    
    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    // Direct response bhej rahe hain frontend ko
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to connect to Gemini API' });
  }
}
