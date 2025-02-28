import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
// ✅ Allow CORS for all origins with explicit headers
app.use(cors({ origin: '*' })); 
app.use(express.json()); 

// ✅ Handle Preflight (OPTIONS) Requests
app.options('*', cors());

// GET request proxy
app.post('/proxy/swap_quote', async (req, res) => {
    try {
      const body = req.body; // Get the request body
      const response = await fetch('https://canoe.icarus.tools/market/usor/swap_quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
  
      const data = await response.json();
      res.setHeader('Access-Control-Allow-Origin', '*'); // ✅ Explicitly allow CORS
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch swap quote' });
    }
  });
  

// POST request proxy
app.post('/proxy/execution_information', async (req, res) => {
  try {
    const body = req.body;
    const response = await fetch('https://canoe.icarus.tools/market/usor/execution_information', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch execution information' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
