document.addEventListener("DOMContentLoaded", () => {
  // Theme Switcher Component
  const themeSwitcherContainer = document.getElementById("theme-switcher-container");
  
  if (themeSwitcherContainer) {
    const themeSwitcherHTML = `
      <div class="theme-switcher" aria-label="テーマ切り替え">
        <div class="mega-category">
          <span class="mega-btn">PUBLIC ▼</span>
          <div class="mega-dropdown">
            <a href="index.html">Library</a>
            <a href="music.html">Music</a>
            <a href="art.html">Art</a>
            <a href="museum.html">Museum</a>
            <a href="cinema.html">Cinema</a>
            <a href="aquarium.html">Aquarium</a>
            <a href="observatory.html">Observatory</a>
            <a href="botanical.html">Botanical</a>
            <a href="theater.html">Theater</a>
          </div>
        </div>
        <div class="mega-category">
          <span class="mega-btn">COMMERCIAL ▼</span>
          <div class="mega-dropdown">
            <a href="restaurant.html">Restaurant</a>
            <a href="mall.html">Shopping Mall</a>
            <a href="sports.html">Sports Shop</a>
            <a href="arcade.html">Arcade</a>
            <a href="cafe.html">Cafe</a>
            <a href="bank.html">Bank</a>
          </div>
        </div>
        <div class="mega-category">
          <span class="mega-btn">SCHOOL ▼</span>
          <div class="mega-dropdown">
            <a href="school-es.html">Elementary</a>
            <a href="school-jhs.html">Junior High</a>
            <a href="school-hs.html">High School</a>
            <a href="school-uni.html">University</a>
            <a href="school-voc.html">Vocational</a>
          </div>
        </div>
        <div class="mega-category">
          <span class="mega-btn">INFRASTRUCTURE ▼</span>
          <div class="mega-dropdown">
            <a href="station.html">Station</a>
          </div>
        </div>
      </div>
    `;
    
    themeSwitcherContainer.innerHTML = themeSwitcherHTML;

    // 現在のページに合わせて active クラスを付与
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const links = themeSwitcherContainer.querySelectorAll('.mega-dropdown a');
    
    links.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
});
