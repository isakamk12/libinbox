/* ==========================================================================
   ELEMENTARY SCHOOL THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initBlackboard();
});

function initBlackboard() {
  const drawArea = document.getElementById('drawing-area');
  const timetable = document.getElementById('timetable');
  const eraser = document.getElementById('eraser');
  const chalks = document.querySelectorAll('.chalk');
  
  if (!drawArea || !timetable) return;

  let currentColor = "#fff";

  // チョークの選択
  chalks.forEach(chalk => {
    chalk.addEventListener('click', () => {
      chalks.forEach(c => c.classList.remove('active'));
      chalk.classList.add('active');
      currentColor = chalk.dataset.color;
    });
  });

  // 黒板消し（全消去）
  eraser.addEventListener('click', () => {
    drawArea.innerHTML = '';
  });

  // 時間割（情報アイテム）データ
  const subjects = [
    { name: "こくご", icon: "📖", desc: "ことばのまほう", color: "#ff6b6b" },
    { name: "さんすう", icon: "📐", desc: "かずのふしぎ", color: "#48dbfb" },
    { name: "りか", icon: "🔬", desc: "しぜんのひみつ", color: "#1dd1a1" },
    { name: "しゃかい", icon: "🗺️", desc: "まちのたんけん", color: "#feca57" },
    { name: "ずこう", icon: "🎨", desc: "えのぐであそぼう", color: "#ff9ff3" },
    { name: "たいいく", icon: "⚽", desc: "げんきに走ろう", color: "#ff9f43" }
  ];

  // 時間割カードの生成
  subjects.forEach(sub => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = `
      <div class="subject-icon">${sub.icon}</div>
      <div class="subject-name">${sub.name}</div>
    `;

    // クリックで黒板に情報をチョークで描く
    card.addEventListener('click', () => {
      drawOnBoard(sub);
    });

    timetable.appendChild(card);
  });

  function drawOnBoard(sub) {
    const item = document.createElement('div');
    item.className = 'board-item';
    item.style.color = currentColor;
    
    // ランダムな位置に配置（端すぎないように）
    const x = 10 + Math.random() * 80; // 10% ~ 90%
    const y = 20 + Math.random() * 60; // 20% ~ 80%
    
    item.style.left = `${x}%`;
    item.style.top = `${y}%`;
    
    // 少し傾ける
    const rotation = (Math.random() - 0.5) * 30; // -15deg ~ +15deg
    item.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
    
    item.innerHTML = `
      <div style="font-size: 3rem;">${sub.icon}</div>
      <div>${sub.name}</div>
      <div style="font-size: 1rem; opacity: 0.8;">${sub.desc}</div>
    `;

    // クリックで消せるようにする（黒板消し機能の代わり）
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      item.style.opacity = '0';
      item.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
      setTimeout(() => item.remove(), 200);
    });

    drawArea.appendChild(item);

    // 少しアニメーション効果
    item.animate([
      { opacity: 0, transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(0.5)` },
      { opacity: 1, transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(1)` }
    ], {
      duration: 300,
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
    });
  }

}
