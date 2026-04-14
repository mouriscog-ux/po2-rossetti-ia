const CONFIG = {
    CANVAS: {
        WIDTH: 1000,
        HEIGHT: 750
    },
    CLUBS: [
        { name: "Palmeiras", color: "#006437" },
        { name: "Flamengo", color: "#c8102e" },
        { name: "São Paulo", color: "#fe0000" },
        { name: "Fluminense", color: "#800020" },
        { name: "Bahia", color: "#005696" },
        { name: "Athletico-PR", color: "#000000" },
        { name: "Coritiba", color: "#006437" },
        { name: "Atlético-MG", color: "#000000" },
        { name: "Bragantino", color: "#ffffff" },
        { name: "Vitória", color: "#ff0000" },
        { name: "Botafogo", color: "#000000" },
        { name: "Grêmio", color: "#00a1e0" },
        { name: "Vasco", color: "#000000" },
        { name: "Internacional", color: "#ff0000" },
        { name: "Santos", color: "#ffffff" },
        { name: "Corinthians", color: "#000000" },
        { name: "Cruzeiro", color: "#0033a0" },
        { name: "Remo", color: "#001b44" },
        { name: "Chapecoense", color: "#00913d" },
        { name: "Mirassol", color: "#ffdd00" }
    ],
    DIFFICULTIES: {
        easy: { speed: 2, reaction: 0.1, aggressive: false },
        medium: { speed: 4, reaction: 0.5, aggressive: true },
        hard: { speed: 6, reaction: 1.0, aggressive: true, prediction: true }
    },
    PHYSICS: {
        DAMPING: 0.985, 
        RESTITUTION: 0.5, // Even softer hit
        MAX_SPEED: 8, // Reduced speed
        PUCK_RADIUS: 25,
        MALLET_RADIUS: 45,
        GOAL_HEIGHT: 250, // Slightly larger goal for balance
        PLAYER_X_LIMIT: 480
    },
    PHASES: ["OITAVAS DE FINAL", "QUARTAS DE FINAL", "SEMI-FINAL", "GRANDE FINAL"]
};
