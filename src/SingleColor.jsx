import React, { useState, useEffect } from 'react';
import rgbToHex from './utils';

const SingleColor = ({ rgb, weight, index, hexColor }) => {
  const [alert, setAlert] = useState(false);
  const bcg = rgb.join(',');
  const hex = rgbToHex(...rgb);
  const hexValue = `#${hexColor}`;
  const rgbaValue = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
  const hslValue = `hsl(${rgb[0]}, ${rgb[1]}%, ${rgb[2]}%)`;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alert]);

  return (
    <article
      className={`color ${index > 10 && 'color-light'}`}
      style={{ backgroundColor: `rgb(${bcg})` }}
      onClick={() => {
        setAlert(true);
        navigator.clipboard.writeText(hexValue);
      }}
    >
      <p className='percent-value'>{weight}%</p>
      <p className='percent-value'>{hexValue}</p>
      <p className='percent-value'>{rgbaValue}</p>
      <p className='percent-value'>{hslValue}</p>
      {alert && <p className='alert'>Copied to clipboard</p>}
    </article>
  );
};

export default SingleColor;