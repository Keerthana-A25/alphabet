import * as React from "react";
import "./App.css";
import Keyboard from "./Keyboard";
import { useLocation, useNavigate } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";

const isValidKey = (key: string) => {
  const validKeysRegex = /^[a-zA-Z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?\/`~ ]$/;
  return validKeysRegex.test(key);
};

export default function LetterPlatform({params}: any) {
  const location  = useLocation();
  const navigate = useNavigate();
  const { lesson = {} } = location?.state ?? {};
  const [outputs] = React.useState(lesson);
  const [inputs, setInputs] = React.useState("");
  const onKeyboardCallback = React.useCallback((key: string) => {
    setInputs((inputs) => inputs + key);
  }, []);

  const onKeydown = React.useCallback((event: any) => {
      event.preventDefault();
      const key = event.key;
      if (isValidKey(key)) {
        onKeyboardCallback(key);
      }
      event.stopImmediatePropagation();
    }, [onKeyboardCallback]);

  React.useEffect(() => {
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener('keydown', onKeydown);
  }, [onKeydown]);

  const onResetLession = React.useCallback((lession: any) => {
    setInputs("");
  }, []);
  const onNavigationBack = React.useCallback(()=>{
    navigate(-1);
  }, [navigate]);
  const outputDataSet = React.useMemo(() => outputs.dataSet, [outputs]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flex:1,
        overflowY: "hidden",
        background: "linear-gradient(to top, #111, #333)",
        height:'100vh'
      }}
    >
      <div style={{ flex:1, display:'flex', flexDirection:'column' }}>
        <div style={{display:'flex', flexDirection:'column'}}>
          <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div style={{display:'flex', flexDirection:'row', alignItems:'center', marginLeft:20}}>
            <div onClick={onNavigationBack} style={{cursor:'pointer'}} className="back-button">
            <BsArrowLeft fontSize={24} fill="white"/>
            </div>
            <div>
              <div
                style={{
                  marginLeft: 20,
                  marginTop: 10,
                  fontSize: 16,
                  color: "blue",
                }}
              >
                {outputs.title}
              </div>
              <div style={{ marginLeft: 20, color: "gray" }}>
                {outputs.description}
              </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginRight: 20,
              }}
            >
              <button onClick={onResetLession}>Reset</button>
            </div>
          </div>
          <div
            style={{
              height: 250,
              padding: 10,
              borderRadius: 10,
              margin: 20,
              width: '70%',
              alignSelf:'center'
            }}
          >
            {outputDataSet?.map?.((o: any, index: number) => {
              let style = { color: "#CCC" };
              const cursorStyle =
                index == inputs.length ? { borderBottom: "2px solid red" } : {};
              if (inputs.length > index) {
                style =
                  inputs[index] === o ? { color: "green" } : { color: "red" };
              }
              const className = index === inputs.length ? "blinking-border" : "";
              return (
                <>
                  <span
                    key={index}
                    className={className}
                    style={{ fontSize: 48, ...style, ...cursorStyle }}
                  >
                    {o}
                  </span>
                </>
              );
            })}
          </div>
          <div
            style={{
              margin: 20,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>00:00</div>
            <div>{`${inputs.length}/${outputDataSet.length}`}</div>
          </div>
        </div>
        <div style={{ display: "flex", height:'auto', marginTop:-30, flex:1, justifyContent:'center'}}>
          <Keyboard
            highlightedKey={String(outputDataSet[inputs.length]).toUpperCase()}
          />
        </div>
      </div>
    </div>
  );
}
