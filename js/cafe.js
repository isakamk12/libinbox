document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cafe-container');
  if (!container) return;
  
  container.innerHTML = `
    <div style="position: absolute; top:0; left:0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; pointer-events: none;">
      <div id="steam-container" style="position: relative; width: 100px; height: 150px; margin-bottom: -20px;"></div>
      <div style="width: 120px; height: 80px; background: #fff; border-radius: 10px 10px 50px 50px; border: 4px solid #5d4037; position: relative; box-shadow: inset -10px -10px 20px rgba(0,0,0,0.1);">
        <div style="position: absolute; right: -30px; top: 10px; width: 30px; height: 40px; border: 6px solid #fff; border-left: none; border-radius: 0 20px 20px 0; border-top-color: #5d4037; border-right-color: #5d4037; border-bottom-color: #5d4037;"></div>
      </div>
    </div>
  `;

  const steamContainer = document.getElementById('steam-container');
  
  setInterval(() => {
    const steam = document.createElement('div');
    steam.className = 'steam-particle';
    steam.style.left = Math.random() * 60 + 20 + 'px';
    steamContainer.appendChild(steam);
    
    setTimeout(() => {
      steam.remove();
    }, 4000);
  }, 400);
});
