import * as React from "react";
import { useNavigate } from "react-router-dom";
import { programmingStages } from "./utils/lambda";
const colors = [
  "#B23B2A", "#B59F00", "#2B7A78", "#4E944F", "#B2456E", "#1565A7", "#B25C00", "#228B5A", "#B22222", "#174C7C", "#B10B5E", "#17806D", "#B23A48", "#1B6F6B", "#6B8E23", "#B27300", "#228B22", "#8B008B", "#008B8B", "#B28704", "#4682B4", "#BBAA33", "#4F7942", "#B25F4A", "#228B22", "#8B5FC1", "#B23A1F", "#007C99", "#B2186B", "#228B22", "#BBAA00", "#B25A7C", "#117A65", "#8B008B", "#6C3483", "#B27323", "#145A32", "#154360", "#A04000", "#145A32", "#8B3A62"
];

export default function LambdaLevel() {
  const navigate = useNavigate();

  const onSelectProgram = React.useCallback((stage: any, nextStage: any) => {
    navigate('/program', {
      state: {
        stage: stage,
        nextStage: nextStage,
         language: stage.title   //  Add this line to pass the topic name like "Rust"
      }
    });
  }, [navigate]);

  return (
      <div
        style={{
          width: "100%",
          margin: "10px auto",
          borderRadius: 18,
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        }}
      >
        <div style={{marginBottom:12, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
          <div style={{fontSize:24, fontWeight:"bold" }}>Lambda Stage | Typing Tutor for Programming</div>
          <div>Sharpen your programming typing skills for robotics and software development.</div>
        </div>
        <div style={{height:1, background:'linear-gradient(45deg, transparent, #fff)', width:'100%', marginBottom:12 }}></div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "28px 32px",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          {programmingStages.map((stage: { title: string; description: string; unlocked: boolean }, index: number) => {
            const isUnlocked = stage.unlocked;
            return (
              <div
                key={stage.title}
                onClick={() => isUnlocked && onSelectProgram(stage, programmingStages[index + 1])}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  cursor: isUnlocked ? "pointer" : "not-allowed",
                  background: isUnlocked
                    ? `linear-gradient(145deg, ${colors[index % colors.length]}, #4a5b7b)`
                    : "linear-gradient(135deg, rgba(180,180,180,0.35), rgba(120,120,120,0.18))",
                  opacity: isUnlocked ? 1 : 0.55,
                  transition: "transform 0.3s, box-shadow 0.3s, opacity 0.3s",
                  minWidth: 0,
                  minHeight: 140,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  pointerEvents: isUnlocked ? "auto" : "none",
                }}
                onMouseEnter={e => {
                  if (isUnlocked) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow = "0 8px 40px rgba(0, 0, 0, 0.4)";
                  }
                }}
                onMouseLeave={e => {
                  if (isUnlocked) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.2)";
                  }
                }}
              >
                <div style={{ position: "relative", padding: "24px 20px", color: isUnlocked ? "#fff" : "#888", height: "100%" }}>
                  <div style={{ fontSize: "22px", fontWeight: "bold", textAlign: "left", marginBottom: 8 }}>
                    {stage.title}
                  </div>
                  <div style={{ fontSize: "14px", color: isUnlocked ? "#e0e0e0" : "#bbb", fontStyle: "italic", textAlign: "left", minHeight: 48 }}>
                    {stage.description}
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 500, color: isUnlocked ? "#38bdf8" : "#aaa", textAlign: "right", marginTop: 18 }}>
                    {isUnlocked ? "Click Here to Start" : "Locked"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  );
}
