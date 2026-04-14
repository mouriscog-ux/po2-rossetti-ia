const Physics = {
    checkCollision(puck, mallet) {
        const dx = puck.x - mallet.x;
        const dy = puck.y - mallet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = puck.radius + mallet.radius;

        if (distance < minDistance) {
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Reposition
            puck.x = mallet.x + minDistance * cos;
            puck.y = mallet.y + minDistance * sin;

            // v3.6 Dynamic Impulse Physics
            // The faster the mallet moves, the greater the puck velocity boost.
            const malletSpeed = Math.sqrt(mallet.vx * mallet.vx + mallet.vy * mallet.vy);
            const impulseMultiplier = 1 + (malletSpeed / 10); // Scale up based on swing
            
            puck.vx = (cos * 15 * impulseMultiplier + mallet.vx * 0.8) * CONFIG.PHYSICS.RESTITUTION;
            puck.vy = (sin * 15 * impulseMultiplier + mallet.vy * 0.8) * CONFIG.PHYSICS.RESTITUTION;
            
            return true;
        }
        return false;
    },

    handleWallCollisions(puck, width, height) {
        const gh = CONFIG.PHYSICS.GOAL_HEIGHT;
        const goalTop = (height - gh) / 2;
        const goalBottom = goalTop + gh;

        // Top & Bottom Walls
        if (puck.y - puck.radius < 0) {
            puck.y = puck.radius;
            puck.vy *= -0.8;
        } else if (puck.y + puck.radius > height) {
            puck.y = height - puck.radius;
            puck.vy *= -0.8;
        }

        // Horizontal Goals (x=0, x=800)
        if (puck.x - puck.radius < 0) {
            if (puck.y > goalTop && puck.y < goalBottom) {
                return "GOAL_AI"; // Gol no lado do jogador
            }
            puck.x = puck.radius;
            puck.vx *= -0.8;
        } else if (puck.x + puck.radius > width) {
            if (puck.y > goalTop && puck.y < goalBottom) {
                return "GOAL_PLAYER"; // Gol no lado da IA
            }
            puck.x = width - puck.radius;
            puck.vx *= -0.8;
        }
        
        return null;
    },

    clampMallet(mallet, width, height, isPlayer) {
        if (isPlayer) {
            // Player restricted to Left half (0 to 480)
            if (mallet.x < mallet.radius) mallet.x = mallet.radius;
            if (mallet.x > CONFIG.PHYSICS.PLAYER_X_LIMIT - mallet.radius) mallet.x = CONFIG.PHYSICS.PLAYER_X_LIMIT - mallet.radius;
        } else {
            // AI restricted to Right half (520 to 1000)
            if (mallet.x < width / 2 + 20 + mallet.radius) mallet.x = width / 2 + 20 + mallet.radius;
            if (mallet.x > width - mallet.radius) mallet.x = width - mallet.radius;
        }
        
        if (mallet.y < mallet.radius) mallet.y = mallet.radius;
        if (mallet.y > height - mallet.radius) mallet.y = height - mallet.radius;
    }
};
