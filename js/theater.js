document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('theater-container');
  if (!container) return;
  
  container.innerHTML = `
    <div id="theater-stage-wrap" style="position: relative; width: 100%; height: 100%; overflow: hidden; background: #000;">
      <div id="spotlight-layer" style="position: absolute; top:0; left:0; width: 100%; height: 100%; pointer-events: none; mix-blend-mode: multiply; z-index: 5;"></div>
      <div class="actor" style="position: absolute; bottom: 50px; left: 50%; transform: translateX(-50%); width: 100px; height: 150px; background: #e74c3c; border-radius: 50px 50px 0 0; z-index: 2; box-shadow: 0 10px 20px rgba(0,0,0,0.5);"></div>
      <div class="stage-floor" style="position: absolute; bottom: 0; left: 0; width: 100%; height: 60px; background: #3e2723; z-index: 1;"></div>
    </div>
  `;

  const spotlight = document.getElementById('spotlight-layer');
  
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // スポットライトのグラデーションを作成
    spotlight.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, rgba(255,255,255,1) 0%, rgba(20,20,20,1) 100%)`;
  });
  
  // 初期状態
  spotlight.style.background = `radial-gradient(circle 150px at 50% 50%, rgba(255,255,255,1) 0%, rgba(20,20,20,1) 100%)`;
});
