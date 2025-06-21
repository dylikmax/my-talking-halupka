import React, { useState, useEffect, useRef } from 'react';
import './GamePage.css'; // Стили для игры
import { NavLink } from 'react-router-dom';
import LocalStorageController from '../../local-storage-controller';

const GamePage = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [playerPosition, setPlayerPosition] = useState(50); // позиция игрока в %
  const [obstacles, setObstacles] = useState([]);
  
  const gameAreaRef = useRef(null);
  const playerRef = useRef(null);
  const gameLoopRef = useRef(null);
  const obstacleLoopRef = useRef(null);
  const timeLoopRef = useRef(null);

  // Запуск игры
  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setGameWon(false);
    setTimeLeft(30);
    setObstacles([]);
    setPlayerPosition(50);
  };

  // Обработка движения игрока
  const handleTouchMove = (e) => {
    if (!gameStarted || gameOver) return;
    
    const gameArea = gameAreaRef.current;
    const touch = e.touches[0];
    const gameAreaRect = gameArea.getBoundingClientRect();
    const relativeX = touch.clientX - gameAreaRect.left;
    const percentage = (relativeX / gameAreaRect.width) * 100;
    
    // Ограничиваем движение игрока в пределах игровой области
    const newPosition = Math.max(0, Math.min(100, percentage));
    setPlayerPosition(newPosition);
  };

  // Генерация препятствий
  const generateObstacle = () => {
    if (!gameStarted || gameOver) return;
    
    const newObstacle = {
      id: Date.now(),
      x: Math.random() * 90, // случайная позиция по X (0-90%)
      y: 0,
      width: 10 + Math.random() * 10, // случайная ширина (10-20%)
      height: 15, // высота
      speed: 2 + Math.random() * 2, // случайная скорость
      comId: Math.floor(Math.random() * 5) + 1
    };
    
    setObstacles(prev => [...prev, newObstacle]);
  };

  // Проверка столкновений
  const checkCollision = (player, obstacle) => {
    const playerLeft = player.x;
    const playerRight = player.x + player.width;
    const playerTop = player.y;
    const playerBottom = player.y + player.height;
    
    const obstacleLeft = obstacle.x;
    const obstacleRight = obstacle.x + obstacle.width;
    const obstacleTop = obstacle.y;
    const obstacleBottom = obstacle.y + obstacle.height;
    
    return (
      playerRight > obstacleLeft &&
      playerLeft < obstacleRight &&
      playerBottom > obstacleTop &&
      playerTop < obstacleBottom
    );
  };

  // Основной игровой цикл
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    gameLoopRef.current = requestAnimationFrame(() => {
      // Движение препятствий
      setObstacles(prev => {
        const updated = prev.map(obstacle => ({
          ...obstacle,
          y: obstacle.y + obstacle.speed
        })).filter(obstacle => obstacle.y < 100); // Удаляем препятствия, которые вышли за пределы
        
        // Проверка столкновений
        const player = {
          x: playerPosition,
          y: 85, // игрок находится внизу
          width: 10, // ширина игрока
          height: 10 // высота игрока
        };
        
        const collision = updated.some(obstacle => checkCollision(player, obstacle));
        
        if (collision) {
          setGameOver(true);
          cancelAnimationFrame(gameLoopRef.current);
          clearInterval(obstacleLoopRef.current);
          clearInterval(timeLoopRef.current);
        }
        
        return updated;
      });
    });
    
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameStarted, gameOver, playerPosition, obstacles]);

  // Таймер игры
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    if (timeLeft <= 0) {
      setGameWon(true);
      setGameOver(true);
      clearInterval(obstacleLoopRef.current);
      clearInterval(timeLoopRef.current);
      const lsc = new LocalStorageController();
      lsc.addHoney(500);
      return;
    }
    
    timeLoopRef.current = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timeLoopRef.current);
  }, [gameStarted, gameOver, timeLeft]);

  // Генерация препятствий
  useEffect(() => {
    if (!gameStarted || gameOver) return;
    
    obstacleLoopRef.current = setInterval(generateObstacle, 1000);
    
    return () => clearInterval(obstacleLoopRef.current);
  }, [gameStarted, gameOver]);

  return (
    <div 
      className="game-container"
      onTouchMove={handleTouchMove}
      ref={gameAreaRef}
    >
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Не дай комментам Егора попасть в перваша!</h1>
          <p>Продержись 30 секунд, не касаясь блоков</p>
          <button onClick={startGame}>Начать игру</button>
          <NavLink to="/" className="btn">Домой</NavLink>
        </div>
      ) : (
        <>
          <div className="game-info">
            <div>Время: {timeLeft} сек</div>
          </div>
          
          <div 
            className="player"
            ref={playerRef}
            style={{
              left: `${playerPosition}%`,
              bottom: '5%'
            }}
          />
          
          {obstacles.map(obstacle => (
            <div
              key={obstacle.id}
              className="obstacle"
              style={{
                left: `${obstacle.x}%`,
                top: `${obstacle.y}%`,
                width: `${obstacle.width}%`,
                height: `${obstacle.height}%`,
                backgroundImage: `url(/png/comments/com-${obstacle.comId}.jpg)`
              }}
            />
          ))}
          
          {gameOver && (
            <div className="game-over-screen">
              <h1>{gameWon ? 'Победа!' : 'Ты проебал!'}</h1>
              <p>{gameWon ? 'Ты выиграл 500 мёда.' : 'Перваш самовыпилился от коментов Егора.'}</p>
              <button onClick={startGame}>Играть снова</button>
              <NavLink className="btn" to="/">Домой</NavLink>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GamePage;