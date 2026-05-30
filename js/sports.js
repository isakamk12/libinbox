/* ==========================================================================
   SPORTS THEME LOGIC (2D Physics Engine)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPhysicsArena();
});

function initPhysicsArena() {
  const arena = document.getElementById('physics-arena');
  const panel = document.getElementById('gear-info-panel');
  const closeBtn = document.getElementById('close-gear');
  
  if (!arena || !panel) return;

  const items = [
    { type: "gear-basketball", title: "SPEED", stat: "Agility +10", desc: "圧倒的なスピードを生み出すための軽量設計。フロントエンドのレンダリング速度を極限まで高めます。", mass: 1, bounce: 0.8 },
    { type: "gear-soccer", title: "TEAMWORK", stat: "Collaboration +20", desc: "チームでのパス回しを最適化する。Gitのコンフリクトを減らし、シームレスな統合を実現します。", mass: 1, bounce: 0.7 },
    { type: "gear-tennis", title: "PRECISION", stat: "Accuracy +15", desc: "正確なコントロールを可能にする。ピクセルパーフェクトなデザインの実装に欠かせないツール。", mass: 0.5, bounce: 0.9 },
    { type: "gear-bowling", title: "POWER", stat: "Strength +30", desc: "一撃で全てをなぎ倒す破壊力。重いバックエンドのバッチ処理を一瞬で終わらせるパワー。", mass: 3, bounce: 0.3 },
    { type: "gear-basketball", title: "STAMINA", stat: "Endurance +25", desc: "長時間稼働しても疲れない。サーバーのアップタイムを99.99%に保つ安定性。", mass: 1.2, bounce: 0.75 }
  ];

  const gears = [];
  const gravity = 0.5;
  const friction = 0.98;

  // アイテムの生成
  items.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = `gear-item ${item.type}`;
    el.innerHTML = item.title;
    
    arena.appendChild(el);

    const gear = {
      el: el,
      data: item,
      x: Math.random() * (arena.clientWidth - 100),
      y: Math.random() * 200,
      vx: (Math.random() - 0.5) * 10,
      vy: 0,
      mass: item.mass,
      bounce: item.bounce,
      size: 100,
      isDragging: false
    };

    gears.push(gear);

    // イベントリスナー
    let startX, startY, startMouseX, startMouseY;
    let lastMouseX, lastMouseY;

    el.addEventListener('mousedown', startDrag);
    el.addEventListener('touchstart', (e) => {
      startDrag(e.touches[0]);
    }, {passive: false});

    function startDrag(e) {
      // ダブルクリック判定（簡易）
      const now = new Date().getTime();
      if (gear.lastClick && now - gear.lastClick < 300) {
        openPanel(item);
      }
      gear.lastClick = now;

      gear.isDragging = true;
      gear.vx = 0;
      gear.vy = 0;
      startMouseX = e.clientX;
      startMouseY = e.clientY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      startX = gear.x;
      startY = gear.y;

      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', endDrag);
      document.addEventListener('touchmove', onTouchMove, {passive: false});
      document.addEventListener('touchend', endDrag);
    }

    function onTouchMove(e) {
      e.preventDefault();
      onDrag(e.touches[0]);
    }

    function onDrag(e) {
      if (!gear.isDragging) return;
      gear.x = startX + (e.clientX - startMouseX);
      gear.y = startY + (e.clientY - startMouseY);
      
      // 速度を計算（投げるため）
      gear.vx = e.clientX - lastMouseX;
      gear.vy = e.clientY - lastMouseY;
      
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    }

    function endDrag() {
      gear.isDragging = false;
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', endDrag);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', endDrag);
    }
  });

  // アニメーション・物理演算ループ
  function animate() {
    const width = arena.clientWidth;
    const height = arena.clientHeight;

    gears.forEach(gear => {
      if (!gear.isDragging) {
        // 重力
        gear.vy += gravity * gear.mass;
        
        // 摩擦（空気抵抗）
        gear.vx *= friction;
        gear.vy *= friction;

        gear.x += gear.vx;
        gear.y += gear.vy;

        // 壁の衝突判定
        if (gear.x <= 0) {
          gear.x = 0;
          gear.vx *= -gear.bounce;
        } else if (gear.x >= width - gear.size) {
          gear.x = width - gear.size;
          gear.vx *= -gear.bounce;
        }

        // 床・天井の衝突判定
        if (gear.y >= height - gear.size) {
          gear.y = height - gear.size;
          gear.vy *= -gear.bounce;
          // 床での摩擦を少し強くする
          gear.vx *= 0.9;
        } else if (gear.y <= 0) {
          gear.y = 0;
          gear.vy *= -gear.bounce;
        }
      }

      // 要素へ反映
      gear.el.style.transform = `translate(${gear.x}px, ${gear.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();

  // 情報パネルの処理
  function openPanel(data) {
    document.getElementById('gear-title').textContent = data.title;
    document.getElementById('gear-stat').textContent = data.stat;
    document.getElementById('gear-desc').textContent = data.desc;
    panel.classList.add('active');
  }

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
  });
}
