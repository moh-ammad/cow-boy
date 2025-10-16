// routes/mautic.js
import express from 'express';
import mauticRequest from '../services/mauticService.js';

const router = express.Router();

router.get('/contacts', async (req, res) => {
  try {
    const data = await mauticRequest('contacts');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: err });
  }
});

router.get('/campaigns', async (req, res) => {
  try {
    const data = await mauticRequest('campaigns');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch campaigns', details: err });
  }
});

router.get('/forms', async (req, res) => {
  try {
    const data = await mauticRequest('forms');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch forms', details: err });
  }
});

router.get('/segments', async (req, res) => {
  try {
    const data = await mauticRequest('segments');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch segments', details: err });
  }
});

router.get('/emails', async (req, res) => {
  try {
    const data = await mauticRequest('emails');
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch emails', details: err });
  }
});

export default router;
