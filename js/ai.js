const AI = {
    update(aiMallet, puck, difficulty, width, height) {
        const config = CONFIG.DIFFICULTIES[difficulty];
        
        let targetY = height / 2;
        let targetX = width - 150;

        // Reset/Center behavior
        const isReset = Math.abs(puck.x - width / 2) < 5 && Math.abs(puck.y - height / 2) < 5;

        if (isReset) {
            targetX = width - 150;
            targetY = height / 2;
        } else {
            // Strategic AI Logic (Normal feel)
            // 1. Always try to stay between the puck and the goal center (defensive line)
            const defensiveLineX = width - 100;
            const offensiveLineX = width / 2 + 50;

            if (puck.x < width / 2) {
                // Puck is far: Stay in defensive row and follow puck Y loosely
                targetX = defensiveLineX;
                targetY = (height / 2 + puck.y) / 2; // Midpoint between center and puck Y
            } else {
                // Puck is close: Decide whether to attack or block
                if (puck.vx > 0) {
                    // Puck approaching: Move to intercept or strike
                    targetX = puck.x - 20; 
                    targetY = puck.y;
                } else {
                    // Puck going away: Return to defense but keep an eye on Y
                    targetX = defensiveLineX;
                    targetY = (height / 2 + puck.y) / 2;
                }
            }

            // Easy mode simplified: Just blocks the Y axis
            if (difficulty === 'easy') {
                targetX = width - 80;
                targetY = puck.y;
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
            aiMallet.x = targetX;
            aiMallet.y = targetY;
            aiMallet.vx = 0;
            aiMallet.vy = 0;
        }

        Physics.clampMallet(aiMallet, width, height, false);
    }
};
