import React from 'react';
import "./App.css";


function App() {
    return (
        <div className="App">
            <div className="content1">
                봄날의 선택에 온 것을 환영해~
            </div>

            <div className="content2">
                "그날 처음 본 너는—<br/>
                왠지 모르게, 기억 속에 있었던 것 같았다."
            </div>

            <div className="content3">
                "그 봄은 이상하리만치 조용했고.."
                <br/>
                <div className="image-box">
                    <img src={"/assets/A.jpg"} alt="봄 이미지" />

                </div>
            </div>

            <div className="content4">
                "오전 8시, 아무도 없는 교실."<br/>조용한 공기가 감돈다.
            </div>
        </div>


    );
}

export default App;