"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { decrypt, encrypt } from "@/lib/crypto";

interface VaultItem {
  _id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
}

export default function Dashboard() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<VaultItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/vault", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      if (Array.isArray(data)) setItems(data);
      else if (Array.isArray(data.items)) setItems(data.items);
      else setItems([]);
    } catch (error) {
      console.error("Error fetching vault items:", error);
      setItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-300 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const filteredItems = items.filter((item) => {
    const lower = search.toLowerCase();
    return (
      item.title.toLowerCase().includes(lower) ||
      item.username.toLowerCase().includes(lower) ||
      (item.url && item.url.toLowerCase().includes(lower))
    );
  });

  const handleDelete = async (id: string) => {
    await fetch(`/api/vault/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchItems();
  };

  const handleCopy = (id: string, password: string) => {
    navigator.clipboard.writeText(decrypt(password));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 15000);
  };

  const handleEditSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const updated = {
      ...editingItem,
      password: encrypt(editingItem.password),
    };

    await fetch(`/api/vault/${editingItem._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updated),
    });

    setEditingItem(null);
    fetchItems();
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">My Vault</h1>
        <Link href="/add-vault">
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
            + Add Vault
          </button>
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search items..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border p-2 rounded"
      />

      {isLoading ? (
        <p className="text-gray-500">Loading...</p>
      ) : filteredItems.length === 0 ? (
        <p className="text-gray-500">No items found</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredItems.map((item: VaultItem) => (
            <div
              key={item._id}
              className="border p-3 rounded shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg mb-1">
                  {highlightMatch(item.title, search)}
                </h2>
                <p className="text-sm">Username: {highlightMatch(item.username, search)}</p>
                <p className="text-sm">
                  Password:{" "}
                  {copiedId === item._id ? decrypt(item.password) : "••••••••"}
                </p>
                {item.url && (
                  <a
                    href={item.url}
                    target="_blank"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    Visit site
                  </a>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleCopy(item._id, item.password)}
                  className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  {copiedId === item._id ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() =>
                    setEditingItem({
                      ...item,
                      password: decrypt(item.password),
                    })
                  }
                  className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✏️ Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleEditSave}
            className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow-lg w-[90%] max-w-md space-y-3"
          >
            <h2 className="text-xl font-semibold mb-2">Edit Vault</h2>

            <input
              className="w-full border p-2 rounded"
              placeholder="Title"
              value={editingItem.title}
              onChange={(e) =>
                setEditingItem({ ...editingItem, title: e.target.value })
              }
              required
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Username"
              value={editingItem.username}
              onChange={(e) =>
                setEditingItem({ ...editingItem, username: e.target.value })
              }
              required
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="Password"
              value={editingItem.password}
              onChange={(e) =>
                setEditingItem({ ...editingItem, password: e.target.value })
              }
              required
            />
            <input
              className="w-full border p-2 rounded"
              placeholder="URL"
              value={editingItem.url || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, url: e.target.value })
              }
            />
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Notes"
              value={editingItem.notes || ""}
              onChange={(e) =>
                setEditingItem({ ...editingItem, notes: e.target.value })
              }
            />

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-black text-white hover:bg-gray-800"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
