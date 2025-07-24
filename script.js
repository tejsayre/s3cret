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
function createVaultPopup(message, success = false) {
    let popup = document.getElementById('vaultPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'vaultPopup';
        popup.className = 'vault-popup';
        document.body.appendChild(popup);
    }
    popup.textContent = message;
    popup.style.background = success ? "#ffe6f2" : "#fff0f6";
    popup.classList.add('show');
    setTimeout(() => popup.classList.remove('show'), 1800);
}

// Unlock vault logic
function unlockVault() {
    if (enteredPin === SECRET_PIN) {
        createVaultPopup("Wah! galing You unlocked baby! 💖", true);
        document.getElementById('vault').style.display = 'none';
        showLetterPopup();
        enteredPin = "";
        pressKey("");
    } else {
        createVaultPopup("Oops! Wrong PIN, try again po! 💔", false);
        enteredPin = "";
        pressKey("");
    }
}

// Letter popup with typewriter
function showLetterPopup() {
    const letter = `Hi, my Dearest Cutie Patootie


Welcome to our special place! 🌸

Kung nandito ka, ibig sabihin ay gusto mo talagang malaman ang laman ng vault na ito. Kaya naman, ginawa ko itong cute na website para sa’yo! Para kahit malayo tayo, may maliit tayong space na puno ng memories natin, mga struggles na nalampasan natin, at mga pangarap natin para sa future.

Alam kong hindi madali itong LDR natin. Minsan, ang hirap din kapag zero days, yung mga araw na miss na miss ka pero ‘di kita mahawakan, yung mga moments na ang bigat ng mundo pero ang layo ng yakap mo. Pero kahit ganun paman, alam mo ba na every struggle na ‘to, pinapalakas lang tayo? Na kahit malayo, pinipili pa rin nating magmahalan araw-araw. aweee

ayun lang sana maging happy ka sa mga laman ng gawa ko na ito, at sana maging reminder ito sa atin na kahit anong mangyari, nandito lang ako para sa’yo. I love you so much, baby ko! 💖

Forever yours,
Your, Poging Crush / Boyfriend`;

    createLetterPopup(letter, () => {
        // Continue button callback
        showRomanticMenu();
    });
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
            <div class="menu-card" id="jarsCard">
                <div class="menu-card-icon">🫙</div>
                <div class="menu-card-title">Jars of Assurance</div>
                <div class="menu-card-desc">Pick a note when you need comfort or assurance.</div>
            </div>
        </div>
        <div class="menu-update-note" style="margin:32px 0 0 0; text-align:center;">
    <div style="font-size:1.2rem;color:#d6336c;font-family:'Pacifico',cursive;">
        More Love & Updates Coming Soon! 💞
    </div>
    <div style="font-size:1rem;color:#b983ff;">
        Stay tuned baby, more surprises and memories are on the way! 👀
    </div>
</div>
        <button class="exit-menu-btn" id="exitMenuBtn" style="margin-top:22px;">
    <span style="font-size:1.1rem;">💗</span> Exit
</button>
    `;
    document.body.appendChild(menu);

    // Add click handlers for each card
    document.getElementById('piecesCard').onclick = showPiecesSection;
    document.getElementById('timelineCard').onclick = showTimelineSection;
    document.getElementById('alwaysCard').onclick = showAlwaysSection;
    document.getElementById('howlongCard').onclick = showHowLongSection;
    document.getElementById('jarsCard').onclick = showJarsSection;

    // Exit button handler
    document.getElementById('exitMenuBtn').onclick = function() {
        // Remove menu and section
        document.querySelectorAll('.romantic-menu-cards, .romantic-section').forEach(el => el.remove());

        // Show thank you overlay
        const thankYou = document.createElement('div');
        thankYou.className = 'romantic-section';
        thankYou.style.display = 'flex';
        thankYou.style.flexDirection = 'column';
        thankYou.style.alignItems = 'center';
        thankYou.style.justifyContent = 'center';
        thankYou.style.minHeight = '100vh';
        thankYou.innerHTML = `
            <div style="background:linear-gradient(135deg,#fff0f6 80%,#ffe6f2 100%);border-radius:24px;padding:40px 32px;box-shadow:0 4px 24px #ffb6c1a0;max-width:400px;text-align:center;">
                <div style="font-size:2.2rem;color:#d6336c;font-family:'Pacifico',cursive;margin-bottom:18px;">Thank you for using, baby! 💖</div>
                <div style="font-size:1.1rem;color:#b983ff;margin-bottom:18px;">
                    You are always loved and appreciated baby po!<br>
                    <span style="font-size:1.4rem;">Stay tuned for more & surprises! 💌</span>
                </div>
                <button id="backToVaultBtn" style="
                    background:#ffb6c1;
                    color:#fff;
                    font-family:'Pacifico',cursive;
                    font-size:1.1rem;
                    border:none;
                    border-radius:12px;
                    padding:12px 32px;
                    margin-top:18px;
                    box-shadow:0 2px 8px #ffb6c1a0;
                    cursor:pointer;
                    transition:background 0.2s;
                ">← Back to Vault</button>
            </div>
        `;
        document.body.appendChild(thankYou);

        document.getElementById('backToVaultBtn').onclick = function() {
            thankYou.remove();
            document.getElementById('vault').style.display = 'flex';
            pressKey('');
        };
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
        { name: "February",   img: "pictures/feb.jpeg",  msg: "Our love month. 💘" },
        { name: "March",      img: "pictures/march.jpg",  msg: "Blooming together. 🌸" },
        { name: "April",      img: "pictures/apr.JPG",  msg: "Overcoming the Struggles. 🫶" },
        { name: "May",        img: "pictures/may.jpg",  msg: "Growing together. 💕" },
        { name: "June",       img: "pictures/june.png",  msg: "Adik sa rolbox. 😭" },
        { name: "July",       img: "always_jul.jpg",  msg: "Very Soon. 👀" },
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
    // Remove any existing romantic sections or menus
    document.querySelectorAll('.romantic-section, .romantic-menu-cards').forEach(el => el.remove());

    // Inject the section into the container
    const container = document.getElementById('romanticSection');
    container.innerHTML = `
    <section class="romantic-section" style="width:100vw;max-width:100vw;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#fff0f6 60%,#ffe6f2 100%);padding:0;">
        <h2 style="font-size:2.8rem;color:#d6336c;margin-bottom:32px;font-family:'Pacifico',cursive;">To My Always</h2>
        <div class="envelope-container" id="envelopeContainer" style="width:100%;display:flex;justify-content:center;gap:64px;margin-bottom:32px;">
            <div class="envelope-block">
                <div class="love-envelope" id="loveEnvelope1" tabindex="0" aria-label="Open Monthsary Letter">
                    <div class="envelope-flap"></div>
                    <div class="envelope-body"></div>
                    <div class="envelope-heart">💌</div>
                </div>
                <div class="envelope-label">3rd Monthsary Letter</div>
            </div>
            <div class="envelope-block">
                <div class="love-envelope" id="loveEnvelope2" tabindex="0" aria-label="Open Promise Note">
                    <div class="envelope-flap"></div>
                    <div class="envelope-body"></div>
                    <div class="envelope-heart">💖</div>
                </div>
                <div class="envelope-label">4th Monthsary Letter</div>
            </div>
            <div class="envelope-block">
                <div class="love-envelope" id="loveEnvelope3" tabindex="0" aria-label="Open Special Note">
                    <div class="envelope-flap"></div>
                    <div class="envelope-body"></div>
                    <div class="envelope-heart">💝</div>
                </div>
                <div class="envelope-label">5th Monthsary Letter</div>
            </div>
        </div>
        <!-- 4th Monthsary Letter -->
        <div id="envelopeLetter1" class="envelope-letter-popup" style="display:none;">
            <div class="envelope-letter-inner">
                <div class="letter-card-decor">
                    <span class="decor-heart decor-heart1">💗</span>
                    <span class="decor-heart decor-heart2">🤍</span>
                    <span class="decor-teddy decor-teddy1">🧸</span>
                </div>
                <h3>Hi, Baby</h3>
                <div class="letter-message">
                    Happy 3rd Monthsary sa’tin, baby ko! 💖 Ang bilis ng panahon, no? Parang kahapon lang nung nag-start tayo sa discord, pero tingnan mo tayo ngayon—mas strong, mas in-love, at mas determined kahit anong pagsubok ang dumating.<br><br>
                    Alam kong hindi madali itong LDR natin. Minsan, ang hirap din kapag zero days, yung mga araw na miss na miss ka pero ‘di kita mahawakan, yung mga moments na ang bigat ng mundo pero ang layo ng yakap mo. Pero kahit ganun paman, alam mo ba na every struggle na ‘to, pinapalakas lang tayo? Na kahit malayo, pinipili pa rin nating magmahalan araw-araw. aweee<br><br>
                    At syempre, hindi mawawala yung mga happy-days, yung mga tawanang walang dahilan, yung mga kwentuhan hanggang madaling araw, yung mga random surprises na nagpapa-kilig pa rin kahit gaano pa tayo kalayo. Yung mga sandaling ‘yun ang nagpapaalala sa’kin: worth it lahat ‘to, kasi ikaw yung kasama ko sa journey nato.<br><br>
                    Kaya ngayon, as my monthsary gift sayo, ginawa ko 'tong isang cute website para sa ’tin! Para kahit magkalayo tayo, may maliit na space tayo na puno ng memories natin, ng mga struggles na nalampasan natin, ng mga happy days na pinagsamahan natin, at ng mga pangarap natin para sa future.<br><br>
                    Salamat, baby, sa pagtitiis, sa pagmamahal, at sa pagiging my person kahit malayo. Hindi man perpekto ang mundo natin ngayon, pero basta’t tayo, alam kong kakayanin natin lahat.<br><br>
                    Here’s to more months—and someday, a lifetime—of love, growth, and adventures together. I love you beyond words, beyond distance, beyond everything.<br><br>
                    Forever yours,<br>
                    — Your, Poging Crush / Boyfriend
                </div>
                <button class="close-letter-btn" id="closeLetterBtn1">← Back to Envelopes</button>
            </div>
        </div>
        <!-- 5th Monthsary Letter -->
        <div id="envelopeLetter2" class="envelope-letter-popup" style="display:none;">
            <div class="envelope-letter-inner">
                <div class="letter-card-decor">
                    <span class="decor-heart decor-heart1">💗</span>
                    <span class="decor-heart decor-heart2">🤍</span>
                    <span class="decor-teddy decor-teddy2">🧸</span>
                </div>
                <h3>Hi my belle, my baby</h3>
                <div class="letter-message">
                    Hi my belle, my baby, awe

Ang baho mo! 🤭 eme lang, baka mainis ka unang bungad palang, tska kakatapos lang din ng away natin nitong monthsarry natin, i know na late na ito message nato dahil sa mga nangyari 😓 baby miss na miss kona yung amoy mo kahit minsan sinasabi kong mabaho ka hahahahahahahah, so funny tawa ka dapat 😝<br> <br>

Happy 4th Monthsarry sa’tin ganda. grabe no? ang bilis pero ang dami na rin nating pinagdaanan hanggang ngayon akala mo parang rollercoaster lang minsan may sobrang saya, tapos biglang may malalim na lungkot, tapos may mga away pa na akala natin di doon tayo na matatapos pero wala din yung mga yun hangang salita lang. 😉🤙<br><br>

baby, thankyou
thank you, kasi kahit sa gitna ng sarang dami ng problema modin sa family, sa sarili mo, at sa mga iniisip mo is nandyan ka pa rin para sakin, alam kong minsan nahihirapan kana, nahohopeless, gustong sumuko din sa lahat, pero kahit ganun andyan ka pa rin for me ang galing-galing mo ang tapang mo sobra sobra brave girlfriend. 💪<br><br>

thank you din kasi
kahit ako mismo, minsan ako pa yung nagiging problema 😅 pag nagagalit ako, o nagkaka-misunderstanding tayo, ikaw pa yung lumalapit saakin mismo para ayusin, ikaw yung nagpapakumbaba, nage-explain din nang maayos, at sinasabihan mo palagi ako kung saan ako nagkamali. salamat sa’yo kasi tinutulungan mo akong maging mas mabuting tao at mas mabuting boyfriend sa’yo. kahit na di ako perfect, alam mo yan. minsan makulit, minsan matigas ulo, nag rorolbux lang mag-hapon 😓 pero dahil sayo, natututo ako dahil sayo, gusto kong maging better, everyday yeah <br><br>

baby, sa gitna ng lahat ng laban natin, tandaan natin to:
"God didn't bring us this far just to leave us now." Kahit sobrang bigat, "The Lord is close to the brokenhearted" (Psalm 34:18) nandito siya, kasama natin siya. sabi niya, "Come to me, all you who are weary and burdened, and I will give you rest" (Matthew 11:28) pahinga ka minsan, ganda, Ilapit mo lahat ng sakit at pagod kay God at ilapit mo din sakin. 💛 <br><br>
i know baby na you feel like you're carrying so much. pero hindi ka nag-iisa, kasama mo ako, mag kasama tayo at kasama natin si God. "I can do all things through Christ who strengthens me" (Philippians 4:13) kaya natin to, baby together, and with Him.<br><br>
Happy 4 months ulit, my strong, beautiful, amazing Belle, kahit minsan o palagi inaaway kita, pati habang ginagawa koto ngayon 😝 akala mo nag la-lazada pako pero kahapon pato, bali nag f-fill up ikaw ng form ngayon 🤪. i love you more baby than all the battles we've faced. I'm so grateful God gave me you to walk with, to grow with to love,  kahit sa gitna ng gulo.<br><br>
And here's to us, to healing, to more growth, and to trusting God more every day. I'm holding your hand through it all. <br>
                    — Your, Poging Boyfriend
                </div>
                <button class="close-letter-btn" id="closeLetterBtn2">← Back to Envelopes</button>
            </div>
        </div>
        <!-- Romantic Letter Popup 3 -->
        <div id="envelopeLetter3" class="envelope-letter-popup" style="display:none;">
            <div class="envelope-letter-inner">
                <div class="letter-card-decor">
                    <span class="decor-heart decor-heart1">💗</span>
                    <span class="decor-heart decor-heart2">🤍</span>
                    <span class="decor-teddy decor-teddy1">🧸</span>
                    <span class="decor-teddy decor-teddy2">🧸</span>
                </div>
                <h3>Hi, my Dearest Bellatotiepatootie!</h3>
                <div class="letter-message">
                    Happy 5th Monthsary, baby! 💖 Even though we’re far apart, every single day with you feels like a blessing. Alam kong hindi madali ang LDR sa totoo lang, and ang dami nating pinagdadaanan, mga away na hindi natin maiwasan, at mga gabing ang bigat ng pakiramdam kasi ang sakit ng na m-miss kita nyan syempre. Pero kahit gaano kahirap, alam kong kaya natin to. Because with you, even the impossible feels possible.<br><br>

"I'm counting the days, how many days till I can see you again..." 🥺 Every sunrise, every sunset, hinihintay ko lang yung araw na makakasama na kita ulit, na mahahawakan, makakapiling baby. Kahit malayo, ramdam ko yung pagmamahal mo ang init, ang sincere, ang tunay. And because of that, I promise to keep fighting for us.<br><br>

"You got me all, all my love, and you got me all in my feelings..." 💞 Ikaw lang ang nakakapagpabago ng mundo ko. Kahit anong problema, kahit anong pagsubok, bastat kasama kita (kahit sa messages or video call lang), parang ang gaan-gaan ng lahat, You remind me of the lyrics in “Daisies” na new song ni Justin Bieber 😉<br><br>

"You're the flower in the weeds, you're the love I really need." 🌼
Ganyan ikaw sakin, baby yung liwanag sa gitna ng lahat ng kalungkutan at pagod, You teach me to keep going, to never give up, no matter how hard life gets. And I thank God every day for giving me someone as strong, as patient, and as loving as you. 🙏 <br><br>

"You got me all, all in for you every time..." 💌 Walang araw na hindi kita pinipili, walang segundo na hindi kita iniisip. Ikaw yung "proof that dreams come true" kasi kahit sa panaginip ko lang dati ang magkaroon ng tulad mo, ngayon, ikaw na yung reality ko.<br><br>

Baby, salamat sa lahat sa pagtitiis, sa pagmamahal, sa pagiging strong para sa’tin. I promise, no matter how many storms come our way, we’ll bloom like daisies strong, beautiful, and unshaken.<br><br>

I love you more than words can say. Here’s to more months (and someday, forever) with you. 🌷<br><br>

– Yours always, Boyfriend, Crush, BFF <br><br>

(ps: kinig ikaw ng Daisies by Justin Bieber while reading this. para ramdam mo yung feeling ko for you 😉💖)

                </div>
                <button class="close-letter-btn" id="closeLetterBtn3">← Back to Envelopes</button>
            </div>
        </div>
        <button class="back-menu-btn" id="backToMenuBtn" style="margin-top:24px;">← Back to Menu</button>
    </section>
    `;

    // Envelope 1 logic
    document.getElementById('loveEnvelope1').onclick = function () {
        fadeToLetter('envelopeContainer', 'envelopeLetter1');
    };
    document.getElementById('closeLetterBtn1').onclick = function () {
        fadeToLetter('envelopeLetter1', 'envelopeContainer');
    };

    // Envelope 2 logic
    document.getElementById('loveEnvelope2').onclick = function () {
        fadeToLetter('envelopeContainer', 'envelopeLetter2');
    };
    document.getElementById('closeLetterBtn2').onclick = function () {
        fadeToLetter('envelopeLetter2', 'envelopeContainer');
    };

    // Envelope 3 logic
    document.getElementById('loveEnvelope3').onclick = function () {
        fadeToLetter('envelopeContainer', 'envelopeLetter3');
    };
    document.getElementById('closeLetterBtn3').onclick = function () {
        fadeToLetter('envelopeLetter3', 'envelopeContainer');
    };

    // Back to menu logic
    document.getElementById('backToMenuBtn').onclick = function () {
        document.getElementById('romanticSection').innerHTML = '';
        if (typeof showRomanticMenu === 'function') showRomanticMenu();
    };

    // Smooth fade transition
    function fadeToLetter(hideId, showId) {
        const hideEl = document.getElementById(hideId);
        const showEl = document.getElementById(showId);
        hideEl.style.opacity = 1;
        hideEl.style.transition = 'opacity 0.4s';
        hideEl.style.opacity = 0;
        setTimeout(() => {
            hideEl.style.display = 'none';
            showEl.style.display = 'flex';
            showEl.style.opacity = 0;
            showEl.style.transition = 'opacity 0.4s';
            setTimeout(() => {
                showEl.style.opacity = 1;
            }, 10);
        }, 400);
    }
}

// How Long Together section logic
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

// Add to your popup logic
document.addEventListener('keydown', function(e) {
    const popup = document.querySelector('.timeline-card-popup, .letter-popup');
    if (popup && (e.key === "Escape" || e.key === "Esc")) {
        popup.remove();
    }
});

function createLetterPopup(letter, onContinue) {
    let popup = document.getElementById('letterPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'letterPopup';
        popup.className = 'letter-popup';
        document.body.appendChild(popup);
    }
    popup.innerHTML = `
        <div class="letter-popup-inner">
            <div id="typedLetter" class="typed-letter"></div>
            <button id="continueMenuBtn" class="continue-menu-btn">Continue</button>
        </div>
    `;
    popup.style.display = 'flex';
    const typed = popup.querySelector('#typedLetter');
    const btn = popup.querySelector('#continueMenuBtn');
    // Show the full letter immediately (no typing animation)
    typed.innerHTML = letter.replace(/\n/g, "<br>");
    btn.style.display = 'inline-block';

    btn.onclick = function () {
        popup.style.display = 'none';
        if (typeof onContinue === 'function') onContinue();
    };
}

// Jars of Assurance section logic
function showJarsSection() {
    document.querySelectorAll('.romantic-menu-cards, .romantic-section').forEach(el => el.remove());

    const notes = [
        // Assurance
        "No matter the distance, my love for you never fades. 💖",
        "You are enough, always and forever.",
        "I choose you every single day, even when we're apart.",
        "You are my person, my home, my always.",
        "Kahit malayo tayo, ikaw pa rin ang pipiliin ko araw-araw.",
        "Hindi ka nag-iisa, baby belle, Lagi akong nandito para sa'yo.",
        // Missing you
        "Missing you is my heart's way of reminding me how much I love you.",
        "Every second apart is a second closer to our next hug.",
        "If you ever feel alone, remember my heart is hugging you from afar.",
        "Namimiss na kita sobra, pero tiis lang, konti na lang magkakasama rin tayo.",
        "Kapag namimiss mo ako, isipin mo lang: miss din kita, sobra!",
        // Overthinking/Sad
        "It's okay to feel down sometimes. I'm always here for you.",
        "You are stronger than your worries. I believe in you.",
        "Take a deep breath, love. Everything will be okay.",
        "You are never alone. I'm just a message away.",
        "Pag pagod ka na, pahinga ka lang. Nandito lang ako, baby.",
        "Wag kang mag-alala, kakayanin natin lahat. Together tayo.",
        // Alone
        "Even on your loneliest days, you are deeply loved.",
        "Whenever you feel alone, close your eyes and feel my love wrapping around you.",
        "You light up my world, even from miles away.",
        "You are my sunshine, even on cloudy days.",
        "Kapag mag-isa ka, isipin mo: may isang taong nagmamahal sa'yo ng sobra.",
        "Hindi ka nag-iisa, baby. Yakap mula dito 💗"
    ];

    const section = document.createElement('div');
    section.className = 'romantic-section';
    section.innerHTML = `
        <h2 style="font-size:2.4rem;color:#d6336c;margin-bottom:24px;font-family:'Pacifico',cursive;">
            Jars of Assurance <span style="font-size:2rem;">🫙</span>
        </h2>
        <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;">
            <div id="jarArea" style="margin-bottom:24px;">
                <div id="jar" style="cursor:pointer; width:120px; height:160px; display:flex;align-items:flex-end;justify-content:center;">
                    <img id="jarImg" src="https://static.vecteezy.com/system/resources/thumbnails/042/235/504/small_2x/isolated-cute-pink-glass-jar-with-a-happy-smile-in-transparent-background-png.png" alt="Jar of Assurance" style="width:100px;height:140px;object-fit:contain;cursor:pointer;display:block;margin:0 auto;">
                </div>
                <div style="text-align:center; color:#b983ff; font-size:1.1rem; margin-top:8px;">
                    Tap the jar to pick a note!
                </div>
            </div>
            <div id="noteArea" style="min-height:80px;display:flex;align-items:center;justify-content:center;"></div>
        </div>
        <button class="back-menu-btn" onclick="showRomanticMenu()" style="margin-top:32px;">← Back to Menu</button>
    `;
    document.body.appendChild(section);

    // Jar click logic
    document.getElementById('jar').onclick = function () {
        const note = notes[Math.floor(Math.random() * notes.length)];
        const noteArea = document.getElementById('noteArea');
        noteArea.innerHTML = `
            <div style="
                background:linear-gradient(135deg,#fff0f6 80%,#ffe6f2 100%);
                border-radius:18px;
                border:2px solid #ffb6c1;
                box-shadow:0 4px 16px #ffb6c1a0;
                padding:22px 28px;
                font-size:1.25rem;
                color:#a86c3c;
                font-family:'Pacifico',cursive;
                animation:popNote 0.4s;
                margin-top:8px;
                text-align:center;
                min-width:220px;
                max-width:340px;
            ">
                ${note}
            </div>
        `;
    };
}
window.showJarsSection = showJarsSection;
