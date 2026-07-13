import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// If you want to add set-based stats, add logic here. For now, just keep as is.
function calculateStats(rows) {
  let benceWins = 0, berecWins = 0, draws = 0, clay = 0, hard = 0;
  rows.forEach(row => {
    if (row.winner === 'Bence') benceWins++;
    if (row.winner === 'Berec') berecWins++;
    if (row.winner === 'Draw') draws++;
    if (row.court === 'clay') clay++;
    if (row.court === 'hard') hard++;
  });
  const total = rows.length;
  return {
    benceWins,
    berecWins,
    draws,
    total,
    winRate: total ? ((benceWins / total) * 100).toFixed(1) : 0,
    clay,
    hard,
  };
}

export default function Statistics({ rows }) {
  const stats = calculateStats(rows);
  return (
    <Paper sx={{ p: 2, mb: 2, background: '#f7f3e3', border: '2px solid #2e473b' }}>
      <Typography variant="h6" gutterBottom sx={{ color: '#2e473b', fontWeight: 700 }}>Statistics</Typography>
      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        <Typography sx={{ color: '#d36c2c' }}>Bence Wins: {stats.benceWins}</Typography>
        <Typography sx={{ color: '#2e473b' }}>Berec Wins: {stats.berecWins}</Typography>
        <Typography sx={{ color: '#7a8b8c' }}>Draws: {stats.draws}</Typography>
        <Typography sx={{ color: '#b1a16a' }}>Total Matches: {stats.total}</Typography>
        <Typography sx={{ color: '#2e473b' }}>Win Rate (Bence): {stats.winRate}%</Typography>
        <Typography sx={{ color: '#d36c2c' }}>Clay: {stats.clay}</Typography>
        <Typography sx={{ color: '#2e473b' }}>Hard: {stats.hard}</Typography>
      </Box>
    </Paper>
  );
}
