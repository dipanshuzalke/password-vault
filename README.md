# 🔒 Password Vault

A secure and modern password management web app built using **Next.js**, **TypeScript**, **MongoDB**, and **crypto-js** for encryption.  
It allows users to **store, manage, and protect** their credentials safely — all inside their personal encrypted vault.

---

## 🌐 Live Demo

👉 **[Password Vault - Live](https://password-vault-phi.vercel.app/)**  

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
MONGODB_URI="mongodb+srv://dipanshuzalke_db_user:F52veJtV09m3ic5f@cluster0.ngegfun.mongodb.net/password-vault?retryWrites=true&w=majority&appName=Cluster0"
JWT_SECRET="a_long_random_string_here"
NEXT_PUBLIC_APP_NAME="Password Vault"
NEXT_PUBLIC_CRYPTO_KEY="supersecretclientkey"
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

## 🔒 What I Used for Crypto and Why

I used the **`crypto-js`** library for encryption and decryption of vault items. This allows us to **encrypt passwords client-side** before sending them to the server, ensuring that sensitive data is **never stored in plaintext** in the database, while still being easy to decrypt securely when needed.
