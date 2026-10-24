const express = require('express');
const router = express.Router();
const Analysis = require('../models/Analysis');
const { optionalAuth, requireAuth } = require('../middleware/auth');
const { memoryStore } = require('../database/db');

// GET /api/analyses
router.get('/', optionalAuth, async (req, res) => {
  try {
    const { crop, search } = req.query;
    let results = [];

    // Try MongoDB
    try {
      const query = {};
      if (crop && crop !== 'all') {
        query.crop = new RegExp(`^${crop}$`, 'i');
      }
      if (search) {
        query.$or = [
          { crop: new RegExp(search, 'i') },
          { diseaseName: new RegExp(search, 'i') },
          { id: new RegExp(search, 'i') }
        ];
      }
      results = await Analysis.find(query).sort({ createdAt: -1 }).limit(100);
    } catch {
      // Memory Store fallback
      results = memoryStore.analyses.filter(item => {
        let match = true;
        if (crop && crop !== 'all') {
          match = match && item.crop.toLowerCase() === crop.toLowerCase();
        }
        if (search) {
          const s = search.toLowerCase();
          match = match && (
            item.crop.toLowerCase().includes(s) ||
            item.diseaseName.toLowerCase().includes(s) ||
            item.id.toLowerCase().includes(s)
          );
        }
        return match;
      });
    }

    res.json(results);
  } catch (err) {
    console.error('Fetch analyses error:', err);
    res.status(500).json({ message: 'Failed to retrieve analysis records.' });
  }
});

// GET /api/analyses/:id
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    let found = null;

    try {
      found = await Analysis.findOne({ id });
    } catch {
      found = memoryStore.analyses.find(a => a.id === id);
    }

    if (!found) {
      found = memoryStore.analyses.find(a => a.id === id);
    }

    if (!found) {
      return res.status(404).json({ message: 'Analysis record not found.' });
    }

    res.json(found);
  } catch (err) {
    console.error('Fetch analysis by ID error:', err);
    res.status(500).json({ message: 'Failed to retrieve analysis record.' });
  }
});

// DELETE /api/analyses/:id
router.delete('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    try {
      await Analysis.deleteOne({ id });
    } catch {
      // Memory store delete
      memoryStore.analyses = memoryStore.analyses.filter(a => a.id !== id);
    }

    memoryStore.analyses = memoryStore.analyses.filter(a => a.id !== id);
    res.json({ message: 'Analysis record deleted successfully.' });
  } catch (err) {
    console.error('Delete analysis error:', err);
    res.status(500).json({ message: 'Failed to delete analysis record.' });
  }
});

module.exports = router;
