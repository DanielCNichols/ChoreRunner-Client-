import React from 'react';

export default function ProgressBar({ points }) {
  const containerStyle = {
    height: '30px',
    width: '100%',
    backgroundColor: 'none',
    border: '2px solid white',
  };

  const filledStyle = {
    height: '100%',
    width: '10%',
    backgroundColor: 'white',
    textAlign: 'right',
  };

  const labelStyle = {
    padding: 5,
    color: 'black',
    fontWeight: 'bold',
  };

  return (
    <div style={containerStyle}>
      <div style={filledStyle}>
        <span style={labelStyle}>{`1 / 10`}</span>
      </div>
    </div>
  );
}
