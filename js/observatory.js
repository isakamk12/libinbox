/* ==========================================================================
   OBSERVATORY THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initConstellation();
});

function initConstellation() {
  const container = document.getElementById('sky-container');
  const layer = document.getElementById('stars-layer');
  const canvas = document.getElementById('constellation-canvas');
  if (!container || !layer || !canvas) return;

  const ctx = canvas.getContext('2d');
  
  // UI Panels
  const infoPanel = document.getElementById('star-info-panel');
  const infoTitle = document.getElementById('info-title');
  const infoDesc = document.getElementById('info-desc');
  const closeBtn = document.getElementById('close-info');

  // 星座データ
  const starsData = [
    { id: 0, title: "Alpha Centauri", desc: "The closest star system to the Solar System.", x: 20, y: 30 },
    { id: 1, title: "Sirius", desc: "The brightest star in the night sky.", x: 40, y: 60 },
    { id: 2, title: "Betelgeuse", desc: "A red supergiant of spectral type M1-2.", x: 70, y: 20 },
    { id: 3, title: "Rigel", desc: "A blue supergiant star in the constellation of Orion.", x: 80, y: 80 },
    { id: 4, title: "Vega", desc: "The brightest star in the northern constellation of Lyra.", x: 50, y: 40 },
    { id: 5, title: "Polaris", desc: "The North Star or Pole Star.", x: 10, y: 80 },
    { id: 6, title: "Arcturus", desc: "A red giant star in the Northern Hemisphere.", x: 90, y: 40 }
  ];

  // 星同士の接続ルール（星座の線）
  const connections = [
    [0, 1], [1, 4], [4, 2], [2, 3], [4, 6], [1, 5]
  ];

  const nodes = [];
  
  // ドラッグ（パン）用の変数
  let isDragging = false;
  let startX = 0, startY = 0;
  let currentPanX = 0, currentPanY = 0; // 全体の移動量
  let tempPanX = 0, tempPanY = 0; // ドラッグ中の移動量

  // リサイズハンドラ
  function resize() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    drawLines();
  }
  window.addEventListener('resize', resize);

  // 初期配置
  starsData.forEach(data => {
    const el = document.createElement('div');
    el.className = 'star-node';
    el.innerHTML = `
      <div class="star-core"></div>
      <div class="star-label">${data.title}</div>
    `;
    
    // x, y は % 指定
    const absX = (data.x / 100) * container.clientWidth;
    const absY = (data.y / 100) * container.clientHeight;
    
    el.style.left = `${absX}px`;
    el.style.top = `${absY}px`;
    
    layer.appendChild(el);

    // 星のクリックイベント
    el.addEventListener('click', (e) => {
      // ドラッグ直後のクリックは無視する
      if (Math.abs(tempPanX) > 5 || Math.abs(tempPanY) > 5) return;
      e.stopPropagation();

      document.querySelectorAll('.star-node').forEach(n => n.classList.remove('active'));
      el.classList.add('active');

      infoTitle.textContent = data.title;
      infoDesc.textContent = data.desc;
      infoPanel.classList.add('active');
    });

    nodes.push({ id: data.id, el: el, baseX: absX, baseY: absY });
  });

  closeBtn.addEventListener('click', () => {
    infoPanel.classList.remove('active');
    document.querySelectorAll('.star-node').forEach(n => n.classList.remove('active'));
  });

  container.addEventListener('click', () => {
    // 宇宙空間をクリックでパネルを閉じる
    if (Math.abs(tempPanX) < 5 && Math.abs(tempPanY) < 5) {
      infoPanel.classList.remove('active');
      document.querySelectorAll('.star-node').forEach(n => n.classList.remove('active'));
    }
  });

  resize();

  // パン（ドラッグ）操作
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    tempPanX = 0;
    tempPanY = 0;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    tempPanX = e.clientX - startX;
    tempPanY = e.clientY - startY;
    
    updatePositions();
  });

  window.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      currentPanX += tempPanX;
      currentPanY += tempPanY;
      tempPanX = 0;
      tempPanY = 0;
    }
  });

  // タッチ操作
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    tempPanX = 0;
    tempPanY = 0;
  }, {passive: false});

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    tempPanX = e.touches[0].clientX - startX;
    tempPanY = e.touches[0].clientY - startY;
    updatePositions();
  }, {passive: false});

  window.addEventListener('touchend', () => {
    if (isDragging) {
      isDragging = false;
      currentPanX += tempPanX;
      currentPanY += tempPanY;
      tempPanX = 0;
      tempPanY = 0;
    }
  });

  // 要素と線の位置を更新
  function updatePositions() {
    const totalX = currentPanX + tempPanX;
    const totalY = currentPanY + tempPanY;
    
    // 背景（星屑）のパララックス
    document.querySelector('.stardust').style.transform = `translate(${totalX * 0.2}px, ${totalY * 0.2}px)`;

    // 星の位置
    nodes.forEach(node => {
      node.el.style.transform = `translate(calc(-50% + ${totalX}px), calc(-50% + ${totalY}px))`;
    });

    drawLines(totalX, totalY);
  }

  // 線の描画
  function drawLines(panX = currentPanX, panY = currentPanY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'rgba(162, 155, 254, 0.4)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);

    connections.forEach(conn => {
      const n1 = nodes.find(n => n.id === conn[0]);
      const n2 = nodes.find(n => n.id === conn[1]);
      
      if (n1 && n2) {
        ctx.beginPath();
        ctx.moveTo(n1.baseX + panX, n1.baseY + panY);
        ctx.lineTo(n2.baseX + panX, n2.baseY + panY);
        ctx.stroke();
      }
    });
  }

}
