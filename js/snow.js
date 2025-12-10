// Snow effect configuration
const SNOW_CONFIG = {
    density: 240, // Number of snowflakes
    minRadius: 1.5,
    maxRadius: 4.5,
    minSpeedY: 1, // Vertical speed
    maxSpeedY: 3,
    minSpeedX: -0.5, // Horizontal speed
    maxSpeedX: 0.5,
    minAlpha: 0.5,
    maxAlpha: 1,
    wind: 0, // Add a global horizontal drift (positive: right, negative: left)
};

// Create and insert canvas
const snowContainer = document.querySelector('.snow');
const canvas = document.createElement('canvas');
canvas.width = snowContainer.offsetWidth;
canvas.height = snowContainer.offsetHeight;
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
snowContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');
const SNOWFLAKES = [];
const W = canvas.width;
const H = canvas.height;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Snowflake {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = random(0, W);
        this.y = random(-H, 0);
        this.radius = random(SNOW_CONFIG.minRadius, SNOW_CONFIG.maxRadius);
        this.speedY = random(SNOW_CONFIG.minSpeedY, SNOW_CONFIG.maxSpeedY);
        this.speedX = random(SNOW_CONFIG.minSpeedX, SNOW_CONFIG.maxSpeedX);
        this.alpha = random(SNOW_CONFIG.minAlpha, SNOW_CONFIG.maxAlpha);
    }
    update() {
        this.x += this.speedX + SNOW_CONFIG.wind;
        this.y += this.speedY;
        if (this.y > H || this.x < 0 || this.x > W) {
            this.reset();
            this.y = -this.radius;
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#fff';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
    }
}

SNOWFLAKES.length = 0;
for (let i = 0; i < SNOW_CONFIG.density; i++) {
    SNOWFLAKES.push(new Snowflake());
}

function animateSnow() {
    ctx.clearRect(0, 0, W, H);
    for (let flake of SNOWFLAKES) {
        flake.update();
        flake.draw(ctx);
    }
    requestAnimationFrame(animateSnow);
}

animateSnow();
