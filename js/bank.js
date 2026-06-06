document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('bank-container');
  if (!container) return;
  
  container.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100%; min-height: 400px;">
      <div id="vault-door" style="width: 200px; height: 200px; border-radius: 50%; background: radial-gradient(circle at center, #7f8c8d, #2c3e50); border: 20px solid #bdc3c7; display: flex; justify-content: center; align-items: center; position: relative; cursor: pointer; transition: transform 1s cubic-bezier(0.175, 0.885, 0.32, 1.275); box-shadow: inset 0 0 50px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5);">
        <div style="width: 100px; height: 20px; background: #95a5a6; position: absolute; box-shadow: 0 5px 10px rgba(0,0,0,0.5);"></div>
        <div style="width: 20px; height: 100px; background: #95a5a6; position: absolute; box-shadow: 0 5px 10px rgba(0,0,0,0.5);"></div>
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #e74c3c; z-index: 2; border: 5px solid #c0392b; box-shadow: 0 0 15px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
          <span style="color: white; font-size: 0.8rem; font-weight: bold; transform: rotate(-45deg);">CLICK</span>
        </div>
      </div>
    </div>
  `;

  const vault = document.getElementById('vault-door');
  let open = false;
  
  vault.addEventListener('click', () => {
    open = !open;
    if (open) {
      vault.style.transform = 'perspective(800px) rotateY(-110deg)';
    } else {
      vault.style.transform = 'perspective(800px) rotateY(0deg)';
    }
  });
});
