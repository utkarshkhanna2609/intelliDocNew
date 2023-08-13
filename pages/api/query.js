// pages/api/query.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const userQuery = req.body.query;
  let conversationHistory = `User: ${userQuery}\n`;

  if (userQuery.toLowerCase().includes('bye doctor')) {
    conversationHistory = '';
    return res.json({ response: 'Goodbye! Take care.' });
  }

  const prompt = `
  System: You are a medical professional, assistant to a doctor, you only have knowledge about the medical field. You talk to the user until he says goodbye doctor. To any query that is not related to the medical, injuries, sports, nutrition field, I want you to reply with "As a medical assistant, I don't have the answer to this query. Additionally, my main area of expertise is in the medical field.". Just tell the possible medical conditions and suggest remedies or medicines, suggest any scans or tests that the user may take if you feel like so.
  ${conversationHistory}
  Assistant:`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/text-davinci-003/completions',
      {
        prompt,
        temperature: 0.8,
        max_tokens: 400,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const assistantResponse = response.data.choices[0].text.trim();
    conversationHistory += `Assistant: ${assistantResponse}\n`;

    res.json({ response: assistantResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
}
