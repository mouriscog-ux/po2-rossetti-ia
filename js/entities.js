class Puck {
    constructor(x, y) {
        this.originX = x;
        this.originY = y;
        this.reset();
        this.radius = CONFIG.PHYSICS.PUCK_RADIUS;
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

        // Apply friction
        this.vx *= CONFIG.PHYSICS.FRICTION;
        this.vy *= CONFIG.PHYSICS.FRICTION;

        // Cap speed
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed > CONFIG.PHYSICS.PUCK_MAX_SPEED) {
            const ratio = CONFIG.PHYSICS.PUCK_MAX_SPEED / speed;
            this.vx *= ratio;
            this.vy *= ratio;
        }
    }

    draw(ctx) {
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ffffff";
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
        
        ctx.shadowBlur = 0;
    }
}

class Mallet {
    constructor(x, y, color, isAI = false) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.isAI = isAI;
        this.radius = CONFIG.PHYSICS.MALLET_RADIUS;
        this.vx = 0;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 3;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        
        // Inner detail
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255,255,255,0.5)";
        ctx.stroke();
        ctx.closePath();
    }
}
