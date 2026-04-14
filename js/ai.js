const AI = {
    update(aiMallet, puck, difficulty, width, height) {
        const config = CONFIG.DIFFICULTIES[difficulty];
        
        // Target position
        let targetX = puck.x;
        
        // Add random error based on difficulty
        if (Math.random() < config.error) {
            targetX += (Math.random() - 0.5) * 100;
        }

        // Logic for attacking or staying back
        let targetY = aiMallet.y;
        
        if (config.aggressive && puck.y < height / 2) {
            // Hard mode: tries to strike the puck if it's on its half
            targetY = puck.y - 20;
        } else {
            // Defensive: Tries to stay in a defensive row
            const defensiveRow = 100;
            targetY = defensiveRow;
        }

        // Smooth movement toward target
        const dx = targetX - aiMallet.x;
        const dy = targetY - aiMallet.y;
        
        // Apply speed limit
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 0) {
            const moveX = (dx / dist) * config.speed;
            const moveY = (dy / dist) * config.speed;
            
            aiMallet.vx = moveX;
            aiMallet.vy = moveY;
            
            aiMallet.x += moveX;
            aiMallet.y += moveY;
        } else {
            aiMallet.vx = 0;
            aiMallet.vy = 0;
        }

        // Stay within bounds
        Physics.clampMallet(aiMallet, width, height, false);
    }
};
