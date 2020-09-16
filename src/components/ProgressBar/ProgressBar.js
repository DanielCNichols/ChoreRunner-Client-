import React from 'react';

export default function ProgressBar({ progressPoints }) {
  //NOTE: The progressBar is expecting progressPoints to be the difference between the players level and their total score.
  const getPercentFilled = () => {
    let points = pointsToNextLevel();
    return (points / 10) * 100;
  };

  const pointsToNextLevel = () => {
    return Math.abs(progressPoints - 10);
  };

  const containerStyle = {
    height: '30px',
    width: '100%',
    position: 'relative',
    backgroundColor: 'blue',
    border: '2px solid white',
  };

  const filledStyle = {
    height: '100%',
    width: `${getPercentFilled()}%`,
    backgroundColor: 'white',
    textAlign: 'right',
    position: 'absolute',
    top: '0',
  };

  const labelStyle = {
    padding: '5px',
    display: 'inline-block',
    color: '#ffd900',
    fontWeight: 'bold',
    position: 'relative',
    width: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
    zIndex: '2',
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{`${pointsToNextLevel()} / 10`}</span>
      <div style={filledStyle}></div>
    </div>
  );
}
