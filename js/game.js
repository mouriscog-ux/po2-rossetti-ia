const gameEngine = {
    canvas: null,
    ctx: null,
    puck: null,
    player: null,
    ai: null,
    playerScore: 0,
    aiScore: 0,
    isPaused: false,
    mouse: { x: 0, y: 0 },

    startMatch() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 400;
        this.canvas.height = 700;

        this.puck = new Puck(this.canvas.width / 2, this.canvas.height / 2);
        this.player = new Mallet(this.canvas.width / 2, this.canvas.height - 100, gameUI.selectedTeam.color);
        this.ai = new Mallet(this.canvas.width / 2, 100, "#ff4444", true);

        this.playerScore = 0;
        this.aiScore = 0;
        this.updateHUD();

        this.setupInput();
        this.loop();
    },

    setupInput() {
        const rect = this.canvas.getBoundingClientRect();
        
        const updatePos = (e) => {
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const clientY = e.touches ? e.touches[0].clientY : e.clientY;
            
            const nextX = clientX - rect.left;
            const nextY = clientY - rect.top;

            // Calculate mallet velocity for hit physics
            this.player.vx = nextX - this.player.x;
            this.player.vy = nextY - this.player.y;
            
            this.player.x = nextX;
            this.player.y = nextY;
            Physics.clampMallet(this.player, this.canvas.width, this.canvas.height, true);
        };

        window.addEventListener('mousemove', updatePos);
        window.addEventListener('touchmove', updatePos, { passive: false });
    },

    updateHUD() {
        document.getElementById('player-info').querySelector('.team-name').innerText = gameUI.selectedTeam.name.toUpperCase();
        document.getElementById('match-phase').innerText = CONFIG.PHASES[gameUI.currentPhaseIndex];
        gameUI.updateScore(this.playerScore, this.aiScore);
    },

    loop() {
        if (this.isPaused) return;

        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    },

    update() {
        this.puck.update();
        AI.update(this.ai, this.puck, gameUI.difficulty, this.canvas.width, this.canvas.height);
        
        Physics.checkCollision(this.puck, this.player);
        Physics.checkCollision(this.puck, this.ai);
        
        const goalResult = Physics.handleWallCollisions(this.puck, this.canvas.width, this.canvas.height);
        if (goalResult) {
            this.handleGoal(goalResult);
        }
    },

    handleGoal(result) {
        if (result === "GOAL_PLAYER") {
            this.playerScore++;
            gameUI.showOverlay("GOL!", "var(--primary)");
        } else {
            this.aiScore++;
            gameUI.showOverlay("GOL DA IA!", "var(--danger)");
        }

        this.updateHUD();
        this.resetPositions();

        if (this.playerScore >= 3 || this.aiScore >= 3) {
            this.checkMatchEnd();
        }
    },

    resetPositions() {
        this.puck.reset();
        this.player.x = this.canvas.width / 2;
        this.player.y = this.canvas.height - 100;
        this.ai.x = this.canvas.width / 2;
        this.ai.y = 100;
    },

    checkMatchEnd() {
        if (this.playerScore >= 3) {
            gameUI.currentPhaseIndex++;
            if (gameUI.currentPhaseIndex >= CONFIG.PHASES.length) {
                gameUI.showOverlay("CAMPEÃO!", "var(--accent)", 5000);
                setTimeout(() => location.reload(), 5000);
            } else {
                gameUI.showOverlay("VITÓRIA!", "var(--primary)", 3000);
                setTimeout(() => this.startMatch(), 3000); // Next round
            }
        } else {
            gameUI.showOverlay("ELIMINADO!", "var(--danger)", 5000);
            setTimeout(() => location.reload(), 5000);
        }
    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Field markings
        this.ctx.strokeStyle = "rgba(255,255,255,0.2)";
        this.ctx.lineWidth = 2;
        
        // Center line
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.canvas.height / 2);
        this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
        this.ctx.stroke();

        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 60, 0, Math.PI * 2);
        this.ctx.stroke();

        // Goals
        const gw = CONFIG.PHYSICS.GOAL_WIDTH;
        this.ctx.strokeStyle = "#00ff88";
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect((this.canvas.width - gw) / 2, -10, gw, 20);
        this.ctx.strokeRect((this.canvas.width - gw) / 2, this.canvas.height - 10, gw, 20);

        // Draw entities
        this.puck.draw(this.ctx);
        this.player.draw(this.ctx);
        this.ai.draw(this.ctx);
    }
};
