import React, { useState } from 'react';

export default function Gif({ result }) {
  const [loading, setLoading] = useState(true);

  return (
    <div className='card'>
      {loading && 
      <div className="spinner-container2">
      <div className="spinner"></div>
    </div>
      }
      <img
        className='gif-img'
        src={result.images.fixed_height.url}
        alt={result.alt_text}
        onLoad={() => setLoading(false)}
        style={{ display: loading ? 'none' : 'block' }}
      />
      <div className='gif-title'>{result.title}</div>
      {result.username && <div className='gif-username'>@{result.username}</div>}
    </div>
  );
}
