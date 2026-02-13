const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const container = document.querySelector('.container');
const celebration = document.getElementById('celebration');
const dodgeMessage = document.getElementById('dodge-message');
const whatsappBtn = document.getElementById('whatsapp-btn');

let dodgeCount = 0;

function moveButton() {
    dodgeCount++;
    if (dodgeCount >= 3) {
        dodgeMessage.textContent = "VETE CON EL OTROOOOOOO";
        dodgeMessage.style.opacity = '1';
        yesBtn.disabled = true;
        yesBtn.style.opacity = '0.5';
        yesBtn.style.cursor = 'not-allowed';
    }

    const rect = container.getBoundingClientRect();
    const maxX = rect.width - noBtn.offsetWidth - 20;
    const maxY = rect.height - noBtn.offsetHeight - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

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

    // Start Main Video at 1:23 (83 seconds)
    const video = document.getElementById('main-video');
    video.currentTime = 83;
    video.play();

    // Enable heart fireworks on click/touch
    window.addEventListener('click', createHeartFirework);
    window.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        createHeartFirework({ clientX: touch.clientX, clientY: touch.clientY });
    });
});

function createHeartFirework(e) {
    const colors = ['#ff4d6d', '#ff758f', '#c9184a', '#ffb3c1', '#ffffff'];
    const numParticles = 12;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.classList.add('firework-heart');
        particle.innerHTML = '❤️';

        // Random explosion direction and rotation
        const angle = (i / numParticles) * Math.PI * 2;
        const velocity = Math.random() * 150 + 50;
        const x = Math.cos(angle) * velocity;
        const y = Math.sin(angle) * velocity;
        const rotation = Math.random() * 360;

        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        particle.style.setProperty('--r', `${rotation}deg`);
        particle.style.color = colors[Math.floor(Math.random() * colors.length)];

        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1000);
    }
}

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
        setTimeout(() => particle.remove(), 5000);
    }
}


// WhatsApp messages generator
const messages = [
    "Te amo más que a nada en este mundo ❤️",
    "Eres lo mejor que me ha pasado, mi amorcito ✨",
    "Quiero estar contigo por siempre y para siempre 💍",
    "Eres mi persona favorita en el universo 🌌",
    "Cada día me enamoro más de ti 🌹",
    "Eres mi sueño hecho realidad 😍"
];

whatsappBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const phone = "930815390";
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(randomMsg)}`;
    window.open(url, '_blank');
});
