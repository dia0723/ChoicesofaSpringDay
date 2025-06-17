// 초기 상태
let script = [];
let index = 0;
const affection = {
    yuri: 0,
    hana: 0,
    mina: 0
};

// DOM 요소 참조
const nameBox = document.getElementById("name-box");
const textBox = document.getElementById("text-box");
const background = document.getElementById("background-img");
const characterImg = document.getElementById("character-img");
const choiceBox = document.getElementById("choice-box");
const affectionBox = document.getElementById("affection-display");

// 시나리오 로드
async function loadScene(path) {
    const res = await fetch(path);
    const data = await res.json();

    // 루트 구조일 경우 (scene: [...])
    if (Array.isArray(data)) {
        script = data;
    } else if (data.scene) {
        script = data.scene;
        Object.assign(script, data); // 나머지 분기도 함께 병합
    } else {
        script = data;
    }

    index = 0;
    showLine();
}

// 대사 및 선택지 처리
function showLine() {
    choiceBox.innerHTML = "";

    const line = script[index];

    // 조건 분기 처리
    if (line.conditional) {
        const [charName, operatorValue] = Object.entries(line.conditional)[0];
        const [op, valueStr] = operatorValue.match(/(>=|<=|==|>|<)(\d+)/).slice(1, 3);
        const currentValue = getNestedValue(affection, charName);
        const value = parseInt(valueStr);
        const nextLabel = line.conditional.next;

        const conditionMet = eval(`${currentValue} ${op} ${value}`);
        if (conditionMet) {
            script = script[nextLabel] || [];
            index = 0;
            showLine();
            return;
        } else {
            index++;
            showLine();
            return;
        }
    }

    // 선택지
    if (line.choices) {
        renderChoices(line.choices);
        return;
    }

    // 대사 출력
    nameBox.textContent = line.speaker || "";
    textBox.textContent = line.text || "";

    if (line.background) background.src = line.background;
    if (line.character !== undefined) characterImg.src = line.character || "";

    // 다음 대사로 진행
    index++;
    document.body.onclick = () => {
        if (!choiceBox.hasChildNodes()) showLine();
    };
}

// 선택지 출력
function renderChoices(choices) {
    choiceBox.innerHTML = "";
    choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => {
            if (choice.affection) applyAffection(choice.affection);
            if (typeof choice.next === "number") {
                index = choice.next;
                showLine();
            } else if (typeof choice.next === "string") {
                script = script[choice.next] || [];
                index = 0;
                showLine();
            }
        };
        choiceBox.appendChild(btn);
    });
}

// 호감도 반영
function applyAffection(aff) {
    for (const key in aff) {
        if (affection.hasOwnProperty(key)) {
            affection[key] += aff[key];
        }
    }
    updateAffectionDisplay();
}

// 호감도 시각화
function updateAffectionDisplay() {
    affectionBox.textContent = `유리: ${affection.yuri}, 하나: ${affection.hana}, 미나: ${affection.mina}`;
}

// 도우미: 중첩 키 읽기
function getNestedValue(obj, path) {
    return path.split(".").reduce((o, k) => o && o[k], obj);
}

// 게임 시작
loadScene("data/intro.json");

if (line.character && line.emotion && line.characterPosition) {
    showCharacter(line.characterPosition, line.character, line.emotion);
}