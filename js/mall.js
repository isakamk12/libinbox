/* ==========================================================================
   SHOPPING MALL THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initWindowShopping();
});

function initWindowShopping() {
  const track = document.getElementById('showcase-track');
  const modal = document.getElementById('fitting-room-modal');
  const closeBtn = document.getElementById('close-fitting');
  
  if (!track || !modal) return;

  const collections = [
    { brand: "UI/UX DESIGN", title: "Minimalist Wireframe", price: "¥12,800", desc: "無駄を削ぎ落とした洗練されたワイヤーフレーム。どんなプロジェクトにもフィットする万能な一着。", image: "url('https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80')" },
    { brand: "FRONTEND", title: "React Component Kit", price: "¥24,000", desc: "再利用性を極限まで高めたコンポーネントのセットアップ。レイヤーを重ねることで真価を発揮します。", image: "url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80')" },
    { brand: "BACKEND", title: "Robust API Architecture", price: "¥45,000", desc: "堅牢な構造美を追求したAPI設計。高負荷にも耐えうる、大人のためのバックエンド・コレクション。", image: "url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80')" },
    { brand: "INFRASTRUCTURE", title: "Cloud Deployment Bag", price: "¥32,000", desc: "すべてのデータを安全に持ち運べるクラウド・ストレージバッグ。シームレスな展開が可能です。", image: "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')" },
    { brand: "SECURITY", title: "Encryption Shield", price: "¥50,000", desc: "最新の暗号化技術を用いた強固なシールド。見えない脅威からあなたのデータをスタイリッシュに守ります。", image: "url('https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80')" },
    { brand: "DATA SCIENCE", title: "Analytics Dashboard", price: "¥28,500", desc: "データを美しく可視化するダッシュボード。知的なインサイトを引き出すためのマストアイテム。", image: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')" }
  ];

  // ショーウィンドウカードの生成
  collections.forEach(item => {
    const card = document.createElement('div');
    card.className = 'window-card';
    card.innerHTML = `
      <div class="window-image" style="background-image: ${item.image};"></div>
      <div class="window-info">
        <div class="window-brand">${item.brand}</div>
        <div class="window-title">${item.title}</div>
        <div class="window-price">${item.price}</div>
      </div>
    `;

    // クリックで試着室（詳細）を開く
    card.addEventListener('click', () => {
      openFittingRoom(item);
    });

    track.appendChild(card);
  });

  // 横スクロールをマウスホイールで可能にする
  const container = document.getElementById('showcase-container');
  container.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    }
  });

  // 試着室の処理
  function openFittingRoom(data) {
    document.getElementById('fitting-brand').textContent = data.brand;
    document.getElementById('fitting-title').textContent = data.title;
    document.getElementById('fitting-desc').textContent = data.desc;
    document.getElementById('fitting-price').textContent = data.price;
    document.getElementById('fitting-image').style.backgroundImage = data.image;

    // ドアを閉じておく（初期状態）
    modal.classList.remove('active');
    
    // 表示して、少し遅れてドアを開く（CSSトランジション）
    modal.style.display = 'flex';
    
    // reflow
    void modal.offsetWidth;
    
    modal.classList.add('active');
  }

  closeBtn.addEventListener('click', () => {
    // ドアを閉じる
    modal.classList.remove('active');
  });

}
