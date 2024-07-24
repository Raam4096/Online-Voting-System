const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Election = require('../models/Election');

// Get all elections
router.get('/', auth, async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Vote in an election
router.post('/:id/vote', auth, async (req, res) => {
  try {
    const election = await Election.findById(req.params.id);

    if (!election) {
      return res.status(404).json({ msg: 'Election not found' });
    }

    // Check if the user has already voted
    if (election.votes.some(vote => vote.user.toString() === req.user.id)) {
      return res.status(400).json({ msg: 'You have already voted in this election' });
    }

    // Add the vote
    election.votes.push({ user: req.user.id });

    await election.save();

    res.json({ msg: 'Vote recorded successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;