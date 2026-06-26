import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'ai-tutor-api',
      configureServer(server) {
        server.middlewares.use('/api/ai-tutor', (req, res, next) => {
          if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const messages = data.messages || [];
                const currentLesson = data.currentLesson || 'General Syllabus';
                const category = data.category || 'General';

                const apiKey = process.env.GEMINI_API_KEY;
                if (!apiKey) {
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'GEMINI_API_KEY not configured on server side' }));
                  return;
                }

                // Prepare system context prompt
                const systemPrompt = `You are a helpful, expert academic AI Tutor specializing in the domain category "${category}". You are teaching a student currently studying the lesson "${currentLesson}". Assist the student with deep concepts, formulas, code, or metaphors. Keep answers structured and relevant to the lesson contents.`;

                // Map messages to Gemini contents structure
                // Format: [{ role: "user"|"model", parts: [{ text: "..." }] }]
                const contents = [];
                
                // Add System instruction context as part of the first prompt
                contents.push({
                  role: 'user',
                  parts: [{ text: systemPrompt }]
                });
                
                // Add the chat transcript
                for (const msg of messages) {
                  // Skip system message or welcome greetings to keep it focused
                  if (msg.id === 'welcome' || msg.id?.startsWith('welcome-')) {
                    continue;
                  }
                  contents.push({
                    role: msg.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: msg.content }]
                  });
                }

                // Call the Gemini API
                const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ contents })
                });

                if (!response.ok) {
                  const errorText = await response.text();
                  throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
                }

                const resJson = await response.json();
                const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ text }));
              } catch (err) {
                console.error("Vite proxy AI Tutor error:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ]
})
