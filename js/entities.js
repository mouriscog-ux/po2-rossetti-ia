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
        this.vx *= CONFIG.PHYSICS.DAMPING;
        this.vy *= CONFIG.PHYSICS.DAMPING;

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
    constructor(x, y, primary, secondary) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.primary = primary;
        this.secondary = secondary;
        this.radius = CONFIG.PHYSICS.MALLET_RADIUS;
    }

    draw(ctx) {
        // Outline shadow
        ctx.shadowBlur = 15;
        ctx.shadowColor = "rgba(0,0,0,0.5)";

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.primary;
        ctx.strokeStyle = this.secondary;
        ctx.lineWidth = 6;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        // Inner circle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.4, 0, Math.PI * 2);
        ctx.strokeStyle = this.secondary;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        ctx.shadowBlur = 0;
    }
}
