import React, { useState, useRef } from 'react';
import christmasTree from '../assets/images/christmastree.png';
import star from '../assets/images/star.png';
import Snowfall from 'react-snowfall'
import song from '../assets/music/christmassong.mov';
import playIcon from '../assets/images/playmusic.png'; 
import pauseIcon from '../assets/images/stopmusic.png';
import '../styles/ChristmasPage.css';

function ChristmasPage() {
  const audioRef = useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [starPosition, setStarPosition] = useState({ x: 360, y: 120 });
  const treeRef = useRef();
  const [isSnowing, setIsSnowing] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData('star', 'dragging');
  };

  // const handleTouchStart = (e) => {
  //   e.preventDefault();
  //   e.persist(); 
  //   const touch = e.touches[0];
  //   setStarPosition({ x: touch.clientX - 60, y: touch.clientY - 60 });
  // };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    setStarPosition({ x: touch.clientX - 60, y: touch.clientY - 60 });
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const draggedItem = e.dataTransfer.getData('star');
    if (draggedItem === 'dragging' && treeRef.current) {
      const treeRect = treeRef.current.getBoundingClientRect();
      const treeTopX = treeRect.left + treeRect.width / 2;
      const treeTopY = treeRect.top;
      setStarPosition({ x: treeTopX - 60, y: treeTopY - 60 });
      setIsSnowing(true);
      handleMusic();
    }
  };

  const handleMusic = () => {
    setIsPlaying(prevIsPlaying => {
      const newIsPlaying = !prevIsPlaying;
      if (newIsPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      return newIsPlaying;
    });
  };

  return (
    <div
      className="christmas-page"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onTouchStart={handleTouchStart}
    > 
      {isSnowing && <h1 className="wish-title-left">Merry</h1>}
      {isSnowing && <h1 className="wish-title-right">Christmas</h1>}
      {isSnowing && <Snowfall />}
      <img ref={treeRef} src={christmasTree} alt="Christmas Tree" className="christmas-tree" />
      <img
        src={star}
        alt="Star"
        className="star-image"
        style={{ position: 'absolute', left: `${starPosition.x}px`, top: `${starPosition.y}px` }}
        draggable="true"
        onDragStart={handleDragStart}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      />
      <audio ref={audioRef} src={song} />
      <button className="music-button" onClick={handleMusic}>
        <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" className='music-icon' />
      </button>
    </div>
  );
}

export default ChristmasPage;
