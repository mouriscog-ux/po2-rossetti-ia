const AI = {
    update(aiMallet, puck, difficulty, width, height) {
        const config = CONFIG.DIFFICULTIES[difficulty];
        
        let targetY = puck.y;
        let targetX = aiMallet.x;

        // v3.4: If puck is at center (reset or start), AI goes to center of its side
        if (Math.abs(puck.x - width / 2) < 5 && Math.abs(puck.y - height / 2) < 5) {
            targetX = width - 150;
            targetY = height / 2;
        } else if (difficulty === 'easy') {
            // Only moves on Y to block
            targetX = width - 100;
        } else if (difficulty === 'medium') {
            // Follows puck on Y and advances slightly on X
            targetX = width - 150 + (width/2 - puck.x) * 0.1;
        } else {
            // Hard: Predicts trajectory and attacks
            if (config.prediction && puck.vx > 0) {
                const timeToReach = (aiMallet.x - puck.x) / puck.vx;
                targetY = puck.y + puck.vy * timeToReach;
            }
            if (puck.x > width / 2) {
                targetX = puck.x - 30; // Attack
            } else {
                targetX = width - 100; // Defend
            }
        }

        // Smooth movement toward target
        const dx = targetX - aiMallet.x;
        const dy = targetY - aiMallet.y;
        
        const dist = Math.sqrt(dx * dx + dy * dy);
        const speed = config.speed;

        if (dist > speed) {
            const moveX = (dx / dist) * speed;
            const moveY = (dy / dist) * speed;
            
            aiMallet.vx = moveX;
            aiMallet.vy = moveY;
            
            aiMallet.x += moveX;
            aiMallet.y += moveY;
        } else {
            // Arrived at target or very close
            aiMallet.x = targetX;
            aiMallet.y = targetY;
            aiMallet.vx = 0;
            aiMallet.vy = 0;
        }

        Physics.clampMallet(aiMallet, width, height, false);
    }
};
