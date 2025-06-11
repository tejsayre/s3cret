const SECRET_PIN = "0224";
let enteredPin = "";

// PIN keypad logic
function pressKey(val) {
    const pinDisplay = document.getElementById('pinDisplay');
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = "";

    if (val === 'del') {
        enteredPin = enteredPin.slice(0, -1);
    } else if (enteredPin.length < 4 && !isNaN(val)) {
        enteredPin += val;
    }
    pinDisplay.innerHTML = "";
    for (let i = 0; i < 4; i++) {
        pinDisplay.innerHTML += `<span>${enteredPin[i] ? "•" : ""}</span>`;
    }
}

// Show popup notification
function showVaultPopup(message, success = false) {
    const popup = document.getElementById('vaultPopup');
    popup.textContent = message;
    popup.style.background = success ? "#ffe6f2" : "#fff0f6";
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 1800);
}

// Unlock vault logic
function unlockVault() {
    if (enteredPin === SECRET_PIN) {
        showVaultPopup("Wah! You unlocked baby! 💖", true);
        document.getElementById('vault').style.display = 'none';
        showLetterPopup();
        enteredPin = "";
        pressKey("");
    } else {
        showVaultPopup("Oops! Wrong PIN, try again cutiepatootie! 💔", false);
        enteredPin = "";
        pressKey("");
    }
}

// Letter popup with typewriter
function showLetterPopup() {
    const letter = `Hi, Cutie Patootie
    
Enjoy Browsing Bellat, Eto pala Gift ko Sayo nung 3rd Monthsarry natin, Stay Tuned nalang po here. 👀🫶

– Your, Poging Boyfriend`;

    const popup = document.getElementById('letterPopup');
    const typed = document.getElementById('typedLetter');
    const btn = document.getElementById('continueMenuBtn');
    popup.style.display = 'flex';
    typed.innerHTML = '';
    btn.style.display = 'none';

    let i = 0;
    function typeWriter() {
        if (i < letter.length) {
            // Use innerHTML to render <br>
            typed.innerHTML += letter[i] === "\n" ? "<br>" : letter[i];
            i++;
            setTimeout(typeWriter, 32);
        } else {
            btn.style.display = 'inline-block';
        }
    }
    typeWriter();

    btn.onclick = function () {
        popup.style.display = 'none';
        showRomanticMenu();
    };
}

// Menu logic
function showRomanticMenu() {
    // Hide the letter popup if it's visible
    const letterPopup = document.getElementById('letterPopup');
    if (letterPopup) letterPopup.style.display = 'none';

    // Remove any existing menu or section
    document.querySelectorAll('.romantic-menu-cards, .romantic-section').forEach(el => el.remove());

    const menu = document.createElement('div');
    menu.className = 'romantic-menu-cards';
    menu.innerHTML = `
        <h2>Our Menu 💞</h2>
        <div class="menu-cards">
            <div class="menu-card" id="piecesCard">
                <div class="menu-card-icon">📖</div>
                <div class="menu-card-title">Pieces of Us</div>
                <div class="menu-card-desc">Relive our sweetest moments together.</div>
            </div>
            <div class="menu-card" id="timelineCard">
                <div class="menu-card-icon">🌙</div>
                <div class="menu-card-title">Timeline of Us</div>
                <div class="menu-card-desc">See our journey and milestones.</div>
            </div>
            <div class="menu-card" id="alwaysCard">
                <div class="menu-card-icon">💌</div>
                <div class="menu-card-title">To My Always</div>
                <div class="menu-card-desc">A letter just for you, my love.</div>
            </div>
            <div class="menu-card" id="howlongCard">
                <div class="menu-card-icon">⏳</div>
                <div class="menu-card-title">How Long Together</div>
                <div class="menu-card-desc">See how long we've been together!</div>
            </div>
        </div>
        <div class="menu-note">With you, every day is a bouquet of happiness. 🌷</div>
        <button class="exit-menu-btn" id="exitMenuBtn" style="margin-top:22px;">Exit</button>
    `;
    document.body.appendChild(menu);

    // Add click handlers for each card
    document.getElementById('piecesCard').onclick = showPiecesSection;
    document.getElementById('timelineCard').onclick = showTimelineSection;
    document.getElementById('alwaysCard').onclick = showAlwaysSection;
    document.getElementById('howlongCard').onclick = showHowLongSection;

    // Exit button handler
    document.getElementById('exitMenuBtn').onclick = function() {
        // Remove menu and show PIN card again
        document.querySelectorAll('.romantic-menu-cards, .romantic-section').forEach(el => el.remove());
        document.getElementById('vault').style.display = 'flex';
        pressKey('');
    };
}

// Section logic
function showSection(title, contentHtml) {
    // Remove any open menu or section
    document.querySelectorAll('.romantic-menu-cards, .romantic-section').forEach(el => el.remove());

    // Create section
    const section = document.createElement('div');
    section.className = 'romantic-section';
    section.innerHTML = `
        <h2>${title}</h2>
        <div class="section-content">${contentHtml}</div>
        <button class="back-menu-btn" onclick="showRomanticMenu()">← Back to Menu</button>
    `;
    document.body.appendChild(section);
}

// Individual section functions

function showPiecesSection() {
    showSection(
        "Pieces of Us",
        `
        <p>Every photo is a piece of our story. Here are some of my favorite memories with you. 💑</p>
        <div class="collage-slider">
            <button class="collage-nav left" onclick="prevCollageSlide()">&#8592;</button>
            <div class="collage-images">
                <img src="pictures/6163553124216850640.jpg" alt="Memory 1" class="collage-slide active">
                <img src="pictures/6163553124216850457.jpg" alt="Memory 2" class="collage-slide">
                <img src="pictures/6163553124216850455.jpg" alt="Memory 3" class="collage-slide">
                <img src="pictures/6163553124216850456.jpg" alt="Memory 4" class="collage-slide">
                <img src="pictures/6163553124216850454.jpg" alt="Memory 5" class="collage-slide">
                <img src="pictures/6163553124216850452.jpg" alt="Memory 6" class="collage-slide">
                <img src="pictures/6163553124216850453.jpg" alt="Memory 7" class="collage-slide">
            </div>
            <button class="collage-nav right" onclick="nextCollageSlide()">&#8594;</button>
        </div>
        <div class="collage-caption" id="collageCaption">
            Our first adventure together. 🌸
        </div>
        `
    );


    // Collage captions for each slide
    window.collageCaptions = [
        "Unang kain natin na magkasama. 🌸",
        "First holding hands awe. ✨",
        "Unang iyakan, na-magkasama. 🥹",
        "Conclusion part, pauwi. 🥺",
        "2nd meet-up, sinamahan mag exam. 🙈",
        "Clingy side ni bellat. 😳",
        "Pochacco gift ni girlfriend. 🐼"
    ];
    window.currentCollageIndex = 0;
    updateCollageSlider();
}
function showTimelineSection() {
    const months = [
        { name: "January",    img: "pictures/january.jpg",  msg: "A fresh start with you. ❤️" },
        { name: "February",   img: "pictures/febrauary.jpg",  msg: "Our love month. 💘" },
        { name: "March",      img: "pictures/march.jpg",  msg: "Blooming together. 🌸" },
        { name: "April",      img: "pictures/april.jpg",  msg: "Overcoming the Struggles. 🫶" },
        { name: "May",        img: "pictures/may.jpg",  msg: "Growing together. 💕" },
        { name: "June",       img: "always_jun.jpg",  msg: "Malapit na. 👀" },
        { name: "July",       img: "always_jul.jpg",  msg: "Soon. 👀" },
        { name: "August",     img: "always_aug.jpg",  msg: "Soon. 👀" },
        { name: "September",  img: "always_sep.jpg",  msg: "Soon. 👀" },
        { name: "October",    img: "always_oct.jpg",  msg: "Soon. 👀" },
        { name: "November",   img: "always_nov.jpg",  msg: "Soon. 👀" },
        { name: "December",   img: "always_dec.jpg",  msg: "Soon. 👀" }
    ];

    // Cute bear/character emojis (add more if you like)
    const bears = ["🧸", "🐻", "🐨", "🐼", "💜", "💗", "🎀", "🩷", "🦄", "💖", "🎈", "🎉", "🦊", "🐰", "🐱", "🐶", "🦝", "🦕", "🦋", "🧸", "🐻‍❄️"];

    let cardsHtml = `<div class="always-cards-grid">`;
    months.forEach(m => {
        // Pick a random bear/character for each card
        const bear = bears[Math.floor(Math.random() * bears.length)];
        cardsHtml += `
            <div class="always-card">
                <div class="always-card-bear">${bear}</div>
                <div class="always-card-img">
                    <img src="${m.img}" alt="${m.name}" loading="lazy">
                </div>
                <div class="always-card-title">${m.name}</div>
                <div class="always-card-msg">${m.msg}</div>
            </div>
        `;
    });
    cardsHtml += `</div>`;

    showSection(
        "Timeline of Us",
        `
        <p style="text-align:center; margin-bottom:18px;">
            Our journey together, month by month. 🌙<br>
            <span style="font-size:1rem;color:#b983ff;">Swipe or scroll to see more memories!</span>
        </p>
        ${cardsHtml}
        `
    );
    enableTimelineCardPopups(); // Enable popups for timeline cards
}
function showAlwaysSection() {
    showSection(
        "To My Always",
        `
        <div class="envelope-container" id="envelopeContainer">
            <div class="envelope-fantasy" id="envelopeFantasy">
                <div class="envelope-flap-fantasy"></div>
                <div class="envelope-seal-fantasy">💖</div>
                <div class="envelope-body-fantasy"></div>
                <div class="envelope-card-fantasy" id="envelopeCardFantasy">
                    <div class="envelope-card-inner">
                        <div class="envelope-special-message" id="envelopeSpecialMessage">
                            <span>💌 Surprise! 💌</span>
                        </div>
                        <h3>Hi, Baby</h3>
                        <p>

                        Hi, baby.

Happy 3rd Monthsary sa’tin, baby ko! 💖 Ang bilis ng panahon, no? Parang kahapon lang nung nag-start tayo sa discord no, pero tingnan mo tayo ngayon—mas strong, mas in-love, at mas determined kahit anong pagsubok ang dumating.

Alam kong hindi madali itong LDR natin. Minsan, ang hirap din kapag zero days. yung mga araw na miss na miss ka pero ‘di kita mahawakan, yung mga moments na ang bigat ng mundo pero ang layo ng yakap mo. Pero kahit ganun paman, alam mo ba na every struggle na ‘to, pinapalakas lang tayo? na kahit malayo, pinipili pa rin nating magmahalan araw-araw. aweee

At syempre, hindi mawawala yung mga happy-days, yung mga tawanang walang dahilan, yung mga kwentuhan hanggang madaling araw, yung mga random surprises na nagpapa-kilig pa rin kahit gaano pa tayo kalayo. yung mga sandaling ‘yun ang nagpapaalala sa’kin: worth it lahat ‘to, kasi ikaw yung kasama ko sa journey nato.

Kaya ngayon, as my monthsary gift sayo, ginawa ko 'tong isang cute website para sa ’tin! para kahit magkalayo tayo, may maliit na space tayo na puno ng memories natin ng mga struggles na nalampasan natin, ng mga happy days na pinagsamahan natin, at ng mga pangarap natin para sa future.

Salamat, baby, sa pagtitiis, sa pagmamahal, at sa pagiging my person kahit malayo. Hindi man perpekto ang mundo natin ngayon, pero basta’t tayo, alam kong kakayanin natin lahat.

Here’s to more months—and someday, a lifetime—of love, growth, and adventures together. I love you beyond words, beyond distance, beyond everything.

Forever yours, <br>
— Your, Poging Crush / Boyfriend
                            
                        </p>
                        <button class="back-envelope-btn" id="backEnvelopeBtn" style="margin-top:18px;">← Back to Envelope</button>
                    </div>
                </div>
            </div>
            <button class="open-envelope-btn" id="openEnvelopeBtn">Open Envelope 💌</button>
        </div>
        `
    );

    // Envelope open/close animation
    const envelope = document.getElementById('envelopeFantasy');
    const card = document.getElementById('envelopeCardFantasy');
    const openBtn = document.getElementById('openEnvelopeBtn');
    const backBtn = document.getElementById('backEnvelopeBtn');
    const specialMsg = document.getElementById('envelopeSpecialMessage');

    if (openBtn) {
        openBtn.onclick = function () {
            envelope.classList.add('open');
            setTimeout(() => {
                card.classList.add('show');
                // Show the special message with animation
                if (specialMsg) {
                    specialMsg.classList.add('show');
                }
            }, 700);
            openBtn.style.display = 'none';
        };
    }
    if (backBtn) {
        backBtn.onclick = function () {
            card.classList.remove('show');
            setTimeout(() => {
                envelope.classList.remove('open');
                openBtn.style.display = '';
                // Hide the special message
                if (specialMsg) {
                    specialMsg.classList.remove('show');
                }
            }, 400);
        };
    }
}
function showHowLongSection() {
    showSection(
        "How Long Together",
        `<p>We've been together for:<br><br>
        <span id="howLongCounter" style="font-size:1.5rem;color:#d6336c;"></span>
        <br>
        <span id="minuteCountdown" style="font-size:1rem;color:#b983ff;"></span>
        <br><br>
        And counting! ⏳💖
        </p>`
    );

    // Start date: February 24, 2025 (months are 0-indexed)
    const start = new Date(Date.UTC(2025, 1, 24, 0, 0, 0)); // UTC time

    function updateCounter() {
        // Get current time in Asia/Manila (UTC+8)
        const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }));

        let diff = Math.max(0, now - start);

        // Calculate time components
        let seconds = Math.floor(diff / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);
        let days = Math.floor(hours / 24);

        let years = Math.floor(days / 365.25);
        days -= Math.floor(years * 365.25);

        let months = Math.floor(days / 30.44);
        days = Math.floor(days - months * 30.44);

        hours = hours % 24;
        minutes = minutes % 60;
        seconds = seconds % 60;

        // Format with leading zeros
        function pad(n) { return n.toString().padStart(2, '0'); }

        const text =
            `${years > 0 ? years + " year(s), " : ""}` +
            `${months > 0 ? months + " month(s), " : ""}` +
            `${days} day(s), ` +
            `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

        const counter = document.getElementById('howLongCounter');
        if (counter) counter.textContent = text;

        // Minute countdown
        const secLeft = 60 - seconds;
        const minuteCountdown = document.getElementById('minuteCountdown');
        if (minuteCountdown) {
            minuteCountdown.textContent = `Next minute in: ${secLeft === 60 ? 0 : secLeft} second(s)`;
        }
    }

    updateCounter();
    window.howLongInterval && clearInterval(window.howLongInterval);
    window.howLongInterval = setInterval(updateCounter, 1000);
}

// Collage slider logic
function updateCollageSlider() {
    const slides = document.querySelectorAll('.collage-slide');
    const caption = document.getElementById('collageCaption');
    slides.forEach((img, idx) => {
        img.classList.toggle('active', idx === window.currentCollageIndex);
    });
    if (caption && window.collageCaptions) {
        caption.textContent = window.collageCaptions[window.currentCollageIndex];
    }
}

function prevCollageSlide() {
    const slides = document.querySelectorAll('.collage-slide');
    window.currentCollageIndex =
        (window.currentCollageIndex - 1 + slides.length) % slides.length;
    updateCollageSlider();
}

function nextCollageSlide() {
    const slides = document.querySelectorAll('.collage-slide');
    window.currentCollageIndex =
        (window.currentCollageIndex + 1) % slides.length;
    updateCollageSlider();
}

// Make sure these functions are globally accessible
window.prevCollageSlide = prevCollageSlide;
window.nextCollageSlide = nextCollageSlide;

// Make section functions globally accessible for dynamic handlers
window.showPiecesSection = showPiecesSection;
window.showTimelineSection = showTimelineSection;
window.showAlwaysSection = showAlwaysSection;
window.showHowLongSection = showHowLongSection;
window.showRomanticMenu = showRomanticMenu;

// Flower burst animation
function burstFlowers() {
    const vault = document.getElementById('vault');
    for (let i = 0; i < 70; i++) {
        const flower = document.createElement('div');
        flower.className = 'burst-flower';
        flower.innerHTML = `
            <svg width="32" height="32" viewBox="0 0 32 32">
                <ellipse cx="16" cy="16" rx="10" ry="14" fill="#ffb6c1" />
                <ellipse cx="16" cy="10" rx="6" ry="8" fill="#ff69b4" />
                <circle cx="16" cy="16" r="3" fill="#fff0f6"/>
            </svg>
        `;
        // Random start position and animation
        flower.style.left = Math.random() * 90 + '%';
        flower.style.top = (60 + Math.random() * 30) + '%';
        flower.style.opacity = 0.8 + Math.random() * 0.2;
        flower.style.transform = `scale(${0.7 + Math.random() * 0.6})`;
        flower.style.position = 'absolute';
        flower.style.pointerEvents = 'none';
        flower.style.zIndex = 1002;
        vault.appendChild(flower);

        // Animate upward and fade out
        setTimeout(() => {
            flower.style.transition = 'all 2.2s cubic-bezier(.4,0,.6,1)';
            flower.style.top = (10 + Math.random() * 20) + '%';
            flower.style.opacity = 0;
            flower.style.transform += ` rotate(${Math.random() * 360}deg)`;
        }, 50 + i * 40);

        // Remove after animation
        setTimeout(() => flower.remove(), 2500 + i * 40);
    }
}

// Heart particle spawner
function spawnHeartParticles() {
    const frame = document.querySelector('.vault-photo-frame.landscape .heart-particles');
    if (!frame) return;
    frame.innerHTML = '';
    const hearts = 10;
    for (let i = 0; i < hearts; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '💖';
        // Position hearts roughly around the border
        const angle = (i / hearts) * 2 * Math.PI;
        const rX = 45 + 45 * Math.cos(angle); // adjust for your frame size
        const rY = 55 + 55 * Math.sin(angle);
        heart.style.left = `calc(${rX}% - 9px)`;
        heart.style.top = `calc(${rY}% - 9px)`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        frame.appendChild(heart);
    }
}

function createHeartParticles() {
    const frame = document.querySelector('.vault-photo-frame .heart-particles');
    if (!frame) return;
    frame.innerHTML = '';
    const hearts = ['💖','💗','💓','💞','💕','💝'];
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('span');
        heart.className = 'heart-particle';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${10 + Math.random() * 80}%`;
        heart.style.animationDelay = `${Math.random() * 2}s`;
        frame.appendChild(heart);
    }
}

// Call this when showing the vault or after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    createHeartParticles();
});

// Show vault after heart animation and initialize PIN display
setTimeout(() => {
    document.getElementById('heartOpening').style.display = 'none';
    document.getElementById('vault').style.display = 'flex';
    pressKey('');
    burstFlowers(); // Add this line to trigger the flower animation
}, 5000);

function enableTimelineCardPopups() {
    // Wait for DOM to update
    setTimeout(() => {
        document.querySelectorAll('.always-card').forEach(card => {
            card.onclick = function () {
                // Clone the card for popup
                const popup = document.createElement('div');
                popup.className = 'timeline-card-popup';
                popup.innerHTML = `
                    <div class="timeline-card-popup-inner">
                        ${card.innerHTML}
                        <button class="close-popup-btn">Done</button>
                    </div>
                `;
                document.body.appendChild(popup);

                // Close logic
                popup.querySelector('.close-popup-btn').onclick = function (e) {
                    e.stopPropagation();
                    popup.remove();
                };

                // Optional: close popup when clicking outside the card
                popup.onclick = function (e) {
                    if (e.target === popup) popup.remove();
                };
            };
        });
    }, 100); // Wait for cards to render
}
