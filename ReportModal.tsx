import React from "react";
//Report Popup Modal
export function ReportModal({ open, report, onTryAgain, onThanks }: {
  open: boolean;
  report: {
    totalWord: number;
    wpm: number;
    accuracy: number;
    errors: number;
  };
  onTryAgain: () => void;
  onThanks: () => void;
}) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(10, 14, 32, 0.98)",
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
        <div style={{ fontWeight: 800, fontSize: 32, color: "#3EC6FF", marginBottom: 8, letterSpacing: 0.5 }}>
          Well Done!
        </div>
        <div style={{ color: "#b0b3c6", fontSize: 17, marginBottom: 32, fontWeight: 500 }}>
          Here is your typing performance report.
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 22,
          marginBottom: 32,
          width: "100%"
        }}>
          <div style={{ background: "#232B3E", borderRadius: 14, padding: "22px 0 14px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#b0b3c6", fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Total Words Typed</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: 1 }}>{report.totalWord}</div>
          </div>
          <div style={{ background: "#232B3E", borderRadius: 14, padding: "22px 0 14px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#b0b3c6", fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Words Per Minute<br/>(WPM)</div>
            <div style={{ fontWeight: 700, fontSize: 28, color: "#fff", letterSpacing: 1 }}>{report.wpm}</div>
          </div>
          <div style={{ background: "#232B3E", borderRadius: 14, padding: "22px 0 14px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#b0b3c6", fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Accuracy (%)</div>
            <div style={{ fontWeight: 800, fontSize: 32, color: "#3EC6A8", letterSpacing: 1 }}>{report.accuracy}%</div>
          </div>
          <div style={{ background: "#232B3E", borderRadius: 14, padding: "22px 0 14px 0", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ color: "#b0b3c6", fontSize: 15, fontWeight: 500, marginBottom: 6 }}>Total Errors</div>
            <div style={{ fontWeight: 800, fontSize: 32, color: "#FF5C5C", letterSpacing: 1 }}>{report.errors}</div>
          </div>
        </div>
        <button
          style={{
            background: "#3EC6FF",
            color: "#222B3A",
            border: "none",
            borderRadius: 10,
            padding: "16px 0",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            width: "100%",
            marginBottom: 16,
            boxShadow: "0 2px 8px 0 rgba(62,198,255,0.10)",
            letterSpacing: 0.5,
            transition: "background 0.2s"
          }}
          onClick={onTryAgain}
        >
          Try Again
        </button>
        <button
          style={{
            background: "transparent",
            color: "#b0b3c6",
            border: "1.5px solid rgb(80 87 132)",
            borderRadius: 10,
            padding: "16px 0",
            fontWeight: 700,
            fontSize: 18,
            cursor: "pointer",
            width: "100%",
            marginBottom: 0,
            letterSpacing: 0.5,
            transition: "background 0.2s"
          }}
          onClick={onThanks}
        >
          Thanks
        </button>
      </div>
    </div>
  );
}