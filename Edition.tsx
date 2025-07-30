import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Registration Form Component
const RegistrationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
    } else {
      setFormError("");
      alert("Registration Successful!");
      // Registration logic here
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#232b36",
        borderRadius: "18px",
        boxShadow: "0 8px 32px 0 rgba(20, 26, 31, 0.37)",
        padding: "36px 32px",
        maxWidth: "480px",
        width: "100%",
        textAlign: "center",
        border: "none",
        color: "#fff",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <span
          style={{
            color: "#2563eb",
            width: 32,
            height: 32,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 8,
          }}
        >
          <svg fill="none" viewBox="0 0 48 48" width={24} height={24}>
            <path
              d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
              fill="currentColor"
            />
          </svg>
        </span>
        <h3
          style={{
            color: "#f8fafc",
            textAlign: "center",
            marginBottom: "10px",
            fontSize: "32px",
            letterSpacing: "-0.01em",
            fontWeight: 700,
          }}
        >
          Register for Alphabet
        </h3>
      </div>
      <p style={{ marginTop: -10 }}>Professional Typing Tutor</p>
      <div style={{ marginBottom: 18, textAlign: "left" }}>
        <label htmlFor="name" style={{ color: "#94a3b8", fontWeight: 500 }}>
          Name
        </label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
          style={{
            width: "92%",
            padding: "16px",
            fontSize: "16px",
            border: "2px solid #2b3640",
            borderRadius: "12px",
            background: "#1c242c",
            color: "#f8fafc",
            marginTop: 6,
            marginBottom: 2,
            outline: "none",
            transition: "border-color 0.3s, background 0.3s",
          }}
        />
      </div>
      <div style={{ marginBottom: 18, textAlign: "left" }}>
        <label htmlFor="mobile" style={{ color: "#94a3b8", fontWeight: 500 }}>
          Mobile
        </label>
        <input
          id="mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          placeholder="Enter your mobile number"
          required
          style={{
            width: "92%",
            padding: "16px",
            fontSize: "16px",
            border: "2px solid #2b3640",
            borderRadius: "12px",
            background: "#1c242c",
            color: "#f8fafc",
            marginTop: 6,
            marginBottom: 2,
            outline: "none",
            transition: "border-color 0.3s, background 0.3s",
          }}
        />
      </div>
      <div style={{ marginBottom: 18, textAlign: "left" }}>
        <label htmlFor="password" style={{ color: "#94a3b8", fontWeight: 500 }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
          style={{
            width: "92%",
            padding: "16px",
            fontSize: "16px",
            border: "2px solid #2b3640",
            borderRadius: "12px",
            background: "#1c242c",
            color: "#f8fafc",
            marginTop: 6,
            marginBottom: 2,
            outline: "none",
            transition: "border-color 0.3s, background 0.3s",
          }}
        />
      </div>
      <div style={{ marginBottom: 18, textAlign: "left" }}>
        <label
          htmlFor="confirmPassword"
          style={{ color: "#94a3b8", fontWeight: 500 }}
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
          required
          style={{
            width: "92%",
            padding: "16px",
            fontSize: "16px",
            border: "2px solid #2b3640",
            borderRadius: "12px",
            background: "#1c242c",
            color: "#f8fafc",
            marginTop: 6,
            marginBottom: 2,
            outline: "none",
            transition: "border-color 0.3s, background 0.3s",
          }}
        />
      </div>
      {formError && (
        <p style={{ color: "#ff6b6b", textAlign: "center", marginBottom: 10 }}>
          {formError}
        </p>
      )}
      <button
        type="submit"
        style={{
          width: "100%",
          padding: "16px",
          background: "#2563eb",
          border: "none",
          color: "#fff",
          fontSize: "20px",
          fontWeight: 700,
          borderRadius: "14px",
          cursor: "pointer",
          boxShadow: "0 2px 16px rgba(37,99,235,0.10)",
          letterSpacing: 0.5,
          marginTop: 12,
          marginBottom: 2,
          transition: "background 0.2s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.background = "#3b82f6")}
        onMouseOut={(e) => (e.currentTarget.style.background = "#2563eb")}
      >
        Register
      </button>
    </form>
  );
};

const EditionPage = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "var(--background-color, #020617)", // matches Home/Login
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 0",
        boxSizing: "border-box",
        fontFamily: "Lexend, Noto Sans, sans-serif",
      }}
    >
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "24px 24px 0 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          aria-label="Back"
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            padding: 0,
          }}
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>
      {/* Left: Heads-up Stages Description */}
      <div
        style={{
          flex: 1,
          maxWidth: 540,
          color: "#f8fafc",
          padding: "0 0 0 60px",
          marginRight: 32,
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            color: "#f8fafc",
            fontSize: 44,
            marginBottom: 36,
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Typing Tutor | Stages
        </h2>
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Stage Alpha{" "}
            <span style={{ fontSize: 22 }} role="img" aria-label="Alpha">
              ✨
            </span>
          </div>
          <div style={{ color: "#b3c6e0", fontSize: 17 }}>
            Practice on Letters. 40 Lessons. Great for beginners to master the
            alphabet.
          </div>
        </div>
        <div style={{ marginBottom: 36 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Stage Beta{" "}
            <span style={{ fontSize: 22 }} role="img" aria-label="Beta">
              🔥
            </span>
          </div>
          <div style={{ color: "#b3c6e0", fontSize: 17 }}>
            Practice on Words. Includes Alpha. 80 Lessons. Build your vocabulary
            and speed.
          </div>
        </div>
        <div style={{ marginBottom: 0 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            Stage Gamma{" "}
            <span style={{ fontSize: 22 }} role="img" aria-label="Gamma">
              💡
            </span>
          </div>
          <div style={{ color: "#b3c6e0", fontSize: 17 }}>
            Practice on Grammar. Includes Alpha & Beta. 120 Lessons. For
            advanced mastery.
          </div>
        </div>
      </div>
      {/* Right: Registration Form */}
      <div
        style={{
          flex: 1,
          maxWidth: 480,
          minWidth: 320,
          padding: "48px 60px 48px 0",
          boxSizing: "border-box",
        }}
      >
        <RegistrationForm />
      </div>
    </div>
  );
};

export default EditionPage;
