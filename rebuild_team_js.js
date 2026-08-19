const fs = require('fs');

let js = fs.readFileSync('team.js', 'utf8');

// Find where MEMBERS begins and where the first MEMBERS definition ends
const firstMembersEnd = js.indexOf('/* ── Modal open/close ── */');
const membersBlock = js.substring(0, firstMembersEnd).trim();

const codeAfter = `/* ── Modal open/close ── */
const overlay = document.getElementById('bioOverlay');
const modal = document.getElementById('bioModal');
const closeBtn = document.getElementById('bioClose');
const inner = document.getElementById('bioInner');

function openModal(memberId) {
  const m = MEMBERS[memberId];
  if (!m) return;

  const roleLines = m.role.split('\\n').join('<br>');
  const addressLines = m.address.split('\\n').join('<br>');

  const desHtml = m.designations.length
    ? m.designations.map(d => '<span class="des-bullet">•</span> <span class="des-item">' + d + '</span>').join('&nbsp;&nbsp;&nbsp;')
    : '';

  const desNoteHtml = m.desNote
    ? '<p class="bio-des-note">' + m.desNote + '</p>'
    : '';

  const bioParas = m.bio.map(p => {
    if (p.startsWith('<')) return p;
    return '<p class="bio-text">' + p + '</p>';
  }).join('');

  const certsHtml = m.certs
    ? '<p class="bio-certs">' + m.certs + '</p>'
    : '';

  const firstName = m.name.split(' ')[0];
  const lastName = m.name.split(' ').slice(-1)[0];

  inner.innerHTML = \`
    <div class="bio-left">
      <img src="assets/logo.svg" alt="The Seiler Group" class="bio-logo">
      <div class="bio-photo-wrap">
        <img src="\${m.photo}" alt="\${m.name}" class="bio-photo">
      </div>
      <div class="bio-left-details">
        <h2 class="bio-name">\${m.name}</h2>
        \${certsHtml}
        <p class="bio-role">\${roleLines}</p>
        <ul class="bio-contact-list">
          <li><i class="fas fa-phone"></i> <span>\${m.phone}</span></li>
          <li><i class="far fa-envelope"></i> <a href="mailto:\${m.email}">\${m.email}</a></li>
          <li><i class="fas fa-map-marker-alt"></i> <span>\${addressLines}</span></li>
        </ul>
      </div>
    </div>
    <div class="bio-right">
      <p class="bio-intro">\${m.intro}</p>
      <h4 class="bio-section-label">BIOGRAPHY</h4>
      <div class="bio-paras-wrap">
        \${bioParas}
      </div>
      \${m.designations.length ? \`
        <div class="bio-des-section">
          <h4 class="bio-section-label">DESIGNATIONS &amp; AFFILIATIONS</h4>
          <p class="bio-designations">\${desHtml}</p>
          \${desNoteHtml}
        </div>
      \` : ''}
      <a href="mailto:\${m.email}" class="bio-contact-btn">
        <i class="fas fa-users"></i>
        CONTACT \${firstName} \${lastName}
      </a>
      \${m.disclaimer ? \`<p class="bio-disclaimer">\${m.disclaimer}</p>\` : ''}
      \${m.footnotes && m.footnotes.length ? \`
        <div class="bio-footnotes-wrap">
          \${m.footnotes.map(f => \`<p class="bio-footnote">\${f}</p>\`).join('')}
        </div>
      \` : ''}
    </div>
  \`;

  if (overlay) overlay.classList.add('active');
  document.body.classList.add('modal-open');
  document.documentElement.classList.add('modal-open');
  document.body.style.overflow = 'hidden';
  if (modal) modal.scrollTop = 0;
}

function closeModal() {
  if (overlay) overlay.classList.remove('active');
  document.body.classList.remove('modal-open');
  document.documentElement.classList.remove('modal-open');
  document.body.style.overflow = '';
}

/* Click cards */
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.member);
  });
});

/* Close on button */
if (closeBtn) closeBtn.addEventListener('click', closeModal);

/* Close on overlay background click */
if (overlay) {
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeModal();
  });

  /* Prevent background page scroll on wheel / touch outside modal panels */
  overlay.addEventListener('wheel', e => {
    if (!e.target.closest('.bio-right') && !e.target.closest('.bio-left')) {
      e.preventDefault();
    }
  }, { passive: false });

  overlay.addEventListener('touchmove', e => {
    if (!e.target.closest('.bio-right') && !e.target.closest('.bio-left')) {
      e.preventDefault();
    }
  }, { passive: false });
}

function toggleMobileMenu(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  var drawer = document.getElementById('mobile-drawer');
  var overlay = document.getElementById('drawer-overlay');
  var toggleBtn = document.getElementById('mobile-toggle');
  if (!drawer) return;

  if (drawer.classList.contains('active')) {
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    if (toggleBtn) toggleBtn.classList.remove('active');
    document.documentElement.classList.remove('menu-open');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  } else {
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    if (toggleBtn) toggleBtn.classList.add('active');
    document.documentElement.classList.add('menu-open');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
}

function toggleMobileAthletesAccordion(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  var btn = document.getElementById('drawer-athletes-btn');
  var content = document.getElementById('drawer-athletes-content');
  if (btn && content) {
    btn.classList.toggle('active');
    content.classList.toggle('open');
  }
}

function toggleMobileIndividualsAccordion(e) {
  if (e) {
    if (e.preventDefault) e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();
  }
  var btn = document.getElementById('drawer-individuals-btn');
  var content = document.getElementById('drawer-individuals-content');
  if (btn && content) {
    btn.classList.toggle('active');
    content.classList.toggle('open');
  }
}

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    var drawer = document.getElementById('mobile-drawer');
    if (drawer && drawer.classList.contains('active')) {
      toggleMobileMenu(e);
    }
  }
});

/* Sticky Header and Dropdown Click-Outside */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });

  const athWrapper = document.getElementById('athletes-dropdown');
  const athMenu = document.getElementById('athletes-menu');
  const indWrapper = document.getElementById('individuals-dropdown');
  const indMenu = document.getElementById('individuals-menu');

  document.addEventListener('click', (e) => {
    if (athWrapper && athMenu && !athWrapper.contains(e.target)) {
      athMenu.classList.remove('show');
      athWrapper.classList.remove('active');
    }
    if (indWrapper && indMenu && !indWrapper.contains(e.target)) {
      indMenu.classList.remove('show');
      indWrapper.classList.remove('active');
    }
  });
});
`;

fs.writeFileSync('team.js', membersBlock + '\n\n' + codeAfter, 'utf8');
console.log('Cleaned up team.js successfully.');
