import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { iconList } from "./utils/icons"; // Adjust the import path as needed
import Reports from "./Reports";
import Help from "./Help";
import Accounts from "./Account";
import LambdaLevel from "./LambdaLevel";
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const courseColor: string[] = ["#9C27B0", "#fe9118", "rgb(251 57 41)"];
const icons: JSX.Element[] = [
  <FaIcons.FaStar size={32} />, // Stage Alpha: Practice on Alphabets
  <FaIcons.FaMedal size={32} />, // Stage Beta: Practice on Words
  <FaIcons.FaTrophy size={32} />, // Stage Gamma: Practice on Grammers
];
const menuItems: { name: string; icon: JSX.Element; context?: string; unlocked?: boolean; }[] = [
  { name: "Home", icon: <FaIcons.FaHome size={24} />, context: 'Dashboard', unlocked: true },
  { name: "Stage Lambda", icon: <FaIcons.FaCodepen size={24} />, context: 'Programming', unlocked: true },
  { name: "Stage Theta", icon: <FaIcons.FaRobot size={24} />, context: 'Robotics & Math', unlocked: false },
  { name: "Stage Zeta", icon: <FaIcons.FaRocket size={24} />, context: 'Quantum & Space', unlocked: false },
  { name: "Stage Delta", icon: <FaIcons.FaFlask size={24} />, context: 'Natural-Science', unlocked: false },
  { name: "Stage Omaga", icon: <FaIcons.FaMedkit size={24} />, context: 'Medical-Science', unlocked: false },
  { name: "Stage Sigma", icon: <FaIcons.FaUsers size={24} />, context: 'Leadership', unlocked: false },
  { name: "Reports", icon: <FaIcons.FaChartBar size={24} />, context: 'Progress Reports', unlocked: true },
  { name: "Accounts", icon: <FaIcons.FaLaptop size={24} />, context: 'User Settings', unlocked: true },
  { name: "Help", icon: <FaIcons.FaLifeRing size={24} />, context: 'Support and FAQs', unlocked: true },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const courseStage: any[] = useSelector(
    (state: any) => state?.courseState?.courses ?? []
  );
  const progressData: any = useSelector(
    (state: any) => state?.reportState?.progressData ?? {}
  );
  const heatmapKeys: any[] = useSelector(
    (state: any) => state?.reportState?.heatmapKeys ?? []
  );
  const fingerUsage: any[] = useSelector(
    (state: any) => state?.reportState?.fingerUsage ?? []
  );
  const achievements: any[] = useSelector(
    (state: any) => state?.reportState?.achievements ?? []
  );
  const [sidebarMin, setSidebarMin] = React.useState(false);
  const [selectedMenu, setSelectedMenu] = React.useState("Home");
  const reportData = useSelector((state: any) => state.reportState.report);

  const alphaBadges = useMemo(
    () =>
      reportData
        .filter((r: any) => r.stage?.toLowerCase() === "alpha")
        .filter((r: any) => r.status?.toLowerCase() === "complete")
        .reduce((acc: any, cur: any) => {
          acc[cur.index] = cur;
          return acc;
        }, {}),
    [reportData]
  );
  const betaBadges = useMemo(
    () =>
      reportData
        .filter((r: any) => r.stage?.toLowerCase() === "beta")
        .filter((r: any) => r.status?.toLowerCase() === "complete")
        .reduce((acc: any, cur: any) => {
          acc[cur.index] = cur;
          return acc;
        }, {}),
    [reportData]
  );
  const gammaBadges = useMemo(
    () =>
      reportData
        .filter((r: any) => r.stage?.toLowerCase() === "gamma")
        .filter((r: any) => r.status?.toLowerCase() === "complete")
        .reduce((acc: any, cur: any) => {
          acc[cur.index] = cur;
          return acc;
        }, {}),
    [reportData]
  );

  console.log("Dashboard render", alphaBadges, betaBadges, gammaBadges);

  const onChangeLesson = (lesson: any) => {
    if (lesson.unlocked) {
      navigate("/level", { state: lesson });
    }
  };

  // Sidebar rendering
  return (
    <div
      style={{
        ...styles.dashboardWrapper,
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 1200px) {
          .heatmap-achievements-row {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .heatmap-section {
            min-width: auto !important;
            max-width: 100% !important;
            flex: none !important;
          }
          .achievements-section {
            min-width: auto !important;
            max-width: 100% !important;
            flex: none !important;
          }
        }
        @media (max-width: 1024px) {
          .dashboard-main-content {
            padding: 16px !important;
          }
          .progress-metrics-row {
            flex-wrap: wrap !important;
            gap: 16px !important;
          }
          .cards-wrapper {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
            gap: 16px !important;
          }
        }
        @media (max-width: 768px) {
          .heatmap-keyboard-row {
            gap: 3px !important;
            flex-wrap: wrap !important;
          }
          .heatmap-key {
            width: 24px !important;
            height: 24px !important;
            font-size: 12px !important;
          }
          .heatmap-error-item {
            font-size: 12px !important;
            min-width: auto !important;
            flex: 1 !important;
          }
          .heatmap-error-list {
            padding: 8px !important;
          }
          .finger-usage-row {
            flex-wrap: wrap !important;
            gap: 4px !important;
          }
          .finger-usage-item {
            min-width: 60px !important;
          }
          .dashboard-main-content {
            padding: 12px !important;
          }
          .progress-metrics-row {
            flex-direction: column !important;
            align-items: center !important;
            gap: 12px !important;
          }
          .cards-wrapper {
            grid-template-columns: 1fr !important;
          }
          .right-sidebar {
            width: 280px !important;
            min-width: 280px !important;
            max-width: 280px !important;
          }
        }
        @media (max-width: 480px) {
          .heatmap-keyboard-row {
            gap: 2px !important;
          }
          .heatmap-key {
            width: 20px !important;
            height: 20px !important;
            font-size: 10px !important;
          }
          .heatmap-section {
            padding: 12px !important;
          }
          .achievements-section {
            padding: 12px !important;
          }
          .dashboard-main-content {
            padding: 8px !important;
          }
          .right-sidebar {
            width: 260px !important;
            min-width: 260px !important;
            max-width: 260px !important;
            padding: 12px !important;
          }
          .badges-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 8px !important;
          }
        }
      `}</style>
      <div
        id="sidebar"
        style={{
          ...styles.sidebar,
          width: sidebarMin ? "60px" : "220px",
          minWidth: sidebarMin ? "60px" : "220px",
          maxWidth: sidebarMin ? "60px" : "220px",
          padding: sidebarMin ? "10px 5px" : "20px",
          alignItems: sidebarMin ? "center" : "initial",
          transition: "width 0.3s ease, min-width 0.3s ease, max-width 0.3s ease, padding 0.3s ease",
          overflow: "auto",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div style={{
          ...styles.sidebarOptionsBtnWrapper,
          right: sidebarMin ? 14 : 19,
        }}>
          <button
            style={{
              ...styles.optionsBtn,
              zIndex: 1000,
              position: 'relative',
            }}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("Sidebar toggle clicked, current state:", sidebarMin);
              setSidebarMin((v) => {
                console.log("Changing sidebar from", v, "to", !v);
                return !v;
              });
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3a3f6b";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2a2e5b";
              e.currentTarget.style.transform = "scale(1)";
            }}
            title={sidebarMin ? "Expand Sidebar" : "Minimize Sidebar"}
          >
            {sidebarMin ? (
              <FaIcons.FaAngleRight size={20} color="#fff" />
            ) : (
              <FaIcons.FaAngleLeft size={20} color="#fff" />
            )}
          </button>
        </div>

        
        {<div style={styles.logo}>{!sidebarMin ? "A L P H A B E T" : ""}</div>}
        {!sidebarMin &&
          menuItems.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.menuItem,
                ...(selectedMenu === item.name ? styles.menuItemActive : {}),
                ...(item.unlocked === false ? styles.menuItemLocked : {}),
              }}
              onClick={() => {
                if (item.unlocked) {
                  setSelectedMenu(item.name);
                  // Handle navigation based on menu item
                  const pathMap: { [key: string]: string } = {
                    'Help': 'help',
                    'Reports': 'reports',
                    'Accounts': 'accounts',
                    'Stage Lambda': 'lambda'
                  };
                  const path = pathMap[item.name];
                  if (path) {
                    navigate(path);
                  }
                }
              }}
              onMouseEnter={(e) => {
                if (item.unlocked) {
                  Object.assign(e.currentTarget.style, styles.menuItemHover);
                }
              }}
              onMouseLeave={(e) => {
                if (item.unlocked) {
                  if (selectedMenu === item.name) {
                    Object.assign(e.currentTarget.style, styles.menuItemActive);
                  } else {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "";
                  }
                }
              }}
            >
              <div style={{display: "flex", alignItems: "center", gap: 8}}>
              {React.cloneElement(item.icon, { 
                color: item.unlocked ? "#fff" : "#666",
                style: { opacity: item.unlocked ? 1 : 0.5 }
              })}
              <span style={{ color: item.unlocked ? "#fff" : "#666" }}>
                {item.name}
              </span>
              {item.unlocked === false && (
                <span style={{position:'absolute', right:0}}>
                  <FaIcons.FaLock color="#666" size={16} />
                </span>)
              } 
              </div>
              {item.context && (
                <span style={styles.menuItemContext}>{item.context}</span>
              )}
            </div>
          ))}
        {sidebarMin && (
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: 6,
                  cursor: item.unlocked ? "pointer" : "not-allowed",
                  opacity: item.unlocked ? 1 : 0.4,
                  padding: "8px",
                  ...(selectedMenu === item.name && item.unlocked ? styles.menuItemActive : {}),
                }}
                onClick={() => {
                  if (item.unlocked) {
                    setSelectedMenu(item.name);
                  }
                }}
                onMouseEnter={(e) => {
                  if (item.unlocked) {
                    Object.assign(e.currentTarget.style, styles.menuItemHover);
                  }
                }}
                onMouseLeave={(e) => {
                  if (item.unlocked) {
                    if (selectedMenu === item.name) {
                      Object.assign(e.currentTarget.style, styles.menuItemActive);
                    } else {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "";
                    }
                  }
                }}
                title={item.unlocked ? item.name : `${item.name} - Locked`}
              >
                {React.cloneElement(item.icon, { 
                  color: item.unlocked ? "#fff" : "#666",
                  style: { opacity: item.unlocked ? 1 : 0.4 }
                })}
              </div>
            ))}
          </div>
        )}
        {!sidebarMin && (
          <div style={styles.sidebarBottom}>© 2025 Kernel Alphabet</div>
        )}
      </div>
      <div
        style={{
          ...styles.mainContent,
          flex: 1,
          minWidth: 0,
          padding: sidebarMin ? "20px 10px" : "20px",
          transition: "padding 0.3s",
          overflowY: "auto",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        id="mainContent"
        className="dashboard-main-content"
      >
        {selectedMenu === "Home" && (
          <>
            <div style={styles.headerWrapper}>
              <div style={styles.header}>Welcome</div>
            </div>
            <div style={styles.cardsWrapper} className="cards-wrapper">
              {courseStage.map((lesson: any, index: number) => (
                <div
                  style={{
                    ...styles.card,
                    opacity: lesson.unlocked ? 1 : 0.85,
                    cursor: lesson.unlocked ? "pointer" : "not-allowed",
                    position: "relative",
                  }}
                  onClick={() => onChangeLesson(lesson)}
                  key={index}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      backgroundColor: courseColor[index],
                      marginRight: 20,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: 10,
                      position: "relative",
                    }}
                  >
                    {lesson.unlocked ? (
                      icons[index]
                    ) : (
                      <FaIcons.FaLock size={32} color="#fff" style={{ opacity: 0.8 }} />
                    )}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                      alignItems: "flex-start",
                    }}
                  >
                    <p style={styles.cardTitle}>
                      {lesson.title}
                      <p
                        style={{
                          fontSize: 12,
                          marginTop: 2,
                          letterSpacing: 1,
                          textTransform: "uppercase",
                        }}
                      >
                        {lesson.description}
                      </p>
                    </p>
                  </div>
                  {!lesson.unlocked && (
                    <div
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        borderRadius: 8,
                        padding: "2px 8px",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}
                    >
                      <FaIcons.FaLock size={16} style={{ marginRight: 2 }} /> Locked
                    </div>
                  )}
                </div>
              ))}
            </div>
            {/* Progress Overview */}
            <div style={styles.progressOverviewSection}>
              <div style={styles.progressMetricsRow} className="progress-metrics-row">
                <div style={styles.progressMetric}>
                  <span style={styles.progressMetricLabel}>WPM</span>
                  <span style={styles.progressMetricValue}>
                    {progressData.wpm}
                  </span>
                </div>
                <div style={styles.progressMetric}>
                  <span style={styles.progressMetricLabel}>Accuracy</span>
                  <span style={styles.progressMetricValue}>
                    {progressData.accuracy}%
                  </span>
                </div>
                <div style={styles.progressMetric}>
                  <span style={styles.progressMetricLabel}>Words Typed</span>
                  <span style={styles.progressMetricValue}>
                    {progressData.wordsTyped.toLocaleString()}
                  </span>
                </div>
              </div>
              <div style={styles.progressChartWrapper}>
                <Line
                  data={{
                    labels: progressData.dates,
                    datasets: [
                      {
                        label: "WPM",
                        data: progressData.wpmTrend,
                        borderColor: "#38bdf8",
                        backgroundColor: "rgba(56,189,248,0.1)",
                        tension: 0.4,
                      },
                      {
                        label: "Accuracy",
                        data: progressData.accuracyTrend,
                        borderColor: "#22c55e",
                        backgroundColor: "rgba(34,197,94,0.1)",
                        tension: 0.4,
                      },
                    ],
                  }}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: { enabled: true },
                    },
                    scales: { y: { min: 0, max: 100 } },
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: { mode: "index", intersect: false },
                  }}
                  height={80}
                />
              </div>
              <div style={styles.progressLevelBarWrapper}>
                <span style={styles.progressLevelLabel}>
                  Level {progressData.level}:
                </span>
                <div style={styles.progressLevelBarBg}>
                  <div
                    style={{
                      ...styles.progressLevelBar,
                      width: `${progressData.levelProgress * 100}%`,
                    }}
                  ></div>
                </div>
                <span style={styles.progressLevelPercent}>
                  {Math.round(progressData.levelProgress * 100)}% to Next Level
                </span>
              </div>
            </div>
            {/* Heatmap & Achievements */}
            <div style={styles.heatmapAchievementsRow} className="heatmap-achievements-row">
              {/* Heatmap */}
              <div style={styles.heatmapSection} className="heatmap-section">
                <div style={styles.heatmapTitle}>Keyboard Heatmap</div>
                <div style={styles.heatmapKeyboardWrapper}>
                  {/* Simple keyboard row for demo */}
                  <div style={styles.heatmapKeyboardRow} className="heatmap-keyboard-row">
                    {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
                      (k) => {
                        const keyErr = heatmapKeys.find((hk) => hk.key === k);
                        let bg = "#222";
                        if (keyErr)
                          bg = keyErr.errors > 10 ? "#ef4444" : "#22c55e";
                        return (
                          <span
                            key={k}
                            style={{ ...styles.heatmapKey, background: bg }}
                            className="heatmap-key"
                          >
                            {k}
                          </span>
                        );
                      }
                    )}
                  </div>
                </div>
                <div style={styles.heatmapErrorList} className="heatmap-error-list">
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>
                    Top Mistyped Keys
                  </div>
                  {/* Top Mistyped Keys in 2 rows of 4 */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {[0, 1].map((row) => (
                      <div
                        key={row}
                        style={{
                          display: "flex",
                          gap: 8,
                          width: "100%",
                          marginBottom: 4,
                        }}
                      >
                        {heatmapKeys
                          .sort((a, b) => b.errors - a.errors)
                          .slice(row * 4, row * 4 + 4)
                          .map((k) => (
                            <div
                              key={k.key}
                              style={{ ...styles.heatmapErrorItem, minWidth: 120 }}
                              className="heatmap-error-item"
                            >
                              <span style={{ fontWeight: 500 }}>{k.key}:</span>{" "}
                              {k.errors} errors{" "}
                              <button style={styles.practiceBtn}>Practice</button>
                            </div>
                          ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={styles.fingerUsageTitle}>Finger Usage</div>
                <div style={styles.fingerUsageContainer}>
                  {/* Left Hand Fingers - Top Row */}
                  <div style={styles.handSection}>
                    <div style={styles.handLabel}>Left Hand</div>
                    <div style={styles.fingerUsageRow} className="finger-usage-row">
                      {fingerUsage.slice(0, 4).map((f) => (
                        <div key={f.finger} style={styles.fingerUsageItem} className="finger-usage-item">
                          <span style={{ fontWeight: 500, fontSize: 11 }}>{f.finger.replace('Left ', '')}</span>
                          <div style={styles.fingerUsageBarBg}>
                            <div
                              style={{
                                ...styles.fingerUsageBar,
                                width: `${f.percent}%`,
                              }}
                            ></div>
                          </div>
                          <span style={{ fontSize: 12 }}>{f.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Right Hand Fingers - Bottom Row */}
                  <div style={styles.handSection}>
                    <div style={styles.handLabel}>Right Hand</div>
                    <div style={styles.fingerUsageRow} className="finger-usage-row">
                      {fingerUsage.slice(4, 8).map((f) => (
                        <div key={f.finger} style={styles.fingerUsageItem} className="finger-usage-item">
                          <span style={{ fontWeight: 500, fontSize: 11 }}>{f.finger.replace('Right ', '')}</span>
                          <div style={styles.fingerUsageBarBg}>
                            <div
                              style={{
                                ...styles.fingerUsageBar,
                                width: `${f.percent}%`,
                              }}
                            ></div>
                          </div>
                          <span style={{ fontSize: 12 }}>{f.percent}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {/* Achievements */}
              <div style={styles.achievementsSection} className="achievements-section">
                <div style={styles.achievementsTitle}>Achievements</div>
                <div style={styles.achievementsGrid}>
                  {achievements.map((a, i) => (
                    <div
                      key={a.name}
                      style={{
                        ...styles.achievementBadge,
                        opacity: a.earned ? 1 : 0.5,
                        border: a.earned
                          ? "2px solid #38bdf8"
                          : "2px dashed #888",
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: 18 }}>
                        {a.name}
                      </div>
                      <div style={{ fontSize: 14 }}>{a.desc}</div>
                      {!a.earned && (
                        <div style={styles.achievementProgressBarBg}>
                          <div
                            style={{
                              ...styles.achievementProgressBar,
                              width: `${Math.round((a.progress || 0) * 100)}%`,
                            }}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div style={styles.milestoneTracker}>
                  <span>
                    Milestone: <b>100 words</b> to unlock{" "}
                    <b>Next Level Novice</b>
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        {selectedMenu !== "Home" && <Outlet />}
      </div>
      <div
        style={{
          ...styles.rightSide,
          width: "300px",
          minWidth: "220px",
          maxWidth: "350px",
          padding: sidebarMin ? "20px 8px" : "20px",
          transition: "padding 0.3s",
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        }}
        id="rightSide"
        className="right-sidebar"
      >
        <div style={styles.badgesGridWrapper}>
          <h3 style={{ marginBottom: 12, fontSize: 18, color: "#fff" }}>
            Badges You've Earned
          </h3>
          <div style={styles.badgesGrid} className="badges-grid">
            {Array.from({ length: 40 }).map((_, i) => {
              // Write bronze, sliver, gold badges based on score
              const Icon = iconList.Alpha.Icon;
              const stage = iconList.Alpha.Stage;
              const score = alphaBadges[i]?.accuracy || 0;
              const errors = alphaBadges[i]?.errors || 0;
              let styleVariant = styles.badgeItem;
              if (score >= 80 && errors >= 0 && errors <= 2) styleVariant = styles.badgeItemGold;
              else if (score >= 50 && errors >= 3 && errors <= 5) styleVariant = styles.badgeItemSilver;
              else if (score >= 30 && errors >= 6 && errors <= 10) styleVariant = styles.badgeItemBronze;
              return (
                <div key={i} style={styleVariant}>
                  <div
                    style={{
                      fontSize: 12,
                      marginBottom: 1,
                      width: 24,
                      position: "absolute",
                      background: "#0472c1",
                      right: -5,
                      top: -5,
                      padding: 2,
                      textAlign: "center",
                      borderRadius: 24,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 1 }}>{stage}</div>
                  <Icon size={24} color="#000" style={{ opacity: 0.2 }} />
                </div>
              );
            })}
            {Array.from({ length: 40 }).map((_, i) => {
              // Write bronze, sliver, gold badges based on score
              const Icon = iconList.Beta.Icon;
              const stage = iconList.Beta.Stage;
              const score = betaBadges[i]?.accuracy || 0;
              const errors = betaBadges[i]?.errors || 0;
              let styleVariant = styles.badgeItem;

              if (score >= 80 && errors >= 0 && errors <= 2) styleVariant = styles.badgeItemGold;
              else if (score >= 50 && errors >= 3 && errors <= 5) styleVariant = styles.badgeItemSilver;
              else if (score >= 30 && errors >= 6 && errors <= 10) styleVariant = styles.badgeItemBronze;

              return (
                <div key={i} style={styleVariant}>
                  <div
                    style={{
                      fontSize: 12,
                      marginBottom: 1,
                      width: 24,
                      position: "absolute",
                      background: "#0472c1",
                      right: -5,
                      top: -5,
                      padding: 2,
                      textAlign: "center",
                      borderRadius: 24,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 1 }}>{stage}</div>
                  <Icon size={24} color="#000" style={{ opacity: 0.2 }} />
                </div>
              );
            })}
            {Array.from({ length: 40 }).map((_, i) => {
              // Write bronze, sliver, gold badges based on score
              const Icon = iconList.Gamma.Icon;
              const stage = iconList.Gamma.Stage;
              const score = gammaBadges[i]?.accuracy || 0;
              const errors = gammaBadges[i]?.errors || 0;
              let styleVariant = styles.badgeItem;

               if (score >= 80 && errors >= 0 && errors <= 2) styleVariant = styles.badgeItemGold;
              else if (score >= 50 && errors >= 3 && errors <= 5) styleVariant = styles.badgeItemSilver;
              else if (score >= 30 && errors >= 6 && errors <= 10) styleVariant = styles.badgeItemBronze;

              return (
                <div key={i} style={styleVariant}>
                  <div
                    style={{
                      fontSize: 12,
                      marginBottom: 1,
                      width: 24,
                      position: "absolute",
                      background: "#0472c1",
                      right: -5,
                      top: -5,
                      padding: 2,
                      textAlign: "center",
                      borderRadius: 24,
                    }}
                  >
                    {i + 1}
                  </div>
                  <div style={{ fontSize: 12, marginBottom: 1 }}>{stage}</div>
                  <Icon size={24} color="#000" style={{ opacity: 0.2 }} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  dashboardWrapper: {
    display: "flex",
    height: "100vh",
    background: "#202449",
    color: "#fff",
    fontFamily: "'Poppins', sans-serif",
  },
  headerWrapper: {
    flexDirection: "row",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sidebar: {
    width: "220px",
    background: "linear-gradient(135deg, rgb(0 115 191), #160078, #010030)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
    transition: "width 0.3s, padding 0.3s",
    minWidth: 0,
  },
  sidebarOptionsBtnWrapper: {
    position: "absolute",
    top: 16,
    right: 19,
    zIndex: 1000,
    transition: "right 0.3s ease",
  },
  optionsBtn: {
    background: "#2a2e5b",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: 6,
    width: 32,
    height: 32,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
    transition: "all 0.2s ease",
    zIndex: 1001,
    position: "relative",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#38bdf8",
  },
  menuItem: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    gap: "10px",
    paddingLeft: "5px",
    cursor: "pointer",
    borderRadius: 6,
    height: 40,
    transition: "background 0.2s, color 0.2s",
    justifyContent: "center",
    position: "relative",
  },
  menuItemActive: {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.18), rgba(255,255,255,0.0))",
    color: "#38bdf8",
  },
  menuItemHover: {
    background:
      "linear-gradient(90deg, rgba(255,255,255,0.22), rgba(255,255,255,0.12))",
    color: "#38bdf8",
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    background: " #010030",
  },
  header: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  cardsWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "linear-gradient(135deg, rgb(0 115 191), #160078, #010030)",
    padding: "30px",
    borderRadius: "10px",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)",
    flexDirection: "row",
    display: "flex",
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    color: "#FFF",
    textAlign: "left",
    alignItems: "flex-start",
  },
  graphSection: {
    marginTop: "40px",
    background: "#2a2e5b",
    padding: "20px",
    borderRadius: "10px",
  },
  graphTitle: {
    fontSize: "22px",
    marginBottom: "10px",
  },
  graph: {
    height: "200px",
    background: "#0f172a",
    borderRadius: "10px",
  },
  rightSide: {
    width: "300px",
    padding: "20px",
    background: "linear-gradient(0deg, rgb(0 115 191), #160078, #010030)",
    overflowY: "scroll",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
  incomeCard: {
    background:
      "linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(138, 43, 226, 0.2))",
    padding: "20px",
    borderRadius: "20px",
    marginBottom: "20px",
    backdropFilter: "blur(20px)", // key part of the glass effect
    WebkitBackdropFilter: "blur(20px)", // Safari support
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
    color: "#fff",
    textAlign: "left",
  },
  incomeAmount: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#38bdf8",
  },
  activityList: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "10px",
  },
  dataSection: {
    display: "flex",
    gap: "20px",
    marginTop: "30px",
  },
  dataCardLeft: {
    background: "#2a2e5b",
    padding: "20px",
    borderRadius: "10px",
    flex: 1,
  },
  dataCard: {
    background:
      "linear-gradient(135deg, rgba(120, 60, 255, 0.3), rgba(0, 174, 255, 0.3))",
    padding: "20px",
    borderRadius: "20px",
    flex: 1,
    backdropFilter: "blur(25px)",
    WebkitBackdropFilter: "blur(25px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
    color: "#ffffff",
    textAlign: "left",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  pieChart: {
    height: "150px",
    background: "#0f172a",
    borderRadius: "10px",
  },
  userProfile: {
    background: "#0f172a",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  sidebarBottom: {
    marginTop: "auto",
    padding: "10px",
    background: "#2a2e5b",
    textAlign: "center",
    borderRadius: "5px",
  },
  searchBox: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    width: "250px",
    background: "#334155",
    color: "#fff",
  },
  // Add styles for new sections
  progressOverviewSection: {
    background: "linear-gradient(135deg, rgb(0 115 191), #160078, #010030)",
    borderRadius: 12,
    padding: 24,
    marginBottom: 20,
    marginTop: 20,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  progressMetricsRow: {
    display: "flex",
    gap: 32,
    marginBottom: 16,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  progressMetric: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: 18,
    fontWeight: 500,
  },
  progressMetricLabel: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 2,
  },
  progressMetricValue: {
    fontSize: 28,
    fontWeight: 700,
    color: "#38bdf8",
  },
  progressChartWrapper: {
    height: 90,
    marginBottom: 16,
    background: "#181a2f",
    borderRadius: 8,
    padding: 8,
  },
  progressLevelBarWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  progressLevelLabel: {
    fontWeight: 600,
    color: "#fff",
  },
  progressLevelBarBg: {
    flex: 1,
    height: 12,
    background: "#2a2e5b",
    borderRadius: 8,
    overflow: "hidden",
    margin: "0 8px",
  },
  progressLevelBar: {
    height: "100%",
    background: "linear-gradient(90deg, #38bdf8, #22c55e)",
    borderRadius: 8,
    transition: "width 0.3s",
  },
  progressLevelPercent: {
    fontSize: 13,
    color: "#aaa",
  },
  heatmapAchievementsRow: {
    display: "flex",
    gap: 24,
    marginBottom: 32,
    flexWrap: "wrap",
  },
  heatmapSection: {
    flex: 1.2,
    background: "linear-gradient(135deg, rgb(0 115 191), #160078, #010030)",
    borderRadius: 12,
    padding: 20,
    minWidth: 320,
    maxWidth: "100%",
    overflow: "hidden",
  },
  heatmapTitle: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8,
  },
  heatmapKeyboardWrapper: {
    marginBottom: 12,
    overflow: "auto",
    maxWidth: "100%",
  },
  heatmapKeyboardRow: {
    display: "flex",
    gap: 6,
    marginBottom: 6,
    minWidth: "fit-content",
  },
  heatmapKey: {
    width: 32,
    height: 32,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontWeight: 600,
    fontSize: 16,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  heatmapErrorList: {
    marginBottom: 10,
    overflow: "hidden",
  },
  heatmapErrorItem: {
    fontSize: 14,
    marginBottom: 2,
    display: "flex",
    alignItems: "center",
    gap: 8,
    flexWrap: "wrap",
    minWidth: "fit-content",
  },
  practiceBtn: {
    background: "#38bdf8",
    color: "#fff",
    border: "none",
    borderRadius: 4,
    padding: "2px 8px",
    fontSize: 12,
    cursor: "pointer",
    marginLeft: 8,
  },
  fingerUsageTitle: {
    fontWeight: 600,
    fontSize: 15,
    margin: "8px 0 4px 0",
  },
  fingerUsageContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  handSection: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  handLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 2,
  },
  fingerUsageRow: {
    display: "flex",
    gap: 8,
    justifyContent: "space-between",
  },
  fingerUsageItem: {
    flex: 1,
    fontSize: 13,
    marginBottom: 4,
    textAlign: "center",
  },
  fingerUsageBarBg: {
    width: "100%",
    height: 8,
    background: "#2a2e5b",
    borderRadius: 4,
    margin: "2px 0",
    overflow: "hidden",
  },
  fingerUsageBar: {
    height: "100%",
    background: "linear-gradient(90deg, #38bdf8, #22c55e)",
    borderRadius: 4,
    transition: "width 0.3s",
  },
  achievementsSection: {
    flex: 1,
    background: "linear-gradient(135deg, rgb(0 115 191), #160078, #010030)",
    borderRadius: 12,
    padding: 20,
    minWidth: 260,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  achievementsTitle: {
    fontWeight: 700,
    fontSize: 18,
    marginBottom: 8,
  },
  achievementsGrid: {
    display: "flex",
    gap: 12,
    marginBottom: 12,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  achievementBadge: {
    background: "#181a2f",
    borderRadius: 10,
    padding: "12px 16px",
    minWidth: 110,
    minHeight: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 4,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    transition: "border 0.3s",
  },
  achievementProgressBarBg: {
    width: "100%",
    height: 6,
    background: "#2a2e5b",
    borderRadius: 3,
    marginTop: 4,
    overflow: "hidden",
  },
  achievementProgressBar: {
    height: "100%",
    background: "linear-gradient(90deg, #38bdf8, #fbbf24)",
    borderRadius: 3,
    transition: "width 0.3s",
  },
  milestoneTracker: {
    marginTop: 8,
    fontSize: 14,
    color: "#fff",
    background: "#181a2f",
    borderRadius: 6,
    padding: "6px 12px",
    textAlign: "center",
  },
  // Add styles for badges grid
  badgesGridWrapper: {
    marginTop: 0,
    background: "linear-gradient(135deg, rgb(0 115 191), #160078, #010030)",
    borderRadius: 12,
    padding: 16,
    paddingTop: 1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    overflow: "visible",
    position: "relative",
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
  badgesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    scrollbarWidth: "none", // Firefox
    msOverflowStyle: "none", // IE/Edge
  },
  badgeItem: {
    background: "rgb(0 150 243)",
    borderRadius: 10,
    border: "2px solid rgb(0 128 255",
    padding: "16px 0 8px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
    minWidth: 0,
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    transition: "border 0.3s",
    opacity: 0.5,
    cursor: "not-allowed",
    position: "relative",
  },
  badgeItemBronze: {
    background: "linear-gradient(135deg,rgb(242, 173, 103) 60%, #a97142 100%)",
    borderRadius: 10,
    border: "2px solid #cd7f32",
    padding: "16px 0 8px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
    minWidth: 0,
    boxShadow: "0 1px 3px rgba(205,127,50,0.18)",
    transition: "border 0.3s",
    position: "relative",
  },
  badgeItemSilver: {
    background:
      "linear-gradient(135deg,rgba(214, 212, 212, 0.81) 60%, #e0e0e0 100%)",
    borderRadius: 10,
    border: "2px solid #c0c0c0",
    padding: "16px 0 8px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
    minWidth: 0,
    boxShadow: "0 1px 3px rgba(192,192,192,0.18)",
    transition: "border 0.3s",
    position: "relative",
  },
  badgeItemGold: {
    background:
      "linear-gradient(135deg,rgba(252, 182, 4, 0.97) 60%, #fff8dc 100%)",
    borderRadius: 10,
    border: "2px solid #f5970a;",
    padding: "16px 0 8px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 24,
    minWidth: 0,
    boxShadow: "0 1px 3px rgba(255,215,0,0.18)",
    transition: "border 0.3s",
    position: "relative",
  },
  menuItemContext: {
    fontSize: 12,
    color: "#aaa",
    marginTop: -12,
    marginLeft: 32,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  menuItemLocked: {
    color: "#666",
    cursor: "not-allowed",
    pointerEvents: "none",
    opacity: 0.4,
    background: "rgba(102, 102, 102, 0.1)",
  },
};

export default Dashboard;
