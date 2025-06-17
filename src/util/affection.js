// 캐릭터별 호감도 초기화
const affection = {
    yuri: 0,
    hana: 0,
    mina: 0
};
[
    {
        "speaker": "유리",
        "text": "오늘 도시락 같이 먹을래?",
        "character": "characters/yuri_smile.png"
    },
    {
        "choices": [
            {
                "text": "좋아! 기대돼.",
                "next": 2,
                "affection": { "yuri": 10 }
            },
            {
                "text": "미안, 오늘은 좀 바빠서...",
                "next": 3,
                "affection": { "yuri": -5 }
            }
        ]
    },
    {
        "speaker": "유리",
        "text": "정말? 기뻐!",
        "character": "characters/yuri_happy.png"
    },
    {
        "speaker": "유리",
        "text": "아... 알겠어.",
        "character": "characters/yuri_sad.png"
    }
]

let currentIndex = 0;
let script = []; // JSON 시나리오 불러온 후 저장
const affection = { yuri: 0, hana: 0, mina: 0 };

async function loadScript(path) {
    const res = await fetch(path);
    script = await res.json();
    currentIndex = 0;
    showLine();
}

function showLine() {
    const line = script[currentIndex];

    if (line.choices) {
        renderChoices(line.choices);
    } else {
        renderDialogue(line);
        currentIndex++;
    }
}

function renderDialogue(line) {
    document.getElementById('name-box').textContent = line.speaker;
    document.getElementById('text-box').textContent = line.text;
    if (line.character)
        document.getElementById('character-img').src = line.character;
}

function renderChoices(choices) {
    const choiceContainer = document.getElementById('choice-box');
    choiceContainer.innerHTML = "";

    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => {
            applyAffection(choice.affection);
            currentIndex = choice.next;
            showLine();
        };
        choiceContainer.appendChild(btn);
    });
}

function applyAffection(change) {
    for (let key in change) {
        affection[key] += change[key];
    }
    updateAffectionDisplay();
}

function updateAffectionDisplay() {
    document.getElementById("affection-display").textContent =
        `유리: ${affection.yuri}, 하나: ${affection.hana}, 미나: ${affection.mina}`;
}
