/* ═══════════════════════════════════════════════════
   SCRIPT.JS — For Shree 🍦💗
   ═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ──── DOM REFS ────
  const pages = {
    page1: document.getElementById('page1'),
    page2: document.getElementById('page2'),
    page3: document.getElementById('page3'),
    page4: document.getElementById('page4'),
  };

  const envelope = document.getElementById('envelope');
  const envelopeFlap = document.getElementById('envelopeFlap');
  const envelopeLetter = document.getElementById('envelopeLetter');
  const envelopeHint = document.getElementById('envelopeHint');
  const btnOpenLetter = document.getElementById('btnOpenLetter');

  const questionText = document.getElementById('questionText');
  const questionSub = document.getElementById('questionSub');
  const btnYes = document.getElementById('btnYes');
  const btnNo = document.getElementById('btnNo');

  const celebration = document.getElementById('celebration');
  const confessionCard = document.getElementById('confessionCard');
  const heartBurst = document.getElementById('heartBurst');
  const btnVoice = document.getElementById('btnVoice');
  const btnSong = document.getElementById('btnSong');
  const btnFinal = document.getElementById('btnFinal');

  const floatingElements = document.getElementById('floatingElements');
  const icecreamRain = document.getElementById('icecreamRain');
  const questionSparkles = document.getElementById('questionSparkles');

  // ──── STATE ────
  let envelopeState = 'closed'; // closed | opening | open | letter-open
  let noClickCount = 0;
  let currentPage = 1;

  // ──── NO BUTTON STAGES ────
  const noStages = [
    { question: "Do you want us? 💗", sub: "", noText: "No 🙄", yesText: "Yes 😳" },
    { question: "Are you sure? 😌", sub: "Think again 👀", noText: "Still no", yesText: "Yes 😳" },
    { question: "At least consider it? 🥺", sub: "Give me one chance 😤", noText: "Nope", yesText: "Yes!! 😳" },
    { question: "That kinda hurt a little 🥲", sub: "Okay… didn't expect that 😶", noText: "No…", yesText: "YESSS 💗" },
    { question: "My plan is failing 😭", sub: "I even made a whole website for you 😭", noText: "...", yesText: "OKAY FINE YES 💗" },
    { question: "Okay… this one actually hurt 😭💔", sub: "", noText: "💔", yesText: "YES I SAID YES 😭💗" },
  ];

  // ──── INITIALIZE ────
  createFloatingElements();
  setupEnvelope();
  setupQuestionPage();
  setupConfessionPage();

  // ═══════════════════════════════════════════════════
  // FLOATING ELEMENTS
  // ═══════════════════════════════════════════════════
  function createFloatingElements() {
    const items = ['💗', '💕', '✨', '🍦', '💗', '💖', '🍨', '💗', '✨', '💕', '🍦', '💗'];
    items.forEach((emoji, i) => {
      const el = document.createElement('span');
      el.className = 'floating-item';
      el.textContent = emoji;
      el.style.left = `${Math.random() * 100}%`;
      el.style.setProperty('--dur', `${6 + Math.random() * 8}s`);
      el.style.setProperty('--delay', `${Math.random() * 10}s`);
      el.style.fontSize = `${0.8 + Math.random() * 1.2}rem`;
      floatingElements.appendChild(el);
    });
  }

  // ═══════════════════════════════════════════════════
  // PAGE TRANSITIONS
  // ═══════════════════════════════════════════════════
  function transitionToPage(targetNum) {
    if (targetNum === currentPage) return;

    const current = pages[`page${currentPage}`];
    const target = pages[`page${targetNum}`];

    // Create transition hearts
    showTransitionHearts();

    // Leave current
    current.classList.remove('page--active');
    current.classList.add('page--leaving');

    // Enter target after delay
    setTimeout(() => {
      current.classList.remove('page--leaving');
      target.classList.add('page--entering');
      target.classList.add('page--active');

      setTimeout(() => {
        target.classList.remove('page--entering');
      }, 1000);
    }, 600);

    currentPage = targetNum;
  }

  function showTransitionHearts() {
    const container = document.createElement('div');
    container.className = 'transition-hearts';
    document.body.appendChild(container);

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('span');
      heart.className = 'transition-heart';
      heart.textContent = ['💗', '💕', '✨', '💖', '🍦'][Math.floor(Math.random() * 5)];
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.top = `${Math.random() * 100}%`;
      heart.style.setProperty('--tx', `${(Math.random() - 0.5) * 200}px`);
      heart.style.setProperty('--ty', `${(Math.random() - 0.5) * 200}px`);
      heart.style.animationDelay = `${Math.random() * 0.5}s`;
      container.appendChild(heart);
    }

    setTimeout(() => container.remove(), 2000);
  }

  // ═══════════════════════════════════════════════════
  // PAGE 1: ENVELOPE
  // ═══════════════════════════════════════════════════
  function setupEnvelope() {
    envelope.addEventListener('click', handleEnvelopeClick);
    envelope.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnvelopeClick();
      }
    });

    btnOpenLetter.addEventListener('click', (e) => {
      e.stopPropagation();
      transitionToPage(2);
    });
  }

  function handleEnvelopeClick() {
    if (envelopeState === 'closed') {
      envelopeState = 'opening';
      envelopeHint.classList.add('envelope-hint--hidden');
      envelope.classList.add('envelope--opening');
      envelope.style.animation = 'none';

      // After flap opens and letter slides out, show popup on body
      setTimeout(() => {
        envelopeState = 'letter-open';
        envelope.classList.add('envelope--letter-open');
        showLetterPopup();
      }, 1800);
    }
  }

  function showLetterPopup() {
    // Create backdrop overlay directly on body
    const backdrop = document.createElement('div');
    backdrop.className = 'letter-backdrop';
    document.body.appendChild(backdrop);

    // Create letter popup directly on body (above everything)
    const popup = document.createElement('div');
    popup.className = 'letter-popup';
    popup.innerHTML = `
      <div class="letter-content" style="opacity:1; transform:translateY(0);">
        <p class="letter-content__greeting">Hey Shree…</p>
        <p class="letter-content__body">
          I didn't know how to say this normally…<br />
          so I made this instead 😅
        </p>
        <p class="letter-content__body">
          Just go through it once… okay? 💗
        </p>
        <button class="btn btn--open-letter" id="btnOpenLetterPopup">
          Open it 😌
        </button>
      </div>
    `;
    document.body.appendChild(popup);

    // Wire up the "Open it" button on the popup
    document.getElementById('btnOpenLetterPopup').addEventListener('click', (e) => {
      e.stopPropagation();
      // Remove popup and backdrop
      popup.remove();
      backdrop.remove();
      // Transition to page 2
      transitionToPage(2);
    });

    // Also allow clicking backdrop to close (optional nice UX)
    backdrop.addEventListener('click', () => {
      popup.remove();
      backdrop.remove();
      transitionToPage(2);
    });
  }

  // ═══════════════════════════════════════════════════
  // PAGE 2: THE QUESTION
  // ═══════════════════════════════════════════════════
  function setupQuestionPage() {
    // Create sparkle decorations
    for (let i = 0; i < 8; i++) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.textContent = ['✨', '💗', '⭐', '💕'][Math.floor(Math.random() * 4)];
      sparkle.style.left = `${10 + Math.random() * 80}%`;
      sparkle.style.top = `${10 + Math.random() * 80}%`;
      sparkle.style.animationDelay = `${Math.random() * 2}s`;
      sparkle.style.animationDuration = `${1.5 + Math.random() * 2}s`;
      questionSparkles.appendChild(sparkle);
    }

    // Yes button
    btnYes.addEventListener('click', handleYesClick);

    // No button
    btnNo.addEventListener('click', handleNoClick);
  }

  function handleYesClick() {
    // Celebration transition to page 3
    transitionToPage(3);

    // Start the celebration video + heart burst
    setTimeout(() => {
      const celebVideo = document.getElementById('celebrationVideo');
      celebVideo.play().catch(() => {});
      createHeartBurst();
    }, 800);

    // "Wait... there's more" button → show confession card
    const btnMore = document.getElementById('btnMore');
    btnMore.addEventListener('click', () => {
      celebration.classList.add('celebration--hidden');
      confessionCard.classList.add('confession-card--visible');
    });
  }

  function handleNoClick() {
    noClickCount++;
    const stageIndex = Math.min(noClickCount, noStages.length - 1);
    const stage = noStages[stageIndex];

    // Update texts
    questionText.textContent = stage.question;
    questionSub.textContent = stage.sub;
    btnNo.textContent = stage.noText;
    btnYes.textContent = stage.yesText;

    // Shake the question text
    questionText.classList.remove('shake');
    void questionText.offsetWidth; // Force reflow
    questionText.classList.add('shake');

    // Move no button to random position
    moveNoButton();

    // Grow yes button
    const yesScale = 1 + noClickCount * 0.12;
    btnYes.style.transform = `scale(${yesScale})`;
    btnYes.style.padding = `${1.1 + noClickCount * 0.15}rem ${3 + noClickCount * 0.3}rem`;

    // Add glow/bounce effects after a few clicks
    if (noClickCount >= 2) {
      btnYes.classList.add('btn--yes-glow');
    }
    if (noClickCount >= 4) {
      btnYes.classList.add('btn--yes-bounce');
    }

    // Shrink no button slightly
    const noScale = Math.max(0.6, 1 - noClickCount * 0.08);
    btnNo.style.fontSize = `${Math.max(0.85, 1.25 - noClickCount * 0.07)}rem`;
    btnNo.style.opacity = `${Math.max(0.5, 1 - noClickCount * 0.1)}`;
  }

  function moveNoButton() {
    const btn = btnNo;

    if (!btn.classList.contains('btn--no--fleeing')) {
      btn.classList.add('btn--no--fleeing');
    }

    const margin = 80;
    const maxX = window.innerWidth - btn.offsetWidth - margin;
    const maxY = window.innerHeight - btn.offsetHeight - margin;

    const newX = margin + Math.random() * maxX;
    const newY = margin + Math.random() * maxY;

    // Ensure it doesn't overlap with yes button
    const yesRect = btnYes.getBoundingClientRect();
    const tooClose =
      Math.abs(newX - yesRect.left) < 150 && Math.abs(newY - yesRect.top) < 100;

    if (tooClose) {
      // Try again
      moveNoButton();
      return;
    }

    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;

    // Random tilt
    const tilt = (Math.random() - 0.5) * 20;
    btn.style.transform = `rotate(${tilt}deg) scale(${Math.max(0.6, 1 - noClickCount * 0.08)})`;
  }

  // ═══════════════════════════════════════════════════
  // PAGE 3: CONFESSION
  // ═══════════════════════════════════════════════════
  function setupConfessionPage() {
    let voicePlaying = false;
    const voiceAudio = document.getElementById('audioVoice');
    voiceAudio.src = 'WhatsApp Ptt 2026-04-05 at 00.44.05.ogg';

    btnVoice.addEventListener('click', () => {
      if (voicePlaying) {
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
        btnVoice.querySelector('.btn__icon').textContent = '🎧';
        voicePlaying = false;
      } else {
        voiceAudio.play();
        btnVoice.querySelector('.btn__icon').textContent = '⏸️';
        voicePlaying = true;
      }
    });

    voiceAudio.addEventListener('ended', () => {
      btnVoice.querySelector('.btn__icon').textContent = '🎧';
      voicePlaying = false;
    });

    btnSong.addEventListener('click', () => {
      showSongTease();
    });

    btnFinal.addEventListener('click', () => {
      transitionToPage(4);

      // Start the video after the page transition
      const finalVideo = document.getElementById('finalVideo');
      const finalContent = document.getElementById('finalContent');

      setTimeout(() => {
        // Start background song (loops forever)
        const bgSong = document.getElementById('audioBgSong');
        bgSong.volume = 0.5;
        bgSong.play().catch(() => {});

        finalVideo.play().catch(() => {
          // If video fails, show content immediately
          showFinalContent(finalVideo, finalContent);
        });
      }, 800);

      // When video ends → fade it out, show the text + rain + ring
      finalVideo.addEventListener('ended', () => {
        showFinalContent(finalVideo, finalContent);
      });
    });
  }

  function showFinalContent(video, content) {
    // Fade the video
    video.classList.add('final-video--ended');

    // Show the text content
    content.classList.remove('final-content--hidden');
    content.classList.add('final-content--visible');

    // Start ice cream rain
    setTimeout(startIcecreamRain, 300);
  }

  // ═══════════════════════════════════════════════════
  // RING DROP ANIMATION
  // ═══════════════════════════════════════════════════
  function startRingDrop() {
    const ringContainer = document.getElementById('ringContainer');
    const ring = document.getElementById('fallingRing');
    const ringSparkles = document.getElementById('ringSparkles');
    const ringBurst = document.getElementById('ringBurst');
    const youreSpan = document.getElementById('finalYoure');

    if (!ringContainer || !youreSpan) return;

    // Calculate where the ring needs to land (on top of "you're")
    const youreRect = youreSpan.getBoundingClientRect();
    const wrapperRect = ringContainer.parentElement.getBoundingClientRect();
    const landY = youreRect.top - wrapperRect.top - 45; // above the word

    // Position ring horizontally over "you're"
    const youreCenterX = youreRect.left + youreRect.width / 2 - wrapperRect.left;
    ringContainer.style.left = `${youreCenterX}px`;
    ringContainer.style.setProperty('--ring-land-y', `${landY}px`);

    // Start falling
    ringContainer.classList.add('ring-container--falling');

    // Add sparkle trail during fall
    let sparkleInterval = setInterval(() => {
      addTrailSparkle(ringSparkles);
    }, 120);

    // After fall completes (2s), do the landing
    setTimeout(() => {
      clearInterval(sparkleInterval);

      // Bounce
      ringContainer.classList.remove('ring-container--falling');
      ringContainer.classList.add('ring-container--landed');
      ringContainer.style.top = `${landY}px`;
      ringContainer.style.opacity = '1';

      // Sparkle burst
      createRingBurst(ringBurst, youreCenterX, landY + 30);

      // Glow on "you're"
      youreSpan.classList.add('final-youre--glow');

      // After bounce, go to idle resting state
      setTimeout(() => {
        ringContainer.classList.remove('ring-container--landed');
        ringContainer.classList.add('ring-container--resting');
      }, 600);

    }, 2000);
  }

  function addTrailSparkle(container) {
    const sparkle = document.createElement('span');
    sparkle.className = 'ring__sparkle';
    sparkle.textContent = ['✨', '⭐', '💫'][Math.floor(Math.random() * 3)];
    sparkle.style.left = `${(Math.random() - 0.5) * 30}px`;
    sparkle.style.top = `${Math.random() * 10}px`;
    sparkle.style.setProperty('--sx', `${(Math.random() - 0.5) * 40}px`);
    sparkle.style.setProperty('--sy', `${10 + Math.random() * 30}px`);
    container.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  }

  function createRingBurst(container, cx, cy) {
    const particles = ['✨', '💫', '⭐', '✨', '💛', '✨'];
    container.style.left = `${cx}px`;
    container.style.top = `${cy}px`;

    for (let i = 0; i < 10; i++) {
      const p = document.createElement('span');
      p.className = 'ring-burst__particle';
      p.textContent = particles[Math.floor(Math.random() * particles.length)];
      const angle = (i / 10) * Math.PI * 2;
      const dist = 40 + Math.random() * 50;
      p.style.setProperty('--bx', `${Math.cos(angle) * dist}px`);
      p.style.setProperty('--by', `${Math.sin(angle) * dist}px`);
      p.style.animationDelay = `${i * 0.04}s`;
      container.appendChild(p);
    }

    setTimeout(() => { container.innerHTML = ''; }, 1200);
  }

  function createHeartBurst() {
    const hearts = ['💗', '💕', '💖', '✨', '🍦', '❤️'];
    for (let i = 0; i < 12; i++) {
      const h = document.createElement('span');
      h.className = 'burst-heart';
      h.textContent = hearts[Math.floor(Math.random() * hearts.length)];

      const angle = (i / 12) * Math.PI * 2;
      const dist = 80 + Math.random() * 60;
      h.style.setProperty('--tx', `${Math.cos(angle) * dist}px`);
      h.style.setProperty('--ty', `${Math.sin(angle) * dist}px`);
      h.style.animationDelay = `${i * 0.05}s`;

      heartBurst.appendChild(h);
    }
  }

  // ═══════════════════════════════════════════════════
  // PAGE 4: FINAL — ICE CREAM RAIN
  // ═══════════════════════════════════════════════════
  function startIcecreamRain() {
    const items = ['🍦', '🍨', '💗', '🍦', '💕', '🍦', '✨', '🍦'];

    for (let i = 0; i < 30; i++) {
      const el = document.createElement('span');
      el.className = 'rain-item';
      el.textContent = items[Math.floor(Math.random() * items.length)];
      el.style.left = `${Math.random() * 100}%`;
      el.style.setProperty('--dur', `${2 + Math.random() * 4}s`);
      el.style.setProperty('--delay', `${Math.random() * 5}s`);
      el.style.fontSize = `${1.2 + Math.random() * 1.8}rem`;
      el.style.opacity = `${0.5 + Math.random() * 0.5}`;
      icecreamRain.appendChild(el);
    }
  }
  // ═══════════════════════════════════════════════════
  // SONG TEASE — Fake loader → teasing message
  // ═══════════════════════════════════════════════════
  function showSongTease() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'song-tease-overlay';

    // Loading state
    overlay.innerHTML = `
      <div class="song-tease-loader">
        <div class="song-tease-loader__icon">🎵</div>
        <p class="song-tease-loader__text">Loading song...</p>
        <div class="song-tease-loader__bar">
          <div class="song-tease-loader__fill"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // After 2s, switch to teasing message
    setTimeout(() => {
      overlay.innerHTML = `
        <div class="song-tease-card">
          <div class="song-tease-card__hearts" id="songTeaseHearts"></div>
          <p class="song-tease-card__line1">You said after exams… 😌</p>
          <p class="song-tease-card__line2">so now you'll have to wait…</p>
          <p class="song-tease-card__line3">don't regret it later 💗</p>
          <button class="btn song-tease-card__close">okay fine 😤</button>
        </div>
      `;

      // Add floating hearts around card
      const heartsContainer = document.getElementById('songTeaseHearts');
      const hearts = ['💗', '💕', '💖', '✨', '💗'];
      for (let i = 0; i < 8; i++) {
        const h = document.createElement('span');
        h.className = 'song-tease-heart';
        h.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        h.style.left = `${Math.random() * 100}%`;
        h.style.top = `${Math.random() * 100}%`;
        h.style.animationDelay = `${Math.random() * 2}s`;
        h.style.animationDuration = `${2 + Math.random() * 2}s`;
        heartsContainer.appendChild(h);
      }

      // Close button
      overlay.querySelector('.song-tease-card__close').addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 400);
      });
    }, 2000);

    // Also close by clicking overlay background
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 400);
      }
    });
  }

})();
