document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('botanical-container');
  if (!container) return;
  
  container.innerHTML = `
    <div style="position: absolute; width: 100%; height: 100%; overflow: hidden;" id="leaves-layer"></div>
    <div style="position: relative; z-index: 10; padding: 5rem; text-align: center; background: rgba(255,255,255,0.7); border-radius: 20px; backdrop-filter: blur(10px); margin: 4rem;">
      <h3 style="font-size: 2rem; color: #2e7d32; font-family: 'Cormorant Garamond', serif;">The Whispering Leaves</h3>
      <p style="color: #1b5e20;">マウスを動かすと風が吹き、葉が舞い上がります。</p>
    </div>
  `;

  const leavesLayer = document.getElementById('leaves-layer');
  const leaves = [];
  
  for(let i=0; i<30; i++) {
    const leaf = document.createElement('div');
    leaf.className = 'falling-leaf';
    leaf.style.left = Math.random() * 100 + '%';
    leaf.style.top = Math.random() * 100 + '%';
    leaf.style.animationDelay = Math.random() * 5 + 's';
    leaf.style.animationDuration = (Math.random() * 5 + 5) + 's';
    leavesLayer.appendChild(leaf);
    leaves.push(leaf);
  }

  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    leaves.forEach(leaf => {
      const leafRect = leaf.getBoundingClientRect();
      const leafX = leafRect.left - rect.left + leafRect.width/2;
      const leafY = leafRect.top - rect.top + leafRect.height/2;
      
      const dist = Math.hypot(mouseX - leafX, mouseY - leafY);
      if(dist < 150) {
        const angle = Math.atan2(leafY - mouseY, leafX - mouseX);
        const push = 150 - dist;
        leaf.style.transform = `translate(${Math.cos(angle)*push}px, ${Math.sin(angle)*push}px) rotate(${Math.random()*360}deg)`;
        leaf.style.transition = 'transform 0.5s ease-out';
      } else {
        leaf.style.transform = '';
        leaf.style.transition = 'transform 2s ease-in-out';
      }
    });
  });
});
