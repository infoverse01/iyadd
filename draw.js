const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const guessInput = document.getElementById('guess');
const submitBtn = document.getElementById('submitGuess');
const clearBtn = document.getElementById('clearCanvas');
const wordDisplay = document.getElementById('word-display');
const startBtn = document.getElementById('startGame');

let currentWord = '';
let drawingDone = false;

// أشكال مع الرسومات
const shapes = [
  {
    word: 'شمس',
    draw: () => {
      ctx.beginPath();
      ctx.arc(200, 150, 40, 0, Math.PI * 2);
      ctx.fillStyle = 'orange';
      ctx.fill();
    }
  },
  {
    word: 'كتاب',
    draw: () => {
      ctx.fillStyle = 'brown';
      ctx.fillRect(150, 100, 100, 120);
    }
  },
  {
    word: 'جبل',
    draw: () => {
      ctx.beginPath();
      ctx.moveTo(100, 200);
      ctx.lineTo(200, 80);
      ctx.lineTo(300, 200);
      ctx.closePath();
      ctx.fillStyle = 'gray';
      ctx.fill();
    }
  },
  {
    word: 'قطة',
    draw: () => {
      ctx.beginPath();
      ctx.arc(200, 150, 40, 0, Math.PI * 2); // رأس
      ctx.moveTo(170, 110);
      ctx.lineTo(160, 90); // أذن يسار
      ctx.lineTo(180, 100);
      ctx.moveTo(230, 110);
      ctx.lineTo(240, 90); // أذن يمين
      ctx.lineTo(220, 100);
      ctx.stroke();
    }
  },
  {
    word: 'بيت',
    draw: () => {
      ctx.fillStyle = '#d2691e';
      ctx.fillRect(150, 130, 100, 100); // جدران
      ctx.beginPath();
      ctx.moveTo(150, 130);
      ctx.lineTo(200, 80);
      ctx.lineTo(250, 130);
      ctx.closePath();
      ctx.fillStyle = '#8b0000';
      ctx.fill(); // سقف
    }
  }
];

// تنظيف الكانفاس
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// عند الضغط على "ابدأ اللعبة"
startBtn.addEventListener('click', () => {
  clearCanvas();
  guessInput.value = '';
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  currentWord = randomShape.word;
  randomShape.draw();
  wordDisplay.textContent = "🎨 تم الرسم، خمّن ما هو الشكل!";
  drawingDone = true;
});

// إرسال التخمين
submitBtn.addEventListener('click', () => {
  const guess = guessInput.value.trim();
  if (!drawingDone) {
    alert("ابدأ اللعبة أولاً!");
    return;
  }

  if (guess === currentWord) {
    alert('✔️ إجابة صحيحة!');
    drawingDone = false;
  } else {
    alert('❌ إجابة خاطئة، حاول مجدداً.');
  }
});
