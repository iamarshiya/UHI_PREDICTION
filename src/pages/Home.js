import { useState } from "react";

const NibbleLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#22c55e" />
    <path
      d="M20 8 C14 8 10 13 10 18 C10 22 12 25 16 27 C14 29 13 31 14 33 C16 31 18 30 20 30 C22 30 24 31 26 33 C27 31 26 29 24 27 C28 25 30 22 30 18 C30 13 26 8 20 8Z"
      fill="white"
      opacity="0.9"
    />
    <ellipse cx="20" cy="18" rx="5" ry="6" fill="#22c55e" />
  </svg>
);

export default function NibbleLanding() {
  const [activeNav, setActiveNav] = useState("Home");
  const navItems = ["Home", "About us", "Features", "Services", "Contact"];

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* Top yellow accent border */}
      <div className="h-1 w-full bg-yellow-400" />

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2">
          <NibbleLogo />
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Nibble</span>
        </div>

        <ul className="flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <button
                onClick={() => setActiveNav(item)}
                className={`text-sm font-medium transition-colors pb-0.5 ${
                  activeNav === item
                    ? "text-gray-900 font-bold border-b-2 border-gray-900"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button className="px-5 py-2 text-sm font-semibold text-gray-900 border-2 border-gray-800 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200">
            Login
          </button>
          <button className="px-5 py-2 text-sm font-semibold text-gray-900 bg-lime-400 rounded-full hover:bg-lime-500 transition-all duration-200">
            Get in touch
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full overflow-hidden" style={{ height: "calc(100vh - 73px)" }}>

        {/* Background Image */}
        <img
          src="/climate image nibble.jpg.jpeg"
          alt="Climate environmental background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Hero Text */}
        <div className="absolute left-10 top-1/2 -translate-y-1/2 z-10 max-w-lg">
          <h1 className="text-5xl font-extrabold text-white leading-snug drop-shadow-2xl">
            AI-Powered{" "}
            <span className="bg-white text-gray-900 px-2 py-0.5 leading-relaxed inline">
              Environmental
            </span>
            <br />
            Risk Prediction
            <br />
            for Smarter Cities
          </h1>
        </div>
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