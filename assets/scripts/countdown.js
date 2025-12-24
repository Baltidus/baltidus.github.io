const timerEl = document.querySelector('.gift_header-timer');
const secretEl = document.getElementById('gift_header-secret');
const giftImage = document.getElementById('gift-image');

const targetDate = new Date('2025-12-25T09:30:00').getTime();
let isUnlocked = false; // deviens true à la fin du compte à rebours

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    timerEl.textContent = "00 days : 00 hours : 00 minutes : 00 seconds";
    if (!isUnlocked) {
      secretEl.style.display = 'block';
      setTimeout(() => secretEl.classList.add('show'), 50);
      isUnlocked = true;
    }
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  timerEl.textContent =
    `${days.toString().padStart(2, '0')} days : ` +
    `${hours.toString().padStart(2, '0')} hours : ` +
    `${minutes.toString().padStart(2, '0')} minutes : ` +
    `${seconds.toString().padStart(2, '0')} seconds`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// --- Interaction sur le cadeau ---
giftImage.addEventListener('click', () => {
  if (!isUnlocked) {
    alert("⏳ Il faut encore patienter un peu !");
  } else {
    showPopup();
  }
});

// --- Pop-up code secret ---
function showPopup() {
  // Crée le pop-up s’il n’existe pas encore
  let popup = document.querySelector('.popup');
  if (!popup) {
    popup = document.createElement('div');
    popup.className = 'popup';
    popup.innerHTML = `
      <div class="popup-content">
        <h3>Entre ton code 🎁</h3>
        <input type="password" id="gift-code" placeholder="Entre ton code sous la forme DDMMYY">
        <button id="validate-code">Valider</button>
      </div>
    `;
    document.body.appendChild(popup);
  }

  popup.classList.add('show');

  popup.querySelector('#validate-code').onclick = () => {
    const code = popup.querySelector('#gift-code').value.trim();
    if (code === "230405") {
        alert("🎉 Joyeux Noël ! 🎄");
        window.location.href = "./pages/giftopening.html";
    } else {
        alert("Essaye encore ! 😇");
    }
  };

  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.remove('show');
  });
}
