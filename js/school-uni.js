/* ==========================================================================
   UNIVERSITY THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCampusMap();
});

function initCampusMap() {
  const grid = document.getElementById('map-grid');
  const placeholder = document.getElementById('reader-placeholder');
  const content = document.getElementById('reader-content');
  
  if (!grid || !placeholder) return;

  const facilities = [
    { 
      id: "fac-lib", class: "fac-lib", icon: "🏛️", name: "Central Library",
      doc: {
        title: "情報アーキテクチャの進化と分類学の未来",
        author: "Dr. A. Librarian",
        date: "2026.04.12",
        text: "膨大なデータを如何にして人間の認知構造に合わせて整理・提示するか。本論文では、メガメニュー構造と無限スクロールUIの認知負荷に関する比較研究を行い、最適な情報アクセスの方法論を提唱する。"
      }
    },
    { 
      id: "fac-sci", class: "fac-sci", icon: "🧬", name: "Faculty of Science",
      doc: {
        title: "量子コンピューティングにおける非同期処理モデル",
        author: "Prof. Q. Bit",
        date: "2026.05.28",
        text: "従来のPromiseやasync/awaitモデルを超え、量子もつれを利用した全く新しい非同期処理のパラダイムについて考察する。複数の状態を同時に持つことで、待機時間という概念そのものを破壊する。"
      }
    },
    { 
      id: "fac-art", class: "fac-art", icon: "🎭", name: "School of Arts",
      doc: {
        title: "デジタル空間における「手触り」の再現",
        author: "Dr. C. Canvas",
        date: "2026.02.10",
        text: "CSSのbox-shadowやグラスモーフィズム、そして微細なインタラクション・アニメーションがもたらす心理的効果を分析。ピクセルの集合体に物質的な「重さ」と「質感」を与えるデザイン手法について論じる。"
      }
    },
    { 
      id: "fac-med", class: "fac-med", icon: "⚕️", name: "School of Medicine",
      doc: {
        title: "長時間VDT作業における視覚疲労とダークモードの効能",
        author: "Dr. E. Sight",
        date: "2026.08.05",
        text: "モニター画面から発せられるブルーライトと、UIのコントラスト比が眼精疲労に与える影響の臨床データ。適切なダークモードのカラースキーム（純黒を避ける等）のガイドラインを提示する。"
      }
    },
    { 
      id: "fac-eng", class: "fac-eng", icon: "⚙️", name: "College of Engineering",
      doc: {
        title: "2D物理エンジンの最適化とブラウザレンダリング",
        author: "Prof. R. Engine",
        date: "2026.11.20",
        text: "requestAnimationFrameを用いたカスタム物理演算ループの構築と、DOM操作に起因するボトルネックの解消。Web Workerを用いた演算の分離とキャンバス描画の統合についてのケーススタディ。"
      }
    }
  ];

  let currentActive = null;

  facilities.forEach(fac => {
    const el = document.createElement('div');
    el.className = `facility ${fac.class}`;
    el.id = fac.id;
    
    el.innerHTML = `
      <div class="fac-icon">${fac.icon}</div>
      <div class="fac-name">${fac.name}</div>
    `;

    el.addEventListener('click', () => {
      // 選択状態の切り替え
      if (currentActive) currentActive.classList.remove('active');
      el.classList.add('active');
      currentActive = el;

      // リーダーに情報を表示
      openArchive(fac.doc);
    });

    grid.appendChild(el);
  });

  function openArchive(doc) {
    // プレースホルダーを隠す
    placeholder.style.display = 'none';
    
    // 中身を一旦隠して再度表示する（アニメーションリセットのため）
    content.style.display = 'none';
    
    // データをセット
    document.getElementById('doc-title').textContent = doc.title;
    document.getElementById('doc-author').textContent = doc.author;
    document.getElementById('doc-date').textContent = doc.date;
    document.getElementById('doc-text').textContent = doc.text;
    
    // reflow
    void content.offsetWidth;
    
    content.style.display = 'block';
  }
}
