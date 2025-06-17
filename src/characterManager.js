function showCharacter(position, imagePath) {
    const posId = {
        left: "character-left",
        center: "character-center",
        right: "character-right"
    };
    const img = document.getElementById(posId[position]);

    if (!img) return;

    // 만약 새 이미지가 없으면 캐릭터 숨김
    if (!imagePath) {
        img.classList.remove("visible");
        return;
    }

    // 트랜지션 시작: 기존 캐릭터 잠시 사라지게
    img.classList.remove("visible");

    // 이미지 교체 후 페이드 인
    setTimeout(() => {
        img.src = imagePath;
        img.classList.add("visible");
    }, 100); // 전환 간격 (짧게)
}
