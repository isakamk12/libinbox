/**
 * Books Data Source
 * 本棚の背表紙デモ用のデータ（LibraryShelfBooks）と、
 * 実際に表紙を見せてクリックで開かせる作品ギャラリー用のデータ（LibraryShowcaseBooks）です。
 * 
 * 複雑なアニメーション分岐用の属性（shelfType, openAnimation）をすべて削除し、
 * 純粋なデータのみを管理する最もシンプルで頑健な構造に整理しました。
 * すべての書籍が、最も美しく調整された共通の3D演出（プル＆ページめくり）を自動的に使い回します。
 */

/* ==========================================================================
   1. 本棚・背表紙ホバー演出デモ用データ (Spine Spines)
   ========================================================================== */
const LibraryShelfBooks = [
  {
    id: "shelf-book-1",
    title: "古書と時の旅",
    author: "司書 A",
    color: "var(--spine-red)",
    textColor: "#ffffff",
    decorType: "gold-border"
  },
  {
    id: "shelf-book-2",
    title: "迷宮の図書館",
    author: "司書 B",
    color: "var(--spine-blue)",
    textColor: "#ffffff",
    decorType: "gold-lines"
  },
  {
    id: "shelf-book-3",
    title: "言の葉の森",
    author: "司書 C",
    color: "var(--spine-green)",
    textColor: "#ffffff",
    decorType: "minimal"
  },
  {
    id: "shelf-book-4",
    title: "機械仕掛けの夢",
    author: "工匠 D",
    color: "var(--spine-purple)",
    textColor: "#f5eedc",
    decorType: "constellation"
  },
  {
    id: "shelf-book-5",
    title: "深海の囁き",
    author: "学者 E",
    color: "var(--spine-brown)",
    textColor: "#ffffff",
    decorType: "vintage-frame"
  },
  {
    id: "shelf-book-6",
    title: "砂漠の案内人",
    author: "旅人 G",
    color: "var(--spine-gold)",
    textColor: "#2b1810",
    decorType: "gold-border"
  }
];

/* ==========================================================================
   2. 作品紹介カタログ・本を開く演出用データ (Book Open Showcase)
   ========================================================================== */
const LibraryShowcaseBooks = [
  {
    id: "showcase-vtuber",
    title: "VTuberアーカイブ",
    author: "rpgmi",
    color: "var(--spine-red)",
    textColor: "#ffffff",
    decorType: "gold-border",
    chapter: "VTuber Archive - Vol. 1",
    description: "複数事務所・タレント情報の収集、分類、構造設計、継続更新を実施している大規模アーカイブ。",
    content: "複数事務所・タレント情報の収集、分類、構造設計、継続更新を実施している大規模アーカイブ。\n\n【概要】\nここにプロジェクトの詳細や紹介文などを記載します。このbooks-data.jsのテキスト部分を編集するだけで、本棚のビジュアルと開いた際の中身を自由自在に変更可能です。\n\n【外部リンク】\nhttps://example-vtuber-archive.com (仮)"
  },
  {
    id: "showcase-external",
    title: "外部作品紹介",
    author: "rpgmi",
    color: "var(--spine-blue)",
    textColor: "#f5eedc",
    decorType: "vintage-frame",
    chapter: "External Works - Vol. 2",
    description: "外部で公開・執筆している多様な作品やクリエイティブ活動の情報を集約したポートフォリオ。",
    content: "外部で公開・執筆している多様な作品やクリエイティブ活動の情報を集約したポートフォリオカタログです。\n\n【概要】\nここに外部作品の紹介やリンク、解説文などを入力してください。本の形をしたスタイリッシュなポートフォリオとして、訪れたユーザーにプレミアムな体験を提供します。"
  },
  {
    id: "showcase-memory",
    title: "木漏れ日の記憶",
    author: "森の語り部",
    color: "var(--spine-green)",
    textColor: "#ffffff",
    decorType: "leaf-emboss",
    chapter: "第I部　緑の木陰",
    description: "モダンなウェブデザインの要素とクラシックな美学を融合させて作られた、読書体験用サンプルコラム。",
    content: "風が木々の間を吹き抜け、心地よいささやきを運んでくる。\n\nこのテンプレートは、モダンなウェブデザインの要素とクラシックな美学を融合させて作られています。アンティークな雰囲気を持つ羊皮紙調のページは、長文の読み込みにも目が疲れにくい色合いを採用しています。お好みで背景画像や文字サイズを調整し、あなた独自の読書体験を演出しましょう。"
  }
];

// モジュールまたはグローバル変数としてエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LibraryShelfBooks, LibraryShowcaseBooks };
} else {
  window.LibraryShelfBooks = LibraryShelfBooks;
  window.LibraryShowcaseBooks = LibraryShowcaseBooks;
}
