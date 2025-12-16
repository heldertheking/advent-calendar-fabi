// Snow effect configuration
const SNOW_CONFIG = {
    baseDensity: 0.00025, // snowflakes per pixel
    minRadius: 1.5,
    maxRadius: 4.5,
    minSpeedY: 1, // Vertical speed
    maxSpeedY: 3,
    minSpeedX: -0.5, // Horizontal speed
    maxSpeedX: 0.5,
    minAlpha: 0.5,
    maxAlpha: 1,
    wind: 0, // Add a global horizontal drift (positive: right, negative: left)
    maxFlakes: 400, // cap for performance
};

// Create and insert canvas
const snowContainer = document.querySelector('.snow');
const canvas = document.createElement('canvas');
canvas.style.position = 'absolute';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.pointerEvents = 'none';
snowContainer.appendChild(canvas);

const ctx = canvas.getContext('2d');
let SNOWFLAKES = [];
let W = 0, H = 0;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

class Snowflake {
    constructor() { this.reset(); }
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

function resizeSnow() {
    W = snowContainer.offsetWidth;
    H = snowContainer.offsetHeight;
    canvas.width = W;
    canvas.height = H;
    // Calculate snowflake count based on area, capped
    const area = W * H;
    const density = Math.min(Math.floor(area * SNOW_CONFIG.baseDensity), SNOW_CONFIG.maxFlakes);
    // Adjust snowflake array
    if (SNOWFLAKES.length < density) {
        while (SNOWFLAKES.length < density) SNOWFLAKES.push(new Snowflake());
    } else if (SNOWFLAKES.length > density) {
        SNOWFLAKES.length = density;
    }
    // Reset all snowflakes to fit new size
    SNOWFLAKES.forEach(flake => flake.reset());
}

function animateSnow() {
    ctx.clearRect(0, 0, W, H);
    for (let flake of SNOWFLAKES) {
        flake.update();
        flake.draw(ctx);
    }
    requestAnimationFrame(animateSnow);
}

window.addEventListener('resize', resizeSnow);
resizeSnow();
animateSnow();
