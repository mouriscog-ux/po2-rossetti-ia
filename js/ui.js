const gameUI = {
    selectedTeam: null,
    difficulty: 'medium',
    currentPhaseIndex: 0,
    
    init() {
        this.populateTeams();
        this.setupEventListeners();
    },

    populateTeams() {
        const grid = document.getElementById('team-grid');
        CONFIG.CLUBS.forEach((teamName, index) => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `<strong>${(index + 1).toString().padStart(2, '0')}</strong><br>${teamName}`;
            card.onclick = () => this.selectTeam(teamName, card);
            grid.appendChild(card);
        });
    },

    setupEventListeners() {
        document.querySelectorAll('.btn-diff').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.btn-diff').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.difficulty = btn.dataset.diff;
            };
        });
    },

    selectTeam(teamName, element) {
        this.selectedTeam = teamName;
        document.querySelectorAll('.team-card').forEach(c => c.classList.remove('selected'));
        element.classList.add('selected');
    },

    showSelection() {
        this.switchScreen('screen-selection');
    },

    startTournament() {
        if (!this.selectedTeam) {
            alert("Escolha um time primeiro!");
            return;
        }
        this.currentPhaseIndex = 0;
        this.switchScreen('screen-game');
        gameEngine.startMatch();
    },

    switchScreen(id) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        document.getElementById(id).classList.add('active');
    },

    updateScore(pScore, aScore) {
        document.getElementById('player-score').innerText = pScore;
        document.getElementById('ai-score').innerText = aScore;
    },

    showOverlay(text, color, duration = 1500) {
        const overlay = document.getElementById('overlay');
        const overlayText = document.getElementById('overlay-text');
        overlayText.innerText = text;
        overlayText.style.color = color || 'var(--primary)';
        overlay.style.display = 'flex';
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, duration);
    }
};

window.onload = () => gameUI.init();
