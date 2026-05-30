/* ==========================================================================
   JUNIOR HIGH SCHOOL THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLockerRoom();
});

function initLockerRoom() {
  const room = document.getElementById('locker-room');
  if (!room) return;

  const lockersData = [
    { num: "1-A", icon: "🎸", title: "軽音部", desc: "チューニングの合った情報。バンドスコアのように整理されたドキュメントが保管されています。" },
    { num: "1-B", icon: "⚽", title: "サッカー部", desc: "フィールドを駆け回るような動的なデータ。チームワークを重視したモジュール構造。" },
    { num: "2-A", icon: "💻", title: "パソコン部", desc: "コンソール画面と幾多のスクリプト。自作のツールがこっそり保存されている場所。" },
    { num: "2-B", icon: "🎨", title: "美術部", desc: "色彩豊かなパレットとデッサン。UI/UXのインスピレーションの源泉泉。" },
    { num: "3-A", icon: "📖", title: "文芸部", desc: "静寂な空間で綴られたテキストデータ。長文の仕様書が美しく束ねられている。" },
    { num: "3-B", icon: "🔬", title: "科学部", desc: "実験結果のログデータ。トライアンドエラーの結晶がビーカーの中で光る。" },
    { num: "STAFF", icon: "🔑", title: "生徒会室", desc: "全体のルールを司るマスターキー。管理者権限の設定ファイルが置かれています。" },
    { num: "EXTRA", icon: "📱", title: "隠しアイテム", desc: "授業中に隠れて見ていたスマホの履歴...のような、イースターエッグ。" }
  ];

  lockersData.forEach(data => {
    const locker = document.createElement('div');
    locker.className = 'locker';
    
    locker.innerHTML = `
      <!-- ロッカーの中身 -->
      <div class="locker-inside">
        <div class="locker-content-icon">${data.icon}</div>
        <div class="locker-content-title">${data.title}</div>
        <div class="locker-content-desc">${data.desc}</div>
        <button class="theme-btn" style="margin-top:20px; font-size:0.8rem; padding:8px;">ACCESS</button>
      </div>

      <!-- ロッカーの扉 -->
      <div class="locker-door">
        <div class="locker-number">${data.num}</div>
        <div class="locker-handle"></div>
      </div>
    `;

    // クリックで開閉をトグル
    locker.addEventListener('click', () => {
      // 他のロッカーを閉じる（排他処理にするかはお好み。今回はトグルのみ）
      locker.classList.toggle('open');
    });

    room.appendChild(locker);
  });
}
