import * as React from "react";
import "./App.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { BasicHeader } from "./components/BasicHeader";
import { getIcon } from "./utils/icons";

const colors = [
  "#B23B2A", // Dark Coral
  "#B59F00", // Dark Gold
  "#2B7A78", // Dark Turquoise
  "#4E944F", // Dark Lawn Green
  "#B2456E", // Dark Hot Pink
  "#1565A7", // Dark Deep Sky Blue
  "#B25C00", // Dark Orange
  "#228B5A", // Dark Spring Green
  "#B22222", // Dark Orange Red
  "#174C7C", // Dark Dodger Blue
  "#B10B5E", // Dark Deep Pink
  "#17806D", // Dark Medium Spring Green
  "#B23A48", // Dark Tomato
  "#1B6F6B", // Dark Dark Turquoise
  "#6B8E23", // Olive Drab
  "#B27300", // Dark Orange
  "#228B22", // Forest Green
  "#8B008B", // Dark Magenta
  "#008B8B", // Dark Aqua
  "#B28704", // Dark Pastel Orange
  "#4682B4", // Steel Blue
  "#BBAA33", // Dark Bright Yellow
  "#4F7942", // Dark Chartreuse
  "#B25F4A", // Dark Coral
  "#228B22", // Dark Lime Green
  "#8B5FC1", // Dark Lavender
  "#B23A1F", // Dark Vivid Orange
  "#007C99", // Dark Vivid Cyan
  "#B2186B", // Dark Razzle Dazzle Rose
  "#228B22", // Dark Neon Green
  "#BBAA00", // Dark Vivid Yellow
  "#B25A7C", // Dark Pink Flamingo
  "#117A65", // Dark Strong Cyan
  "#8B008B", // Dark Shocking Pink
  "#6C3483", // Dark Strong Purple
  "#B27323", // Dark Bright Orange
  "#145A32", // Dark Jade
  "#154360", // Dark Strong Blue
  "#A04000", // Dark Carrot Orange
  "#145A32", // Dark Emerald
  "#8B3A62", // Dark Pink Glamour
];

export default function Level(props: any) {
  // Live Test state
  const [liveTest, setLiveTest] = React.useState(true);
  // Handle level change (pass lesson to parent component)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const pageId = location?.state?.id;
  const courseState = useSelector(
    (state: any): any => state?.courseState ?? {}
  );
  const lessons = courseState[pageId] ?? [];
  const onChangeLesson = React.useCallback(
    (lesson: any, nextLesson: any, index: number) => {
      if (lesson.unlocked) {
        console.log(lesson);
        // lesson dataSet need to reduce as one line characters
        const dataSet = liveTest ? lesson.dataSet?.split("") : lesson.dataSet?.split("").slice(0, 80);
        const lession = { ...lesson, stage: pageId, index: index, dataSet: dataSet };
        
        // Store lesson data in Redux for persistence through refreshes
        dispatch({
          type: "SET_CURRENT_LESSON",
          payload: { lesson: lession, nextLesson: nextLesson }
        });
        
        // Passing the `nextLesson` object to the `/platform` route
        navigate("/platform", { state: { lesson: lession, nextLesson: nextLesson } });
      }
    },
    [pageId, navigate, dispatch, liveTest]
  );
  const Icon = React.useMemo(() => getIcon(pageId), [pageId]);

  return (
    <div
      style={{
        background: "rgb(0 5 37)",
        minHeight: "100vh",
        width: "100vw",
        overflowY: "scroll",
        position: "relative",
      }}
    >
      {/* Live Test Checkbox in top right corner */}
      <div
        style={{
          position: "fixed",
          top: 18,
          right: 32,
          zIndex: 100,
          background: "rgba(30,40,60,0.95)",
          borderRadius: 8,
          padding: "8px 18px 8px 12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
          display: "flex",
          alignItems: "center",
          fontSize: 16,
          color: "#fff",
          fontWeight: 500,
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={liveTest}
          onChange={e => setLiveTest(e.target.checked)}
          style={{ marginRight: 8, width: 18, height: 18 }}
          id="live-test-checkbox"
        />
        <label htmlFor="live-test-checkbox" style={{cursor: "pointer"}}>Live Test</label>
      </div>
      <BasicHeader />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          overflowY: "visible",
          padding: "20px",
          alignItems: "center",
          flex: 1,
          minHeight: "100vh", // Ensure the inner content takes up full height
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            width: "100%",
            padding: "10px",
          }}
        >
          {lessons.map((lesson: any, index: any) => {
            return (
              <div
                onClick={() => onChangeLesson(lesson, lessons[index + 1], index)}
                key={index}
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                  cursor: lesson.unlocked ? "pointer" : "not-allowed",
                  background: lesson.unlocked
                    ? "linear-gradient(145deg, #5e7e9b, #4a5b7b)"
                    : "rgba(128, 128, 128, 0.5)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  borderRight: `2px solid ${colors[index % colors.length]}`,
                  borderBottom: `2px solid ${colors[index % colors.length]}`,
                  position: "relative",
                  opacity: lesson.unlocked ? 1 : 0.55,
                }}
                onMouseEnter={(e) => {
                  if (lesson.unlocked) {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 8px 40px rgba(0, 0, 0, 0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (lesson.unlocked) {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px rgba(0, 0, 0, 0.2)";
                  }
                }}
              >
                <div
                  style={{
                    position: "relative",
                    padding: "20px",
                    color: "#fff",
                  }}
                >
                  {/* Lock icon in top right if lesson is locked */}
                  {!lesson.unlocked && (
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        borderRadius: 8,
                        padding: "2px 8px",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        display: "flex",
                        alignItems: "center",
                        zIndex: 2,
                      }}
                      title="Locked"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: 4}}><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    </span>
                  )}
                  <div
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        marginRight: 10,
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 32,
                          borderColor: "white",
                          borderWidth: 1,
                          borderStyle: "solid",
                          backgroundColor: colors[index] ?? "white",
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          opacity: lesson.unlocked ? 1 : 0.5,
                        }}
                      >
                        {<Icon/>}
                      </div>
                    </div>
                    <div style={{ display: "inline-block" }}>
                      <div
                        style={{
                          fontSize: "24px",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                          textAlign: "left",
                          textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                        }}
                      >
                        {lesson.title}
                      </div>
                      <div
                        style={{
                          fontSize: "13px",
                          marginBottom: "25px",
                          color: "#e0e0e0",
                          fontStyle: "italic",
                          textAlign: "left",
                        }}
                      >
                        {lesson.description}
                      </div>
                    </div>
                  </div>
                      
                  {lesson.unlocked ? (
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#FFF",
                        textAlign: "right",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      {lesson.exited ? "Restart" : "Click to Start!"} 
                    </div>
                  ) : (
                    <div
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#FFF",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      Locked
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
