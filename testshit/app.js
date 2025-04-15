const canvas = document.getElementById('battleCanvas');
const ctx = canvas.getContext('2d');

// Player setup
let player = { x: 380, y: 320, size: 30, speed: 5, health: 10 };

// Enemy setup
let enemy = { x: 350, y: 50, size: 30, health: 10 };

// Bullet setup
let bullets = [];

// Draw player and enemy
function drawPlayer() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawEnemy() {
  ctx.fillStyle = 'red';
  ctx.fillRect(enemy.x, enemy.y, enemy.size, enemy.size);
}

// Bullet handling
function spawnBullet() {
  bullets.push({ x: Math.random() * canvas.width, y: 0, size: 10, speed: 4 });
}

function updateBullets() {
  bullets.forEach((bullet, index) => {
    bullet.y += bullet.speed;
    ctx.fillStyle = 'white';
    ctx.fillRect(bullet.x, bullet.y, bullet.size, bullet.size);

    // Check if the bullet hits the player
    if (
      bullet.x < player.x + player.size &&
      bullet.x + bullet.size > player.x &&
      bullet.y < player.y + player.size &&
      bullet.y + bullet.size > player.y
    ) {
      player.health -= 1;  // Decrease player health
      document.getElementById('health').textContent = player.health;
      bullets.splice(index, 1);  // Remove bullet
      if (player.health <= 0) {
        endGame("Game Over!");
      }
    }

    // Remove bullet if out of bounds
    if (bullet.y > canvas.height) bullets.splice(index, 1);
  });
}

// Game over function
function endGame(message) {
  alert(message);
  player.health = 10;
  document.getElementById('health').textContent = player.health;
  // Reset game here if needed
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
  drawEnemy();
  updateBullets();
  requestAnimationFrame(gameLoop);
}

// Player movement
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp') player.y -= player.speed;
  if (e.key === 'ArrowDown') player.y += player.speed;
  if (e.key === 'ArrowLeft') player.x -= player.speed;
  if (e.key === 'ArrowRight') player.x += player.speed;
});

// Dialogue display
function displayDialogue(text) {
  const dialogueBox = document.getElementById('dialogueBox');
  const dialogueText = document.getElementById('dialogueText');
  dialogueText.textContent = text;
}

// Start game
function startBattle() {
  displayDialogue("A wild enemy appears!");
  setInterval(spawnBullet, 2000);  // Spawn bullets every 2 seconds
  gameLoop();
}

startBattle();
