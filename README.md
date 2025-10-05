# 🔒 Password Vault

A secure and modern password management web app built using **Next.js**, **TypeScript**, **MongoDB**, and **crypto-js** for encryption.  
It allows users to **store, manage, and protect** their credentials safely — all inside their personal encrypted vault.

---

## ✨ Features

- 🔐 **User Authentication** (Signup & Login with JWT)
- 🧠 **Encrypted Password Storage** using `crypto-js`
- 🧭 **Apple-like Minimal Dashboard UI** built with `shadcn/ui` + `TailwindCSS`
- ➕ **Add, Edit, Delete Vault Entries**
- 🔎 **Search and Filter Vault Items**
- 🚀 **Deployed on Vercel**
- (Optional) 🪪 **2FA (TOTP) Support**

---

## 🧰 Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript  
- **UI:** TailwindCSS + shadcn/ui  
- **Backend:** Next.js API Routes (Node.js)  
- **Database:** MongoDB (via Mongoose)  
- **Encryption:** `crypto-js`  
- **Auth:** JWT (JSON Web Token)  

---

## ⚙️ Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/dipanshuzalke/password-vault.git
cd password-vault
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Add environment variables

Create a `.env.local` file in the root directory and add:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🧱 Project Structure

```
password-vault/
│
├── app/
│   ├── api/
│   │   └── auth/      # Login & Signup routes
│   ├── add-vault/     # Add vault page
│   ├── login/         # Login page
│   ├── signup/        # Signup page
│   └── page.tsx       # Home page
│
├── lib/
│   ├── mongoose.ts    # MongoDB connection handler
│   └── auth.ts        # JWT helpers
│
├── models/
│   └── User.ts        # User schema
│   └── Vault.ts       # Vault schema
│
├── components/
│   └── Navbar.tsx     # Navigation bar
│
└── README.md
```

---

## 🔒 What We Used for Crypto and Why

I used the **`crypto-js`** library for encryption and decryption of vault items. This allows us to **encrypt passwords client-side** before sending them to the server, ensuring that sensitive data is **never stored in plaintext** in the database, while still being easy to decrypt securely when needed.
