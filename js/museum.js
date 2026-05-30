/* ==========================================================================
   MUSEUM THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initShowcase();
  initExcavation();
});

/* 1. The Glass Showcase */
function initShowcase() {
  const hall = document.getElementById('showcase-hall');
  if (!hall) return;

  const artifacts = [
    { title: 'AMMONITE', type: 'Fossil' },
    { title: 'ANCIENT VASE', type: 'Relic' },
    { title: 'METEORITE', type: 'Space' }
  ];

  artifacts.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.className = 'showcase-wrapper';

    wrapper.innerHTML = `
      <div class="glass-case">
        <div class="case-face case-front"></div>
        <div class="case-face case-back"></div>
        <div class="case-face case-left"></div>
        <div class="case-face case-right"></div>
        <div class="case-face case-top"></div>
        <div class="case-face case-bottom"></div>
        <div class="case-item">
          <div>${item.title}</div>
          <div style="font-size: 0.8rem; font-family: sans-serif; font-weight: normal; margin-top: 10px; color: #555;">[${item.type}]</div>
        </div>
      </div>
      <div class="showcase-label">${item.title}</div>
    `;

    hall.appendChild(wrapper);

    const glassCase = wrapper.querySelector('.glass-case');

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 視差効果でケース全体を回転（見下ろす・覗き込む）
      // Y座標でX軸回転、X座標でY軸回転
      const rotateX = ((y - centerY) / centerY) * -20; // -20 to 20
      const rotateY = ((x - centerX) / centerX) * 30;  // -30 to 30

      glassCase.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      glassCase.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  });
}

/* 2. The Excavation Layer */
function initExcavation() {
  const canvas = document.getElementById('sand-canvas');
  const resetBtn = document.getElementById('reset-excavation');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let isDrawing = false;
  let isFilled = false;

  // キャンバスのサイズ設定（親要素に合わせる）
  function resizeCanvas() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
    if (!isFilled) {
      fillSand();
    }
  }

  // 砂（レイヤー）で塗りつぶす
  function fillSand() {
    // 砂っぽい色とパターン
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 砂のテクスチャを追加（簡易的なノイズ）
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    for(let i=0; i<5000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillRect(x, y, 2, 2);
    }
    isFilled = true;
  }

  // 初期化
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // マウス/タッチイベントの設定
  function startDrawing(e) {
    isDrawing = true;
    scratch(e);
  }

  function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
  }

  function scratch(e) {
    if (!isDrawing) return;

    // キャンバス上の座標を取得
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
      e.preventDefault(); // スマホのスクロール防止
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // 「削る」ブラシの設定
    // destination-out: 重なった部分を透明にする
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 40; // 削る太さ
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', scratch);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing, { passive: false });
  canvas.addEventListener('touchmove', scratch, { passive: false });
  canvas.addEventListener('touchend', stopDrawing);

  // リセットボタン
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      fillSand();
    });
  }
}
