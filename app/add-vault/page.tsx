"use client";

import { useState } from "react";
import { encrypt } from "@/lib/crypto";
import PasswordGenerator from "@/components/PasswordGenerator";
import { useRouter } from "next/navigation";

export default function AddVaultPage() {
  const [title, setTitle] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

   async function handleAdd(e: React.FormEvent) {
    e.preventDefault();

    const encryptedPassword = encrypt(password);

    const res = await fetch("/api/vault", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title,
        username,
        password: encryptedPassword,
        url,
        notes,
      }),
    });

    if (res.ok) {
      setTitle("");
      setUsername("");
      setPassword("");
      setUrl("");
      setNotes("");
      router.push("/");
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8 rounded-3xl shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Add New Vault</h1>

      <form onSubmit={handleAdd} className="space-y-4">
        <input
          placeholder="Title"
          className="w-full border p-3 rounded-xl"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Username"
          className="w-full border p-3 rounded-xl"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <PasswordGenerator onGenerate={setPassword} />
        <input
          placeholder="Password"
          className="w-full border p-3 rounded-xl"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          placeholder="URL (optional)"
          className="w-full border p-3 rounded-xl"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <textarea
          placeholder="Notes"
          className="w-full border p-3 rounded-xl"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          type="submit"
          className="bg-black text-white w-full py-3 rounded-xl hover:bg-gray-800 transition"
        >
          Save Vault
        </button>
      </form>
    </div>
  );
}
