import React from 'react'
import { useState, useEffect, useCallback, useRef } from 'react'

const Pass = () => {
    const [length, setLength] = useState(8)
    const [num, setNum] = useState(false)
    const [specialchars, setSpecialChars] = useState(false)
    const [PassWord, generatePass] = useState("")
    const [copied, setCopied] = useState(false)

    // userref hook
    const passwordRef = useRef(null)

    const passwordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        let numbers = "1234567890"
        let schars = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~"

        if (num) {
            str += numbers
        }

        if (specialchars) {
            str += schars
        }

        for (let index = 1; index <= length; index++) {
            let char = Math.floor(Math.random() * str.length)
            pass += str.charAt(char)
        }

        generatePass(pass)
        setCopied(false)

    }, [length, num, specialchars])

    useEffect(() => {
        passwordGenerator()
    }, [passwordGenerator])

    const copyPAss = useCallback(() => {
        window.navigator.clipboard.writeText(PassWord)

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 2000)

    }, [PassWord])
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center p-4">

                <div className="w-full max-w-xl bg-red-200 rounded-2xl p-6 shadow-2xl">

                    {/* Heading */}
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
                            value={PassWord}
                            readOnly
                            ref={passwordRef}
                        />

                        <button
                            onClick={copyPAss}
                            className="px-5 h-14 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl cursor-pointer transition-all active:scale-95"
                        >
                            Copy
                        </button>

                    </div>


                    {/* Copy Message */}
                    <p className={`text-center font-mono mt-4 ${copied ? "" : "hidden"}`}>
                        Password is Copied To Clipboard
                    </p>


                    {/* Settings */}
                    <div className="mt-6 bg-slate-800/60 rounded-2xl p-5">

                        {/* Length */}
                        <div className="flex justify-between items-center mb-4">

                            <span className="text-slate-300 font-medium">
                                Password Length
                            </span>

                            <span className="text-sky-400 font-bold text-xl">
                                {length}
                            </span>

                        </div>


                        {/* Range */}
                        <input
                            className="w-full accent-sky-500 cursor-pointer"
                            type="range"
                            value={length}
                            min={6}
                            max={10}
                            onChange={(e) => setLength(Number(e.target.value))}
                        />


                        {/* Options */}
                        <div className="flex flex-wrap gap-6 mt-6">

                            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">

                                <input
                                    className="w-5 h-5 accent-violet-600 cursor-pointer"
                                    type="checkbox"
                                    checked={num}
                                    onChange={() => {
                                        setNum((prev) => !prev)
                                    }}
                                />

                                Numbers

                            </label>


                            <label className="flex items-center gap-2 text-slate-300 cursor-pointer select-none">

                                <input
                                    className="w-5 h-5 accent-violet-600 cursor-pointer"
                                    type="checkbox"
                                    checked={specialchars}
                                    onChange={() => {
                                        setSpecialChars((prev) => !prev)
                                    }}
                                />

                                Special Characters

                            </label>

                        </div>

                    </div>


                    {/* Strength */}
                    <div className="mt-6">

                        <div className="flex justify-between mb-2">

                            <span className="text-sm text-slate-400">
                                Password Strength
                            </span>

                            <span className="text-sm font-semibold text-emerald-400">
                                {length <= 3
                                    ? "Weak"
                                    : length <= 6
                                        ? "Medium"
                                        : "Strong"}
                            </span>

                        </div>


                        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">

                            <div
                                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                                style={{ width: `${(length / 10) * 100}%` }}
                            ></div>

                        </div>

                    </div>


                    {/* Footer */}
                    <p className="text-center text-xs text-slate-500 mt-7">
                        Password is generated locally and never stored.
                    </p>

                </div>
            </div>
            )
}

            export default Pass
