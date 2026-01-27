export default async function handler(req, res) {
    // API KEY hum Vercel Dashboard mein daalenge
    const API_KEY = process.env.GEMINI_API_KEY; 

    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');
    
    const { topic } = req.body;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Write a viral Instagram reel script for: "${topic}". Use a mix of Hindi and English (Hinglish) and sometimes Odia if the topic is local. Include Hook, Body, and relevant Hashtags.`
                    }]
                }]
            })
        });

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: "API connection failed" });
    }
}
