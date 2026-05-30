/* ==========================================================================
   VOCATIONAL SCHOOL THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initWorkbench();
});

function initWorkbench() {
  const desk = document.querySelector('.desk');
  const viewer = document.getElementById('blueprint-viewer');
  const closeBtn = document.getElementById('close-viewer');
  
  if (!desk || !viewer) return;

  const tools = [
    { name: "VS CODE", icon: "💻", type: "tool-code", tag: "PROGRAMMING", title: "EDITOR CONFIGURATION", desc: "フロントエンドからバックエンドまで、すべてのコードを紡ぎ出す魔法のステーション。拡張機能による無限のカスタマイズが可能です。" },
    { name: "FIGMA", icon: "🎨", type: "tool-design", tag: "UI/UX DESIGN", title: "VECTOR PROTOTYPING", desc: "ピクセルパーフェクトなデザインと、シームレスなプロトタイピングを実現。コンポーネントベースの思考を育てます。" },
    { name: "SOLDERING", icon: "🔥", type: "tool-hardware", tag: "HARDWARE", title: "CIRCUIT BOARD", desc: "電子回路のはんだ付け。物理的なスイッチとデジタルのロジックが交差する、IoT開発の原点。" },
    { name: "BRUSH", icon: "🖌️", type: "tool-paint", tag: "ILLUSTRATION", title: "DIGITAL PAINTING", desc: "繊細なタッチをデジタル空間に再現する。キャラクターデザインやコンセプトアートの制作に不可欠なツール。" },
    { name: "CAMERA", icon: "📷", type: "tool-photo", tag: "PHOTOGRAPHY", title: "LENS CALIBRATION", desc: "光と影を切り取る。Webサイトのキービジュアルとなる高品質なアセットを生成するためのデバイス。" }
  ];

  // デスク上にツールをランダム配置
  tools.forEach((tool, index) => {
    const el = document.createElement('div');
    el.className = `tool-item ${tool.type}`;
    
    // Z-indexを被らないように
    el.style.zIndex = index;
    
    // ランダムな位置（はみ出さないように）
    const x = 5 + Math.random() * 70; // 5% ~ 75%
    const y = 5 + Math.random() * 70; // 5% ~ 75%
    el.style.left = `${x}%`;
    el.style.top = `${y}%`;
    
    // 少し回転させる
    const rot = (Math.random() - 0.5) * 40;
    el.style.transform = `rotate(${rot}deg)`;
    
    // ホバー用のアニメーションベースを上書きしてしまうので、
    // ラッパーを作って回転を維持するか、hover時にアニメーションを工夫する。
    // 今回はCSSの hover 側で transform を上書きしてまっすぐにさせてポップアップさせる。
    // 初期状態の変形を custom property に保存しておく。
    el.style.setProperty('--base-rot', `${rot}deg`);
    
    // インラインスタイルでhoverを再現するのは面倒なので、JSで動的に適用するスタイルを追加
    el.addEventListener('mouseenter', () => {
      el.style.transform = `translateY(-10px) scale(1.05) rotate(0deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = `rotate(${rot}deg)`;
    });

    el.innerHTML = `
      <div class="tool-icon">${tool.icon}</div>
      <div class="tool-name">${tool.name}</div>
    `;

    // クリックでビューアーを開く
    el.addEventListener('click', () => {
      openViewer(tool);
    });

    desk.appendChild(el);
  });

  function openViewer(data) {
    document.getElementById('bp-title').textContent = data.title;
    document.getElementById('bp-icon').textContent = data.icon;
    document.getElementById('bp-desc').textContent = data.desc;
    document.getElementById('bp-tag').textContent = data.tag;
    
    viewer.style.display = 'flex';
  }

  closeBtn.addEventListener('click', () => {
    viewer.style.display = 'none';
  });
}
