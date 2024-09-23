const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Player object
const player = {
    x: 400,
    y: 300,
    width: 20,
    height: 20,
    color: 'blue',
    speed: 4 // Default speed for PC
};

// NPC object (AI-controlled)
const npc = {
    x: 100,
    y: 100,
    width: 20,
    height: 20,
    color: 'red',
    speed: 2
};

// Handle keyboard input for player movement
const keys = {};
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});
window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

// Draw a rectangle (for player or NPC)
function drawRect(obj) {
    ctx.fillStyle = obj.color;
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
}

// Move player based on input
function movePlayer() {
    if (keys['ArrowUp'] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys['ArrowDown'] && player.y + player.height < canvas.height) {
        player.y += player.speed;
    }
    if (keys['ArrowLeft'] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys['ArrowRight'] && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
}

// Basic AI that follows the player
function followPlayerAI() {
    let dx = player.x - npc.x;
    let dy = player.y - npc.y;

    // Normalize the direction (so it moves at a constant speed)
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
        npc.x += (dx / distance) * npc.speed;
        npc.y += (dy / distance) * npc.speed;
    }
}

// Game loop to update the game state and render
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move player
    movePlayer();

    // Apply the NPC AI behavior
    followPlayerAI();

    // Draw player and NPC
    drawRect(player);
    drawRect(npc);

    requestAnimationFrame(updateGame); // Continue the game loop
}

// Show game canvas and start game after device is selected
function startGame(device) {
    document.getElementById('startScreen').style.display = 'none'; // Hide start screen
    canvas.style.display = 'block'; // Show the game canvas

    if (device === 'mobile') {
        player.speed = 2; // Reduce speed for mobile (slower movement)
    }

    updateGame(); // Start the game loop
}

// Listen for device selection
document.getElementById('mobileBtn').addEventListener('click', () => startGame('mobile'));
document.getElementById('pcBtn').addEventListener('click', () => startGame('pc'));

