/* ==========================================================================
   AQUARIUM THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initAquarium();
  initBubbles();
});

/* 1. The Living Aquarium (Boids-like interaction) */
function initAquarium() {
  const container = document.getElementById('tank-container');
  const layer = document.getElementById('fish-layer');
  if (!container || !layer) return;

  const data = [
    { title: "Deep Sea Exploration", category: "Nature" },
    { title: "Coral Reefs", category: "Ecology" },
    { title: "Marine Biology", category: "Science" },
    { title: "Ocean Currents", category: "Geography" },
    { title: "Whale Songs", category: "Audio" },
    { title: "Jellyfish Secrets", category: "Biology" },
    { title: "Abyssal Zone", category: "Nature" },
    { title: "Aquatic Life", category: "Ecology" }
  ];

  const fishes = [];
  const speed = 1.5;

  // 魚オブジェクトの生成
  data.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'fish-item';
    el.innerHTML = `<span>${item.title}<br><small style="color: #64b5f6;">${item.category}</small></span>`;
    layer.appendChild(el);

    fishes.push({
      el: el,
      x: Math.random() * (container.clientWidth - 120),
      y: Math.random() * (container.clientHeight - 120),
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
      size: 120
    });
  });

  // マウス座標のトラッキング
  let mouseX = -1000;
  let mouseY = -1000;

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  container.addEventListener('mouseleave', () => {
    mouseX = -1000;
    mouseY = -1000;
  });

  // アニメーションループ
  function animate() {
    const width = container.clientWidth;
    const height = container.clientHeight;

    fishes.forEach(fish => {
      // マウスからの反発（逃げる動き）
      const dx = fish.x + fish.size/2 - mouseX;
      const dy = fish.y + fish.size/2 - mouseY;
      const dist = Math.sqrt(dx*dx + dy*dy);

      if (dist < 200) {
        // マウスに近づきすぎたら逆方向へ加速
        fish.vx += (dx / dist) * 0.2;
        fish.vy += (dy / dist) * 0.2;
      } else {
        // 通常はランダムに泳ぐ（少し揺らぎを入れる）
        fish.vx += (Math.random() - 0.5) * 0.05;
        fish.vy += (Math.random() - 0.5) * 0.05;
      }

      // 速度制限
      const v = Math.sqrt(fish.vx*fish.vx + fish.vy*fish.vy);
      if (v > speed * 2) {
        fish.vx = (fish.vx / v) * speed * 2;
        fish.vy = (fish.vy / v) * speed * 2;
      }

      // 座標更新
      fish.x += fish.vx;
      fish.y += fish.vy;

      // 壁でのバウンド
      if (fish.x <= 0) { fish.x = 0; fish.vx *= -1; }
      if (fish.x >= width - fish.size) { fish.x = width - fish.size; fish.vx *= -1; }
      if (fish.y <= 0) { fish.y = 0; fish.vy *= -1; }
      if (fish.y >= height - fish.size) { fish.y = height - fish.size; fish.vy *= -1; }

      // 要素へ反映
      fish.el.style.transform = `translate(${fish.x}px, ${fish.y}px)`;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* 背景の泡エフェクト生成 */
function initBubbles() {
  const layer = document.getElementById('bubbles-layer');
  if (!layer) return;

  setInterval(() => {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 20 + 5; // 5px ~ 25px
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.left = `${Math.random() * 100}%`;
    bubble.style.animationDuration = `${Math.random() * 4 + 3}s`; // 3s ~ 7s

    layer.appendChild(bubble);

    // アニメーション終了後に削除
    setTimeout(() => {
      bubble.remove();
    }, 7000);
  }, 300);
}
