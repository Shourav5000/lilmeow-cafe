document.documentElement.classList.add('js');

(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: '5MW4lMv5kQQFbX-BW' });
  }
})();

const cur = document.getElementById('cursor');
const curT = document.getElementById('cursor-trail');

if (cur && curT) {
  document.addEventListener('mousemove', (e) => {
    cur.style.left = e.clientX + 'px';
    cur.style.top = e.clientY + 'px';

    setTimeout(() => {
      curT.style.left = e.clientX + 'px';
      curT.style.top = e.clientY + 'px';
    }, 80);
  });

  document.addEventListener('mousedown', () => cur.classList.add('clicked'));
  document.addEventListener('mouseup', () => cur.classList.remove('clicked'));

  document
    .querySelectorAll('a,button,.pillar,.cat-card,.exp-card,.mi,.ts,.pc,.fq,.gallery-item,.today-cat,.soc,.sbox,.pill')
    .forEach((el) => {
      el.addEventListener('mouseenter', () => cur.classList.add('hovered'));
      el.addEventListener('mouseleave', () => cur.classList.remove('hovered'));
    });
}

const canvas = document.getElementById('pawCanvas');
let ctx = null;
const paws = [];

if (canvas) {
  ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  function drawPaw(x, y, size, opacity, color) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();

    [
      [-0.7, -0.9, 0.4],
      [0.7, -0.9, 0.4],
      [-0.5, -0.5, 0.35],
      [0.5, -0.5, 0.35],
    ].forEach(([tx, ty, tr]) => {
      ctx.beginPath();
      ctx.arc(x + tx * size, y + ty * size, tr * size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.restore();
  }

  (function animPaws() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = paws.length - 1; i >= 0; i--) {
      const p = paws[i];
      p.y -= p.speed;
      p.opacity -= 0.003;

      if (p.opacity <= 0) {
        paws.splice(i, 1);
        continue;
      }

      drawPaw(p.x, p.y, p.size, p.opacity, p.color);
    }

    requestAnimationFrame(animPaws);
  })();

  document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.06) {
      const c = ['#FF8FAB', '#FFD6E0', '#C9B8FF', '#B5EAD7'][Math.floor(Math.random() * 4)];
      paws.push({
        x: e.clientX,
        y: e.clientY,
        size: 8 + Math.random() * 10,
        speed: 0.6 + Math.random(),
        opacity: 0.5 + Math.random() * 0.3,
        color: c,
      });
    }
  });
}

const heroEmojis = ['🌸', '⭐', '✨', '😸', '😽'];

setInterval(() => {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const el = document.createElement('div');
  el.className = 'float-emoji';
  el.textContent = heroEmojis[Math.floor(Math.random() * heroEmojis.length)];

  const isMobile = window.innerWidth <= 768;
  const lanes = isMobile ? [8, 18, 28, 72, 82, 92] : null;
  const left = isMobile ? lanes[Math.floor(Math.random() * lanes.length)] : Math.random() * 100;

  const size = isMobile ? 1.2 + Math.random() * 0.25 : 1 + Math.random() * 1.2;
  const duration = isMobile ? 6 + Math.random() * 2 : 6 + Math.random() * 6;

  el.style.left = `${left}%`;
  el.style.bottom = `-16px`;
  el.style.fontSize = `${size}rem`;
  el.style.animationDuration = `${duration}s`;
  el.style.animationDelay = `0s`;
  el.style.zIndex = `9`;
  el.style.opacity = `1`;

  hero.appendChild(el);
  setTimeout(() => el.remove(), 10000);
}, 1600);

const catEmojis = ['🐱', '😺', '😸', '😻', '🐾'];
let ci = 0;
setInterval(() => {
  const h = document.getElementById('heroCat');
  if (h) h.textContent = catEmojis[(ci = (ci + 1) % catEmojis.length)];
}, 3000);

window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  const btt = document.getElementById('btt');

  if (nav) nav.classList.toggle('scrolled', window.scrollY > 60);
  if (btt) btt.classList.toggle('show', window.scrollY > 400);

  highlightToday();
});

window.toggleMobile = function () {
  const mobileMenu = document.getElementById('mobileMenu');
  if (mobileMenu) mobileMenu.classList.toggle('open');
};

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function highlightToday() {
  const today = days[new Date().getDay()];
  document.querySelectorAll('.hlist li').forEach((li) => {
    li.classList.remove('today-highlight');
    const d = li.querySelector('.hday');
    if (d && d.textContent === today) li.classList.add('today-highlight');
  });
}
highlightToday();

let purrDone = false;
const obs = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        if (!purrDone) animatePurrBars();
      }
    }),
  { threshold: 0.1 }
);

document.querySelectorAll('.rv,.rv-left,.rv-right').forEach((el) => obs.observe(el));

function animatePurrBars() {
  purrDone = true;
  document.querySelectorAll('.purr-fill').forEach((bar) => {
    setTimeout(() => (bar.style.width = bar.dataset.width + '%'), 300);
  });
}

let toastTimer;
window.showToast = function (msg) {
  clearTimeout(toastTimer);

  const toastMsg = document.getElementById('toastMsg');
  const t = document.getElementById('toast');

  if (!toastMsg || !t) return;

  toastMsg.textContent = msg;
  t.classList.add('show');
  toastTimer = setTimeout(() => t.classList.remove('show'), 4500);
};

window.closeToast = function () {
  const toast = document.getElementById('toast');
  if (toast) toast.classList.remove('show');
};

window.openCat = function (name, emoji, desc) {
  const lbEmoji = document.getElementById('lbEmoji');
  const lbName = document.getElementById('lbName');
  const lbDesc = document.getElementById('lbDesc');
  const lightbox = document.getElementById('lightbox');

  if (!lbEmoji || !lbName || !lbDesc || !lightbox) return;

  lbEmoji.textContent = emoji;
  lbName.textContent = name;
  lbDesc.textContent = desc;
  lightbox.classList.add('open');
};

window.openGallery = function (emoji, name, desc) {
  const lbEmoji = document.getElementById('lbEmoji');
  const lbName = document.getElementById('lbName');
  const lbDesc = document.getElementById('lbDesc');
  const lightbox = document.getElementById('lightbox');

  if (!lbEmoji || !lbName || !lbDesc || !lightbox) return;

  lbEmoji.textContent = emoji;
  lbName.textContent = name;
  lbDesc.textContent = desc;
  lightbox.classList.add('open');
};

window.closeLb = function (e) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  if (!e || e.target === lightbox || (e.currentTarget && e.currentTarget.classList.contains('lb-close'))) {
    lightbox.classList.remove('open');
  }
};

const catReactions = ['😻', '😹', '🙀', '😾', '😸', '🐱', '😺', '😽'];
let ri = 0;
window.catReact = function (el) {
  if (!el) return;
  el.textContent = catReactions[ri % catReactions.length];
  ri++;
  window.showToast('🐾 Click again for another reaction!');
};

window.switchTab = function (btn, id) {
  document.querySelectorAll('.mtab').forEach((t) => t.classList.remove('on'));
  document.querySelectorAll('.mpanel').forEach((p) => p.classList.remove('on'));

  if (btn) btn.classList.add('on');

  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('on');
};

window.faqToggle = function (el) {
  if (!el) return;

  const item = el.parentElement;
  if (!item) return;

  const open = item.classList.contains('open');
  document.querySelectorAll('.fq').forEach((f) => f.classList.remove('open'));
  if (!open) item.classList.add('open');
};

let selT = '';
let selPkg = '';
let selPrice = 0;
let curStep = 1;

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dateEl = document.getElementById('rDate');
if (dateEl) dateEl.min = tomorrow.toISOString().split('T')[0];

const progWidths = ['33%', '66%', '100%'];

window.go = function (n) {
  if (n > curStep) {
    if (curStep === 1) {
      const rDate = document.getElementById('rDate');
      const rGuests = document.getElementById('rGuests');

      if (!rDate || !rDate.value) {
        window.showToast('🗓️ Please pick a date first!');
        if (rDate) rDate.focus();
        return;
      }
      if (!rGuests || !rGuests.value) {
        window.showToast('👥 How many guests are coming?');
        if (rGuests) rGuests.focus();
        return;
      }
      if (!selT) {
        window.showToast('⏰ Pick a time slot to continue!');
        return;
      }
      window.showToast('😻 Great choices! Now pick your package...');
    }

    if (curStep === 2 && !selPkg) {
      window.showToast('🎟️ Choose a package to continue!');
      return;
    }

    if (curStep === 2 && selPkg) {
      window.showToast('🐾 Almost there! Just your details...');
    }

    if (curStep === 3) {
      const rFirst = document.getElementById('rFirst');
      const rLast = document.getElementById('rLast');
      const rEmail = document.getElementById('rEmail');
      const rPhone = document.getElementById('rPhone');

      if (!rFirst || !rFirst.value) {
        window.showToast('💕 Please enter your first name!');
        if (rFirst) rFirst.focus();
        return;
      }
      if (!rLast || !rLast.value) {
        window.showToast('💕 Please enter your last name!');
        if (rLast) rLast.focus();
        return;
      }
      if (!rEmail || !rEmail.value.includes('@')) {
        window.showToast('📧 Please enter a valid email!');
        if (rEmail) rEmail.focus();
        return;
      }
      if (!rPhone || !rPhone.value) {
        window.showToast('📞 Please enter your phone!');
        if (rPhone) rPhone.focus();
        return;
      }
    }

    if (n === 3) fillSum();
  }

  const currentPanel = document.getElementById('s' + curStep);
  if (currentPanel) {
    currentPanel.style.opacity = '0';
    currentPanel.style.transform = 'translateX(-30px)';
    currentPanel.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  }

  setTimeout(function () {
    document.querySelectorAll('.spanel').forEach((p) => {
      p.classList.remove('on');
      p.style.opacity = '';
      p.style.transform = '';
      p.style.transition = '';
    });

    document.querySelectorAll('.sp').forEach((s) => s.classList.remove('on'));

    const nextPanel = document.getElementById('s' + n);
    const nextStep = document.getElementById('sp' + n);
    const resProg = document.getElementById('resProg');

    if (nextPanel) nextPanel.classList.add('on');
    if (nextStep) nextStep.classList.add('on');

    for (let i = 1; i < n; i++) {
      const prevStep = document.getElementById('sp' + i);
      if (prevStep) prevStep.classList.add('done');
    }

    if (resProg) resProg.style.width = progWidths[n - 1];
    curStep = n;

    if (nextPanel) {
      nextPanel.style.opacity = '0';
      nextPanel.style.transform = 'translateX(30px)';
      nextPanel.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      setTimeout(function () {
        nextPanel.style.opacity = '1';
        nextPanel.style.transform = 'translateX(0)';
      }, 20);
    }

    const card = document.getElementById('resCard');
    if (card) {
      const top = card.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }, 250);
};

window.pickT = function (el) {
  document.querySelectorAll('.ts').forEach((s) => s.classList.remove('on'));
  if (!el) return;
  el.classList.add('on');
  selT = el.dataset.t;
};

window.pickP = function (el, n, p) {
  document.querySelectorAll('.pc').forEach((c) => c.classList.remove('on'));
  if (!el) return;
  el.classList.add('on');
  selPkg = n;
  selPrice = p;
};

function fillSum() {
  const rDate = document.getElementById('rDate');
  const rGuests = document.getElementById('rGuests');
  const sd = document.getElementById('sd');
  const st = document.getElementById('st');
  const sg = document.getElementById('sg');
  const spkg = document.getElementById('spkg');
  const sa = document.getElementById('sa');

  if (!sd || !st || !sg || !spkg || !sa) return;

  const dt = rDate ? rDate.value : '';
  const g = parseInt(rGuests ? rGuests.value : '1', 10) || 1;
  const addonCost = addonSelected ? 15 * g : 0;
  const total = selPrice * g + addonCost;

  const fmt = dt
    ? new Date(dt + 'T12:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : '—';

  sd.textContent = fmt;
  st.textContent = selT || '—';
  sg.textContent = g + ' guest' + (g > 1 ? 's' : '');
  spkg.textContent = selPkg + (addonSelected ? ' + 📸 Purr Extra Special' : '');
  sa.textContent = '$' + total + '.00';
}

window.fmtC = function (el) {
  if (!el) return;
  let v = el.value.replace(/\D/g, '').substring(0, 16);
  el.value = v.replace(/(.{4})/g, '$1 ').trim();
};

window.fmtE = function (el) {
  if (!el) return;
  let v = el.value.replace(/\D/g, '');
  if (v.length >= 2) v = v.substring(0, 2) + ' / ' + v.substring(2, 4);
  el.value = v;
};

window.validateField = function (el) {
  if (!el) return;
  el.classList.toggle('valid', el.value.length > 0);
  el.classList.toggle('invalid', el.value.length === 0);
};

window.validateEmail = function (el) {
  if (!el) return;
  const ok = el.value.includes('@') && el.value.includes('.');
  el.classList.toggle('valid', ok);
  el.classList.toggle('invalid', !ok && el.value.length > 0);
};

window.pay = function () {
  const rFirst = document.getElementById('rFirst');
  const rLast = document.getElementById('rLast');
  const rEmail = document.getElementById('rEmail');
  const rPhone = document.getElementById('rPhone');
  const rGuests = document.getElementById('rGuests');
  const payBtn = document.getElementById('payBtn');

  if (!rFirst || !rFirst.value || !rLast || !rLast.value) {
    window.showToast('💕 Please fill in your name!');
    return;
  }
  if (!rEmail || !rEmail.value.includes('@')) {
    window.showToast('📧 Please enter a valid email!');
    return;
  }
  if (!rPhone || !rPhone.value) {
    window.showToast('📞 Please enter your phone number!');
    return;
  }
  if (!payBtn) return;

  payBtn.innerHTML = '⏳ Confirming...';
  payBtn.disabled = true;

  const ref = 'LMC-' + Math.floor(100000 + Math.random() * 900000);
  const guests = rGuests ? rGuests.value || '1' : '1';
  const total = selPrice * parseInt(guests, 10) + (addonSelected ? 15 * parseInt(guests, 10) : 0);
  const addon = addonSelected ? 'Yes — Cat Treats + Polaroid Photo (+$15/person)' : 'No';

  const templateParams = {
    to_name: rFirst.value + ' ' + rLast.value,
    to_email: rEmail.value,
    booking_ref: ref,
    date: document.getElementById('sd') ? document.getElementById('sd').textContent : '',
    time: selT,
    guests: guests + ' guest' + (parseInt(guests, 10) > 1 ? 's' : ''),
    package: selPkg,
    total: '$' + total + '.00 (pay on arrival)',
    addon: addon,
    phone: rPhone.value,
  };

  function showSuccess() {
    const resCard = document.getElementById('resCard');
    const bCode = document.getElementById('bCode');
    const succBox = document.getElementById('succBox');

    if (resCard) resCard.style.display = 'none';
    if (bCode) bCode.textContent = ref;
    if (succBox) succBox.classList.add('show');

    launchConfetti();
    window.showToast('✉️ Confirmation sent to ' + rEmail.value + '!');
  }

  emailjs
    .send('service_rlsav7s', 'template_z8fdc9g', templateParams)
    .then(() => showSuccess())
    .catch(() => showSuccess());
};

function launchConfetti() {
  const container = document.getElementById('confettiBox');
  if (!container) return;

  const emojis = ['🎉', '🐾', '🌸', '😻', '☕', '✨', '💕', '🎊', '😽'];

  const style = document.createElement('style');
  style.textContent = '@keyframes confettiFall{to{transform:translateY(110vh) rotate(720deg);opacity:0}}';
  document.head.appendChild(style);

  for (let i = 0; i < 40; i++) {
    const el = document.createElement('div');
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:-50px;font-size:${1.2 + Math.random() * 1.5}rem;pointer-events:none;z-index:9997;animation:confettiFall ${2 + Math.random() * 3}s ease-in ${Math.random() * 2}s forwards`;
    container.appendChild(el);
  }

  setTimeout(() => (container.innerHTML = ''), 7000);
}

window.subscribe = function () {
  const nlEmail = document.getElementById('nlEmail');
  const nlForm = document.getElementById('nlForm');
  const nlSuccess = document.getElementById('nlSuccess');

  if (!nlEmail || !nlForm || !nlSuccess) return;

  const e = nlEmail.value;
  if (!e || !e.includes('@')) {
    window.showToast('📧 Please enter a valid email!');
    return;
  }

  emailjs
    .send('service_rlsav7s', 'template_z8fdc9g', {
      to_email: e,
      to_name: e.split('@')[0],
    })
    .catch(() => {});

  nlForm.style.display = 'none';
  nlSuccess.classList.add('show');
  window.showToast('🌸 Welcome to the Meow Club, ' + e + '! 💕');
};

let addonSelected = false;
window.toggleAddon = function (el) {
  const check = document.getElementById('addonCheck');
  if (!el || !check) return;

  addonSelected = !addonSelected;

  if (addonSelected) {
    el.style.background = 'linear-gradient(135deg,#FFF3B0,#FFE55C)';
    el.style.borderColor = '#FFB300';
    check.textContent = '✓';
    check.style.background = 'var(--yellow)';
    check.style.color = 'var(--brown)';
    showToast('📸 Purr Extra Special added! +$15/person');
  } else {
    el.style.background = 'linear-gradient(135deg,#FFFBE6,#FFF8DC)';
    el.style.borderColor = 'var(--yellow)';
    check.textContent = '•';
    check.style.background = 'white';
  }
};

const reviews = [
  {
    name: 'Sarah M.',
    rating: 5,
    date: '2 weeks ago',
    text: 'Absolutely the most magical place! Mochi sat on my lap the entire time and I never wanted to leave. The matcha latte was incredible too. 10/10 will be back every week!',
    avatar: '😻',
  },
  {
    name: 'James K.',
    rating: 5,
    date: '1 month ago',
    text: 'Brought my daughter for her birthday and she was in heaven. Lulu knocked her croissant off the table and then looked completely innocent 😂 The staff were so warm and welcoming.',
    avatar: '🐱',
  },
  {
    name: 'Priya L.',
    rating: 5,
    date: '3 weeks ago',
    text: 'The Purr Extra Special add-on is SO worth it. Getting to hand-feed the cats treats and take home a Polaroid was the cutest thing ever. Nishi is my new best friend.',
    avatar: '😽',
  },
  {
    name: 'Tom R.',
    rating: 5,
    date: '1 week ago',
    text: 'Came in as a walk-in on a Friday and they found us a spot right away. Boba is massive and fluffy and the gentlest soul. The Brown Sugar Chai is a must-order.',
    avatar: '😺',
  },
  {
    name: 'Mei C.',
    rating: 5,
    date: '2 months ago',
    text: 'Luna poses like she knows she is a model — because she absolutely does. Stunning cat in a stunning café. The Purr Package is perfect, exactly the right amount of time.',
    avatar: '🐾',
  },
  {
    name: 'Alex D.',
    rating: 4,
    date: '3 weeks ago',
    text: 'Great vibes, great coffee, great cats. Pumpkin had the zoomies the whole time and it was the most entertaining thing I have ever witnessed. Will definitely be back!',
    avatar: '😻',
  },
];

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;

  grid.innerHTML = reviews
    .map(
      (r, i) => `
<div class="rv" style="background:white;border-radius:24px;padding:1.6rem;border:2.5px solid var(--pink-light);box-shadow:var(--sh);transition:all .3s;position:relative;overflow:hidden;transition-delay:${i * 0.08}s"
onmouseover="this.style.borderColor='var(--pink)';this.style.transform='translateY(-5px)';this.style.boxShadow='var(--sh-lg)'"
onmouseout="this.style.borderColor='var(--pink-light)';this.style.transform='translateY(0)';this.style.boxShadow='var(--sh)'">
<div style="position:absolute;top:-10px;right:-10px;font-size:4rem;opacity:.06">${r.avatar}</div>
<div style="display:flex;align-items:center;gap:10px;margin-bottom:.9rem">
<div style="width:44px;height:44px;background:linear-gradient(135deg,var(--pink-soft),var(--yellow-light));border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.4rem;border:2px solid var(--pink-light);flex-shrink:0">${r.avatar}</div>
<div>
<div style="font-weight:800;font-size:.92rem;color:var(--brown)">${r.name}</div>
<div style="font-size:.72rem;color:var(--brown-l);font-weight:600">${r.date} · Google Review</div>
</div>
<div style="margin-left:auto;color:#FFB300;font-size:1rem;letter-spacing:1px">${'⭐'.repeat(r.rating)}</div>
</div>
<p style="font-size:.87rem;color:var(--brown-m);font-weight:600;line-height:1.7;font-style:italic">"${r.text}"</p>
</div>
`
    )
    .join('');

  grid.querySelectorAll('.rv').forEach((el) => obs.observe(el));
}
renderReviews();

window.jumpBook = function () {
  const reserve = document.getElementById('reserve');
  if (reserve) reserve.scrollIntoView({ behavior: 'smooth' });
};

window.cookieAccept = function () {
  localStorage.setItem('lmc_cookie', 'accepted');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.transform = 'translateY(100%)';
};

window.cookieDecline = function () {
  localStorage.setItem('lmc_cookie', 'declined');
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.style.transform = 'translateY(100%)';
};

(function () {
  setTimeout(function () {
    if (!localStorage.getItem('lmc_cookie')) {
      const b = document.getElementById('cookieBanner');
      if (b) b.style.transform = 'translateY(0)';
    }
  }, 2500);
})();

/* === playful enhancement pack === */
(function () {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const px = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const py = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
      heroContent.style.transform = `rotateX(${(-py).toFixed(2)}deg) rotateY(${px.toFixed(2)}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }

  document.querySelectorAll('.btn, .mchip, .exp-btn, .cc-btn, .nav-book').forEach((el) => {
    el.classList.add('magnet-btn');

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  document.querySelectorAll('.pillar-img, .exp-img, .today-cat-emoji').forEach((el) => {
    if (/☕|🧋|🍵/.test(el.textContent)) {
      const steam = document.createElement('div');
      steam.className = 'coffee-steam';
      steam.innerHTML =
        '<span class="steam-line"></span><span class="steam-line"></span><span class="steam-line"></span>';
      el.style.position = 'relative';
      el.appendChild(steam);
    }
  });

  const popEmojis = ['🐾', '☕', '😻', '✨', '💕', '🐱'];
  document.addEventListener('click', (e) => {
    if (!e.target.closest('button,a,.today-cat,.gallery-item,.cat-card,.pillar,.exp-card,.mi,.mchip')) return;

    const pop = document.createElement('span');
    pop.className = 'floating-pop';
    pop.textContent = popEmojis[Math.floor(Math.random() * popEmojis.length)];
    pop.style.left = e.clientX + 'px';
    pop.style.top = e.clientY + 'px';
    document.body.appendChild(pop);

    setTimeout(() => pop.remove(), 900);
  });

  const funFacts = [
    '☕ Tip: iced or hot, every drink can be your main character moment.',
    '🐾 Tiny paws, giant personalities.',
    '😻 Slow blink at a cat and you might get one back.',
    '✨ Cute overload is part of the experience.',
    '🍰 Coffee + cats + cozy corners = perfect day.',
  ];

  const badge = document.querySelector('.hero-badge');
  if (badge) {
    let factIndex = 0;
    setInterval(() => {
      factIndex = (factIndex + 1) % funFacts.length;
      badge.setAttribute('title', funFacts[factIndex]);
    }, 2500);
  }

  document.querySelectorAll('.rv').forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i * 0.05, 0.35)}s`;
  });
})();

/* ===== Premium Cute Enhancements ===== */
(function () {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const sparkleField = document.getElementById('sparkleField');

  if (sparkleField && !sparkleField.dataset.ready) {
    sparkleField.dataset.ready = '1';
    const sparkleIcons = ['✨', '🌸', '💖', '☕', '🐾', '⭐'];

    for (let i = 0; i < 18; i++) {
      const s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = sparkleIcons[Math.floor(Math.random() * sparkleIcons.length)];
      s.style.left = Math.random() * 100 + '%';
      s.style.top = Math.random() * 100 + '%';
      s.style.animationDelay = Math.random() * 2.6 + 's';
      s.style.fontSize = 0.8 + Math.random() * 0.9 + 'rem';
      sparkleField.appendChild(s);
    }
  }

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      heroContent.style.transform = `perspective(1200px) rotateY(${x * 0.6}deg) rotateX(${y * -0.5}deg) translateY(-2px)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
    });
  }

  document.querySelectorAll('.btn,.cc-btn,.exp-btn,.mood-chip').forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * 0.04}px, ${y * 0.05}px) translateY(-2px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  const tapBurst = (x, y) => {
    const emojis = ['🐾', '☕', '💖', '✨', '😻', '🌸'];

    for (let i = 0; i < 6; i++) {
      const el = document.createElement('div');
      el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      el.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:99996;pointer-events:none;font-size:${0.9 + Math.random() * 0.7}rem;transition:transform .7s ease, opacity .7s ease`;
      document.body.appendChild(el);

      requestAnimationFrame(() => {
        const dx = (Math.random() - 0.5) * 90;
        const dy = -20 - Math.random() * 80;
        el.style.transform = `translate(${dx}px, ${dy}px) rotate(${(Math.random() - 0.5) * 90}deg)`;
        el.style.opacity = '0';
      });

      setTimeout(() => el.remove(), 800);
    }
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('button,a,.pill,.cat-card,.mi,.today-cat,.gallery-item')) {
      tapBurst(e.clientX, e.clientY);
    }
  });

  window.setCafeMood = function (btn, mood) {
    document.querySelectorAll('.mood-chip').forEach((ch) => ch.classList.remove('active'));
    if (btn) btn.classList.add('active');

    const note = document.getElementById('moodNote');
    const map = {
      cozy: '🌸 Cozy mode: soft music, slow blinks, warm drinks, and cuddly lap-cat energy.',
      playful: '😸 Playful mode: more zoomies, more paw taps, more fun little surprises around the café.',
      coffee: '☕ Coffee date mode: dreamy sips, cute corners, and a polished little café moment.',
      photo: '📸 Photo mood: best corners, cutest poses, and lots of pretty little details for pics.',
    };

    if (note) {
      note.textContent = map[mood] || "Lil' Meow is feeling adorable today.";
      note.classList.remove('reveal-soft');
      void note.offsetWidth;
      note.classList.add('reveal-soft');
    }

    if (window.showToast) {
      const toasts = {
        cozy: '🌸 Cozy mode activated!',
        playful: '😸 Playful mode activated!',
        coffee: '☕ Coffee date mode activated!',
        photo: '📸 Photo mood activated!',
      };
      window.showToast(toasts[mood] || '✨ Mood changed!');
    }
  };
})();

/* ===== SOFT 3D ANIMATION PACK ===== */
(function () {
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  const heroCat = document.getElementById('heroCat');

  if (heroCat) heroCat.classList.add('float-3d');

  document.querySelectorAll('.pillar, .cat-card, .exp-card').forEach((el) => {
    el.classList.add('depth-shadow');
  });

  if (hero && heroContent) {
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateY = (x - 0.5) * 14;
      const rotateX = (0.5 - y) * 10;

      heroContent.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    hero.addEventListener('mouseleave', () => {
      heroContent.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });
  }
})();
