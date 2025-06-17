function playBGM(fileName) {
  const bgm = document.getElementById("bgm");
  bgm.src = `assets/audio/${fileName}`;
  bgm.volume = 0.4;
  bgm.play();
}
// 사용 예시
playBGM("bgm_title.mp3");

function playSFX(fileName) {
  const sfx = document.getElementById("sfx");
  sfx.src = `assets/audio/${fileName}`;
  sfx.volume = 0.8;
  sfx.play();
}
// 선택 클릭 시 사용 예시
button.onclick = () => {
  playSFX("click.wav");
  // 선택 처리...
};
