import React from 'react';

export default function ProgressBar({ progressPercent, progressPoints }) {
  const containerStyle = {
    height: '30px',
    width: '100%',
    position: 'relative',
    backgroundColor: 'blue',
    border: '2px solid white',
  };

  const filledStyle = {
    height: '100%',
    width: `${progressPercent}%`,
    backgroundColor: 'white',
    textAlign: 'right',
  };

  const labelStyle = {
    padding: 5,
    color: '#ffd900',
    fontWeight: 'bold',
    position: 'absolute',
    display: 'inline-block',
    width: '100%',
    textAlign: 'center',
    verticalAlign: 'middle',
  };

  return (
    <div style={containerStyle}>
      <span style={labelStyle}>{`${progressPoints} / 10`}</span>
      <div style={filledStyle}></div>
    </div>
  );
}
