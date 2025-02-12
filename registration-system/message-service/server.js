require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');

const app = express();
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.post('/generate-message', async (req, res) => {
    try {
        const { name } = req.body;

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "user",
                content: `Generate a friendly, short welcome message for a new user named ${name}. Keep it under 100 characters.`
            }]
        });

        const message = completion.choices[0].message.content;
        res.json({ message });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to generate message' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Message service running on port ${PORT}`);
}); 