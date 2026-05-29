/**
 * Library Portal Main Interactivity Logic
 * 複雑な演出の切り替えや分岐条件をすべて撤去し、
 * 最も美しく頑健な「1つの王道3D演出（プル＆ページめくり）」を共通で使い回す極小設計です。
 * 誰がデータを追加・編集しても絶対に壊れない安全なコードになっています。
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. 基本設定データ（LibraryConfig）の反映
  initLibraryConfig();

  // 2. 本棚（LibraryShelfBooks）の動的描画 (背表紙ホバー)
  renderBookshelf();

  // 3. 作品ギャラリー（LibraryShowcaseBooks）の動的描画 (表紙クリックめくり)
  renderCoverGallery();

  // 4. 新カタログ: Desk Layout (机置き) の動的描画
  renderDeskLayout();

  // 5. 新カタログ: Floating Showcase (空間浮遊) の動的描画
  renderFloatingShowcase();

  // 5-2. 新カタログ: Carousel, Scroll Altar, Stack
  renderCarousel();
  renderScrollAltar();
  renderStack();

  // 5-3. 新カタログ第3弾: Spiral, Museum, Ripple
  renderSpiral();
  renderMuseum();
  renderRipple();

  // 5-4. 新カタログ第4弾: Orbit, Conveyor, Constellation
  renderOrbit();
  renderConveyor();
  renderConstellation();

  // 6. 近接センサー（Proximity Open）イベントの初期化
  initProximityEvents();

  // 7. 3Dブックモーダルの制御イベント
  initBookModalEvents();
});

/**
 * LibraryConfigに格納されたウェブサイト基本情報をHTMLに反映します。
 */
function initLibraryConfig() {
  if (typeof LibraryConfig === "undefined") return;

  // サイトタイトルの反映
  const titleEls = document.querySelectorAll(".lib-title");
  titleEls.forEach(el => {
    el.textContent = LibraryConfig.title;
  });

  const subtitleEls = document.querySelectorAll(".lib-subtitle");
  subtitleEls.forEach(el => {
    el.textContent = LibraryConfig.subtitle;
  });

  // ヒーローセクション
  const heroTitle = document.getElementById("hero-title");
  if (heroTitle) heroTitle.textContent = LibraryConfig.heroTitle;

  const heroDesc = document.getElementById("hero-desc");
  if (heroDesc) heroDesc.textContent = LibraryConfig.heroDesc;

  // フッター情報
  const footerAddress = document.getElementById("footer-address");
  if (footerAddress) footerAddress.textContent = `住所: ${LibraryConfig.address}`;

  const footerPhone = document.getElementById("footer-phone");
  if (footerPhone) footerPhone.textContent = `電話: ${LibraryConfig.phone}`;

  const footerEmail = document.getElementById("footer-email");
  if (footerEmail) footerEmail.textContent = `メール: ${LibraryConfig.email}`;

  const footerHours = document.getElementById("footer-hours");
  if (footerHours) {
    footerHours.textContent = `平日: ${LibraryConfig.openingHours.weekday} / 土日祝: ${LibraryConfig.openingHours.weekend}`;
  }

  // 本日の開館時間（クイックステータス）
  const statusTime = document.getElementById("status-time");
  if (statusTime) {
    const today = new Date().getDay();
    const isWeekend = (today === 0 || today === 6);
    const hours = isWeekend ? LibraryConfig.openingHours.weekend : LibraryConfig.openingHours.weekday;
    statusTime.textContent = hours;
  }

  // お知らせリストの反映
  const newsContainer = document.getElementById("news-list");
  if (newsContainer && LibraryConfig.announcements) {
    newsContainer.innerHTML = ""; // 初期化
    LibraryConfig.announcements.forEach(item => {
      const a = document.createElement("a");
      a.href = "#";
      a.className = "news-item";
      a.innerHTML = `
        <div class="news-date">${item.date}</div>
        <div class="news-category ${item.category}">${item.category}</div>
        <div class="news-title">${item.title}</div>
      `;
      newsContainer.appendChild(a);
    });
  }
}

/**
 * LibraryShelfBooksデータに基づいて、本棚に背表紙をレンダリングします。（共通クラシック・プル演出）
 */
function renderBookshelf() {
  if (typeof LibraryShelfBooks === "undefined") return;

  const shelfRow1 = document.getElementById("shelf-row-1");
  const shelfRow2 = document.getElementById("shelf-row-2");
  
  if (!shelfRow1) return;

  shelfRow1.innerHTML = "";
  if (shelfRow2) shelfRow2.innerHTML = "";

  LibraryShelfBooks.forEach((book, index) => {
    // 1段目と2段目に均等に振り分け
    const targetRow = (index % 2 === 0 || !shelfRow2) ? shelfRow1 : shelfRow2;

    const bookEl = document.createElement("div");
    bookEl.className = "book-spine-item";
    bookEl.dataset.id = book.id;
    bookEl.style.transformStyle = "preserve-3d";

    // 高さ・幅のばらつきをつけリアルさを演出
    const heightVariation = 180 + (index * 4) % 20; 
    const widthVariation = 42 + (index * 7) % 12;   

    bookEl.style.height = `${heightVariation}px`;
    bookEl.style.width = `${widthVariation}px`;

    // 背表紙の装飾HTML
    bookEl.innerHTML = `
      <div class="spine-3d" style="background-color: ${book.color}; color: ${book.textColor};">
        <div class="spine-decor decor-${book.decorType}"></div>
        <div class="spine-title">${book.title}</div>
        <div class="spine-author">${book.author}</div>
        <div class="spine-decor decor-${book.decorType}"></div>
      </div>
    `;

    // 本棚クリック時も、共通の美しい見開きモーダルでプレビュー開く親切設計
    bookEl.addEventListener("click", () => {
      openBookDirect({
        title: book.title,
        author: book.author,
        color: book.color,
        textColor: book.textColor,
        chapter: "本の紹介",
        content: "これは本棚背表紙をクリックした際の共通プレビューです。\n\n下にある「作品紹介カタログ」セクションには、最初から表紙を正面に向けた作品カードが並んでおり、クリックすると最も本らしくて美しい「3Dブックフリップ」アニメーションで滑らかに開きます。"
      });
    });

    targetRow.appendChild(bookEl);
  });
}

/**
 * LibraryShowcaseBooksデータに基づいて、正面を向いたプレミアム作品カバーカードをギャラリーに描画します。
 */
function renderCoverGallery() {
  if (typeof LibraryShowcaseBooks === "undefined") return;

  const galleryContainer = document.getElementById("cover-gallery");
  if (!galleryContainer) return;

  galleryContainer.innerHTML = ""; // 初期化

  LibraryShowcaseBooks.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-cover-card";
    card.style.backgroundColor = book.color;
    card.style.color = book.textColor;
    card.dataset.id = book.id;

    card.innerHTML = `
      <div class="book-cover-card-inner"></div>
      <h3 class="card-cover-title">${book.title}</h3>
      <p class="card-cover-desc">${book.description || ""}</p>
      <div class="card-cover-footer">
        <span class="card-cover-author">by ${book.author}</span>
        <span class="card-cover-badge">クリックで開く 📖</span>
      </div>
    `;

    // クリック時に作品をめくって開く
    card.addEventListener("click", () => {
      openBook(book.id);
    });

    galleryContainer.appendChild(card);
  });
}

/**
 * 作品ギャラリーの本をクリックしたときに、本を開く処理。
 */
function openBook(bookId) {
  if (typeof LibraryShowcaseBooks === "undefined") return;

  const bookData = LibraryShowcaseBooks.find(b => b.id === bookId);
  if (!bookData) return;

  openBookDirect(bookData);
}

/**
 * 与えられた書籍データをモーダル内の本に代入し、共通の3Dめくりモーダルを展開します。
 */
function openBookDirect(bookData) {
  const overlay = document.getElementById("book-modal");
  const frontCover = document.getElementById("modal-cover-front");
  
  // 各プレースホルダーへの代入
  document.getElementById("modal-cover-title").textContent = bookData.title;
  document.getElementById("modal-cover-author").textContent = bookData.author;
  
  document.getElementById("modal-inside-title").textContent = bookData.title;
  document.getElementById("modal-inside-author").textContent = bookData.author;
  
  document.getElementById("modal-chapter-title").textContent = bookData.chapter;
  document.getElementById("modal-text-body").textContent = bookData.content;

  if (frontCover) {
    frontCover.style.backgroundColor = bookData.color;
    frontCover.style.color = bookData.textColor;
  }

  if (overlay) {
    // 常に共通の美しい「3D見開きフリップ」で本を開く
    overlay.className = "book-modal-overlay active";
    
    // スクロール位置のリセット
    const bodyTextEl = document.getElementById("modal-text-body");
    if (bodyTextEl) bodyTextEl.scrollTop = 0;
  }
}

/**
 * 3Dモーダルを閉じる処理。
 */
function closeBook() {
  const overlay = document.getElementById("book-modal");
  if (overlay) {
    overlay.classList.remove("active");
  }
}

/**
 * 3Dモーダルの閉じるボタンや背景クリックイベントを設定します。
 */
function initBookModalEvents() {
  const closeBtn = document.getElementById("close-book-btn");
  const overlay = document.getElementById("book-modal");

  if (closeBtn) {
    closeBtn.addEventListener("click", closeBook);
  }

  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        closeBook();
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
      closeBook();
    }
  });
}

/**
 * =========================================================================
 *  NEW CATALOG FEATURES: Inline 3D Books & Proximity Sensors
 * =========================================================================
 */

/**
 * 4. Desk Layout (机置き) セクションの描画
 */
function renderDeskLayout() {
  const wrapper = document.getElementById("desk-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  // デスクには1番目の作品を置く
  const book = LibraryShowcaseBooks[0];
  wrapper.innerHTML = createInline3DBookHTML(book, 'desk-book-inline');
}

/**
 * 5. Floating Showcase (空間浮遊) セクションの描画
 */
function renderFloatingShowcase() {
  const wrapper = document.getElementById("floating-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length < 2) return;
  
  // 浮遊には2番目の作品を置く
  const book = LibraryShowcaseBooks[1];
  wrapper.innerHTML = createInline3DBookHTML(book, 'floating-book-inline', 'floating-cover');
}

/**
 * インライン展開用の3DブックHTML文字列を生成
 */
function createInline3DBookHTML(bookData, extraClass, coverId = '') {
  const cId = coverId ? `id="${coverId}"` : '';
  return `
    <div class="inline-book-container ${extraClass}" data-id="${bookData.id}">
      <div class="book-3d">
        <!-- FRONT COVER -->
        <div class="book-page-side book-cover-front inline-cover-front" ${cId} style="background-color: ${bookData.color}; color: ${bookData.textColor};">
          <div class="cover-inner">
            <h3 class="cover-title">${bookData.title}</h3>
            <div class="cover-author">${bookData.author}</div>
          </div>
          <!-- BACKSIDE AS LEFT PAGE -->
          <div class="book-cover-backside">
            <div class="page-content">
              <div style="width: 100%; text-align: center;">
                <h4 class="book-title-inside">${bookData.title}</h4>
                <div class="book-author-inside">${bookData.author}</div>
              </div>
              <div class="inside-ornament">❦</div>
              <div class="page-number">L-1</div>
            </div>
          </div>
        </div>

        <!-- RIGHT INSIDE PAGE -->
        <div class="book-inside-page page-inside-right">
          <div class="page-content">
            <div>
              <h5 class="book-chapter-title">${bookData.chapter}</h5>
              <div class="book-text-body">
                ${bookData.content}
              </div>
            </div>
            <div class="page-number">R-2</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * 6. 近接センサー（Proximity）のイベントリスナー設定
 */
function initProximityEvents() {
  const deskBook = document.querySelector(".desk-book-inline");
  const floatingBook = document.querySelector(".floating-book-inline");
  const floatingCover = document.getElementById("floating-cover");

  // デバイスの判定（スマホなどのタッチデバイスでは mousemove よりも scroll 依存にする）
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  if (isTouchDevice) {
    // 【スマホ・タブレット向け】IntersectionObserverによるスクロール連動
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px", // 画面中央付近にきたら発火
      threshold: [0, 0.2, 0.5, 0.8, 1.0]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.target === deskBook) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            deskBook.classList.add("proximity-open");
          } else {
            deskBook.classList.remove("proximity-open");
          }
        }
        
        if (entry.target === floatingBook && floatingCover) {
          if (entry.isIntersecting) {
            // 見えている割合(ratio)に応じて開く角度を変える
            const ratio = entry.intersectionRatio; // 0.0 to 1.0
            const angle = -180 * ratio;
            floatingCover.style.transform = `rotateY(${angle}deg)`;
            
            if (ratio > 0.3) {
              floatingBook.classList.add("dynamic-open-active");
            } else {
              floatingBook.classList.remove("dynamic-open-active");
            }
          }
        }
      });
    }, observerOptions);

    if (deskBook) observer.observe(deskBook);
    if (floatingBook) observer.observe(floatingBook);

  } else {
    // 【PC・マウス向け】カーソル座標からの距離連動
    document.addEventListener("mousemove", (e) => {
      // Desk Layout: 一定距離に入ったら自動開閉（ホバーゾーン）
      if (deskBook) {
        const rect = deskBook.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        // 350px以内で開く
        if (dist < 350) {
          deskBook.classList.add("proximity-open");
        } else {
          deskBook.classList.remove("proximity-open");
        }
      }

      // Floating Showcase: 距離に応じてジワジワ開閉（ダイナミック連動）
      if (floatingBook && floatingCover) {
        const rect = floatingBook.getBoundingClientRect();
        // 本の中心ではなく少し右寄りを判定基準にする（開いた時の重心）
        const centerX = rect.left + rect.width / 2; 
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        
        // 500pxから反応し始め、150pxで全開になる
        let angle = 0;
        if (dist < 500) {
          let ratio = (500 - dist) / 350; // 0.0 ~ 1.0
          ratio = Math.max(0, Math.min(1, ratio));
          
          // 滑らかに開くイージング処理 (Ease-In-Out)
          let easeRatio = ratio < 0.5 ? 2 * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 2) / 2;
          angle = -180 * easeRatio;
          
          if (ratio > 0.1) {
            floatingBook.classList.add("dynamic-open-active");
          } else {
            floatingBook.classList.remove("dynamic-open-active");
          }
        } else {
          floatingBook.classList.remove("dynamic-open-active");
        }
        floatingCover.style.transform = `rotateY(${angle}deg)`;
      }
    });
  }
}

/**
 * =========================================================================
 *  NEW CATALOG EXTENSIONS: Carousel, Altar, Stack
 * =========================================================================
 */

// ---------------------------
// 7. 3D Carousel
// ---------------------------
let carouselAngle = 0;
const carouselRadius = 550;
let carouselBooksCount = 0;

function renderCarousel() {
  const container = document.getElementById("carousel-container");
  if (!container || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  // 3〜5冊を使用
  const books = LibraryShowcaseBooks.slice(0, 5);
  carouselBooksCount = books.length;
  
  let html = "";
  const angleStep = 360 / books.length;
  
  books.forEach((book, i) => {
    const extraClass = `carousel-book-inline carousel-item-${i}`;
    html += createInline3DBookHTML(book, extraClass, `carousel-cover-${i}`);
  });
  
  container.innerHTML = html;
  
  books.forEach((_, i) => {
    const el = document.querySelector(`.carousel-item-${i}`);
    if (el) {
      const angle = i * angleStep;
      // Z軸方向に押し出して円を作る
      el.style.transform = `rotateY(${angle}deg) translateZ(${carouselRadius}px)`;
    }
  });

  updateCarouselOpenState();

  const btnPrev = document.getElementById("carousel-prev");
  const btnNext = document.getElementById("carousel-next");
  if (btnPrev) btnPrev.addEventListener("click", () => rotateCarousel(1));
  if (btnNext) btnNext.addEventListener("click", () => rotateCarousel(-1));
}

function rotateCarousel(direction) {
  const step = 360 / carouselBooksCount;
  carouselAngle += direction * step;
  const container = document.getElementById("carousel-container");
  if (container) {
    container.style.transform = `rotateY(${carouselAngle}deg)`;
  }
  updateCarouselOpenState();
}

function updateCarouselOpenState() {
  if (carouselBooksCount === 0) return;
  const step = 360 / carouselBooksCount;
  const currentNormalizedAngle = ((carouselAngle % 360) + 360) % 360;
  
  for (let i = 0; i < carouselBooksCount; i++) {
    const itemAngle = i * step;
    // itemAngle に対して container が currentNormalizedAngle だけ回っている
    // コンテナごと回っているので、本自身の角度 + コンテナの角度が 0 に近いものが正面
    const combinedAngle = (itemAngle + currentNormalizedAngle) % 360;
    
    const cover = document.getElementById(`carousel-cover-${i}`);
    if (cover) {
      if (Math.abs(combinedAngle) < 5 || Math.abs(combinedAngle - 360) < 5) {
        cover.style.transform = "rotateY(-175deg)";
      } else {
        cover.style.transform = "rotateY(0deg)";
      }
    }
  }
}

// ---------------------------
// 8. Scroll Altar
// ---------------------------
function renderScrollAltar() {
  const wrapper = document.getElementById("altar-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  const book = LibraryShowcaseBooks[0];
  wrapper.innerHTML = createInline3DBookHTML(book, 'altar-book-inline', 'altar-cover');
  
  const scrollSpace = document.getElementById("altar-scroll-space");
  const altarBook = document.querySelector(".altar-book-inline");
  const altarCover = document.getElementById("altar-cover");
  
  if (scrollSpace && altarBook && altarCover) {
    document.addEventListener("scroll", () => {
      const rect = scrollSpace.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = (windowHeight - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      
      let zPos = -1000;
      let rotX = 60;
      let rotZ = -45;
      let coverAngle = 0;
      
      if (progress < 0.4) {
        let p = progress / 0.4;
        zPos = -1000 * (1 - p);
        rotX = 60 * (1 - p) + 15 * p;
        rotZ = -45 * (1 - p);
      } else {
        zPos = 0;
        rotX = 15;
        rotZ = 0;
      }
      
      if (progress > 0.3 && progress < 0.6) {
        let p = (progress - 0.3) / 0.3;
        let ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        coverAngle = -175 * ease;
      } else if (progress >= 0.6) {
        coverAngle = -175;
      }
      
      altarBook.style.transform = `translateZ(${zPos}px) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`;
      altarCover.style.transform = `rotateY(${coverAngle}deg)`;
    });
  }
}

// ---------------------------
// 9. The Stack
// ---------------------------
const stackCount = 6;
const stackThickness = 22; // 厚みを調整して綺麗に積む

function renderStack() {
  const wrapper = document.getElementById("stack-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  let html = "";
  for (let i = 0; i < stackCount; i++) {
    const bookIndex = i % LibraryShowcaseBooks.length;
    const book = LibraryShowcaseBooks[bookIndex];
    html += createInline3DBookHTML(book, `stack-book-inline stack-item-${i}`, `stack-cover-${i}`);
  }
  wrapper.innerHTML = html;
  
  for (let i = 0; i < stackCount; i++) {
    const el = document.querySelector(`.stack-item-${i}`);
    if (el) {
      const yOffset = -i * stackThickness;
      // 雑にならないよう、角度のランダム性をかなり抑えて上品に
      const rotY = 0;
      const rotZ = (i === stackCount - 1) ? -10 : (Math.random() * 6 - 3); 
      
      const baseTransform = `translateY(${yOffset}px) rotateX(60deg) rotateZ(${rotZ}deg) rotateY(${rotY}deg) scale(0.85)`;
      el.dataset.baseTransform = baseTransform;
      el.dataset.yOffset = yOffset;
      el.style.zIndex = i;
      el.style.transform = baseTransform;
      
      el.addEventListener("mouseenter", () => handleStackHover(i));
      el.addEventListener("mouseleave", () => resetStackHover());
    }
  }
}

function handleStackHover(hoveredIndex) {
  for (let i = 0; i < stackCount; i++) {
    const el = document.querySelector(`.stack-item-${i}`);
    if (!el) continue;
    
    if (i > hoveredIndex) {
      // 上にある本は綺麗に上にリフトアップする
      el.style.transform = el.dataset.baseTransform + " translateY(-180px)";
      el.classList.remove("stack-active");
    } else if (i === hoveredIndex) {
      // ★ 選択された本は、完全にカメラの正面（水平）まで起き上がり、読みやすくする
      const yOffset = el.dataset.yOffset;
      el.style.transform = `translateY(${Number(yOffset) - 60}px) translateZ(150px) rotateX(10deg) rotateZ(0deg) rotateY(0deg) scale(1.0)`;
      el.classList.add("stack-active");
    } else {
      // 下の本はそのまま
      el.style.transform = el.dataset.baseTransform;
      el.classList.remove("stack-active");
    }
  }
}

function resetStackHover() {
  for (let i = 0; i < stackCount; i++) {
    const el = document.querySelector(`.stack-item-${i}`);
    if (el) {
      el.style.transform = el.dataset.baseTransform;
      el.classList.remove("stack-active");
    }
  }
}

// ---------------------------
// 10. The Infinite Spiral
// ---------------------------
function renderSpiral() {
  const wrapper = document.getElementById("spiral-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  const numBooks = 15;
  const radius = 600;
  const yStep = 220; // 縦の間隔
  const angleStep = 45; // 角度の間隔
  
  let html = "";
  for (let i = 0; i < numBooks; i++) {
    const book = LibraryShowcaseBooks[i % LibraryShowcaseBooks.length];
    html += createInline3DBookHTML(book, `spiral-book-inline spiral-item-${i}`, `spiral-cover-${i}`);
  }
  wrapper.innerHTML = html;
  
  for (let i = 0; i < numBooks; i++) {
    const el = document.querySelector(`.spiral-item-${i}`);
    if (el) {
      const angle = i * angleStep;
      const yPos = -i * yStep; // Y軸はマイナス方向（上）へ
      el.style.transform = `rotateY(${angle}deg) translateY(${yPos}px) translateZ(${radius}px)`;
    }
  }
  
  const scrollSpace = document.getElementById("spiral-scroll-space");
  if (scrollSpace) {
    document.addEventListener("scroll", () => {
      const rect = scrollSpace.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      let progress = (windowHeight - rect.top) / rect.height;
      progress = Math.max(0, Math.min(1, progress));
      
      const targetIndexFloat = progress * (numBooks - 1);
      const yOffset = targetIndexFloat * yStep;
      const globalAngle = -targetIndexFloat * angleStep;
      
      // カメラを螺旋に沿って移動させる（ラッパー全体を動かす）
      wrapper.style.transform = `translateY(${yOffset}px) rotateY(${globalAngle}deg)`;
      
      for (let i = 0; i < numBooks; i++) {
        const cover = document.getElementById(`spiral-cover-${i}`);
        if (cover) {
          const dist = Math.abs(i - targetIndexFloat);
          if (dist < 0.6) {
            cover.style.transform = "rotateY(-175deg)";
          } else {
            cover.style.transform = "rotateY(0deg)";
          }
        }
      }
    });
  }
}

// ---------------------------
// 11. Museum Spotlight
// ---------------------------
let museumIndex = 0;
let museumSpinAngle = 0;
let museumSpinReq;

function renderMuseum() {
  const container = document.getElementById("museum-container");
  if (!container || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  let html = "";
  for (let i = 0; i < LibraryShowcaseBooks.length; i++) {
    const book = LibraryShowcaseBooks[i];
    html += createInline3DBookHTML(book, `museum-book-inline museum-item-${i}`, `museum-cover-${i}`);
  }
  container.innerHTML = html;
  
  updateMuseumView();
  
  document.getElementById("museum-prev")?.addEventListener("click", () => {
    museumIndex = (museumIndex - 1 + LibraryShowcaseBooks.length) % LibraryShowcaseBooks.length;
    updateMuseumView();
  });
  document.getElementById("museum-next")?.addEventListener("click", () => {
    museumIndex = (museumIndex + 1) % LibraryShowcaseBooks.length;
    updateMuseumView();
  });
  
  function spinLoop() {
    museumSpinAngle += 0.3; 
    const activeItem = document.querySelector(`.museum-item-${museumIndex}`);
    if (activeItem && !activeItem.classList.contains("museum-hovered")) {
      const book3d = activeItem.querySelector(".book-3d");
      if (book3d) book3d.style.transform = `rotateY(${museumSpinAngle}deg)`;
    }
    museumSpinReq = requestAnimationFrame(spinLoop);
  }
  spinLoop();
}

function updateMuseumView() {
  for (let i = 0; i < LibraryShowcaseBooks.length; i++) {
    const el = document.querySelector(`.museum-item-${i}`);
    if (el) {
      if (i === museumIndex) {
        el.classList.add("museum-active");
        
        el.onmouseenter = () => {
          el.classList.add("museum-hovered");
          const book3d = el.querySelector(".book-3d");
          const currentRotation = museumSpinAngle;
          // 最寄りの正面（360の倍数）にスナップ
          const targetRotation = Math.round(currentRotation / 360) * 360;
          if (book3d) {
            book3d.style.transition = "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)";
            book3d.style.transform = `rotateY(${targetRotation}deg)`;
          }
          const cover = document.getElementById(`museum-cover-${i}`);
          if (cover) cover.style.transform = "rotateY(-175deg)";
        };
        
        el.onmouseleave = () => {
          el.classList.remove("museum-hovered");
          museumSpinAngle = Math.round(museumSpinAngle / 360) * 360; // 内部角度を同期
          const book3d = el.querySelector(".book-3d");
          if (book3d) book3d.style.transition = "none";
          const cover = document.getElementById(`museum-cover-${i}`);
          if (cover) cover.style.transform = "rotateY(0deg)";
        };
      } else {
        el.classList.remove("museum-active");
        el.classList.remove("museum-hovered");
        el.onmouseenter = null;
        el.onmouseleave = null;
        const cover = document.getElementById(`museum-cover-${i}`);
        if (cover) cover.style.transform = "rotateY(0deg)";
      }
    }
  }
}

// ---------------------------
// 12. Ripple Grid
// ---------------------------
function renderRipple() {
  const wrapper = document.getElementById("ripple-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  const numBooks = 28; 
  let html = "";
  for (let i = 0; i < numBooks; i++) {
    const book = LibraryShowcaseBooks[i % LibraryShowcaseBooks.length];
    html += `
      <div class="ripple-item-wrapper ripple-item-${i}">
        ${createInline3DBookHTML(book, `ripple-book-inline`, `ripple-cover-${i}`)}
      </div>
    `;
  }
  wrapper.innerHTML = html;
  
  const items = document.querySelectorAll(".ripple-item-wrapper");
  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      const targetRect = item.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 2;
      
      item.classList.add("ripple-hovered");
      
      items.forEach(other => {
        if (other === item) return;
        const oRect = other.getBoundingClientRect();
        const oX = oRect.left + oRect.width / 2;
        const oY = oRect.top + oRect.height / 2;
        
        const dx = oX - targetX;
        const dy = oY - targetY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 250 && dist > 0) { 
          const force = (250 - dist) / 250; 
          const pushX = (dx / dist) * force * 40; 
          const pushY = (dy / dist) * force * 40;
          other.style.transform = `translate(${pushX}px, ${pushY}px) scale(${1 - force * 0.15})`;
        } else {
          other.style.transform = "translate(0px, 0px) scale(1)";
        }
      });
    });
    
    item.addEventListener("mouseleave", () => {
      item.classList.remove("ripple-hovered");
      items.forEach(other => {
        other.style.transform = "translate(0px, 0px) scale(1)";
      });
    });
  });
}

// ---------------------------
// 13. Planetary Orbit
// ---------------------------
let orbitHoveredIndex = -1;
let globalTime = 0;
let orbitReq;

function renderOrbit() {
  const wrapper = document.getElementById("orbit-wrapper");
  if (!wrapper || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  const numBooks = Math.min(8, LibraryShowcaseBooks.length);
  let html = `<div class="orbit-center"></div>`;
  
  for (let i = 0; i < numBooks; i++) {
    const book = LibraryShowcaseBooks[i];
    const radius = 250 + (i * 30); 
    const speed = 0.3 + (Math.random() * 0.4); 
    const initialAngle = Math.random() * 360;
    
    html += `
      <div class="orbit-book-container orbit-item-${i}" data-index="${i}" data-radius="${radius}" data-speed="${speed}" data-angle="${initialAngle}">
        ${createInline3DBookHTML(book, `orbit-book-inline`, `orbit-cover-${i}`)}
      </div>
    `;
  }
  wrapper.innerHTML = html;
  
  const items = document.querySelectorAll(".orbit-book-container");
  items.forEach(item => {
    item.addEventListener("mouseenter", () => {
      orbitHoveredIndex = parseInt(item.dataset.index);
      
      const bookInline = item.querySelector(".orbit-book-inline");
      bookInline.style.transform = "scale(1.2) rotateX(10deg) translateZ(100px)";
      bookInline.style.zIndex = 100;
      
      const cover = document.getElementById(`orbit-cover-${orbitHoveredIndex}`);
      if (cover) cover.style.transform = "rotateY(-175deg)";
    });
    
    item.addEventListener("mouseleave", () => {
      const idx = parseInt(item.dataset.index);
      const bookInline = item.querySelector(".orbit-book-inline");
      bookInline.style.transform = "scale(1) rotateX(0deg) translateZ(0px)";
      bookInline.style.zIndex = "";
      
      const cover = document.getElementById(`orbit-cover-${idx}`);
      if (cover) cover.style.transform = "rotateY(0deg)";
      
      orbitHoveredIndex = -1;
    });
  });
  
  function orbitLoop() {
    if (orbitHoveredIndex === -1) {
      globalTime += 1; // Hoverされていない時だけ時間が進む
    }
    
    items.forEach(item => {
      const radius = parseFloat(item.dataset.radius);
      const speed = parseFloat(item.dataset.speed);
      const initialAngle = parseFloat(item.dataset.angle);
      
      const currentAngle = (initialAngle + (globalTime * speed)) % 360;
      
      const rad = currentAngle * Math.PI / 180;
      const x = Math.cos(rad) * radius;
      const z = Math.sin(rad) * radius;
      
      // y軸を中心に公転させ、本自体は常に正面を向くように逆回転をかける
      item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${-currentAngle}deg)`;
    });
    
    orbitReq = requestAnimationFrame(orbitLoop);
  }
  orbitLoop();
}

// ---------------------------
// 14. Endless Conveyor
// ---------------------------
let conveyorPos = 0;
let conveyorHovered = false;

function renderConveyor() {
  const track = document.getElementById("conveyor-track");
  if (!track || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  let html = "";
  // ループ用にある程度複製しておく
  const books = [...LibraryShowcaseBooks, ...LibraryShowcaseBooks, ...LibraryShowcaseBooks, ...LibraryShowcaseBooks];
  
  books.forEach((book, i) => {
    html += `
      <div class="conveyor-book-wrapper" data-index="${i}">
        ${createInline3DBookHTML(book, `conveyor-book-inline conveyor-item-${i}`, `conveyor-cover-${i}`)}
      </div>
    `;
  });
  
  track.innerHTML = html;
  
  const items = track.querySelectorAll(".conveyor-book-inline");
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      conveyorHovered = true;
      item.classList.add("conveyor-hovered");
    });
    item.addEventListener("mouseleave", () => {
      conveyorHovered = false;
      item.classList.remove("conveyor-hovered");
    });
  });
  
  function conveyorLoop() {
    if (!conveyorHovered) {
      conveyorPos -= 2.0; 
    }
    
    if (conveyorPos < -5000) {
      conveyorPos += 2500; // 端に行ったら巻き戻す (概算)
    }
    
    track.style.transform = `translateX(${conveyorPos}px)`;
    requestAnimationFrame(conveyorLoop);
  }
  conveyorLoop();
}

// ---------------------------
// 15. Constellation
// ---------------------------
function renderConstellation() {
  const wrapper = document.getElementById("constellation-wrapper");
  const canvas = document.getElementById("constellation-canvas");
  if (!wrapper || !canvas || typeof LibraryShowcaseBooks === "undefined" || LibraryShowcaseBooks.length === 0) return;
  
  const ctx = canvas.getContext('2d');
  const numBooks = Math.min(10, LibraryShowcaseBooks.length);
  const nodes = [];
  
  let html = "";
  for (let i = 0; i < numBooks; i++) {
    const book = LibraryShowcaseBooks[i];
    
    const rx = (Math.random() - 0.5) * 800; 
    const ry = (Math.random() - 0.5) * 400; 
    const rz = (Math.random() - 0.5) * 400;
    
    nodes.push({ id: i, x: rx, y: ry, z: rz });
    
    html += `
      <div class="constellation-node" data-index="${i}" style="position:absolute; transform: translate3d(${rx}px, ${ry}px, ${rz}px);">
        ${createInline3DBookHTML(book, `constellation-book-inline constellation-item-${i}`, `constellation-cover-${i}`)}
      </div>
    `;
  }
  wrapper.innerHTML = html;
  
  let hoveredNode = -1;
  const edges = [];
  for(let i=0; i<numBooks; i++) {
    const target = (i + 1 + Math.floor(Math.random()*3)) % numBooks;
    edges.push([i, target]);
  }
  
  function drawCanvas() {
    const w = canvas.parentElement.offsetWidth;
    const h = canvas.parentElement.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    ctx.clearRect(0, 0, w, h);
    
    const cx = w / 2;
    const cy = h / 2 + 50;
    const f = 2500;
    
    edges.forEach(([a, b]) => {
      const nodeA = nodes[a];
      const nodeB = nodes[b];
      
      const scaleA = f / (f - nodeA.z);
      const pxA = cx + (nodeA.x * scaleA);
      const pyA = cy + (nodeA.y * scaleA);
      
      const scaleB = f / (f - nodeB.z);
      const pxB = cx + (nodeB.x * scaleB);
      const pyB = cy + (nodeB.y * scaleB);
      
      ctx.beginPath();
      ctx.moveTo(pxA, pyA);
      ctx.lineTo(pxB, pyB);
      
      if (hoveredNode === a || hoveredNode === b) {
        ctx.strokeStyle = "rgba(160, 192, 240, 0.9)";
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(160, 192, 240, 0.8)";
      } else {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.shadowBlur = 0;
      }
      ctx.stroke();
    });
    requestAnimationFrame(drawCanvas);
  }
  drawCanvas();
  
  const items = document.querySelectorAll(".constellation-node");
  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      hoveredNode = parseInt(item.dataset.index);
      const book = item.querySelector(".constellation-book-inline");
      book.classList.add("constellation-hovered");
    });
    item.addEventListener("mouseleave", () => {
      hoveredNode = -1;
      const book = item.querySelector(".constellation-book-inline");
      book.classList.remove("constellation-hovered");
    });
  });
}
