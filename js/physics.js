const Physics = {
    checkCollision(puck, mallet) {
        const dx = puck.x - mallet.x;
        const dy = puck.y - mallet.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const minDistance = puck.radius + mallet.radius;

        if (distance < minDistance) {
            // Simple elastic collision response
            const angle = Math.atan2(dy, dx);
            const sin = Math.sin(angle);
            const cos = Math.cos(angle);

            // Reposition puck to avoid overlap
            puck.x = mallet.x + minDistance * cos;
            puck.y = mallet.y + minDistance * sin;

            // Transfer momentum
            // We factor in mallet velocity to make it feel responsive
            puck.vx = cos * 15 + mallet.vx * 0.5;
            puck.vy = sin * 15 + mallet.vy * 0.5;
            
            return true;
        }
        return false;
    },

    handleWallCollisions(puck, width, height) {
        const goalTop = CONFIG.PHYSICS.GOAL_WIDTH;
        const goalStart = (width - goalTop) / 2;
        const goalEnd = goalStart + goalTop;

        // Left & Right
        if (puck.x - puck.radius < 0) {
            puck.x = puck.radius;
            puck.vx *= -0.8;
        } else if (puck.x + puck.radius > width) {
            puck.x = width - puck.radius;
            puck.vx *= -0.8;
        }

        // Top & Bottom (with Goal logic)
        if (puck.y - puck.radius < 0) {
            if (puck.x > goalStart && puck.x < goalEnd) {
                return "GOAL_AI";
            }
            puck.y = puck.radius;
            puck.vy *= -0.8;
        } else if (puck.y + puck.radius > height) {
            if (puck.x > goalStart && puck.x < goalEnd) {
                return "GOAL_PLAYER";
            }
            puck.y = height - puck.radius;
            puck.vy *= -0.8;
        }
        
        return null;
    },

    clampMallet(mallet, width, height, isBottomHalf) {
        if (isBottomHalf) {
            // Player
            if (mallet.x < mallet.radius) mallet.x = mallet.radius;
            if (mallet.x > width - mallet.radius) mallet.x = width - mallet.radius;
            if (mallet.y < height / 2 + mallet.radius) mallet.y = height / 2 + mallet.radius;
            if (mallet.y > height - mallet.radius) mallet.y = height - mallet.radius;
        } else {
            // AI
            if (mallet.x < mallet.radius) mallet.x = mallet.radius;
            if (mallet.x > width - mallet.radius) mallet.x = width - mallet.radius;
            if (mallet.y < mallet.radius) mallet.y = mallet.radius;
            if (mallet.y > height / 2 - mallet.radius) mallet.y = height / 2 - mallet.radius;
        }
    }
};
