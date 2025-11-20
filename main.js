const totalInput = document.getElementById("total");
const countInput = document.getElementById("count");
const drawBtn = document.getElementById("drawBtn");
const resultDiv = document.getElementById("result");
const listDiv = document.getElementById("list");
const resetBtn = document.getElementById("resetBtn");

let excludedState = {};

function renderList(picked = []) {
  listDiv.innerHTML = "";
  const total = parseInt(totalInput.value);

  const btnSize = 60;
  const btnFont = 16;

  for (let i = 1; i <= total; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.style.height = `${btnSize}px`;
    btn.style.width = `${btnSize}px`;
    btn.style.fontSize = `${btnFont}px`;

    if (excludedState[i]) btn.classList.add("excluded");
    if (picked.includes(i)) btn.classList.add("picked");

    btn.onclick = () => {
      excludedState[i] = !excludedState[i];
      renderList();
    };

    listDiv.appendChild(btn);
  }
}

function showAlert(message) {
  const existing = document.getElementById("custom-alert");
  if (existing) existing.remove();

  const alertDiv = document.createElement("div");
  alertDiv.id = "custom-alert";
  alertDiv.innerText = message;
  document.body.appendChild(alertDiv);

  setTimeout(() => alertDiv.remove(), 2000);
}

function draw() {
  const total = parseInt(totalInput.value);
  let count = parseInt(countInput.value);

  const pool = [];
  for (let i = 1; i <= total; i++) {
    if (!excludedState[i]) pool.push(i);
  }

  if (pool.length === 0) {
    showAlert("남은 후보가 없습니다!");
    return;
  }

  if (count > pool.length) {
    showAlert("뽑을 인원이 너무 많습니다!");
    return;
  }

  const shuffled = pool.sort(() => Math.random() - 0.5);
  const result = shuffled.slice(0, count).sort((a, b) => a - b);

  resultDiv.innerText = result.join(", ");
  result.forEach(n => excludedState[n] = true);

  renderList(result);
}

// 총 명수 변경 시 버튼 갱신
totalInput.addEventListener("input", () => renderList());

// 리셋 버튼
resetBtn.addEventListener("click", () => {
  excludedState = {};
  renderList();
  resultDiv.innerText = "";
});

renderList();
drawBtn.onclick = draw;
