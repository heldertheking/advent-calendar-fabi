// Responsive heart fountain animation with robust initialization and resize handling
(function() {
    const HEARTS_CANVAS = document.getElementById('hearts');
    const HEARTS_BUTTON = document.getElementById('hearts-btn');
    if (!HEARTS_CANVAS || !HEARTS_BUTTON) {
        console.error('Hearts canvas or button not found.');
        return;
    }
    const HEARTS_CONTEXT = HEARTS_CANVAS.getContext('2d');
    let animationFrameId = null;
    let running = false;

    function resizeCanvas() {
        // Set canvas size to its parent or window
        HEARTS_CANVAS.width = 600
        HEARTS_CANVAS.height = 400
    }

    function clearAndResize() {
        resizeCanvas();
        HEARTS_CONTEXT.clearRect(0, 0, HEARTS_CANVAS.width, HEARTS_CANVAS.height);
    }

    function startHeartAnimation() {
        if (running) {
            cancelAnimationFrame(animationFrameId);
            clearAndResize();
        }
        running = true;
        const hearts = [];
        const W = HEARTS_CANVAS.width;
        const H = HEARTS_CANVAS.height;
        const HEART_COUNT = Math.min(80, Math.floor(W * 0.08));
        const GRAVITY = 0.08;
        const FOUNTAIN_X = W / 2;
        const FOUNTAIN_Y = H - 10;

        function randomColor() {
            const colors = ['#e25555', '#ff7eb9', '#ff65a3', '#fcdff0', '#ffb3c6'];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        function createHeart() {
            const angle = Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 2;
            const speed = 3 + Math.random() * 2;
            return {
                x: FOUNTAIN_X,
                y: FOUNTAIN_Y,
                vx: Math.cos(angle) * speed,
                vy: -Math.abs(Math.sin(angle) * speed),
                size: 12 + Math.random() * 10,
                alpha: 1,
                color: randomColor(),
                life: 0,
                maxLife: 60 + Math.random() * 40
            };
        }

        for (let i = 0; i < HEART_COUNT; i++) {
            hearts.push(createHeart());
        }

        function drawHeart(ctx, x, y, size, color, alpha) {
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            const topCurveHeight = size * 0.3;
            ctx.moveTo(x, y + topCurveHeight);
            ctx.bezierCurveTo(
                x, y,
                x - size / 2, y,
                x - size / 2, y + topCurveHeight
            );
            ctx.bezierCurveTo(
                x - size / 2, y + (size + topCurveHeight) / 2,
                x, y + (size + topCurveHeight) / 1.2,
                x, y + size
            );
            ctx.bezierCurveTo(
                x, y + (size + topCurveHeight) / 1.2,
                x + size / 2, y + (size + topCurveHeight) / 2,
                x + size / 2, y + topCurveHeight
            );
            ctx.bezierCurveTo(
                x + size / 2, y,
                x, y,
                x, y + topCurveHeight
            );
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        }

        function animate() {
            HEARTS_CONTEXT.clearRect(0, 0, W, H);
            let active = false;
            for (let heart of hearts) {
                if (heart.alpha <= 0) continue;
                heart.x += heart.vx;
                heart.y += heart.vy;
                heart.vy += GRAVITY;
                heart.life++;
                if (heart.life > heart.maxLife) heart.alpha -= 0.03;
                drawHeart(HEARTS_CONTEXT, heart.x, heart.y, heart.size, heart.color, heart.alpha);
                if (heart.alpha > 0) active = true;
            }
            if (active && running) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                running = false;
            }
        }
        animate();
    }

    window.addEventListener('resize', () => {
        clearAndResize();
        if (running) startHeartAnimation();
    });

    HEARTS_BUTTON.addEventListener('click', () => {
        clearAndResize();
        startHeartAnimation();
    });

    // Initial setup
    clearAndResize();
})();
