const CONFIG = {
    CANVAS: {
        WIDTH: 800,
        HEIGHT: 600
    },
    CLUBS: [
        "Palmeiras", "Flamengo", "São Paulo", "Fluminense", "Bahia", 
        "Athletico-PR", "Coritiba", "Atlético-MG", "Bragantino", "Vitória", 
        "Botafogo", "Grêmio", "Vasco", "Internacional", "Santos", 
        "Corinthians", "Cruzeiro", "Remo", "Chapecoense", "Mirassol"
    ],
    DIFFICULTIES: {
        easy: { speed: 3, reaction: 0.1, aggressive: false },
        medium: { speed: 5, reaction: 0.5, aggressive: true },
        hard: { speed: 8, reaction: 1.0, aggressive: true, prediction: true }
    },
    PHYSICS: {
        DAMPING: 0.98, // 2% loss per frame
        RESTITUTION: 0.7, // 0.7 coefficient on hit
        MAX_SPEED: 12,
        PUCK_RADIUS: 20,
        MALLET_RADIUS: 40,
        GOAL_HEIGHT: 200,
        PLAYER_X_LIMIT: 380
    },
    PHASES: ["OITAVAS DE FINAL", "QUARTAS DE FINAL", "SEMI-FINAL", "GRANDE FINAL"]
};
