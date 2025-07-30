import React from "react";
import { useSelector } from "react-redux";
import "./reports-dark-table.css";
import { programmingStages } from "./utils/lambda";

const STAGES = ["Alpha", "Beta", "Gamma", "Lambda"];

const Reports: React.FC = () => {
  // Get report data from Redux (update selector if your reducer key is different)
  const reportData = useSelector((state: any) => state.reportState.report);
  // Find last practiced stage (default active)
  const lastStage = React.useMemo(() => {
    const last = [...reportData].reverse().find(r => STAGES.includes(r.stage));
    return last ? last.stage : STAGES[0];
  }, [reportData]);
  const [activeTab, setActiveTab] = React.useState(lastStage);
  // For Lambda, collect unique programming levels
 const lambdaLevels = React.useMemo<string[]>(() => {
  return programmingStages
    .filter(stage => stage.unlocked)
    .map(stage => stage.title);
}, []);
  const [selectedLambdaLevel, setSelectedLambdaLevel] = React.useState<string>(lambdaLevels[0] || "All");

  React.useEffect(() => {
    // Update lambda level dropdown if tab changes to Lambda
    if (activeTab === "Lambda" && lambdaLevels.length > 0) {
      setSelectedLambdaLevel(lambdaLevels[0]);
    }
  }, [activeTab, lambdaLevels]);

  // Filtered data for current tab
  const filteredData = React.useMemo(() => {
    if (activeTab === "Lambda") {
      return reportData.filter((r: any) => r.stage?.toLowerCase() === "lambda" && (selectedLambdaLevel === "All" || r.level === selectedLambdaLevel));
    }
    return reportData.filter((r: any) => r.stage?.toLowerCase() === activeTab.toLowerCase());
  }, [reportData, activeTab, selectedLambdaLevel]);

  return (
    <div className="reports-container">
      <h2 className="reports-title">Reports</h2>
      <p className="reports-desc">View your detailed reports and analytics for each stage and lesson.</p>
      <div className="reports-tabs-bar">
        {STAGES.map((stage) => (
          <div
            key={stage}
            className={`reports-tab-label${activeTab === stage ? " active" : ""}`}
            onClick={() => setActiveTab(stage)}
          >
            {stage}
            {activeTab === stage && <div className="reports-tab-underline" />}
          </div>
        ))}
      </div>
      {activeTab === "Lambda" && (
        <div className="reports-lambda-dropdown-row">
          <label htmlFor="lambda-level-select" style={{ color: '#fff', marginRight: 8 }}>Programming Level:</label>
          <select
            id="lambda-level-select"
            className="reports-lambda-dropdown"
            value={selectedLambdaLevel}
            onChange={e => setSelectedLambdaLevel(e.target.value)}
          >
            {lambdaLevels.map((lvl: string) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
        </div>
      )}
      <div className="reports-table-wrapper">
        <table className="custom-table reports-fullwidth-table">
          <thead>
            <tr>
              {activeTab === "Lambda" ? <th>Level</th> : null}
              <th>Lesson</th>
              <th>Speed (WPM)</th>
              <th>Accuracy (%)</th>
              <th>Errors</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr><td colSpan={activeTab === "Lambda" ? 6 : 5} style={{ textAlign: 'center', color: '#888' }}>No data available.</td></tr>
            ) : filteredData.map((row: any, idx: any) => (
              <tr key={idx}>
                {activeTab === "Lambda" ? <td>{row.level}</td> : null}
                <td>{row.lesson}</td>
                <td className="align-right">{row.speed}</td>
                <td className="align-right">{row.accuracy}</td>
                <td className="align-right">{row.errors}</td>
                <td>
                  {row.status === "Complete" ? (
                    <span className="status-complete">Complete</span>
                  ) : (
                    <span className="status-incomplete">Incomplete</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style>{`
        .reports-container {
          width: 100%;
          max-width: 100vw;
          margin: 0;
          padding: 0 0 0 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .reports-title {
          text-align: left;
          margin-left: 16px;
        }
        .reports-desc {
          text-align: left;
          margin-left: 16px;
        }
        .reports-tabs-bar {
          display: flex;
          flex-direction: row;
          gap: 32px;
          margin-bottom: 18px;
          border-bottom: 2px solid #3939a3;
          padding-left: 8px;
        }
        .reports-tab-label {
          position: relative;
          color: #8ea6e6;
          font-size: 1.08rem;
          font-weight: 500;
          padding: 0 12px 12px 12px;
          cursor: pointer;
          background: none;
          border: none;
          outline: none;
          transition: color 0.18s;
          display: flex;
          align-items: flex-end;
          height: 40px;
        }
        .reports-tab-label.active {
          color: #38bdf8;
          font-weight: 600;
        }
        .reports-tab-label:hover {
          color: #fff;
        }
        .reports-tab-underline {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 3px;
          border-radius: 2px 2px 0 0;
          background: #38bdf8;
          box-shadow: 0 2px 8px #38bdf880;
          animation: tab-underline-in 0.22s cubic-bezier(.4,1.6,.6,1) both;
        }
        @keyframes tab-underline-in {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }
        .reports-lambda-dropdown-row {
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          margin-left: 16px;
        }
        .reports-lambda-dropdown {
          background: #181a2f;
          color: #fff;
          border: 1px solid #23244a;
          border-radius: 6px;
          padding: 6px 16px;
          font-size: 1rem;
        }
        .reports-table-wrapper {
          width: 100%;
          margin-top: 18px;
          padding: 0 0 0 0;
        }
        .reports-fullwidth-table {
          width: 100%;
          min-width: 100%;
          max-width: 100vw;
        }
      `}</style>
    </div>
  );
};

export default Reports;