const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
  themeToggle.textContent = '라이트모드';
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeToggle.textContent = isDark ? '라이트모드' : '다크모드';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

document.getElementById('draw-btn').addEventListener('click', () => {
  const container = document.getElementById('results-container');
  container.innerHTML = '';

  for (let game = 0; game < 5; game++) {
    const { winBalls, bonusBall } = generateNumbers();
    const row = createGameRow(game + 1);
    container.appendChild(row);

    winBalls.forEach((num, index) => {
      setTimeout(() => {
        drawBall(num, row.querySelector('.win-balls'));
      }, (index + 1) * 200);
    });

    setTimeout(() => {
      drawBall(bonusBall, row.querySelector('.bonus-ball'));
    }, 7 * 200);
  }
});

function generateNumbers() {
  const candidate = Array(45).fill().map((_, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length);
    shuffle.push(candidate.splice(random, 1)[0]);
  }
  return {
    winBalls: shuffle.slice(0, 6).sort((a, b) => a - b),
    bonusBall: shuffle[6],
  };
}

function createGameRow(gameNum) {
  const row = document.createElement('div');
  row.className = 'game-row';
  row.innerHTML = `
    <span class="game-label">${gameNum}게임</span>
    <div class="win-balls"></div>
    <span class="plus-sign">+</span>
    <div class="bonus-ball"></div>
  `;
  return row;
}

function drawBall(number, target) {
  const ball = document.createElement('div');
  ball.className = 'ball';
  ball.textContent = number;

  if (number <= 10) ball.classList.add('range-1');
  else if (number <= 20) ball.classList.add('range-2');
  else if (number <= 30) ball.classList.add('range-3');
  else if (number <= 40) ball.classList.add('range-4');
  else ball.classList.add('range-5');

  target.appendChild(ball);
}
