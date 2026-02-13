const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const container = document.querySelector('.container');
const celebration = document.getElementById('celebration');

function moveButton() {
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
}

// Move on hover
noBtn.addEventListener('mouseover', moveButton);

// Move if someone tries to click it (mobile fallback)
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveButton();
});

yesBtn.addEventListener('click', () => {
    celebration.style.display = 'flex';
    createConfetti();

    // Start Local Music
    const audio = document.getElementById('main-audio');
    audio.play();
});

function createConfetti() {
    const colors = ['#ff4d6d', '#ff758f', '#c9184a', '#ffb3c1', '#ffffff'];
    for (let i = 0; i < 100; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `-20px`;
        particle.style.borderRadius = '50%';

        particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;

        document.body.appendChild(particle);

        // Cleanup
        setTimeout(() => particle.remove(), 5000);
    }
}
