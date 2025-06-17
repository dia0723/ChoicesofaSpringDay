function showCharacter(position, imagePath) {
  const posId = {
    left: "character-left",
    center: "character-center",
    right: "character-right"
  };
  const img = document.getElementById(posId[position]);

  if (imagePath) {
    img.src = imagePath;
    img.style.opacity = 1;
  } else {
    img.style.opacity = 0;
  }
}

//emotion

function showCharacter(position, characterName, emotion) {
  const posId = {
    left: "character-left",
    center: "character-center",
    right: "character-right"
  };

  const img = document.getElementById(posId[position]);

  if (!img || !characterName) {
    if (img) img.classList.remove("visible");
    return;
  }

  const imagePath = getEmotionImagePath(characterName, emotion);

  img.classList.remove("visible");
  setTimeout(() => {
    img.src = imagePath;
    img.classList.add("visible");
  }, 100);
}
