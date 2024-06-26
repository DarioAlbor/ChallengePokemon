import React, { useEffect, useState, useRef } from 'react';
import { Typography, Box, Button } from '@mui/material';
import Confetti from 'react-confetti';
import './css/pokemonbattlelog.css';

const PokemonBattleLog = ({ attackLog, winner, isWinner, onReplay, battleAudioRef }) => {
  const [currentLogIndex, setCurrentLogIndex] = useState(0);
  const [displayLogs, setDisplayLogs] = useState([]);
  const [showWinner, setShowWinner] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const battleLogRef = useRef(null);
  const logContainerRef = useRef(null);

  useEffect(() => {
    if (currentLogIndex < attackLog.length) {
      const timeout = setTimeout(() => {
        setDisplayLogs((prevLogs) => [...prevLogs, attackLog[currentLogIndex]]);
        setCurrentLogIndex((prevIndex) => prevIndex + 1);
      }, 1000);

      return () => clearTimeout(timeout);
    } else if (currentLogIndex === attackLog.length) {
      const timeout = setTimeout(() => {
        setShowWinner(true);
        if (battleAudioRef.current) {
          battleAudioRef.current.pause();
          battleAudioRef.current.currentTime = 0;
        }
        const audio = new Audio(isWinner ? '/assets/win.mp3' : '/assets/defeat.mp3');
        audio.play();
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentLogIndex, attackLog, isWinner, battleAudioRef]);

  useEffect(() => {
    if (battleLogRef.current) {
      battleLogRef.current.scrollTop = battleLogRef.current.scrollHeight;
    }
  }, [displayLogs]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [displayLogs]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Box className="battle-log-container" ref={logContainerRef}>
      {isWinner && showWinner && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          style={{ zIndex: -1, position: 'fixed', top: 0, left: 0 }}
        />
      )}
      {!showWinner ? (
        <Box className="battle-log" ref={battleLogRef}>
          {displayLogs.map((log, index) => (
            <Typography key={index} variant="body2">
              {log}
            </Typography>
          ))}
        </Box>
      ) : (
        <Box className={`winner-box ${isWinner ? 'winner' : 'loser'}`}>
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            ¡Ha ganado {winner}!
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={onReplay}
          >
            Volver a jugar
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default PokemonBattleLog;