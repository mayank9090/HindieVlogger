export default async function handler(req, res) {
    const API_KEY = process.env.GEMINI_API_KEY;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const { topic } = req.body;
    if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
    }

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Write a viral Instagram reel script for: "${topic}" in Hinglish. Include Hook, Body, and Hashtags.` }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates[0].content.parts[0].text) {
            return res.status(200).json(data);
        } else {
            return res.status(500).json({ error: "AI Response Error" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Server Side Error" });
    }
}
