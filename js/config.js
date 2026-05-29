/**
 * Library Website Configuration
 * このファイルを書き換えるだけで、ウェブサイトの基本情報を簡単に変更できます。
 */

const LibraryConfig = {
  // 図書館名とサブタイトル
  title: "架空の中央図書館",
  subtitle: "Libinbox Base Portal",
  enTitle: "Central Library of Libinbox",
  
  // キャッチコピー
  heroTitle: "本棚を巡り、物語と出会う。",
  heroDesc: "静寂に包まれた書庫の中で、あなただけの１冊を見つけてください。本棚から本を引き出すと、新しい世界のページが開かれます。",

  // 基本情報
  address: "〒000-0000 仮想の街 夢見ヶ丘 1丁目2-3",
  phone: "03-0000-0000",
  email: "info@example-library.com",
  
  // 開館時間と休館日の説明
  openingHours: {
    weekday: "09:00 - 20:00",
    weekend: "10:00 - 18:00",
  },
  regularHolidays: "毎週月曜日（月曜が祝日の場合は翌日）、年末年始",
  
  // お知らせ情報（仮配置）
  announcements: [
    {
      date: "2026.05.25",
      category: "重要",
      title: "【お知らせ】システムメンテナンスに伴う臨時休館について"
    },
    {
      date: "2026.05.20",
      category: "イベント",
      title: "【6月開催】司書が選ぶ「雨の日に読みたい小説」展示会"
    },
    {
      date: "2026.05.15",
      category: "新着",
      title: "電子図書館サービスに新しい学術データベースが追加されました"
    }
  ]
};

// モジュールまたはグローバル変数としてエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LibraryConfig;
} else {
  window.LibraryConfig = LibraryConfig;
}
