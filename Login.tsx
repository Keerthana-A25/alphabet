import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can add actual form submission logic here
    navigate("/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--background-color, #020617)",
        fontFamily: "Lexend, Noto Sans, sans-serif",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
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
        <button
          onClick={() => navigate("/edition")}
          style={{
            borderRadius: 9999,
            background: "#2563eb",
            color: "#fff",
            fontWeight: 700,
            fontSize: 15,
            padding: "10px 28px",
            border: "none",
            cursor: "pointer",
            boxShadow: "none",
            transition: "background 0.2s",
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#3b82f6')}
          onMouseOut={e => (e.currentTarget.style.background = '#2563eb')}
        >
          Sign Up
        </button>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 0 0 0",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420, padding: "0 16px" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 16,
                color: "#fff",
                marginBottom: 24,
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  color: "#2563eb",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                <svg fill="none" viewBox="0 0 48 48" width={24} height={24}>
                  <path
                    d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <h1
                style={{
                  color: "#f8fafc",
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: "-0.015em",
                }}
              >
                Alphabet
              </h1>
            </div>
            <h2
              style={{
                color: "#f8fafc",
                fontWeight: 700,
                fontSize: 32,
                letterSpacing: "-0.01em",
                marginBottom: 8,
              }}
            >
              Log in to your account
            </h2>
            <p style={{ color: "#94a3b8", fontSize: 15, marginTop: 8 }}>
              Don't have an account?{" "}
              <button
                type="button"
                style={{
                  color: "#2563eb",
                  background: "none",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  fontSize: 15,
                  transition: "color 0.2s",
                }}
                onClick={() => navigate("/edition")}
                onMouseOver={e => (e.currentTarget.style.color = '#3b82f6')}
                onMouseOut={e => (e.currentTarget.style.color = '#2563eb')}
              >
                Sign up
              </button>
            </p>
          </div>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: 24 }}
          >
            <div>
              <label htmlFor="userid" style={{ display: "none" }}>
                User ID
              </label>
              <input
                id="userid"
                name="userid"
                type="text"
                placeholder="User ID"
                required
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  border: "2px solid #475569",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: 17,
                  padding: "18px 16px",
                  outline: "none",
                  marginBottom: 0,
                  boxSizing: "border-box",
                  fontWeight: 400,
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#2563eb')}
                onBlur={e => (e.currentTarget.style.borderColor = '#475569')}
              />
            </div>
            <div>
              <label htmlFor="password" style={{ display: "none" }}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  border: "2px solid #475569",
                  background: "#1e293b",
                  color: "#f8fafc",
                  fontSize: 17,
                  padding: "18px 16px",
                  outline: "none",
                  marginBottom: 0,
                  boxSizing: "border-box",
                  fontWeight: 400,
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#2563eb')}
                onBlur={e => (e.currentTarget.style.borderColor = '#475569')}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                  border: "2px solid #475569",
                  background: "#1e293b",
                  accentColor: "#2563eb",
                  marginRight: 10,
                  }}
                />
                <label
                  htmlFor="remember-me"
                  style={{ color: "#f8fafc", fontSize: 15, fontWeight: 400 }}
                >
                  Remember me
                </label>
              </div>
              <button
                type="button"
                style={{
                  color: "#94a3b8",
                  background: "none",
                  border: "none",
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onClick={() => navigate("/forgotpassword")}
                onMouseOver={e => (e.currentTarget.style.color = '#2563eb')}
                onMouseOut={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                Forgot your password?
              </button>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                borderRadius: 9999,
                background: "#2563eb",
                color: "#fff",
                fontWeight: 700,
                fontSize: 18,
                padding: "16px 0",
                border: "none",
                cursor: "pointer",
                marginTop: 8,
                transition: "background 0.2s",
                boxShadow: "none",
                letterSpacing: 0.2,
              }}
              onMouseOver={e => (e.currentTarget.style.background = '#3b82f6')}
              onMouseOut={e => (e.currentTarget.style.background = '#2563eb')}
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
