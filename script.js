// Fun messages that appear when trying to click No
const funnyMessages = [
    "Nope! Try again! 😜",
    "That button is shy! 🙈",
    "Are you sure about that? 🤔",
    "The No button ran away! 🏃‍♂️",
    "Nice try! 😏",
    "Come on, just say Yes! 💕",
    "Don't break my heart! 💔",
    "The button escaped! 🎈",
    "You can't catch me! 🦋",
    "Just click Yes already! 😍",
    "I'll keep running! 🏃‍♀️💨",
    "My heart can't take No! 💖",
    "Pretty please? 🥺",
    "I believe in Yes! ✨",
    "No is not an option! 🚫"
];

let messageIndex = 0;
let escapeCount = 0;

// DOM Elements
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const mainContainer = document.getElementById('main-container');
const celebrationContainer = document.getElementById('celebration-container');
const heartsContainer = document.getElementById('hearts-container');
const hint = document.getElementById('hint');
const loveGif = document.getElementById('love-gif');

// Cute GIFs to cycle through
const sadGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTR4Z2x4MzR0Y3B4NjBvOGRuNHN3cHJ5MDA3ZXRxcjBsdndhcGJ0YiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/M90mJvfWfd5mbUuULX/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2t3MHd6ZHRvdnI0ZjU4d3VjMjY2YjVuOWZ3cDlxa290dGpob3E0dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/OPU6wzx8JrHna/giphy.gif",
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaXBiNXZiNHVndWE0amZsczBtaXdsMG1nczBmbXU5MWl0aW5oNGxwMiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEjHGr1Fhz0kyv8Ig/giphy.gif"
];

// Create floating hearts in background
function createFloatingHearts() {
    const hearts = ['💕', '💖', '💗', '❤️', '💘', '💝', '✨', '🌸'];
    
    setInterval(() => {
        const heart = document.createElement('span');
        heart.className = 'floating-heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heartsContainer.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => heart.remove(), 10000);
    }, 500);
}

// Show fun message when trying to click No
function showMessage(x, y) {
    const message = document.createElement('div');
    message.className = 'message-bubble';
    message.textContent = funnyMessages[messageIndex];
    message.style.left = x + 'px';
    message.style.top = y + 'px';
    document.body.appendChild(message);
    
    messageIndex = (messageIndex + 1) % funnyMessages.length;
    
    // Remove message after animation
    setTimeout(() => message.remove(), 2000);
}

// Make the No button escape
function escapeButton(e) {
    const btn = noBtn;
    const container = document.querySelector('.buttons-container');
    const card = document.querySelector('.card');
    
    // Get card boundaries
    const cardRect = card.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    // Calculate a random position within the card
    const maxX = cardRect.width - btnRect.width - 40;
    const maxY = cardRect.height - btnRect.height - 100;
    
    let newX, newY;
    
    // Make button move more erratically as escape count increases
    if (escapeCount < 3) {
        // Simple escape - just move away from cursor
        newX = Math.random() * maxX - maxX/2;
        newY = Math.random() * 100 - 50;
    } else if (escapeCount < 6) {
        // Move more randomly
        newX = (Math.random() - 0.5) * maxX;
        newY = (Math.random() - 0.5) * 150;
    } else {
        // Button gets really scared - moves a lot!
        newX = (Math.random() - 0.5) * (maxX * 1.5);
        newY = (Math.random() - 0.5) * 200;
        
        // Shrink the No button over time
        const shrinkFactor = Math.max(0.5, 1 - (escapeCount - 6) * 0.1);
        btn.style.transform = `translate(${newX}px, ${newY}px) scale(${shrinkFactor})`;
        
        // Make Yes button grow!
        const growFactor = 1 + (escapeCount - 6) * 0.1;
        yesBtn.style.transform = `scale(${Math.min(growFactor, 1.5)})`;
        
        escapeCount++;
        showMessage(e.clientX, e.clientY - 50);
        
        // Update hint text
        if (escapeCount > 8) {
            hint.textContent = "Just give up and say Yes! 💖";
        } else if (escapeCount > 5) {
            hint.textContent = "The No button is getting smaller... 😏";
        }
        
        // Change GIF occasionally
        if (escapeCount % 3 === 0) {
            loveGif.src = sadGifs[Math.floor(Math.random() * sadGifs.length)];
        }
        
        return;
    }
    
    btn.classList.add('escaping');
    btn.style.transform = `translate(${newX}px, ${newY}px)`;
    
    escapeCount++;
    showMessage(e.clientX, e.clientY - 50);
    
    // Update hint after a few tries
    if (escapeCount > 2) {
        hint.textContent = "Told you! That button doesn't want to be clicked! 😄";
    }
}

// Handle No button hover and click
noBtn.addEventListener('mouseenter', escapeButton);
noBtn.addEventListener('mousemove', escapeButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    escapeButton(e.touches[0]);
});
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    escapeButton(e);
});

// Handle Yes button click - CELEBRATION TIME!
yesBtn.addEventListener('click', () => {
    // Hide main container
    mainContainer.style.display = 'none';
    
    // Show celebration
    celebrationContainer.style.display = 'flex';
    
    // Create confetti!
    createConfetti();
    
    // Play some celebration sounds could be added here
});

// Create confetti celebration
function createConfetti() {
    const colors = ['#ff6b9d', '#e91e63', '#ff8a80', '#ffab91', '#fff', '#ffd700', '#ff69b4'];
    const shapes = ['❤️', '💕', '💖', '✨', '🎉', '💗', '🌸'];
    
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            
            // Randomly choose between shapes and colored squares
            if (Math.random() > 0.5) {
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (Math.random() * 20 + 15) + 'px';
                confetti.style.background = 'transparent';
            } else {
                confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            }
            
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            
            document.body.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
    
    // Keep creating confetti
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.fontSize = (Math.random() * 15 + 10) + 'px';
            confetti.style.background = 'transparent';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 5000);
        }
    }, 1000);
}

// Initialize floating hearts
createFloatingHearts();

// Add some sparkle to the Yes button on hover
yesBtn.addEventListener('mouseenter', () => {
    yesBtn.style.boxShadow = '0 12px 40px rgba(233, 30, 99, 0.6), 0 0 30px rgba(255, 107, 157, 0.5)';
});

yesBtn.addEventListener('mouseleave', () => {
    yesBtn.style.boxShadow = '0 8px 30px rgba(233, 30, 99, 0.4)';
});

console.log('💕 Made with love for someone special! 💕');
