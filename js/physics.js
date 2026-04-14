const Physics = {
    checkCollision(puck, mallet) {
        const dx = puck.x - mallet.x;
        const dy = puck.y - mallet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = puck.radius + mallet.radius;

        if (distance < minDistance) {
            const cos = dx / distance;
            const sin = dy / distance;

            // Reposition to avoid overlap
            puck.x = mallet.x + minDistance * cos;
            puck.y = mallet.y + minDistance * sin;

            // Spec v3.5: Dynamics of Velocity and Impulse
            // 1. Calculate mallet movement magnitude
            const malletSpeed = Math.sqrt(mallet.vx * mallet.vx + mallet.vy * mallet.vy);
            
            // 2. Determine resulting velocity based on strike impulse
            let resultSpeed = CONFIG.PHYSICS.CRUISE_SPEED;
            
            if (malletSpeed > 0) {
                // If attacking (mallet has velocity), boost toward MAX_SPEED (5)
                resultSpeed = CONFIG.PHYSICS.MAX_SPEED; 
            } else {
                // Passive block/collision: loss of energy (3x to 4x)
                resultSpeed = 3.5; 
            }

            puck.vx = cos * resultSpeed;
            puck.vy = sin * resultSpeed;
            
            return true;
        }
        return false;
    },

    handleWallCollisions(puck, width, height) {
        const gh = CONFIG.PHYSICS.GOAL_HEIGHT;
        const gy = (height - gh) / 2;

        // Bounce Top/Bottom
        if (puck.y < puck.radius + 10 || puck.y > height - puck.radius - 10) {
            puck.vy *= -1;
            puck.y = puck.y < height / 2 ? puck.radius + 12 : height - puck.radius - 12;
        }

        // Goal logic
        if (puck.x < puck.radius) {
            if (puck.y > gy && puck.y < gy + gh) return "GOAL_AI";
            puck.vx *= -1;
            puck.x = puck.radius + 2;
        }
        if (puck.x > width - puck.radius) {
            if (puck.y > gy && puck.y < gy + gh) return "GOAL_PLAYER";
            puck.vx *= -1;
            puck.x = width - puck.radius - 2;
        }

        return null;
    },

    clampMallet(mallet, width, height, isPlayer) {
        if (isPlayer) {
            // Player restricted to Left half
            if (mallet.x < mallet.radius + 10) mallet.x = mallet.radius + 10;
            if (mallet.x > CONFIG.PHYSICS.PLAYER_X_LIMIT - mallet.radius) mallet.x = CONFIG.PHYSICS.PLAYER_X_LIMIT - mallet.radius;
        } else {
            // AI restricted to Right half
            if (mallet.x < width / 2 + 20 + mallet.radius) mallet.x = width / 2 + 20 + mallet.radius;
            if (mallet.x > width - mallet.radius - 10) mallet.x = width - mallet.radius - 10;
        }

        if (mallet.y < mallet.radius + 10) mallet.y = mallet.radius + 10;
        if (mallet.y > height - mallet.radius - 10) mallet.y = height - mallet.radius - 10;
    }
};
