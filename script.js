const toggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference
const savedTheme = localStorage.getItem('theme') || 'light';
htmlElement.setAttribute('data-theme', savedTheme);
toggleBtn.innerText = savedTheme === 'dark' ? '☀️' : '🌙';

toggleBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button icon
    toggleBtn.innerText = newTheme === 'dark' ? '☀️' : '🌙';
});

// Game Variables
let score = 0;
let timeLeft = 10;
let gameActive = false;

const target = document.getElementById('target');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const arena = document.getElementById('game-arena');

function moveTarget() {
    // Calculate random position inside the arena
    const x = Math.random() * (arena.clientWidth - 50);
    const y = Math.random() * (arena.clientHeight - 50);
    
    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
}

startBtn.addEventListener('click', () => {
    // Reset Game
    score = 0;
    timeLeft = 10;
    gameActive = true;
    scoreDisplay.innerText = score;
    timerDisplay.innerText = timeLeft;
    
    startBtn.style.display = 'none';
    target.style.display = 'block';
    moveTarget();

    // Start Timer
    const countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            endGame();
        }
    }, 1000);
});

target.addEventListener('mousedown', () => {
    if (gameActive) {
        score++;
        scoreDisplay.innerText = score;
        moveTarget();
    }
});

function endGame() {
    gameActive = false;
    target.style.display = 'none';
    startBtn.style.display = 'block';
    startBtn.innerText = `Replay? (Final Score: ${score})`;
    alert(`Game Over! You clicked ${score} targets.`);
}