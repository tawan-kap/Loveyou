// วันที่เริ่มต้นความรัก (25 เมษายน 2025, UTC+07:00)
const startDate = new Date('2025-04-25T00:00:00+07:00');
const loveMessages = [
    "รักเธอมากขึ้นทุกวันเลยนะ 💕",
    "อยู่ด้วยกันแล้วใจฟูสุดๆ 🥰",
    "เธอคือแสงสว่างในชีวิตฉัน ✨",
    "ทุกวินาทีกับเธอคือความสุข 💖",
    "รักของเราจะยิ่งใหญ่ตลอดไป! 🎉"
];
const images = [
    'https://ibb.co/YBXtyxgc',
    'https://ibb.co/dsyVR9wz',
    'https://ibb.co/dwRRxYxK',
    'https://ibb.co/Cy79Gt6',
    'https://ibb.co/mFShL8CD'
];
let currentImageIndex = 0;
let currentTheme = 0;
const themes = [
    ['#ff9a9e', '#fad0c4', '#a2cffe', '#ff9a9e'],
    ['#ff6f91', '#ffcccb', '#80deea', '#ff6f91'],
    ['#f06292', '#e1bee7', '#81d4fa', '#f06292']
];

// ระบบล็อกอินคู่รัก
const correctUsername = 'name';
const correctPassword = 'tawan';

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username === correctUsername && password === correctPassword) {
        localStorage.setItem('loggedIn', 'true');
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        triggerConfetti();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// เช็คการล็อกอินตอนโหลดหน้า
if (localStorage.getItem('loggedIn') === 'true') {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
}

// คำนวณระยะเวลาครบรอบและอัปเดต DOM
function calculateTimePassed() {
    const now = new Date();
    const diffMs = now - startDate;

    if (diffMs < 0) {
        // กรณีวันที่เริ่มต้นอยู่ในอนาคต
        document.getElementById('anniversary-text').innerHTML = 
            'ความรักของเรายังไม่เริ่ม! รอถึง 25 เม.ย. 2025 น้า 💕';
        document.getElementById('countdown').innerText = '';
        document.getElementById('details').innerHTML = '';
        return;
    }

    // คำนวณวัน, ชั่วโมง, นาที, วินาที
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor(diffMs / (1000 * 60));
    const seconds = Math.floor(diffMs / 1000);

    // คำนวณปี, เดือน, วันตามวันที่ 25
    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let remainingDays = now.getDate() - startDate.getDate();

    if (remainingDays < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        remainingDays += prevMonth.getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }

    // อัปเดตข้อความครบรอบ
    document.getElementById('anniversary-text').innerHTML = 
        `${years} ปี ${months} เดือน ${remainingDays} วันแล้ว 🥰💖 (${days} วันแล้ว 🎈) 🎉`;

    // อัปเดต <div id="details">
    updateDetails(days, hours, minutes, seconds);

    // นับถอยหลังไปยังครบรอบถัดไป (วันที่ 25)
    const nextAnniversary = new Date(now.getFullYear(), now.getMonth(), 25);
    if (now.getDate() >= 25) {
        nextAnniversary.setMonth(now.getMonth() + 1);
    }
    if (nextAnniversary.getMonth() === 12) {
        nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
        nextAnniversary.setMonth(0);
    }
    const countdownMs = nextAnniversary - now;
    const countdownDays = Math.floor(countdownMs / (1000 * 60 * 60 * 24));
    const countdownHours = Math.floor((countdownMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const countdownMinutes = Math.floor((countdownMs % (1000 * 60 * 60)) / (1000 * 60));

    // แสดงวันที่ครบรอบถัดไป
    const nextDateStr = nextAnniversary.toLocaleDateString('th-TH', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
    document.getElementById('countdown').innerText = 
        `${countdownDays} วัน ${countdownHours} ชั่วโมง ${countdownMinutes} นาที (ถึง ${nextDateStr})`;
}

// อัปเดต <div id="details">
function updateDetails(days, hours, minutes, seconds) {
    const details = document.getElementById('details');
    details.innerHTML = `
        <h2>💖✨ รายละเอียดยิบของความรัก ✨💖</h2>
        <p>นับจาก <strong>25 April 2025 (UTC+07:00)</strong> ถึงวันนี้ 🎈</p>
        <p>ผ่านมาแล้ว: <strong>${days}</strong> วัน 🎂</p>
        <p>ชั่วโมง: <strong>${hours}</strong> ชั่วโมง ⏱️</p>
        <p>นาที: <strong>${minutes}</strong> นาที ⏲️</p>
        <p>วินาที: <strong>${seconds}</strong> วินาที ✨</p>
    `;
}

// แสดงข้อความรักสุ่ม
function randomLoveMessage() {
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    document.getElementById('love-message').innerText = message;
    triggerConfetti();
}

// AI สร้างข้อความรักฟรี
const loveWords = ['รักเธอ', 'คิดถึง', 'หวานใจ', 'คนพิเศษ', 'ตลอดไป', 'หัวใจ', 'ความสุข', 'แสงสว่าง', 'โลกทั้งใบ'];
const lovePhrases = ['มากกว่าที่คิด', 'ทุกวินาที', 'ยิ่งกว่าเดิม', 'สุดหัวใจ', 'ไม่มีวันเปลี่ยน'];

function generateAILoveMessage() {
    const randomWord1 = loveWords[Math.floor(Math.random() * loveWords.length)];
    const randomWord2 = loveWords[Math.floor(Math.random() * loveWords.length)];
    const randomPhrase = lovePhrases[Math.floor(Math.random() * lovePhrases.length)];
    const aiMessage = `${randomWord1}ของฉันคือ${randomWord2} ${randomPhrase}! 💖🥰`;
    document.getElementById('love-message').innerText = aiMessage;
    saveLoveMessage(aiMessage);
    triggerConfetti();
}

// เล่นเพลงรัก
function playLoveSong() {
    const audio = document.getElementById('love-song');
    audio.play();
    triggerConfetti();
}

// เปลี่ยนเพลง
function changeSong() {
    const audio = document.getElementById('love-song');
    const selector = document.getElementById('song-selector');
    audio.src = selector.value;
    audio.play();
}

// แสดง/ซ่อนรายละเอียด
function showDetails() {
    const details = document.getElementById('details');
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
}

// แกลเลอรี
function toggleGallery() {
    const gallery = document.getElementById('gallery');
    gallery.style.display = gallery.style.display === 'block' ? 'none' : 'block';
    if (gallery.style.display === 'block') {
        updateGallery();
    }
}

function updateGallery() {
    const galleryImages = document.getElementById('gallery-images');
    galleryImages.innerHTML = images.map((src, index) => 
        `<img src="${src}" alt="คู่รัก ${index + 1}" class="${index === currentImageIndex ? 'active' : ''}">`
    ).join('');
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateGallery();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateGallery();
}

// เปลี่ยนธีมสี
function toggleTheme() {
    currentTheme = (currentTheme + 1) % themes.length;
    document.body.style.background = `linear-gradient(135deg, ${themes[currentTheme].join(', ')})`;
    document.body.style.backgroundSize = '400% 400%';
    triggerConfetti();
}

// บันทึกข้อความรัก
function addLoveMessage() {
    const form = document.getElementById('custom-message-form');
    form.style.display = form.style.display === 'block' ? 'none' : 'block';
}

function saveLoveMessage(message) {
    const input = document.getElementById('new-message');
    const newMessage = message || input.value.trim();
    if (newMessage) {
        loveMessages.push(newMessage);
        localStorage.setItem('loveMessages', JSON.stringify(loveMessages));
        const memoryList = document.getElementById('memory-list');
        const memoryDiv = document.createElement('div');
        memoryDiv.innerText = newMessage;
        memoryList.appendChild(memoryDiv);
        input.value = '';
        document.getElementById('custom-message-form').style.display = 'none';
        triggerConfetti();
    }
}

// โหลดความทรงจำ
function loadMemories() {
    const savedMessages = JSON.parse(localStorage.getItem('loveMessages')) || loveMessages;
    loveMessages.length = 0;
    loveMessages.push(...savedMessages);
    const memoryList = document.getElementById('memory-list');
    memoryList.innerHTML = savedMessages.map(msg => `<div>${msg}</div>`).join('');
}

// แชร์ความรัก
function shareLove() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        alert('คัดลอกลิงก์หน้าเว็บแล้ว! แชร์ความรักของเราได้เลย 💖');
        triggerConfetti();
    });
}

// Easter Egg
function triggerEasterEgg() {
    document.getElementById('love-message').innerText = 'เซอร์ไพรส์! เธอคือคนพิเศษของฉันตลอดไป 😘💞';
    confetti({
        particleCount: 300,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#ff4d4d', '#ff9a9e', '#fad0c4', '#a2cffe']
    });
}

// เกมรักเล็กๆ
let score = 0;
let timer = 30;
let gameInterval;
let highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score').innerText = highScore;

function startLoveGame() {
    const game = document.getElementById('love-game');
    game.style.display = 'block';
    score = 0;
    timer = 30;
    document.getElementById('game-score').innerText = score;
    document.getElementById('game-timer').innerText = timer;
    gameInterval = setInterval(() => {
        timer--;
        document.getElementById('game-timer').innerText = timer;
        if (timer <= 0) {
            endGame();
        }
    }, 1000);
}

function clickHeart() {
    if (timer > 0) {
        score++;
        document.getElementById('game-score').innerText = score;
        triggerConfetti({ particleCount: 20 });
    }
}

function endGame() {
    clearInterval(gameInterval);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        document.getElementById('high-score').innerText = highScore;
        alert(`ยินดีด้วย! คะแนนสูงสุดใหม่: ${highScore} 💖 ความรักของเรายิ่งใหญ่! 🎉`);
        triggerConfetti({ particleCount: 300 });
    } else {
        alert(`คะแนนของคุณ: ${score} 💕 คะแนนสูงสุด: ${highScore}`);
    }
}

function resetGame() {
    document.getElementById('love-game').style.display = 'none';
}

// Confetti effect
function triggerConfetti(options = {}) {
    confetti({
        particleCount: options.particleCount || 200,
        spread: options.spread || 100,
        origin: { y: 0.6 },
        colors: ['#ff4d4d', '#ff9a9e', '#fad0c4', '#a2cffe']
    });
}

// Particles.js (หัวใจขั้นสูง)
particlesJS('particles-js', {
    particles: {
        number: { value: 200, density: { enable: true, value_area: 800 } },
        color: { value: ['#ff4d4d', '#ff9a9e', '#fad0c4', '#a2cffe'] },
        shape: { type: ['heart', 'circle', 'star'], stroke: { width: 0 } },
        opacity: { value: 0.8, random: true },
        size: { value: 15, random: true },
        line_linked: { enable: false },
        move: {
            enable: true,
            speed: 4,
            direction: 'none',
            random: true,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: { enable: true, mode: 'bubble' },
            onclick: { enable: true, mode: 'push' },
            resize: true
        },
        modes: {
            bubble: { distance: 200, size: 20, duration: 2, opacity: 0.8 }
        }
    }
});

// Three.js (หัวใจ 3D)
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-canvas').appendChild(renderer.domElement);

const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xff4d4d, wireframe: true });
const heart = new THREE.Mesh(geometry, material);
scene.add(heart);
camera.position.z = 15;

function animate3D() {
    requestAnimationFrame(animate3D);
    heart.rotation.x += 0.01;
    heart.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate3D();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// เรียกฟังก์ชันเริ่มต้น
setInterval(calculateTimePassed, 1000);
calculateTimePassed();
loadMemories();
updateGallery();
