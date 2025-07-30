import React from "react";
import { FaArrowLeft } from "react-icons/fa";

export function ExitModal({ open, onStay, onExit }: { open: boolean; onStay: () => void; onExit: () => void }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(10, 10, 20, 0.96)",
      zIndex: 9999,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{
        background: "rgb(47 57 87)",
        borderRadius: 18,
        boxShadow: "0 8px 40px 0 rgba(0,0,0,0.38)",
        padding: "40px 32px 32px 32px",
        minWidth: 380,
        maxWidth: 420,
        textAlign: "center",
        position: "relative",
        border: "1.5px solid rgb(80 87 132)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
        <div style={{
          background: "#23263a",
          borderRadius: "50%",
          width: 56,
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px auto",
        }}>
          <FaArrowLeft
            style={{ color: "#3EC6FF", fontSize: 32 }}
            aria-label="Exit Confirmation"
          />
        </div>
        <div style={{ fontWeight: 700, fontSize: 24, color: "#fff", marginBottom: 8 }}>
          Are you sure you want to exit?
        </div>
        <div style={{ color: "#b0b3c6", fontSize: 16, marginBottom: 28 }}>
          You’re just one step closer to getting better — give it try!<br/>
          Your current progress will not be saved.
        </div>
        <div style={{ display: "flex", gap: 16, justifyContent: "center" }}>
          <button
            style={{
              background: "#23263a",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
            }}
            onClick={onStay}
          >
            No
          </button>
          <button
            style={{
              background: "#3EC6FF",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "12px 32px",
              fontWeight: 600,
              fontSize: 18,
              cursor: "pointer",
            }}
            onClick={onExit}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

