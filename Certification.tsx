import * as React from "react";
import "./Level.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";


const lessons = [
  {
    title: "Stage White",
    description: "Practice on ASDF",
    dataSet: "a s d f aa ss dd ff aaa sss ddd fff asdf asfd afds afsd adfs adsf sasd safd sdfs sdaf sfad sfda dasf dfas dfsa fdas fdsa fasd fads add aff ass sdd sff saa dff daa dss faa fss fdd",
    unlocked: true,
  },
  {
    title: "Stage Red",
    description: "Practice on ;LKJ",
    dataSet: "; l k j ;; ll kk jj ;;; lll kk jjj ;lkj ;lkj ;lkj ;lkj",
    unlocked: false,
  },
  {
    title: "Stage Blue",
    description: "Practice on ASDFG",
    dataSet: "a s d f g aa ss dd ff gg aaa sss ddd fff ggg asdfg asdfg asdfg asdfg asd fg",
    unlocked: false,
  },
  {
    title: "Stage Green",
    description: "Practice on ;LKJH",
    dataSet: "; l k j h ;; ll kk jj hh ;;; lll kk jjj hhh ;lkjh ;lkjh ;lkjh ;lkjh",
    unlocked: false,
  },
  {
    title: "Stage Yellow",
    description: "Practice on ZXCV",
    dataSet: "z x c v zz xx cc vv zzz xxx ccc vvv zxczxczxc",
    unlocked: false,
  },
  {
    title: "Stage Orange",
    description: "Practice on QWERTY",
    dataSet: "q w e r t y qq ww ee rr tt yy qwerty qwerty",
    unlocked: false,
  },
  {
    title: "Stage Gray",
    description: "Practice on YUIOP",
    dataSet: "y u i o p yy uu ii oo pp yuiop yuiop",
    unlocked: false,
  },
  {
    title: "Stage Black",
    description: "Practice on HJKL",
    dataSet: "h j k l hh jj kk ll hjkllkjh",
    unlocked: false,
  }
];


export default function Stage(props: any) {
  // Handle level change (pass lesson to parent component)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onChangeLesson = React.useCallback(
    (lesson: any) => {
      if (lesson.unlocked) {
        console.log(lesson);
        const nextLesson = {...lesson, dataSet: lesson.dataSet?.split("") }      
        
        // Store lesson data in Redux for persistence through refreshes
        dispatch({
          type: "SET_CURRENT_LESSON",
          payload: { lesson: nextLesson, nextLesson: null }
        });
        
        // Passing the `nextLesson` object to the `/platform` route
        navigate('/platform', { state: { lesson: nextLesson } });
      }
    },
    [navigate, dispatch]
  );

 
  const onNavigationBack = React.useCallback(()=>{
    navigate(-1);
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        overflowY: "visible",
        backgroundSize: "cover", // optional to make the image cover the div
        backgroundPosition: "center", // optional to center the image
        height: "100vh",
        padding: "20px",
        alignItems: "center",
        flex:1
      }}
    >
        <div
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
              alignSelf:'flex-start'
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
                Lession
              </div>
              <div style={{ marginLeft: 20, color: "gray" }}>
                Start your typing game!!
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
            </div>
          </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
          width: "100%",
          padding: "10px",
        }}
      >
        {lessons.map((lesson, index) => {
          return (
            <div
              onClick={() => onChangeLesson(lesson)}
              key={index} // Add key for efficient rendering
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
                cursor: lesson.unlocked ? "pointer" : "not-allowed", // Show pointer only for unlocked lessons
                background: lesson.unlocked
                  ? "linear-gradient(145deg, #5e7e9b, #4a5b7b)" // Gradient for unlocked levels
                  : "rgba(128, 128, 128, 0.5)", // Grey out locked levels
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
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
                  textAlign: "center",
                  color: "#fff",
                }}
              >
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                    textTransform: "uppercase",
                    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  {lesson.title}
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    marginBottom: "15px",
                    color: "#e0e0e0",
                    fontStyle: "italic",
                  }}
                >
                  {lesson.description}
                </div>

                {lesson.unlocked ? (
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "#FFF",
                      textShadow: "1px 1px 3px rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    Click to Start!
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
  );
}
