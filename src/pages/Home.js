import { useState } from "react";

// ─── IMPORTANT: Place these files in your /public folder ───
// 1. /public/climate-image-nibble.jpg   ← the background hero image
// 2. /public/nibble-logo.jpeg           ← the green leaf logo
// ───────────────────────────────────────────────────────────

const BG_IMAGE = "/climate-image-nibble.jpg";
const LOGO_IMAGE = "/nibble-logo.jpeg";

// ─── NAVBAR ───────────────────────────────────────────────
function Navbar({ setPage }) {
  return (
    <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setPage("home")}
      >
        <img
          src={LOGO_IMAGE}
          alt="Nibble logo"
          className="w-10 h-10 object-contain"
        />
        <span className="text-white font-bold text-xl tracking-tight drop-shadow">
          Nibble
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 text-white text-sm font-medium drop-shadow">
        <button onClick={() => setPage("home")} className="hover:text-green-300 transition-colors">Home</button>
        <button className="hover:text-green-300 transition-colors">About us</button>
        <button className="text-green-300 border-b border-green-300 pb-0.5">Features</button>
        <button className="hover:text-green-300 transition-colors">Services</button>
        <button className="hover:text-green-300 transition-colors">Contact</button>
      </div>

      {/* Auth buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setPage("login")}
          className="border border-white text-white text-sm font-semibold px-5 py-1.5 rounded-full hover:bg-white hover:text-gray-900 transition-all"
        >
          Login
        </button>
        <button
          onClick={() => setPage("signup")}
          className="bg-lime-400 text-gray-900 text-sm font-bold px-5 py-1.5 rounded-full hover:bg-lime-300 transition-all"
        >
          Sign Up
        </button>
      </div>
    </nav>
  );
}

// ─── HOME / LANDING ───────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Navbar setPage={setPage} />

      {/* Hero background image */}
      <img
        src={BG_IMAGE}
        alt="Climate background"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/25" />

      {/* Hero text — bottom left */}
      <div className="absolute top-1/2 left-12 -translate-y-1/2 z-10 max-w-xs">
        <h1 className="text-white text-3xl md:text-4xl font-black leading-tight drop-shadow-lg">
          AI-Powered{" "}
          <span className="bg-white text-gray-900 px-2 py-0.5 rounded">
            Environmental
          </span>
          <br />
          Risk Prediction
          <br />
          for Smarter Cities
        </h1>
        <button
          onClick={() => setPage("signup")}
          className="mt-6 bg-lime-400 text-gray-900 font-bold text-sm px-6 py-2.5 rounded-full hover:bg-lime-300 transition-all shadow-lg"
        >
          Get Started
        </button>
      </div>

      {/* Location button — bottom right */}
      <button className="absolute bottom-12 right-12 z-10 bg-lime-400 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-lime-300 transition-all shadow-lg">
        Location
      </button>
    </div>
  );
}

// ─── SHARED AUTH COMPONENTS ───────────────────────────────
function AuthCard({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-green-50 rounded-3xl p-8 w-full max-w-sm shadow-sm">
        {children}
      </div>
    </div>
  );
}

function InputField({ label, type = "text", value, onChange }) {
  return (
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-black placeholder-gray-500 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition-all"
    />
  );
}

function GreenButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-lime-400 hover:bg-lime-300 text-gray-900 font-bold text-sm px-8 py-2.5 rounded-full transition-all active:scale-95 shadow-sm"
    >
      {children}
    </button>
  );
}

// ─── LOGIN ────────────────────────────────────────────────
function LoginPage({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setSuccess(true);
    setTimeout(() => setPage("home"), 1500);
  };

  return (
    <AuthCard>
      <h2 className="text-center text-xl font-bold text-gray-900 mb-6">Login</h2>
      <div className="flex flex-col gap-4">
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      <button
        onClick={() => setPage("forgot")}
        className="text-xs text-gray-500 hover:text-green-600 mt-2 mb-5 block transition-colors"
      >
        Forgot password ?
      </button>
      {error && <p className="text-red-500 text-xs mb-3 text-center">{error}</p>}
      {success && <p className="text-green-600 text-xs mb-3 text-center font-semibold">✓ Login successful! Redirecting...</p>}
      <div className="flex justify-center">
        <GreenButton onClick={handleLogin}>Login</GreenButton>
      </div>
      <p className="text-center text-xs text-gray-500 mt-5">
        Don't have an account?{" "}
        <button onClick={() => setPage("signup")} className="text-green-600 font-semibold hover:underline">
          Sign Up
        </button>
      </p>
    </AuthCard>
  );
}

// ─── SIGN UP ──────────────────────────────────────────────
function SignupPage({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSignup = () => {
    setError("");
    if (!name || !email || !password) { setError("Please fill in all fields."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    setSuccess(true);
    setTimeout(() => setPage("login"), 1500);
  };

  return (
    <AuthCard>
      <h2 className="text-center text-xl font-bold text-gray-900 mb-6 underline decoration-blue-500 underline-offset-4">
        Sign Up
      </h2>
      <div className="flex flex-col gap-4">
        <InputField label="Full Name" value={name} onChange={e => setName(e.target.value)} />
        <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </div>
      {error && <p className="text-red-500 text-xs mt-3 text-center">{error}</p>}
      {success && <p className="text-green-600 text-xs mt-3 text-center font-semibold">✓ Account created! Redirecting to login...</p>}
      <div className="flex justify-center mt-6">
        <GreenButton onClick={handleSignup}>Sign Up</GreenButton>
      </div>
      <p className="text-center text-xs text-gray-500 mt-5">
        Already have an account?{" "}
        <button onClick={() => setPage("login")} className="text-green-600 font-semibold hover:underline">
          Login
        </button>
      </p>
    </AuthCard>
  );
}

// ─── FORGOT PASSWORD ──────────────────────────────────────
function ForgotPage({ setPage }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    setError("");
    if (!oldPass || !newPass) { setError("Please fill in all fields."); return; }
    if (newPass.length < 6) { setError("New password must be at least 6 characters."); return; }
    if (oldPass === newPass) { setError("New password must differ from old password."); return; }
    setSuccess(true);
    setTimeout(() => setPage("login"), 1500);
  };

  return (
    <AuthCard>
      <h2 className="text-2xl font-black text-gray-900 mb-7">Forgot password?</h2>
      <div className="flex flex-col gap-4">
        <InputField label="Old password" type="password" value={oldPass} onChange={e => setOldPass(e.target.value)} />
        <InputField label="New password" type="password" value={newPass} onChange={e => setNewPass(e.target.value)} />
      </div>
      {error && <p className="text-red-500 text-xs mt-3 text-center">{error}</p>}
      {success && <p className="text-green-600 text-xs mt-3 text-center font-semibold">✓ Password updated! Redirecting...</p>}
      <div className="flex justify-center mt-6">
        <GreenButton onClick={handleSubmit}>Submit</GreenButton>
      </div>
      <div className="flex justify-center mt-4">
        <button onClick={() => setPage("login")} className="text-xs text-gray-400 hover:text-green-600 transition-colors">
          ← Back to Login
        </button>
      </div>
    </AuthCard>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");

  return (
    <>
      {page === "home"   && <HomePage   setPage={setPage} />}
      {page === "login"  && <LoginPage  setPage={setPage} />}
      {page === "signup" && <SignupPage setPage={setPage} />}
      {page === "forgot" && <ForgotPage setPage={setPage} />}
    </>
  );
}