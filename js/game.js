const gameEngine = {
    canvas: null,
    ctx: null,
    puck: null,
    player: null,
    ai: null,
    playerScore: 0,
    aiScore: 0,
    keys: {},
    playerSpeed: 10, // Restored to normal/fast speed
    looping: false,

    startMatch() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CONFIG.CANVAS.WIDTH;
        this.canvas.height = CONFIG.CANVAS.HEIGHT;

        this.puck = new Puck(this.canvas.width / 2, this.canvas.height / 2);
        this.player = new Mallet(150, this.canvas.height / 2, gameUI.selectedTeam.primary, gameUI.selectedTeam.secondary);
        this.ai = new Mallet(this.canvas.width - 150, this.canvas.height / 2, gameUI.aiTeam.primary, gameUI.aiTeam.secondary);

        this.playerScore = 0;
        this.aiScore = 0;
        this.updateHUD();
        this.setupInput();
        
        if (!this.looping) {
            this.looping = true;
            this.loop();
        }
    },

    setupInput() {
        // Keyboard only - removing mouse/touch move listeners
        window.onkeydown = (e) => this.keys[e.code] = true;
        window.onkeyup = (e) => this.keys[e.code] = false;
        
        // Prevent default scrolling for game keys
        window.addEventListener("keydown", (e) => {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","KeyW","KeyA","KeyS","KeyD"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
    },

    updateHUD() {
        document.getElementById('player-info').querySelector('.team-name').innerText = gameUI.selectedTeam.name.toUpperCase();
        document.getElementById('ai-info').querySelector('.score').nextElementSibling.innerText = gameUI.aiTeam.name.toUpperCase();
        document.getElementById('match-phase').innerText = CONFIG.PHASES[gameUI.currentPhaseIndex];
        gameUI.updateScore(this.playerScore, this.aiScore);
    },

    loop() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    },

    update() {
        this.handlePlayerMovement();
        this.puck.update();
        AI.update(this.ai, this.puck, gameUI.difficulty, this.canvas.width, this.canvas.height);
        
        Physics.checkCollision(this.puck, this.player);
        Physics.checkCollision(this.puck, this.ai);
        
        const goalResult = Physics.handleWallCollisions(this.puck, this.canvas.width, this.canvas.height);
        if (goalResult) {
            this.handleGoal(goalResult);
        }
    },

    handlePlayerMovement() {
        let vx = 0;
        let vy = 0;

        if (this.keys['KeyW'] || this.keys['ArrowUp']) vy -= this.playerSpeed;
        if (this.keys['KeyS'] || this.keys['ArrowDown']) vy += this.playerSpeed;
        if (this.keys['KeyA'] || this.keys['ArrowLeft']) vx -= this.playerSpeed;
        if (this.keys['KeyD'] || this.keys['ArrowRight']) vx += this.playerSpeed;

        this.player.vx = vx;
        this.player.vy = vy;
        this.player.x += vx;
        this.player.y += vy;

        Physics.clampMallet(this.player, this.canvas.width, this.canvas.height, true);
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
        this.player.x = 150;
        this.player.y = this.canvas.height / 2;
        this.ai.x = this.canvas.width - 150;
        this.ai.y = this.canvas.height / 2;
    },

    checkMatchEnd() {
        if (this.playerScore >= 3) {
            gameUI.currentPhaseIndex++;
            if (gameUI.currentPhaseIndex >= CONFIG.PHASES.length) {
                gameUI.showOverlay("CAMPEÃO!", "var(--accent)", 5000);
                setTimeout(() => location.reload(), 5000);
            } else {
                gameUI.showOverlay("VITÓRIA!", "var(--primary)", 3000);
                // Next AI team
                let availableClubs = CONFIG.CLUBS.filter(c => c.name !== gameUI.selectedTeam.name);
                gameUI.aiTeam = availableClubs[Math.floor(Math.random() * availableClubs.length)];
                setTimeout(() => this.startMatch(), 3000);
            }
        } else {
            gameUI.showOverlay("ELIMINADO!", "var(--danger)", 5000);
            setTimeout(() => location.reload(), 5000);
        }
    },

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Soccer Field Background (Grass)
        this.ctx.fillStyle = "#1e4d2b";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Grass Pattern (Stripes)
        this.ctx.fillStyle = "#245a32";
        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                this.ctx.fillRect(i * (this.canvas.width / 10), 0, this.canvas.width / 10, this.canvas.height);
            }
        }

        // Field markings
        this.ctx.strokeStyle = "rgba(255,255,255,0.6)";
        this.ctx.lineWidth = 4;
        
        // Outer box
        this.ctx.strokeRect(10, 10, this.canvas.width - 20, this.canvas.height - 20);

        // Center line
        this.ctx.beginPath();
        this.ctx.moveTo(this.canvas.width / 2, 10);
        this.ctx.lineTo(this.canvas.width / 2, this.canvas.height - 10);
        this.ctx.stroke();

        // Center circle & spot
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 80, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width / 2, this.canvas.height / 2, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255,255,255,0.6)";
        this.ctx.fill();

        // Penalty Areas (Large Boxes)
        const areaH = 400;
        const areaW = 150;
        const areaY = (this.canvas.height - areaH) / 2;
        this.ctx.strokeRect(10, areaY, areaW, areaH); // Left
        this.ctx.strokeRect(this.canvas.width - areaW - 10, areaY, areaW, areaH); // Right

        // Goal Areas (Small Boxes)
        const gh = CONFIG.PHYSICS.GOAL_HEIGHT;
        const gy = (this.canvas.height - gh) / 2;
        this.ctx.strokeRect(10, gy, 50, gh); // Left
        this.ctx.strokeRect(this.canvas.width - 60, gy, 50, gh); // Right

        // Penalty Spots
        this.ctx.beginPath();
        this.ctx.arc(120, this.canvas.height / 2, 5, 0, Math.PI * 2);
        this.ctx.fillStyle = "rgba(255,255,255,0.6)"; 
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(this.canvas.width - 120, this.canvas.height / 2, 5, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw goals (Real colored nets)
        this.ctx.lineWidth = 8;
        this.ctx.strokeStyle = gameUI.selectedTeam.primary; 
        this.ctx.strokeRect(-5, gy, 15, gh);
        
        this.ctx.strokeStyle = gameUI.aiTeam.primary;
        this.ctx.strokeRect(this.canvas.width - 10, gy, 15, gh);

        // Draw entities
        this.puck.draw(this.ctx);
        this.player.draw(this.ctx);
        this.ai.draw(this.ctx);
    }
};
