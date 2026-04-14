class Puck {
    constructor(x, y) {
        this.originX = x;
        this.originY = y;
        this.radius = CONFIG.PHYSICS.PUCK_RADIUS;
        this.reset();
    }

    reset() {
        this.x = this.originX;
        this.y = this.originY;
        this.vx = 0;
        this.vy = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // v3.0 Damping (0.98 multiplier)
        this.vx *= CONFIG.PHYSICS.DAMPING;
        this.vy *= CONFIG.PHYSICS.DAMPING;

        // v3.0 Max Speed (12px/frame)
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > CONFIG.PHYSICS.MAX_SPEED) {
            const ratio = CONFIG.PHYSICS.MAX_SPEED / speed;
            this.vx *= ratio;
            this.vy *= ratio;
        }
    }

    draw(ctx) {
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#fff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
        ctx.shadowBlur = 0;
    }
}

class Mallet {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.color = color;
        this.radius = CONFIG.PHYSICS.MALLET_RADIUS;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 4;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}
