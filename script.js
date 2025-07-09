/* === script.js === */
// Highlight the active nav link based on current page URL
const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

// Cool animated loading screen
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('fade-out');
    setTimeout(() => loader.style.display = 'none', 1000);
  }
});

// Typewriter animation
const typingText = document.getElementById('typing-text');
if (typingText) {
  const languages = ['Click image for Resume','I code in C', 'I code in C++', 'I code in Python', 'I code in Java', 'I code in JavaScript', 'I love to Sketch', 'I am still sane'];
  let langIndex = 0;
  let index = 0;
  let isErasing = false;

  function updateText() {
    const current = languages[langIndex];
    const fullText = current;

    const visibleText = isErasing ? fullText.substring(0, index--) : fullText.substring(0, index++);
    typingText.innerHTML = visibleText + '<span class="cursor">|</span>';

    if (!isErasing && index > fullText.length) {
      setTimeout(() => {
        isErasing = true;
        updateText();
      }, 2000);
    } else if (isErasing && index < 0) {
      isErasing = false;
      langIndex++;
      if (langIndex >= languages.length) langIndex = 0;
      index = 0;
      setTimeout(updateText, 500);
    } else {
      setTimeout(updateText, isErasing ? 50 : 150);
    }
  }

  updateText();
}

// Play the impressed video and text animation once on hover, then stop
const impressedVideo = document.querySelector('.impressed-gif');
const impressedText = document.querySelector('.impressed-text');

if (impressedVideo && impressedText) {
  impressedVideo.pause();

  impressedVideo.addEventListener('mouseenter', () => {
    impressedVideo.play();
    impressedText.style.animation = 'impressedLoop 1.7s ease forwards';

    setTimeout(() => {
      impressedVideo.pause();
      impressedVideo.currentTime = 0;
      impressedText.style.animation = 'none';
    }, 1700);
  });

  // Bounce animation loop while not hovering
  let bouncing = false;
  let bounceTimeout;

  function startBounceLoop() {
    if (bouncing) return;
    bouncing = true;

    function bounceCycle() {
      if (!bouncing) return;

      impressedVideo.style.transition = 'transform 50ms';
      impressedVideo.style.transform = 'scale(1.15)';
      setTimeout(() => {
        impressedVideo.style.transform = 'scale(1)';
        setTimeout(() => {
          impressedVideo.style.transition = 'transform 60ms';
          impressedVideo.style.transform = 'scale(1.1)';
          setTimeout(() => {
            impressedVideo.style.transform = 'scale(1)';
            if (bouncing) {
              setTimeout(bounceCycle, 3000);
            }
          }, 60);
        }, 60);
      }, 50);
    }

    bounceCycle();
  }

  function stopBounceLoop() {
    bouncing = false;
    impressedVideo.style.transform = 'scale(1)';
    if (bounceTimeout) clearTimeout(bounceTimeout);
  }

  impressedVideo.addEventListener('mouseenter', () => {
    stopBounceLoop();
  });

  impressedVideo.addEventListener('mouseleave', () => {
    bounceTimeout = setTimeout(() => {
      startBounceLoop();
    }, 2000);
  });

  // Start bounce on load
  startBounceLoop();
}

// Responsive navigation toggle with slide-down effect
const nav = document.querySelector('nav');
const menuToggle = document.createElement('div');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '&#9776;';
document.querySelector('header').appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
  menuToggle.classList.toggle('open');
  if (nav.classList.contains('nav-open')) {
    nav.style.maxHeight = nav.scrollHeight + 'px';
    menuToggle.innerHTML = '&times;';
  } else {
    nav.style.maxHeight = '0';
    menuToggle.innerHTML = '&#9776;';
  }
});

function adjustNavLayout() {
  const logoArea = document.querySelector('.logo-area');
  const header = document.querySelector('header');
  const main = document.querySelector('main');

  if (window.innerWidth <= 768) {
    nav.classList.add('vertical-nav');
    nav.style.maxHeight = '0';
    nav.style.overflow = 'hidden';
    nav.style.transition = 'max-height 0.4s ease';
    nav.style.display = 'flex';
    nav.style.flexDirection = 'column';
    nav.style.alignItems = 'center';
    nav.style.width = '100%';
    nav.style.padding = '0';
    nav.style.position = 'absolute';
    nav.style.top = '100%';
    nav.style.left = '0';
    nav.style.background = '#f8f8f8';

    header.style.flexDirection = 'column';
    header.style.alignItems = 'center';
    header.style.position = 'relative';

    if (logoArea) {
      logoArea.style.justifyContent = 'center';
      logoArea.style.width = '100%';
      logoArea.style.textAlign = 'center';
      logoArea.style.marginBottom = '1rem';
    }

    if (main) {
      main.style.paddingTop = '1rem';
    }
  } else {
    nav.classList.remove('nav-open');
    nav.classList.remove('vertical-nav');
    nav.style.maxHeight = 'none';
    nav.style.overflow = '';
    nav.style.transition = '';
    nav.style.display = 'flex';
    nav.style.flexDirection = 'row';
    nav.style.alignItems = '';
    nav.style.width = '';
    nav.style.padding = '';
    nav.style.position = '';
    nav.style.top = '';
    nav.style.left = '';
    nav.style.background = '';

    header.style.flexDirection = 'row';
    header.style.alignItems = 'center';
    header.style.position = '';

    if (logoArea) {
      logoArea.style.justifyContent = 'flex-start';
      logoArea.style.width = 'auto';
      logoArea.style.textAlign = 'left';
      logoArea.style.marginBottom = '0';
    }
    menuToggle.classList.remove('open');
    menuToggle.innerHTML = '&#9776;';

    if (main) {
      main.style.paddingTop = '';
    }
  }
}

window.addEventListener('resize', adjustNavLayout);
window.addEventListener('DOMContentLoaded', adjustNavLayout);

const style = document.createElement('style');
style.innerHTML = `
  nav.vertical-nav {
    overflow: hidden;
    transition: max-height 0.4s ease;
  }
  nav.vertical-nav.nav-open {
    max-height: 500px;
  }
`;
document.head.appendChild(style);
// Music toggle with persistence and reliable load
document.addEventListener('DOMContentLoaded', () => {
  const musicToggle = document.getElementById('music-toggle');
  const backgroundMusic = document.getElementById('background-music');
  if (!musicToggle || !backgroundMusic) return;

  backgroundMusic.loop = true;
  backgroundMusic.volume = 0.035;

  const STORAGE_KEY = 'musicPlaying';
  let isPlaying = localStorage.getItem(STORAGE_KEY) === 'true';

  // Initialize audio state based on stored preference
  if (isPlaying) {
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(() => {});
    musicToggle.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
    musicToggle.classList.add('playing');
  } else {
    backgroundMusic.pause();
    backgroundMusic.muted = true;
    musicToggle.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
    musicToggle.classList.remove('playing');
  }

  // Toggle on click
  musicToggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      backgroundMusic.muted = false;
      backgroundMusic.play().catch(() => {});
      musicToggle.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
      musicToggle.classList.add('playing');
    } else {
      backgroundMusic.pause();
      backgroundMusic.muted = true;
      musicToggle.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
      musicToggle.classList.remove('playing');
    }
    localStorage.setItem(STORAGE_KEY, isPlaying.toString());
  });
});

