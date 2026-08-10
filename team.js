/* ============================================================
   TEAM PAGE — team.js
   Bio modal data and interaction logic
   ============================================================ */

const MEMBERS = {
  'thomas-seiler': {
    name: 'TOM SEILER',
    certs: 'WMS™',
    role: 'Managing Director\nSenior Vice President, Investments',
    phone: '(212) 350-0100',
    email: 'tom.seiler@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n420 Lexington Avenue, New York, NY 10170',
    photo: 'assets/team/thomas.png',
    intro: 'As a founding member of The Seiler Group of Raymond James, Thomas Seiler<br>has been dedicated to meeting the sophisticated needs of today\'s high-net-<br>worth individuals with a specialized focus on professional athletes and business<br>titans. He began his career in 1990 with Merrill Lynch, concentrating on<br>high-net-worth clients.',
    bio: [
      'Tom Seiler is a Managing Director, Senior Vice President of Investments and founder<br>of The Seiler Group at Raymond James & Associates. Since establishing the firm in<br>2001, Tom has led a dedicated team of professionals committed to delivering<br>customized wealth management strategies to individuals, families, and businesses.',
      'With more than 30 years of experience in the financial services industry, Tom focuses<br>on comprehensive financial planning, investment management, and wealth<br>preservation strategies. He takes pride in building long-term relationships and<br>delivering exceptional service with integrity and transparency.',
      'Tom earned his Bachelor of Science degree in Finance from Lehigh University.<br>He is passionate about giving back to the community and actively supports<br>several charitable organizations.'
    ],
    designations: ['WMS™', 'CMFA®', 'CRPC™', 'CFP®', 'CIMA®', 'AIF®', 'CPFA'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James<br>ratings and designations.'
  },
  'patrick-seiler': {
    name: 'PATRICK M. SEILER',
    certs: 'CFP®, CIMA®, CEPA®, CRPC™, CRPS™, AIF®',
    role: 'Private Wealth Advisor\nSenior Vice President, Investments',
    phone: '(215) 860-7823',
    email: 'patrick.seiler@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/patrick.png',
    intro: 'Patrick M. Seiler is a dedicated wealth management professional specializing in comprehensive financial planning for high-net-worth individuals, business owners, and professional athletes. With a deep commitment to client success, Patrick brings a holistic approach to wealth management.',
    bio: [
      'Patrick is a Private Wealth Advisor and Senior Vice President of Investments at The Seiler Group of Raymond James. He works closely with clients to develop tailored financial strategies that address their unique needs, goals, and risk tolerance.',
      'Patrick holds multiple prestigious industry designations, reflecting his commitment to professional excellence and continuous education. His expertise spans retirement planning, estate planning, investment management, and business exit strategies.',
      'He earned his degree in Finance and has been a trusted advisor to clients across diverse industries, building long-lasting relationships based on trust and performance.'
    ],
    designations: ['CFP®', 'CIMA®', 'CEPA®', 'CRPC™', 'CRPS™', 'AIF®'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'ross-hart': {
    name: 'ROSS P. HART',
    certs: 'WMS™',
    role: 'Financial Advisor',
    phone: '(215) 860-7823',
    email: 'ross.hart@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/ross.png',
    intro: 'Ross P. Hart is a Financial Advisor at The Seiler Group of Raymond James, focused on delivering comprehensive financial planning and investment solutions to individuals, families, and professional athletes.',
    bio: [
      'Ross brings a client-first philosophy to wealth management, working alongside The Seiler Group\'s senior advisors to provide tailored financial guidance. He specializes in investment portfolio management and holistic financial planning.',
      'With the WMS™ designation, Ross is committed to providing sophisticated wealth management services to high-net-worth clients. He is dedicated to helping clients navigate complex financial decisions with clarity and confidence.',
      'Ross is passionate about building meaningful client relationships and delivering exceptional service that supports long-term financial success.'
    ],
    designations: ['WMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'edward-castellanos': {
    name: 'EDWARD CASTELLANOS',
    certs: '',
    role: 'Senior Marketing Associate',
    phone: '(215) 860-7823',
    email: 'edward.castellanos@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/edward.png',
    intro: 'Edward Castellanos serves as Senior Marketing Associate at The Seiler Group of Raymond James, playing a pivotal role in developing and executing the firm\'s marketing strategy and brand presence.',
    bio: [
      'Edward leads the firm\'s marketing initiatives, working to communicate The Seiler Group\'s unique value proposition to current and prospective clients. He oversees digital marketing, content strategy, and client communications.',
      'With a background in financial services marketing, Edward brings creative vision and strategic insight to the team. He is passionate about connecting with the professional athlete community and business leaders through compelling storytelling.',
      'Edward\'s work helps ensure that The Seiler Group remains at the forefront of wealth management for professional athletes and business titans.'
    ],
    designations: [],
    desNote: ''
  },
  'matthew-geraci': {
    name: 'MATTHEW GERACI',
    certs: 'AAMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'matthew.geraci@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/mathew.png',
    intro: 'Matthew Geraci is an Investment Portfolio Associate at The Seiler Group of Raymond James, specializing in portfolio construction and investment analysis for high-net-worth clients.',
    bio: [
      'Matthew works closely with the senior advisory team to manage and monitor client investment portfolios, conducting in-depth analysis to ensure alignment with each client\'s financial goals and risk profile.',
      'Holding the AAMS™ designation, Matthew is trained in asset management strategies and is committed to delivering thoughtful, research-driven investment solutions. He continuously monitors market conditions to optimize portfolio performance.',
      'Matthew is dedicated to excellence and brings meticulous attention to detail to every aspect of portfolio management, contributing to the team\'s ability to deliver superior client outcomes.'
    ],
    designations: ['AAMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'joseph-brauner': {
    name: 'JOSEPH W. BRAUNER',
    certs: 'AAMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'joseph.brauner@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/joseph.png',
    intro: 'Joseph W. Brauner is an Investment Portfolio Associate at The Seiler Group of Raymond James, focused on supporting the team\'s comprehensive wealth management services through diligent portfolio analysis and client service.',
    bio: [
      'Joseph collaborates with advisors and clients to implement asset allocation strategies, perform portfolio reviews, and assist in wealth planning execution.',
      'He holds the AAMS™ designation and applies rigorous analytical standards to support clients in achieving their long-term financial objectives.',
      'Joseph is committed to professional integrity and providing high-touch service to every client of The Seiler Group.'
    ],
    designations: ['AAMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'priya-roy': {
    name: 'PRYIA N. ROY',
    certs: 'JD',
    role: 'Financial Planning Consultant',
    phone: '(215) 860-7823',
    email: 'pryia.roy@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/pryia.png',
    intro: 'Pryia N. Roy is a Financial Planning Consultant at The Seiler Group of Raymond James, specializing in complex estate, tax, and wealth transfer strategies for high-net-worth families.',
    bio: [
      'Pryia brings extensive legal and financial expertise to the team, helping clients navigate sophisticated estate planning, business succession, and philanthropic goals.',
      'Holding a Juris Doctor (JD) degree, Pryia bridges the gap between legal structure and wealth management strategy for seamless client outcomes.',
      'She is dedicated to delivering personalized, forward-thinking advisory services tailored to each family\'s values.'
    ],
    designations: ['JD'],
    desNote: ''
  },
  'matthew-margolis': {
    name: 'MATTHEW J. MARGOLIS',
    certs: 'AAMS™',
    role: 'Investment Portfolio Associate',
    phone: '(215) 860-7823',
    email: 'matthew.margolis@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/mattew.png',
    intro: 'Matthew J. Margolis is an Investment Portfolio Associate at The Seiler Group of Raymond James, focusing on quantitative research and client portfolio execution.',
    bio: [
      'Matthew works closely with senior advisors to construct risk-managed portfolios suited to each client\'s long-term financial plan.',
      'Holding the AAMS™ designation, Matthew emphasizes disciplined investment management and attentive client communication.',
      'He strives to deliver clarity, accuracy, and strategic insight for every portfolio managed.'
    ],
    designations: ['AAMS™'],
    desNote: 'Visit raymondjames.com/sm/disclosures for information on Raymond James ratings and designations.'
  },
  'isaiah-burrows': {
    name: 'ISAIAH BURROWS',
    certs: '',
    role: 'Wealth Management Associate',
    phone: '(215) 860-7823',
    email: 'isaiah.burrows@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/issaih.png',
    intro: 'Isaiah Burrows is a Wealth Management Associate at The Seiler Group of Raymond James, dedicated to providing seamless operational and administrative support for client accounts.',
    bio: [
      'Isaiah assists with client onboarding, account servicing, and day-to-day operational excellence.',
      'He takes pride in maintaining responsive, reliable communication to ensure a premium experience for every client.',
      'Isaiah is committed to growing his career within wealth management while supporting The Seiler Group\'s mission.'
    ],
    designations: [],
    desNote: ''
  },
  'pamela-longmore': {
    name: 'PAMELA LONGMORE',
    certs: '',
    role: 'Client Service Associate',
    phone: '(215) 860-7823',
    email: 'pamela.longmore@raymondjames.com',
    address: 'The Seiler Group\nRaymond James & Associates\n5 Caufield Place, Suite 201, Newtown, PA 18940',
    photo: 'assets/team/pamela.png',
    intro: 'Pamela Longmore serves as Client Service Associate at The Seiler Group of Raymond James, ensuring high-touch client communication and operational workflow precision.',
    bio: [
      'Pamela works directly with clients and advisors to manage administrative requests, account updates, and client relations.',
      'Her dedication to clarity and care helps build strong, trusted relationships across all client accounts.',
      'Pamela plays a vital role in delivering the white-glove service standard that defines The Seiler Group.'
    ],
    designations: [],
    desNote: ''
  }
};

/* ── Modal open/close ── */
const overlay  = document.getElementById('bioOverlay');
const modal    = document.getElementById('bioModal');
const closeBtn = document.getElementById('bioClose');
const inner    = document.getElementById('bioInner');

function openModal(memberId) {
  const m = MEMBERS[memberId];
  if (!m) return;

  const roleLines = m.role.split('\n').join('<br>');
  const addressLines = m.address.split('\n').join('<br>');

  const desHtml = m.designations.length
    ? m.designations.map(d => `<span class="des-bullet">•</span> <span class="des-item">${d}</span>`).join('&nbsp;&nbsp;&nbsp;')
    : '';

  const desNoteHtml = m.desNote
    ? `<p class="bio-des-note">${m.desNote}</p>`
    : '';

  const bioParas = m.bio.map(p => `<p class="bio-text">${p}</p>`).join('');

  const certsHtml = m.certs
    ? `<p class="bio-certs">${m.certs}</p>`
    : '';

  const firstName = m.name.split(' ')[0];
  const lastName = m.name.split(' ').slice(-1)[0];

  inner.innerHTML = `
    <div class="bio-left">
      <img src="assets/logo.svg" alt="The Seiler Group" class="bio-logo">
      <div class="bio-photo-wrap">
        <img src="${m.photo}" alt="${m.name}" class="bio-photo">
      </div>
      <div class="bio-left-details">
        <h2 class="bio-name">${m.name}</h2>
        ${certsHtml}
        <p class="bio-role">${roleLines}</p>
        <ul class="bio-contact-list">
          <li><i class="fas fa-phone"></i> <span>${m.phone}</span></li>
          <li><i class="far fa-envelope"></i> <a href="mailto:${m.email}">${m.email}</a></li>
          <li><i class="fas fa-map-marker-alt"></i> <span>${addressLines}</span></li>
        </ul>
      </div>
    </div>
    <div class="bio-right">
      <p class="bio-intro">${m.intro}</p>
      <h4 class="bio-section-label">BIOGRAPHY</h4>
      <div class="bio-paras-wrap">
        ${bioParas}
      </div>
      ${m.designations.length ? `
        <div class="bio-des-section">
          <h4 class="bio-section-label">DESIGNATIONS &amp; AFFILIATIONS</h4>
          <p class="bio-designations">${desHtml}</p>
          ${desNoteHtml}
        </div>
      ` : ''}
      <a href="mailto:${m.email}" class="bio-contact-btn">
        <i class="fas fa-users"></i>
        CONTACT ${firstName} ${lastName}
      </a>
    </div>
  `;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  modal.scrollTop = 0;
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* Click cards */
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('click', () => {
    openModal(card.dataset.member);
  });
});

/* Close on button */
closeBtn.addEventListener('click', closeModal);

/* Close on overlay background click */
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* Mobile Drawer & Sticky Header Handlers */
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('mobile-toggle');
    const closeBtn = document.getElementById('drawer-close');
    const drawer = document.getElementById('mobile-drawer');
    const overlay = document.getElementById('drawer-overlay');
    const header = document.getElementById('main-header');

    function openDrawer() {
        if (drawer) drawer.classList.add('active');
        if (overlay) overlay.classList.add('active');
        if (toggleBtn) toggleBtn.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
        if (drawer) drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        if (toggleBtn) toggleBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
    if (overlay) overlay.addEventListener('click', closeDrawer);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    window.addEventListener('scroll', () => {
        if (header) {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    });
});
