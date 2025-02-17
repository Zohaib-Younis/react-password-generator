import { useState, useCallback ,useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

    //useref hook
    const passwordRef=useRef(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!~@#$%^&*(){};:/.,<>?";
    }
    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  
  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-10  text-orange-400 bg-gray-600'>
      <h1 className=' text-center text-xl text-orange-400'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 

          type="text" 
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}

        />
        <button 
          className='outline-none bg-black text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <label> Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            checked={numberAllowed}
            onChange={(e) => setNumberAllowed(e.target.checked)}
          />
          <label> Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            checked={charAllowed}
            onChange={(e) => setCharAllowed(e.target.checked)}
          />
          <label> Include Special Characters</label>
        </div>
      </div>
      <div className="flex items-center justify-center py-5">
  <button 
    className='bg-blue-500 text-white px-4 py-2 rounded'
    onClick={passwordGenerator}
  >
    Generate Password
  </button>
</div>

    </div>
    </>
  );
}

export default App;
