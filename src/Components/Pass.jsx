import React from 'react'
import { useState, useEffect } from 'react'

const Pass = () => {

  const [length, setlength] = useState(10)
  const [num, isNum] = useState(false)
  const [char, isChar] = useState(false)
  const [password, setpass] = useState("")
  const [msg, setmsg] = useState("")
  const [regenerate, setregenerate] = useState(0)


  function passwordGenerate() {
    let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/";

    if (num) {
      letters += numbers;
    }

    if (char) {
      letters += symbols;
    }

    let result = "";

    for (let i = 0; i < length; i++) {
      let pass = Math.floor(Math.random() * letters.length);
      result += letters.charAt(pass);
    }

    setpass(result);
  }


  function COPY() {
    navigator.clipboard.writeText(password)
    MSG()
  }

  function MSG() {
    setmsg("Password is Copied To Clipboard")
    setTimeout(() => {
      setmsg("")
    }, 800);
  }

  useEffect(() => {
    passwordGenerate();

    return () => {
      console.log("Old Password is removed and new Add")
    }
  }, [length, num, char, regenerate])


  return (
    <div className=' transition-all duration-500 ease-in-out'>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-xl bg-red-200 rounded-2xl p-6 shadow-2xl">


          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">
              Password Generator
            </h1>

            <p className="text-slate-400 mt-2">
              Generate a strong and secure password
            </p>
          </div>

          {/* Password */}
          <div className="flex gap-2">
            <input
              className="h-14 flex-1 min-w-0 bg-slate-950 border-2 border-slate-700 rounded-xl px-4 text-sky-400 font-mono text-base outline-none focus:border-sky-500"
              type="text"
              placeholder="Your password"
              readOnly
              value={password}
            />

            {/* Copy Button */}
            <button
              onClick={COPY}
              className="px-5 h-14 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl cursor-pointer transition-all active:scale-95"
            >
              Copy
            </button>
          </div>


          {/* Copy Message */}
          <p className="text-center text-emerald-400 font-mono mt-4 [text-shadow:0_0_10px_rgba(52,211,153,0.8)]">
            {msg}
          </p>

          <div className="mt-6 bg-slate-800/60 rounded-2xl p-5">

            {/* Length */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-300 font-medium">
                Password Length : {length}
              </span>
            </div>

            {/* Range */}
            <input
              className="w-full accent-sky-500 cursor-pointer"
              type="range"
              min="0"
              max="29"
              onChange={(e) => { setlength(Number(e.target.value)) }}
              value={length}
            />

            {/* Options */}
            <div className="flex flex-wrap gap-6 mt-6">
              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  className="w-5 h-5 accent-violet-600 cursor-pointer"
                  type="checkbox"
                  checked={num}
                  onChange={(e) => { isNum(e.target.checked) }}
                />
                Numbers
              </label>

              <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">
                <input
                  className="w-5 h-5 accent-violet-600 cursor-pointer"
                  type="checkbox"
                  checked={char}
                  onChange={(e) => { isChar(e.target.checked) }}
                />
                Special Characters
              </label>
            </div>
          </div>

          {/* Re-Generate */}
          <div className='mt-4 text-center'>
            <button
              onClick={() => setregenerate(regenerate + 1)}
              className="relative overflow-hidden px-6 h-14 rounded-xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-500/30 transition-all duration-200 hover:bg-orange-600 hover:shadow-orange-500/50 active:scale-90 cursor-pointer active:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              Re-Generate
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Pass