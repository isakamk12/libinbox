/* ==========================================================================
   RESTAURANT THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initConveyorBelt();
});

function initConveyorBelt() {
  const belt = document.getElementById('conveyor-belt');
  const modal = document.getElementById('menu-modal');
  const closeModalBtn = document.getElementById('close-modal');
  
  if (!belt) return;

  const menuItems = [
    { title: "特選・非同期処理の盛り合わせ", tag: "Main Dish", color: "color-gold", price: "$45.00", desc: "JavaScriptのPromiseとasync/awaitをふんだんに使用した、シェフ渾身の一皿。口の中で処理が並行して解け合います。" },
    { title: "CSS Flexboxのマリネ", tag: "Appetizer", color: "color-silver", price: "$12.50", desc: "要素を均等に配置し、さっぱりと仕上げました。レスポンシブな味わいが特徴です。" },
    { title: "React Hooksの三種盛り", tag: "Specialty", color: "color-red", price: "$30.00", desc: "useState, useEffect, useContextの3つの状態を新鮮なままお届けします。" },
    { title: "SQLクエリの煮込み", tag: "Soup", color: "color-blue", price: "$18.00", desc: "複雑なJOINでじっくりと煮込んだ濃厚なデータスープ。インデックスが効いています。" },
    { title: "Pythonのジェネレータ添え", tag: "Side", color: "color-silver", price: "$15.00", desc: "メモリを節約しながら、必要な分だけを順番に提供するエコな一品。" },
    { title: "Dockerコンテナ包み焼き", tag: "Main Dish", color: "color-gold", price: "$50.00", desc: "環境を丸ごとコンテナに包み込み、どこでも同じ味を再現できる魔法のオーブン焼き。" }
  ];

  // 無限スクロールさせるために要素を2回繰り返して配置する
  const displayItems = [...menuItems, ...menuItems];

  displayItems.forEach((item, index) => {
    const plate = document.createElement('div');
    plate.className = `plate ${item.color}`;
    
    plate.innerHTML = `
      <div class="plate-content">
        <div class="plate-title">${item.title}</div>
        <div class="plate-tag">${item.tag}</div>
      </div>
    `;

    // クリックイベント（モーダルを開く）
    plate.addEventListener('click', () => {
      openModal(item);
    });

    belt.appendChild(plate);
  });

  // アニメーション設定 (幅によって時間を調整)
  // 1セットのアイテムが画面外に消えるまでの時間を設定
  // 皿の幅(200px) + マージン(100px) = 300px * items.length
  const totalWidth = 300 * menuItems.length;
  belt.style.width = `${totalWidth * 2}px`; // 2セット分
  
  // アニメーションの適用
  // -50%（1セット分）移動したら0%に戻ることで無限ループさせる
  belt.style.animation = `scrollBelt 40s linear infinite`;

  // モーダル処理
  function openModal(data) {
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-price').textContent = data.price;
    
    const plateColor = document.getElementById('modal-plate-color');
    plateColor.className = `menu-plate-large ${data.color}`;

    modal.classList.add('active');
  }

  closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  // モーダル外クリックで閉じる
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}
