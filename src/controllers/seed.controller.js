const router = require('express').Router();
const seedService = require('../services/seed.service');

router.post('/seed', async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).json({ error: 'URL is required' });
        }
        const result = await seedService.addSeed(url);
        res.status(201).json(result);
    } catch (error) {
        console.error('Error adding seed:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;