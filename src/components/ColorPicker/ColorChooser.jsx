import { useState, useEffect } from 'react';

const ColorChooser = ({ formData, color, setColor }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (formData.username.length > 0) {
      setUsername(formData.username.charAt(0).toUpperCase());
    }
  }, [formData]);

  console.log('USERNAME in AVATAR: ', formData.username);

  return (
    <div className="flex flex-col items-center">
      {/* <p className="text-sm text-gray-500">{color}</p> */}
      <div
        style={{ backgroundColor: color }}
        className={`h-20 w-20 rounded-full shadow-lg flex flex-col items-center justify-center`}
      >
        <p className="text-3xl text-black">{username ? username : '#'}</p>
      </div>
      <input className="w-full mt-2" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
      {/* <p className="text-xs text-gray-400 italic -mt-1">Click to select color</p> */}
    </div>
  );
};

export default ColorChooser;
