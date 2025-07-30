import React from "react";

export default function SUC() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#101a23",
        color: "#fff",
        fontFamily: "'Space Grotesk', 'Lexend', 'Noto Sans', sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 520, textAlign: "center" }}>
        <span
          style={{
            display: "inline-block",
            fontSize: 64,
            margin: "0 auto 32px auto",
            animation: "bounce 1.2s infinite alternate",
            filter: "drop-shadow(0 2px 12px #0c7ff2cc)",
          }}
          role="img"
          aria-label="Under Construction"
        >
          🚧
        </span>
        <h1 style={{ fontSize: 40, fontWeight: 700, marginBottom: 16 }}>
          Under Construction
        </h1>
        <p
          style={{
            fontSize: 20,
            color: "#0c7ff2",
            lineHeight: 1.6,
            fontWeight: 500,
          }}
        >
          We’re working hard to bring you the best typing experience. Some features may be incomplete or unavailable. Stay tuned for updates!
        </p>
      </div>
      {/* Keyframes for spin animation */}
      <style>{`
        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-18px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
