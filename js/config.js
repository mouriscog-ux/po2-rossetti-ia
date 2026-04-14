const CONFIG = {
    CLUBS: [
        { id: 1, name: "Palmeiras", color: "#006437" },
        { id: 2, name: "Flamengo", color: "#c8102e" },
        { id: 3, name: "São Paulo", color: "#fe0000" },
        { id: 4, name: "Fluminense", color: "#800020" },
        { id: 5, name: "Bahia", color: "#005696" },
        { id: 6, name: "Athletico-PR", color: "#000000" },
        { id: 7, name: "Coritiba", color: "#006437" },
        { id: 8, name: "Atlético-MG", color: "#000000" },
        { id: 9, name: "Bragantino", color: "#ffffff" },
        { id: 10, name: "Vitória", color: "#ff0000" },
        { id: 11, name: "Botafogo", color: "#000000" },
        { id: 12, name: "Grêmio", color: "#00a1e0" },
        { id: 13, name: "Vasco", color: "#000000" },
        { id: 14, name: "Internacional", color: "#ff0000" },
        { id: 15, name: "Santos", color: "#ffffff" },
        { id: 16, name: "Corinthians", color: "#000000" },
        { id: 17, name: "Cruzeiro", color: "#0033a0" },
        { id: 18, name: "Remo", color: "#001b44" },
        { id: 19, name: "Chapecoense", color: "#00913d" },
        { id: 20, name: "Mirassol", color: "#ffdd00" }
    ],
    DIFFICULTIES: {
        easy: { speed: 4, reaction: 0.1, error: 0.2, aggressive: false },
        medium: { speed: 7, reaction: 0.5, error: 0.1, aggressive: false },
        hard: { speed: 12, reaction: 1.0, error: 0.05, aggressive: true }
    },
    PHYSICS: {
        FRICTION: 0.985,
        PUCK_MAX_SPEED: 25,
        PUCK_RADIUS: 15,
        MALLET_RADIUS: 30,
        GOAL_WIDTH: 150
    },
    PHASES: ["OITAVAS", "QUARTAS", "SEMI-FINAL", "FINAL"]
};
