let score = 0;
let gameInterval;
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  score = 0;
  scoreDisplay.textContent = "النقاط: 0";
  clearInterval(gameInterval);
  gameInterval = setInterval(spawnBubble, 1000);
}

function spawnBubble() {
  const bubble = document.createElement("div");
  bubble.className = "bubble";

  const size = Math.random() * 30 + 30;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.left = `${Math.random() * (gameArea.clientWidth - size)}px`;

  bubble.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = `النقاط: ${score}`;
    playPopSound();
    bubble.remove();

    if (score % 5 === 0) {
      clearInterval(gameInterval);
      gameInterval = setInterval(spawnBubble, 1000 - score * 20); // تزيد السرعة
    }
  });

  gameArea.appendChild(bubble);

  setTimeout(() => {
    if (gameArea.contains(bubble)) {
      bubble.remove();
    }
  }, 5000);
}

function playPopSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.frequency.value = 600;
  oscillator.type = 'square';
  gain.gain.value = 0.1;

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start();
  oscillator.stop(ctx.currentTime + 0.1);
}
