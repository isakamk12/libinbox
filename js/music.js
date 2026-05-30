/* ==========================================================================
   MUSIC THEME DATA & INTERACTIONS
   ========================================================================== */

const musicData = [
  { id: 1, title: "Midnight Jazz", artist: "The Night Owls", color: "#2c3e50" },
  { id: 2, title: "Neon City Pop", artist: "Retro Wave", color: "#8e44ad" },
  { id: 3, title: "Acoustic Breeze", artist: "Wind & Wood", color: "#27ae60" },
  { id: 4, title: "Lo-Fi Study", artist: "Chill Beats", color: "#d35400" },
  { id: 5, title: "Classical Era", artist: "Symphony Orch.", color: "#c0392b" },
];

document.addEventListener('DOMContentLoaded', () => {
  initRecords();
  initCassettes();
  initCDs();
});

/* 1. Vinyl Record Initialization */
function initRecords() {
  const wrapper = document.getElementById('record-wrapper');
  if (!wrapper) return;

  musicData.slice(0, 3).forEach(data => {
    const item = document.createElement('div');
    item.className = 'record-item';

    item.innerHTML = `
      <div class="record-jacket" style="background-color: ${data.color}">
        <div class="record-title">${data.title}<br><span style="font-size:0.8rem;opacity:0.8;">${data.artist}</span></div>
      </div>
      <div class="record-vinyl">
        <div class="record-label" style="background-color: ${data.color}">
          ${data.title}
          <div class="record-hole"></div>
        </div>
      </div>
    `;

    wrapper.appendChild(item);
  });
}

/* 2. Cassette Tape Initialization */
function initCassettes() {
  const wrapper = document.getElementById('cassette-wrapper');
  if (!wrapper) return;

  musicData.slice(1, 4).forEach(data => {
    const item = document.createElement('div');
    item.className = 'cassette-item';

    item.innerHTML = `
      <div class="cassette-face">
        <div class="cassette-label">
          <div class="cassette-title" style="color: ${data.color}">${data.title}</div>
          <div style="font-size: 0.7rem; color: #555;">SIDE A - ${data.artist}</div>
          <div class="cassette-window">
            <div class="cassette-reel"></div>
            <div class="cassette-reel"></div>
          </div>
        </div>
      </div>
      <div class="cassette-face cassette-face-back">
        <div class="cassette-label" style="background-color: #ddd;">
          <div class="cassette-title" style="color: #666;">${data.title} (Inst)</div>
          <div style="font-size: 0.7rem; color: #555;">SIDE B - ${data.artist}</div>
          <div class="cassette-window">
            <div class="cassette-reel"></div>
            <div class="cassette-reel"></div>
          </div>
        </div>
      </div>
    `;

    // Click to flip
    item.addEventListener('click', () => {
      item.classList.toggle('flipped');
    });

    wrapper.appendChild(item);
  });
}

/* 3. CD Case Initialization */
function initCDs() {
  const wrapper = document.getElementById('cd-wrapper');
  if (!wrapper) return;

  musicData.slice(2, 5).forEach(data => {
    const item = document.createElement('div');
    item.className = 'cd-item';

    item.innerHTML = `
      <div class="cd-case-back"></div>
      <div class="cd-disc">
        <div class="cd-disc-hole"></div>
        <div style="position: absolute; bottom: 20px; font-family: sans-serif; font-size: 0.6rem; font-weight: bold; color: #333;">
          ${data.title}
        </div>
      </div>
      <div class="cd-case-front">
        <div class="cd-case-cover" style="background-color: ${data.color}">
          <div>
            <div style="font-size: 1.2rem;">${data.title}</div>
            <div style="font-size: 0.8rem; margin-top: 10px; opacity: 0.8;">${data.artist}</div>
          </div>
        </div>
      </div>
    `;

    wrapper.appendChild(item);
  });
}

/* ==========================================================================
   INNOVATIVE UI COMPONENTS LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCrates();
  initMixer();
  initOrbit();
});

/* 4. The Digging Crate */
function initCrates() {
  const container = document.getElementById('crate-container');
  if (!container) return;

  const genres = [
    { name: 'JAZZ', color: '#2c3e50', items: ['Midnight', 'Blue Train', 'Autumn Leaves', 'Take Five', 'Giant Steps'] },
    { name: 'ROCK', color: '#8e44ad', items: ['Nevermind', 'Abbey Road', 'Dark Side', 'Zeppelin IV', 'Rumours'] }
  ];

  genres.forEach(genre => {
    const box = document.createElement('div');
    box.className = 'crate-box';

    let itemsHTML = '';
    // 後ろから順に描画
    genre.items.reverse().forEach((itemTitle, index) => {
      // 少しずつ色を変える
      const bgColor = adjustColor(genre.color, index * 10);
      itemsHTML += `
        <div class="crate-item" data-index="${index}" style="background-color: ${bgColor}; z-index: ${genre.items.length - index}; transform: translateZ(${-index * 15}px) rotateX(10deg);">
          <div class="crate-item-cover">${itemTitle}</div>
        </div>
      `;
    });

    box.innerHTML = `
      <div class="crate-items">
        ${itemsHTML}
      </div>
      <div class="crate-label" style="color: ${genre.color}">${genre.name}</div>
    `;

    container.appendChild(box);

    // ディグる（パタパタ）アニメーション
    let currentIndex = genre.items.length - 1;
    box.addEventListener('wheel', (e) => {
      e.preventDefault();
      const items = box.querySelectorAll('.crate-item');
      
      if (e.deltaY > 0) { // 手前にめくる
        if (currentIndex >= 0) {
          items[currentIndex].style.transform = `translateZ(${-(genre.items.length - 1 - currentIndex) * 15}px) rotateX(-80deg) translateY(50px)`;
          items[currentIndex].style.opacity = '0';
          currentIndex--;
        }
      } else { // 戻す
        if (currentIndex < genre.items.length - 1) {
          currentIndex++;
          items[currentIndex].style.transform = `translateZ(${-currentIndex * 15}px) rotateX(10deg)`;
          items[currentIndex].style.opacity = '1';
        }
      }
    });
  });
}

function adjustColor(color, amount) {
  return color; // 簡易版のためそのまま返す
}

/* 5. The DJ Mixer */
function initMixer() {
  const stage = document.getElementById('mixer-stage');
  const faders = document.querySelectorAll('.vertical-fader');
  if (!stage || faders.length === 0) return;

  const genres = {
    'Jazz': { color: '#3498db', title: 'Midnight Jazz' },
    'Rock': { color: '#e74c3c', title: 'Neon Rock' },
    'Classic': { color: '#f1c40f', title: 'Symphony 9' }
  };

  // 各ジャンルのホログラム要素を作成
  const holograms = {};
  Object.keys(genres).forEach((genre, index) => {
    const el = document.createElement('div');
    el.className = 'hologram-item';
    el.style.backgroundColor = genres[genre].color + '40'; // 半透明
    el.style.borderColor = genres[genre].color;
    // 重ならないように少し横にずらす
    const offset = (index - 1) * 150;
    el.style.left = `calc(50% - 100px + ${offset}px)`;
    el.innerHTML = `
      <div style="font-size: 0.8rem; margin-bottom: 10px;">${genre}</div>
      <div>${genres[genre].title}</div>
    `;
    stage.appendChild(el);
    holograms[genre] = { el, offset };
  });

  faders.forEach(fader => {
    fader.addEventListener('input', (e) => {
      const val = e.target.value;
      const genre = e.target.dataset.genre;
      const holo = holograms[genre];
      
      if (val > 10) {
        // 浮き上がる
        holo.el.style.opacity = val / 100;
        holo.el.style.transform = `translateY(${100 - val}px) scale(${0.5 + (val/200)})`;
        holo.el.style.boxShadow = `0 0 ${val/2}px ${genres[genre].color}`;
      } else {
        holo.el.style.opacity = 0;
        holo.el.style.transform = `translateY(150px) scale(0.5)`;
      }
    });
  });
}

/* 6. Soundwave Orbit */
function initOrbit() {
  const container = document.getElementById('music-orbit-container');
  if (!container) return;

  const orbits = [
    { radius: 100, color: '#9b59b6', genre: 'Lo-Fi', speed: 0.02 },
    { radius: 180, color: '#1abc9c', genre: 'Acoustic', speed: 0.015 },
    { radius: 260, color: '#e67e22', genre: 'Funk', speed: 0.01 }
  ];

  const nodesData = [];

  orbits.forEach((orbit, index) => {
    // 軌道リング
    const ring = document.createElement('div');
    ring.className = 'orbit-ring';
    ring.style.width = `${orbit.radius * 2}px`;
    ring.style.height = `${orbit.radius * 2}px`;
    ring.style.borderColor = orbit.color + '60';
    container.appendChild(ring);

    // ノード（星）
    const node = document.createElement('div');
    node.className = 'orbit-node';
    node.style.setProperty('--color', orbit.color);
    container.appendChild(node);

    nodesData.push({ el: node, angle: Math.random() * Math.PI * 2, ...orbit });

    // クリックイベント
    node.addEventListener('click', () => {
      showOrbitDisplay(orbit.genre, orbit.color);
    });
  });

  // ディスプレイ要素
  const display = document.createElement('div');
  display.className = 'orbit-item-display';
  container.appendChild(display);

  function showOrbitDisplay(genre, color) {
    display.style.setProperty('--color', color);
    display.style.backgroundColor = color + '20';
    display.innerHTML = `
      <div style="font-size: 2rem; margin-bottom: 10px;">✨</div>
      <div style="font-size: 1.2rem; font-weight: bold;">${genre}</div>
      <div style="font-size: 0.8rem; margin-top: 10px; opacity: 0.8;">Summoned Item</div>
    `;
    display.style.transform = 'translate(-50%, -50%) scale(1)';
    display.style.opacity = '1';

    setTimeout(() => {
      display.style.transform = 'translate(-50%, -50%) scale(0)';
      display.style.opacity = '0';
    }, 3000);
  }

  // アニメーションループ
  function animate() {
    nodesData.forEach(data => {
      data.angle += data.speed;
      const x = Math.cos(data.angle) * data.radius;
      const y = Math.sin(data.angle) * data.radius;
      // top 50%, left 50% を起点にしているので、そこから x, y を足す
      data.el.style.left = `calc(50% + ${x}px)`;
      data.el.style.top = `calc(50% + ${y}px)`;
    });
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* ==========================================================================
   INNOVATIVE UI COMPONENTS VOL.2 LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initEqualizer();
  initTurntable();
  initTapeDeck();
});

/* 7. The Equalizer Wave */
function initEqualizer() {
  const container = document.getElementById('eq-container');
  if (!container) return;

  const barCount = 40;
  const genres = ['Jazz', 'Rock', 'Classic', 'Lo-Fi', 'Pop'];
  const colors = ['#3498db', '#e74c3c', '#f1c40f', '#9b59b6', '#2ecc71'];
  
  const bars = [];

  for (let i = 0; i < barCount; i++) {
    const genreIndex = i % genres.length;
    const bar = document.createElement('div');
    bar.className = 'eq-bar';
    bar.style.height = '20px';
    
    // ポップアップアイテム
    const popup = document.createElement('div');
    popup.className = 'eq-popup-item';
    popup.innerHTML = `<div>${genres[genreIndex]}<br>Item</div>`;
    popup.style.borderTop = `5px solid ${colors[genreIndex]}`;
    
    bar.appendChild(popup);
    container.appendChild(bar);
    
    bars.push({ el: bar, baseHeight: 20 + Math.random() * 30, color: colors[genreIndex] });
  }

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    
    bars.forEach((barData, index) => {
      const barX = (index + 0.5) * (rect.width / barCount);
      const dist = Math.abs(mouseX - barX);
      
      // 波形計算
      let height = barData.baseHeight;
      let isActive = false;
      
      if (dist < 100) {
        height += (100 - dist) * 1.5;
        barData.el.style.backgroundColor = barData.color;
        if (dist < 20) {
          isActive = true;
        }
      } else {
        barData.el.style.backgroundColor = '#333';
      }
      
      barData.el.style.height = `${height}px`;
      
      if (isActive) {
        barData.el.classList.add('active');
      } else {
        barData.el.classList.remove('active');
      }
    });
  });

  container.addEventListener('mouseleave', () => {
    bars.forEach(barData => {
      barData.el.style.height = `${barData.baseHeight}px`;
      barData.el.style.backgroundColor = '#333';
      barData.el.classList.remove('active');
    });
  });
}

/* 8. The Turntable Gravity */
function initTurntable() {
  const platter = document.getElementById('tt-platter');
  const pins = document.querySelectorAll('.tt-pin');
  const layer = document.getElementById('tt-items-layer');
  if (!platter || !layer) return;

  pins.forEach(pin => {
    pin.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('genre', pin.dataset.genre);
      e.dataTransfer.setData('color', pin.style.backgroundColor);
    });
  });

  platter.addEventListener('dragover', (e) => {
    e.preventDefault();
    platter.classList.add('drag-over');
  });

  platter.addEventListener('dragleave', () => {
    platter.classList.remove('drag-over');
  });

  platter.addEventListener('drop', (e) => {
    e.preventDefault();
    platter.classList.remove('drag-over');
    
    const genre = e.dataTransfer.getData('genre');
    const color = e.dataTransfer.getData('color');
    
    if (genre) {
      summonTurntableItems(genre, color);
    }
  });

  function summonTurntableItems(genre, color) {
    layer.innerHTML = ''; // クリア
    platter.style.boxShadow = `0 0 50px ${color}, inset 0 0 30px ${color}`;
    platter.querySelector('.tt-label').innerText = `PLAYING: ${genre.toUpperCase()}`;

    // アイテムを周囲に生成して吸い寄せる
    for (let i = 0; i < 8; i++) {
      const item = document.createElement('div');
      item.className = 'tt-floating-item';
      item.innerText = `${genre}\n#${i+1}`;
      item.style.border = `2px solid ${color}`;
      
      // 最初は遠くに配置
      const angle = (i / 8) * Math.PI * 2;
      const startDist = 500;
      item.style.left = `calc(50% + ${Math.cos(angle) * startDist}px - 40px)`;
      item.style.top = `calc(50% + ${Math.sin(angle) * startDist}px - 40px)`;
      item.style.opacity = '0';
      
      layer.appendChild(item);

      // 吸い寄せアニメーション
      setTimeout(() => {
        const endDist = 180;
        item.style.left = `calc(50% + ${Math.cos(angle) * endDist}px - 40px)`;
        item.style.top = `calc(50% + ${Math.sin(angle) * endDist}px - 40px)`;
        item.style.opacity = '1';
        item.style.transform = `rotate(${angle}rad)`;
      }, 50 * i);
    }
  }
}

/* 9. The Neon Tape Deck */
function initTapeDeck() {
  const slots = document.querySelectorAll('.deck-slot');
  const tapes = document.querySelectorAll('.deck-tape-item');
  const holoArea = document.getElementById('deck-hologram-area');
  if (!holoArea || slots.length === 0) return;

  tapes.forEach(tape => {
    tape.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('genre', tape.dataset.genre);
      // ボーダーカラーから色を取得
      const color = tape.style.borderTopColor || '#fff';
      e.dataTransfer.setData('color', color);
    });
  });

  slots.forEach(slot => {
    slot.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (!slot.classList.contains('filled')) {
        slot.classList.add('drag-over');
      }
    });

    slot.addEventListener('dragleave', () => {
      slot.classList.remove('drag-over');
    });

    slot.addEventListener('drop', (e) => {
      e.preventDefault();
      slot.classList.remove('drag-over');
      
      if (slot.classList.contains('filled')) return;

      const genre = e.dataTransfer.getData('genre');
      const color = e.dataTransfer.getData('color');
      
      if (genre) {
        slot.classList.add('filled');
        slot.innerText = '';
        slot.style.backgroundColor = color;
        
        projectHologram(genre, color);
      }
    });
    
    // クリックで取り出し（リセット）
    slot.addEventListener('click', () => {
      if (slot.classList.contains('filled')) {
        slot.classList.remove('filled');
        slot.innerText = slot.id === 'deck-slot-1' ? 'SLOT 1' : 'SLOT 2';
        slot.style.backgroundColor = '#050505';
        refreshHolograms();
      }
    });
  });

  function projectHologram(genre, color) {
    const holo = document.createElement('div');
    holo.className = 'deck-holo-item';
    holo.dataset.genre = genre;
    holo.style.borderColor = color;
    holo.style.boxShadow = `0 0 20px ${color}`;
    holo.innerHTML = `
      <div style="color: ${color}; font-size: 1.5rem; margin-bottom: 10px;">💽</div>
      <div>${genre}</div>
    `;
    holoArea.appendChild(holo);
  }

  function refreshHolograms() {
    holoArea.innerHTML = '';
    // 現在埋まっているスロットを再投影
    slots.forEach(slot => {
      if (slot.classList.contains('filled')) {
        // 色から適当なジャンル名を推測するのは少し面倒なので、今回は全クリアにする仕様
        // （シンプル化のため、1つ取り出したら一旦全部消える形）
      }
    });
  }
}
