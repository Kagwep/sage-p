import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors()); // Allow all origins
app.use(express.json()); // Enable JSON parsing

// GET request proxy
app.get('/proxy/swap_quote', async (req, res) => {
  try {
    const response = await fetch('https://canoe.icarus.tools/market/usor/swap_quote');
    const data = await response.json();
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
