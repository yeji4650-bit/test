document.getElementById('draw-btn').addEventListener('click', () => {
  const resultDiv = document.getElementById('result');
  const bonusDiv = document.getElementById('bonus');
  const bonusWrapper = document.getElementById('bonus-wrapper');

  // Clear previous results
  resultDiv.innerHTML = '';
  bonusDiv.innerHTML = '';
  bonusWrapper.style.display = 'block';

  // Generate numbers
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    const random = Math.floor(Math.random() * candidate.length);
    const spliceArray = candidate.splice(random, 1);
    const value = spliceArray[0];
    shuffle.push(value);
  }

  const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
  const bonusBall = shuffle[6];

  // Render win balls with delay
  winBalls.forEach((num, index) => {
    setTimeout(() => {
      drawBall(num, resultDiv);
    }, (index + 1) * 300);
  });

  // Render bonus ball
  setTimeout(() => {
    drawBall(bonusBall, bonusDiv);
  }, 7 * 300);
});

function drawBall(number, target) {
  const ball = document.createElement('div');
  ball.className = 'ball';
  ball.textContent = number;
  
  // Assign color class based on range
  if (number <= 10) {
    ball.classList.add('range-1');
  } else if (number <= 20) {
    ball.classList.add('range-2');
  } else if (number <= 30) {
    ball.classList.add('range-3');
  } else if (number <= 40) {
    ball.classList.add('range-4');
  } else {
    ball.classList.add('range-5');
  }
  
  target.appendChild(ball);
}
