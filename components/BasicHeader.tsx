import * as React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

export const BasicHeader = ({
  title = "Go back",
  message = "Back to previous page",
}) => {
  const navigate = useNavigate();
  const onNavigationBack = React.useCallback(() => {
    navigate(-1);
  }, [navigate]);
  return (
    <div
      style={{
        flexDirection: "row",
        display: "flex",
        justifyContent: "space-between",
        alignSelf: "flex-start",
        marginTop: 20,
        marginLeft: 40,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <div
          onClick={onNavigationBack}
          style={{ cursor: "pointer" }}
          className="back-button"
        >
          <BsArrowLeft fontSize={24} fill="white" />
        </div>
        <div>
          <div
            style={{
              marginLeft: 20,
              fontSize: 16,
              color: "blue",
            }}
          >
            {title}
          </div>
          <div style={{ marginLeft: 20, color: "gray" }}>{message}</div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-end",
          marginRight: 20,
        }}
      ></div>
    </div>
  );
};
