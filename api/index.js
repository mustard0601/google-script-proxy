// index.js (api/google-script.js)
import fetch from 'node-fetch';

const NOTION_API_URL = 'https://api.notion.com/v1/pages';
const NOTION_DATABASE_ID = 'YOUR_DATABASE_ID'; // 여기에 Database ID 입력
const NOTION_TOKEN = 'YOUR_NOTION_TOKEN'; // Notion Integration Token 입력

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const songData = req.body;

    const notionData = {
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        Title: { title: [{ text: { content: songData.title } }] },
        Artist: { rich_text: [{ text: { content: songData.artist } }] },
        Link: { url: songData.link },
        Description: { rich_text: [{ text: { content: songData.description } }] },
        Registrant: { rich_text: [{ text: { content: songData.registrant } }] },
        Generation: { number: parseInt(songData.generation) },
        "Main Session": { rich_text: [{ text: { content: songData.mainSession } }] },
        Sessions: { multi_select: songData.sessions.map(session => ({ name: session })) },
        Other1: { rich_text: [{ text: { content: songData.other1 } }] },
        Other2: { rich_text: [{ text: { content: songData.other2 } }] },
      },
    };

    try {
      const response = await fetch(NOTION_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Content-Type': 'application/json',
          'Notion-Version': '2022-06-28'
        },
        body: JSON.stringify(notionData),
      });

      if (response.ok) {
        res.status(200).json({ status: 'success' });
      } else {
        res.status(500).json({ status: 'error', message: 'Failed to add data to Notion' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
