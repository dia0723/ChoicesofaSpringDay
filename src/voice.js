function playVoice(line) {
    if (line.voice) {
        const voice = new Audio(`assets/audio/${line.voice}`);
        voice.volume = 1.0;
        voice.play();
    }
}
function showLine() {
    const line = script[index];
    if (line.voice) playVoice(line);
    // 나머지 로직 유지
}
