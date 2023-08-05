import React, { useState } from 'react';
import SingleColor from './SingleColor';
import Values from 'values.js';

function App() {
  const [color, setColor] = useState('');
  const [error, setError] = useState(false);
  const [list, setList] = useState(new Values('#f15025').all(10));
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      let colors = new Values(color).all(10);
      setList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setColor(e.target.value);
    if (e.target.value) {
      const colorSuggestions = new Values(e.target.value).all(5);
      setSuggestions(colorSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setColor(`#${suggestion.hex}`);
    setSuggestions([]);
  };

  return (
    <>
      <section className='container'>
        <h3>Color Balance</h3>
        <div className="">
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={color}
            onChange={handleInputChange}
            placeholder='#f15025'
            className={`${error ? 'error' : null}`}
          />
          <button className='btn' type='submit'>
            submit
          </button>
        </form>
        {suggestions.length > 0 && (
          <ul className='suggestions'>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                #{suggestion.hex}
              </li>
            ))}
          </ul>
        )}
        </div>
      </section>
      <section className='colors'>
        {list.map((color, index) => (
          <SingleColor key={index} {...color} index={index} hexColor={color.hex} />
        ))}
      </section>
    </>
  );
}

export default App;