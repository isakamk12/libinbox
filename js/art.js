/* ==========================================================================
   ART GALLERY LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFramedGallery();
  initSpotlight();
});

/* 1. The 3D Framed Gallery */
function initFramedGallery() {
  const wall = document.getElementById('gallery-wall');
  if (!wall) return;

  const artworks = [
    { title: 'The Starry Night - Vincent', color: '#1a2b4c' },
    { title: 'Impression, Sunrise - Claude', color: '#d35400' },
    { title: 'The Scream - Edvard', color: '#c0392b' },
  ];

  artworks.forEach(art => {
    const wrapper = document.createElement('div');
    wrapper.className = 'art-frame-wrapper';

    wrapper.innerHTML = `
      <div class="art-frame">
        <div class="art-canvas" style="background-color: ${art.color};"></div>
        <div class="art-glare"></div>
      </div>
      <div class="art-label">${art.title}</div>
    `;

    wall.appendChild(wrapper);

    // 3D Tilt Effect
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left; // 0 to width
      const y = e.clientY - rect.top;  // 0 to height

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 傾きの計算（最大15度）
      const rotateX = ((y - centerY) / centerY) * -15;
      const rotateY = ((x - centerX) / centerX) * 15;

      wrapper.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      // Glare(光の反射)の移動
      const glare = wrapper.querySelector('.art-glare');
      const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
      glare.style.background = `linear-gradient(${angle + 90}deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      wrapper.style.transform = 'rotateX(0deg) rotateY(0deg)';
      const glare = wrapper.querySelector('.art-glare');
      glare.style.background = `linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%)`;
    });
  });
}

/* 2. The Spotlight Canvas */
function initSpotlight() {
  const room = document.getElementById('spotlight-room');
  const overlay = document.getElementById('spotlight-overlay');
  if (!room || !overlay) return;

  // 初期状態は画面中央
  updateSpotlight(window.innerWidth / 2, 300);

  room.addEventListener('mousemove', (e) => {
    const rect = room.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    updateSpotlight(x, y);
  });

  // タッチデバイス対応
  room.addEventListener('touchmove', (e) => {
    e.preventDefault(); // スクロール防止
    const rect = room.getBoundingClientRect();
    const touch = e.touches[0];
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    updateSpotlight(x, y);
  }, { passive: false });

  function updateSpotlight(x, y) {
    overlay.style.setProperty('--x', `${x}px`);
    overlay.style.setProperty('--y', `${y}px`);
  }
}
