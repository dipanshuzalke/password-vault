"use client";

import { useState } from "react";

const LETTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()-_=+[]{}|;:,.<>?";
const LOOK_ALIKES = "0O1lI";

export default function PasswordGenerator({
  onGenerate,
}: {
  onGenerate: (password: string) => void;
}) {
  const [length, setLength] = useState(12);
  const [includeLetters, setIncludeLetters] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeLookAlikes, setExcludeLookAlikes] = useState(true);

  const generatePassword = () => {
    let chars = "";
    if (includeLetters) chars += LETTERS;
    if (includeNumbers) chars += NUMBERS;
    if (includeSymbols) chars += SYMBOLS;
    if (excludeLookAlikes) {
      chars = chars.split("").filter((c) => !LOOK_ALIKES.includes(c)).join("");
    }

    if (!chars.length) return "";

    let password = "";
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    onGenerate(password);
  };

  return (
    <div className="border p-4 rounded space-y-3 shadow-sm">
      <h2 className="font-semibold">Password Generator</h2>

      <div className="flex items-center gap-2">
        <label>Length: {length}</label>
        <input
          type="range"
          min={6}
          max={32}
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="flex-1"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label>
          <input
            type="checkbox"
            checked={includeLetters}
            onChange={(e) => setIncludeLetters(e.target.checked)}
          />{" "}
          Letters
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />{" "}
          Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />{" "}
          Symbols
        </label>
        <label>
          <input
            type="checkbox"
            checked={excludeLookAlikes}
            onChange={(e) => setExcludeLookAlikes(e.target.checked)}
          />{" "}
          Exclude look-alike characters (0, O, l, 1, I)
        </label>
      </div>

      <button
       type="button"
        onClick={generatePassword}
        className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-gray-800"
      >
        Generate
      </button>
    </div>
  );
}
