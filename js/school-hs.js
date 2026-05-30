/* ==========================================================================
   HIGH SCHOOL THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
});

function initTimeline() {
  const container = document.getElementById('chat-container');
  const panelTitle = document.getElementById('panel-title');
  const panelDesc = document.getElementById('panel-desc');
  const panelTags = document.getElementById('panel-tags');
  
  if (!container) return;

  const messages = [
    { type: 'left', text: 'ねえ、次のプロジェクトの技術選定どうする？🤔', time: '10:42', title: 'Tech Stack Discussion', desc: 'プロジェクトの基盤となる技術スタックについての議論。フロントエンドにはReactかVueか、バックエンドの言語は何かを決定します。', tags: ['#planning', '#tech'] },
    { type: 'right', text: 'フロントはNext.jsで良くない？SSR/SSG両方いけるし。', time: '10:43', title: 'Next.js Proposal', desc: 'パフォーマンスとSEOに優れたNext.jsの採用提案。Vercelとの連携によりデプロイも容易になる点が評価されています。', tags: ['#frontend', '#react'] },
    { type: 'left', text: '賛成！バックエンドはSupabase使ってみない？BaaSで爆速開発できそう。', time: '10:45', title: 'Supabase Introduction', desc: 'PostgreSQLベースのオープンソースBaaS。認証、データベース、ストレージ機能が最初から揃っており、初期開発スピードを劇的に向上させます。', tags: ['#backend', '#database'] },
    { type: 'right', text: 'いいね、それで行こう🔥 デザインはどうする？Tailwind？', time: '10:46', title: 'Styling Strategy', desc: 'ユーティリティファーストなCSSフレームワークの導入検討。チーム全体で一貫したデザインシステムを構築するための基盤となります。', tags: ['#css', '#design'] },
    { type: 'left', text: 'うん、Tailwind + Shadcn UIでモダンに組みたい！', time: '10:48', title: 'Modern UI Kit', desc: 'アクセシビリティに配慮され、かつカスタマイズ性の高いコンポーネントライブラリの採用。美しいUIを素早く構築します。', tags: ['#ui', '#components'] },
    { type: 'right', text: '完璧。じゃあリポジトリ作っておくね👍', time: '10:50', title: 'Repository Setup', desc: 'GitHub上でのプロジェクト初期化。CI/CDのパイプライン設定やBranch戦略の策定が含まれます。', tags: ['#git', '#devops'] }
  ];

  let delay = 0;
  const bubbles = [];

  // メッセージを順番に表示するアニメーション
  messages.forEach((msg, index) => {
    setTimeout(() => {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble chat-${msg.type}`;
      bubble.innerHTML = `
        ${msg.text}
        <div class="chat-time">${msg.time}</div>
      `;

      // クリックイベント
      bubble.addEventListener('click', () => {
        // アクティブ状態の切り替え
        bubbles.forEach(b => b.classList.remove('active'));
        bubble.classList.add('active');

        // サイドパネルの更新
        updateSidePanel(msg);
      });

      container.appendChild(bubble);
      bubbles.push(bubble);
      
      // 自動スクロール
      container.scrollTop = container.scrollHeight;

      // 最後のメッセージなら初期選択状態にする
      if (index === messages.length - 1) {
        setTimeout(() => {
          bubble.click();
        }, 500);
      }

    }, delay);
    
    // 次のメッセージが表示されるまでの遅延時間
    delay += 800 + Math.random() * 1000;
  });

  function updateSidePanel(data) {
    // 少しフェードアウト・インさせる
    const panel = document.getElementById('side-panel');
    panel.style.opacity = '0';
    panel.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
      panelTitle.textContent = data.title;
      panelDesc.textContent = data.desc;
      
      panelTags.innerHTML = '';
      data.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag';
        // タグごとに色を変える（簡易）
        const colors = ['#ff6b81', '#7bed9f', '#70a1ff', '#eccc68'];
        span.style.background = colors[Math.floor(Math.random() * colors.length)];
        span.textContent = t;
        panelTags.appendChild(span);
      });

      panel.style.opacity = '1';
      panel.style.transform = 'translateY(0)';
    }, 200);
  }
}
