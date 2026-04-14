const CONFIG = {
    CANVAS: {
        WIDTH: 1000,
        HEIGHT: 750
    },
    CLUBS: [
        { name: "Palmeiras", primary: "#006437", secondary: "#FFFFFF" },
        { name: "Flamengo", primary: "#c8102e", secondary: "#000000" },
        { name: "São Paulo", primary: "#fe0000", secondary: "#FFFFFF" },
        { name: "Fluminense", primary: "#800020", secondary: "#00913d" },
        { name: "Bahia", primary: "#005696", secondary: "#c8102e" },
        { name: "Athletico-PR", primary: "#c8102e", secondary: "#000000" },
        { name: "Coritiba", primary: "#006437", secondary: "#FFFFFF" },
        { name: "Atlético-MG", primary: "#000000", secondary: "#FFFFFF" },
        { name: "Bragantino", primary: "#FFFFFF", secondary: "#c8102e" },
        { name: "Vitória", primary: "#c8102e", secondary: "#000000" },
        { name: "Botafogo", primary: "#000000", secondary: "#FFFFFF" },
        { name: "Grêmio", primary: "#00a1e0", secondary: "#000000" },
        { name: "Vasco", primary: "#000000", secondary: "#FFFFFF" },
        { name: "Internacional", primary: "#ff0000", secondary: "#ffffff" },
        { name: "Santos", primary: "#ffffff", secondary: "#000000" },
        { name: "Corinthians", primary: "#ffffff", secondary: "#000000" },
        { name: "Cruzeiro", primary: "#0033a0", secondary: "#FFFFFF" },
        { name: "Remo", primary: "#001b44", secondary: "#FFFFFF" },
        { name: "Chapecoense", primary: "#00913d", secondary: "#FFFFFF" },
        { name: "Mirassol", primary: "#ffdd00", secondary: "#00913d" }
    ],
    DIFFICULTIES: {
        easy: { speed: 6, reaction: 0.1, aggressive: false },
        medium: { speed: 10, reaction: 0.5, aggressive: true },
        hard: { speed: 10, reaction: 1.0, aggressive: true, prediction: true }
    },
    PHYSICS: {
        DAMPING: 0.99,
        RESTITUTION: 0.8,
        MAX_SPEED: 38, // 2.5x speed requested
        PUCK_RADIUS: 25,
        MALLET_RADIUS: 45,
        GOAL_HEIGHT: 250,
        PLAYER_X_LIMIT: 480
    },
    PHASES: ["OITAVAS DE FINAL", "QUARTAS DE FINAL", "SEMI-FINAL", "GRANDE FINAL"]
};
