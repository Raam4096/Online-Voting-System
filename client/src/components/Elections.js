import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Elections = () => {
  const [elections, setElections] = useState([]);
  const [message, setMessage] = useState('');
  const [hasVotedGlobally, setHasVotedGlobally] = useState(false);

  const fetchElections = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/elections', {
        headers: { 'x-auth-token': localStorage.getItem('token') }
      });
      const electionsWithSymbols = res.data.map(election => ({
        ...election,
        symbol: getRandomSymbol(),
        partyName: getRandomPartyName()
      }));
      setElections(electionsWithSymbols);
      
      // Check if the user has voted in any election
      const userHasVoted = electionsWithSymbols.some(election => 
        election.votes.some(vote => vote.user === localStorage.getItem('userId'))
      );
      setHasVotedGlobally(userHasVoted);
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch elections');
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  const getRandomSymbol = () => {
    const symbols = ['🌳', '🦁', '🐘', '🌺', '🌟', '🚲', '☀', '🏠', '🚀', '🎵'];
    return symbols[Math.floor(Math.random() * symbols.length)];
  };

  const getRandomPartyName = () => {
    const adjectives = ['United', 'Progressive', 'Democratic', 'National', 'People\'s'];
    const nouns = ['Alliance', 'Party', 'Coalition', 'Front', 'Union'];
    return ${adjectives[Math.floor(Math.random() * adjectives.length)]} ${nouns[Math.floor(Math.random() * nouns.length)]};
  };

  const handleVote = async (electionId) => {
    if (hasVotedGlobally) {
      setMessage('You can only cast one vote across all elections.');
      return;
    }

    try {
      const res = await axios.post(http://localhost:5000/api/elections/${electionId}/vote,
        {},
        { headers: { 'x-auth-token': localStorage.getItem('token') }}
      );
      setMessage(res.data.msg);
      setHasVotedGlobally(true);
      // Refresh elections to update UI
      fetchElections();
    } catch (err) {
      console.error(err.response?.data);
      setMessage(err.response?.data?.msg || 'Voting failed');
    }
  };

  return (
    <div className="elections-container">
      <h2>Current Elections</h2>
      {message && <div className="message">{message}</div>}
      <div className="election-list">
        {elections.map(election => (
          <div key={election._id} className="election-card">
            <div className="election-symbol">{election.symbol}</div>
            <h3>{election.title}</h3>
            <p>{election.description}</p>
            <p><strong>{election.partyName}</strong></p>
            <button
              onClick={() => handleVote(election._id)}
              className="vote-btn"
              disabled={hasVotedGlobally}
            >
              {hasVotedGlobally ? 'Voted' : 'Vote'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Elections;