import React, { useRef, useEffect } from 'react';

// I have edited this componenet according to mentor feedback.

const NameInput = ({ userName, setUserName }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <input
      className='rounded shadow-sm w-full max-w-96 place-self-center h-10'
      type="text"
      ref={inputRef}
      value={userName}
      onChange={e => setUserName(e.target.value)}
      placeholder="Name..."
    />
  );
};

export default NameInput;

