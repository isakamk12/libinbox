/* ==========================================================================
   ARCADE THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCraneCatcher();
});

function initCraneCatcher() {
  const armContainer = document.getElementById('crane-arm-container');
  const pit = document.getElementById('capsule-pit');
  const btnLeft = document.getElementById('btn-left');
  const btnRight = document.getElementById('btn-right');
  const btnCatch = document.getElementById('btn-catch');
  
  const resultOverlay = document.getElementById('result-overlay');
  const resultTitle = document.getElementById('result-title');
  const resultDesc = document.getElementById('result-desc');
  const resultClose = document.getElementById('result-close');

  if (!armContainer || !pit) return;

  const SCREEN_WIDTH = document.getElementById('crane-screen').clientWidth;
  const SCREEN_HEIGHT = 400;
  
  let craneX = 50; // %
  let craneY = 50; // px (アームの長さ)
  let isMoving = false;
  let moveInterval = null;

  // カプセルデータの生成
  const items = [
    { text: "CSS", color: "#e74c3c", desc: "Cascading Style Sheets 完全に理解した！" },
    { text: "JS", color: "#f1c40f", desc: "JavaScriptの非同期処理マスター。" },
    { text: "HTML", color: "#3498db", desc: "Semantic HTMLの真髄を手に入れた。" },
    { text: "REACT", color: "#9b59b6", desc: "Hooksの魔法を習得した。" },
    { text: "VUE", color: "#2ecc71", desc: "リアクティブシステムの極意。" },
    { text: "NODE", color: "#1abc9c", desc: "サーバーサイドの力を解放。" }
  ];

  const capsules = [];

  // 初期配置（ランダムに底に敷き詰める）
  function initCapsules() {
    pit.innerHTML = '';
    capsules.length = 0;

    for (let i = 0; i < 15; i++) {
      const data = items[i % items.length];
      const cap = document.createElement('div');
      cap.className = 'capsule';
      cap.style.backgroundColor = data.color;
      cap.textContent = data.text;
      
      // X座標(%)とY座標(px:下からの距離)をランダムに
      const xPos = 5 + Math.random() * 80;
      const bottomPos = Math.random() * 60;
      
      cap.style.left = `${xPos}%`;
      cap.style.bottom = `${bottomPos}px`;
      
      pit.appendChild(cap);
      
      capsules.push({
        el: cap,
        data: data,
        xPos: xPos,
        bottomPos: bottomPos,
        caught: false
      });
    }
  }

  initCapsules();

  // クレーン横移動
  function startMove(dir) {
    if (isMoving) return;
    moveInterval = setInterval(() => {
      craneX += dir * 1; // 速度
      if (craneX < 5) craneX = 5;
      if (craneX > 95) craneX = 95;
      armContainer.style.left = `${craneX}%`;
    }, 20);
  }

  function stopMove() {
    clearInterval(moveInterval);
  }

  // ボタンイベント（横移動）
  btnLeft.addEventListener('mousedown', () => { btnLeft.classList.add('active'); startMove(-1); });
  btnLeft.addEventListener('mouseup', () => { btnLeft.classList.remove('active'); stopMove(); });
  btnLeft.addEventListener('mouseleave', () => { btnLeft.classList.remove('active'); stopMove(); });
  
  btnRight.addEventListener('mousedown', () => { btnRight.classList.add('active'); startMove(1); });
  btnRight.addEventListener('mouseup', () => { btnRight.classList.remove('active'); stopMove(); });
  btnRight.addEventListener('mouseleave', () => { btnRight.classList.remove('active'); stopMove(); });

  // スマホ対応
  btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); btnLeft.classList.add('active'); startMove(-1); });
  btnLeft.addEventListener('touchend', (e) => { e.preventDefault(); btnLeft.classList.remove('active'); stopMove(); });
  btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); btnRight.classList.add('active'); startMove(1); });
  btnRight.addEventListener('touchend', (e) => { e.preventDefault(); btnRight.classList.remove('active'); stopMove(); });

  // キーボード操作
  document.addEventListener('keydown', (e) => {
    if (isMoving) return;
    if (e.key === 'ArrowLeft') { btnLeft.classList.add('active'); startMove(-1); }
    if (e.key === 'ArrowRight') { btnRight.classList.add('active'); startMove(1); }
    if (e.key === 'ArrowDown' || e.key === ' ') { 
      e.preventDefault();
      btnCatch.classList.add('active');
      catchAction(); 
    }
  });
  document.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') { btnLeft.classList.remove('active'); stopMove(); }
    if (e.key === 'ArrowRight') { btnRight.classList.remove('active'); stopMove(); }
    if (e.key === 'ArrowDown' || e.key === ' ') { btnCatch.classList.remove('active'); }
  });

  // キャッチ動作
  btnCatch.addEventListener('click', () => {
    catchAction();
  });

  function catchAction() {
    if (isMoving) return;
    isMoving = true;
    
    // 1. アームを下げる
    const dropHeight = SCREEN_HEIGHT - 80; // カプセル山付近まで
    armContainer.style.height = `${dropHeight}px`;
    armContainer.classList.add('catching');
    
    setTimeout(() => {
      // 2. 当たり判定（一番近くて上に乗っているものを探す）
      let caughtCapsule = null;
      let minDiff = 10; // X座標(%)の許容誤差

      capsules.forEach(cap => {
        if (cap.caught) return;
        const diff = Math.abs(cap.xPos - craneX);
        if (diff < minDiff) {
          minDiff = diff;
          caughtCapsule = cap;
        }
      });

      if (caughtCapsule) {
        caughtCapsule.caught = true;
        caughtCapsule.el.classList.add('caught');
        // クレーンに同期させるためにCSS位置を上書き
        caughtCapsule.el.style.bottom = 'auto';
      }

      // 3. アームを上げる
      armContainer.style.height = `50px`;
      
      // もし掴んでいたら連動して持ち上げる
      if (caughtCapsule) {
        let liftInterval = setInterval(() => {
          // armContainer の高さに合わせてカプセルも上げる（擬似的に）
          const armRect = armContainer.getBoundingClientRect();
          const screenRect = document.getElementById('crane-screen').getBoundingClientRect();
          const relativeY = armRect.bottom - screenRect.top;
          caughtCapsule.el.style.top = `${relativeY - 40}px`;
        }, 20);

        setTimeout(() => {
          clearInterval(liftInterval);
          armContainer.classList.remove('catching');
          showResult(caughtCapsule.data);
          caughtCapsule.el.style.display = 'none'; // 獲得したので消す
        }, 500); // 上がりきるまでの時間
      } else {
        setTimeout(() => {
          armContainer.classList.remove('catching');
          isMoving = false;
        }, 500);
      }
      
    }, 600); // 下がりきるまでの時間
  }

  function showResult(data) {
    resultTitle.textContent = `GET: ${data.text}`;
    resultTitle.style.color = data.color;
    resultDesc.textContent = data.desc;
    resultOverlay.classList.add('active');
  }

  resultClose.addEventListener('click', () => {
    resultOverlay.classList.remove('active');
    isMoving = false;
  });
}
