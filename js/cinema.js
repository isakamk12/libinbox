/* ==========================================================================
   CINEMA THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFilmReel();
  initTickets();
});

/* 1. The Film Reel Scroll */
function initFilmReel() {
  const content = document.getElementById('film-content');
  if (!content) return;

  const movies = [
    { title: 'THE GODFATHER', color: '#c0392b' },
    { title: 'CASABLANCA', color: '#7f8c8d' },
    { title: '2001: SPACE ODYSSEY', color: '#2980b9' },
    { title: 'PULP FICTION', color: '#f39c12' },
    { title: 'MATRIX', color: '#27ae60' },
    { title: 'INCEPTION', color: '#8e44ad' },
    { title: 'INTERSTELLAR', color: '#34495e' },
    { title: 'JURASSIC PARK', color: '#16a085' }
  ];

  movies.forEach(movie => {
    const frame = document.createElement('div');
    frame.className = 'film-frame';
    
    frame.innerHTML = `
      <div class="film-poster" style="background-color: ${movie.color};">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; opacity: 0.3; font-size: 5rem;">🎞️</div>
      </div>
      <div class="film-title">${movie.title}</div>
    `;
    
    content.appendChild(frame);
  });

  // スクロール連動のカタカタ音（視覚的な振動エフェクト）
  const wrapper = document.querySelector('.reel-container-wrapper');
  let isScrolling;
  
  wrapper.addEventListener('scroll', () => {
    content.style.filter = 'sepia(50%) blur(1px)';
    
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
      content.style.filter = 'none';
    }, 150);
  });
}

/* 2. The Ticket Stub */
function initTickets() {
  const hall = document.getElementById('ticket-hall');
  if (!hall) return;

  const shows = [
    { title: 'CITIZEN KANE', date: 'Oct 24, 2026', time: '19:00', seat: 'A-12', desc: 'The masterpiece of Orson Welles. A must-see classic.' },
    { title: 'BLADE RUNNER', date: 'Nov 15, 2026', time: '21:30', seat: 'C-05', desc: 'Sci-fi noir at its finest. Final Cut version.' },
    { title: 'AMELIE', date: 'Dec 01, 2026', time: '14:00', seat: 'F-22', desc: 'A charming, imaginative comedy set in Paris.' }
  ];

  shows.forEach(show => {
    const ticket = document.createElement('div');
    ticket.className = 'ticket';

    ticket.innerHTML = `
      <div class="ticket-main">
        <h3 class="ticket-title">${show.title}</h3>
        <div class="ticket-info">
          <span>📅 ${show.date}</span> | <span>🕒 ${show.time}</span> | <span>💺 Seat: ${show.seat}</span>
        </div>
      </div>
      <div class="ticket-stub">
        ADMIT ONE
      </div>
      <div class="ticket-details">
        <strong style="color: #f1c40f;">SYNOPSIS:</strong><br>
        <span style="font-size: 0.9rem;">${show.desc}</span><br>
        <div style="margin-top: 10px; display: flex; gap: 10px;">
          <button class="theme-btn" style="padding: 5px 15px; font-size: 0.8rem;">PLAY TRAILER</button>
        </div>
      </div>
    `;

    // クリックでもぎる
    ticket.addEventListener('click', () => {
      ticket.classList.toggle('torn');
    });

    hall.appendChild(ticket);
  });
}
