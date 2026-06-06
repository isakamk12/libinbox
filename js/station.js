document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('station-container');
  if (!container) return;
  
  container.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; min-height: 400px; padding: 2rem;">
      <div id="split-flap-board" style="display: flex; gap: 10px; background: #222; padding: 20px; border-radius: 8px; box-shadow: inset 0 0 20px #000, 0 10px 20px rgba(0,0,0,0.5);">
      </div>
      <p style="margin-top: 2rem; color: #7f8c8d; font-family: monospace;">DESTINATION TERMINAL</p>
    </div>
  `;

  const board = document.getElementById('split-flap-board');
  const targetText = "LIBRARY";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  
  // Create flaps
  const flaps = [];
  for (let i = 0; i < targetText.length; i++) {
    const flap = document.createElement('div');
    flap.className = 'split-flap';
    flap.innerText = chars[Math.floor(Math.random() * chars.length)];
    board.appendChild(flap);
    flaps.push(flap);
  }
  
  // Animate flaps
  let frame = 0;
  const interval = setInterval(() => {
    frame++;
    let allDone = true;
    
    flaps.forEach((flap, i) => {
      if (frame < 10 + i * 5) {
        flap.innerText = chars[Math.floor(Math.random() * chars.length)];
        allDone = false;
      } else {
        flap.innerText = targetText[i];
      }
    });
    
    if (allDone) {
      clearInterval(interval);
    }
  }, 50);
});
