// Bhoomi Setu — Consolidated Core Runtime Bundle
// Government of Karnataka | Land Acquisition & Statutory Revenue System

// ============================================================================
// 1. STATE & USER SESSION ENGINE (BhoomiBackend)
// ============================================================================
(function () {
  const STORAGE_KEY = 'BHOOMI_ENTERPRISE_STATE_V1';

  const DEFAULT_USERS = {
    citizen: {
      id: 'CITIZEN_RAJESH_01',
      role: 'citizen',
      roleName: 'Registered Citizen & Landowner',
      name: 'Sri. Rajesh Kumar',
      fatherName: 'Late S. Muniyappa',
      aadhaar: '5489-1204-4819',
      aadhaarMasked: '5489-XXXX-4819',
      mobile: '+91 98450 12894',
      district: 'Bengaluru Urban',
      taluk: 'Bengaluru East',
      village: 'Bellandur',
      surveyNo: '48/2A',
      award: '₹ 6,78,40,000'
    },
    officer: {
      id: 'SLAO_SHIVARAM_02',
      role: 'officer',
      roleName: 'Special Land Acquisition Officer (SLAO)',
      name: 'Sri. B. Shivaram, KAS',
      aadhaar: '8921-4421-0894',
      designation: 'Special Land Acquisition Officer — Bengaluru East & North',
      empCode: 'KAS-2012-0894',
      department: 'Revenue Department, Govt of Karnataka',
      dscTokenId: 'ePass2003Auto-98FC-4421'
    },
    executive: {
      id: 'EXEC_CHIEF_SEC_03',
      role: 'executive',
      roleName: 'Executive State Command Desk',
      name: 'Chief Secretary',
      aadhaar: '1102-9934-0001',
      designation: 'Chief Secretary to Government of Karnataka',
      department: 'Cabinet Secretariat & High Power Committee'
    }
  };

  class BhoomiBackend {
    constructor() {
      this.state = this.loadState();
    }

    loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {}
      return {
        currentUser: DEFAULT_USERS.officer,
        theme: localStorage.getItem('bhoomi_theme') || 'light'
      };
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {}
    }

    login(role) {
      const user = DEFAULT_USERS[role] || DEFAULT_USERS.citizen;
      this.state.currentUser = user;
      this.saveState();

      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast(
          `Logged in as ${user.name} (${user.roleName})`,
          'success',
          'Authentication Gateway'
        );
      }

      if (role === 'citizen') window.BhoomiRouter.navigate('citizen-dashboard');
      else if (role === 'officer') window.BhoomiRouter.navigate('officer-dashboard');
      else if (role === 'executive') window.BhoomiRouter.navigate('executive-dashboard-1');
      else window.BhoomiRouter.navigate('home');
    }

    updateAppHeader() {
      const user = this.state.currentUser || DEFAULT_USERS.citizen;
      const userLabels = document.querySelectorAll('[data-user-name], .user-profile-name, #header-user-name');
      userLabels.forEach(el => { el.innerText = user.name; });
    }
  }

  window.BhoomiBackend = new BhoomiBackend();
})();

// ============================================================================
// 2. CLIENT-SIDE ROUTER (BhoomiRouter)
// ============================================================================
(function () {
  const DEFAULT_ROUTE = 'official-login';

  class BhoomiRouter {
    constructor() {
      this.routes = {};
      this.currentRoute = null;
      this.init();
    }

    loadScreens() {
      if (window.BHOOMI_SCREENS && Array.isArray(window.BHOOMI_SCREENS)) {
        window.BHOOMI_SCREENS.forEach(screen => {
          this.routes[screen.id] = screen;
        });
      }
    }

    init() {
      this.loadScreens();
      window.addEventListener('hashchange', () => this.handleHashChange());
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => this.handleHashChange());
      } else {
        this.handleHashChange();
      }
      setTimeout(() => this.handleHashChange(), 50);
    }

    getRouteFromHash() {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      return hash || DEFAULT_ROUTE;
    }

    navigate(routeId) {
      this.loadScreens();
      if (this.routes[routeId] || routeId === DEFAULT_ROUTE) {
        window.location.hash = `#/${routeId}`;
      } else {
        console.warn(`Route not found: ${routeId}, falling back to ${DEFAULT_ROUTE}`);
        window.location.hash = `#/${DEFAULT_ROUTE}`;
      }
    }

    handleHashChange() {
      this.loadScreens();
      const routeId = this.getRouteFromHash();
      const screen = this.routes[routeId] || this.routes[DEFAULT_ROUTE] || (window.BHOOMI_SCREENS ? window.BHOOMI_SCREENS[0] : null);

      if (!screen) return;

      this.currentRoute = screen.id;
      this.renderScreen(screen);
      this.updateActiveNavs(screen.id);

      try { if (window.PageGuide) window.PageGuide.renderGuide(screen.id); } catch(e) {}
      try { if (window.BhoomiMapEngine) window.BhoomiMapEngine.initMapForScreen(screen.id); } catch(e) {}
      try { if (window.BhoomiAnalytics) window.BhoomiAnalytics.initChartsForScreen(screen.id); } catch(e) {}
      try { if (window.BhoomiInteractions) window.BhoomiInteractions.onScreenMounted(screen); } catch(e) {}
      try { if (window.PrototypeHUD) window.PrototypeHUD.onRouteChanged(screen); } catch(e) {}
      try { if (window.BhoomiBackend) window.BhoomiBackend.updateAppHeader(); } catch(e) {}

      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    renderScreen(screen) {
      const appRoot = document.getElementById('app-root');
      if (!appRoot) return;
      document.title = `${screen.title} | Bhoomi Setu — Government of Karnataka`;
      document.body.className = screen.bodyClass || 'bg-background font-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container';
      appRoot.innerHTML = screen.html;
    }

    updateActiveNavs(routeId) {
      const links = document.querySelectorAll('nav a, header a, [data-path]');
      links.forEach(link => {
        const dataPath = link.getAttribute('data-path');
        let isActive = false;
        if (dataPath) {
          if (dataPath === 'home' && (routeId === 'home' || routeId === 'home-alt')) isActive = true;
          else if (dataPath === 'public-land-directory' && (routeId === 'available-government-land' || routeId === 'public-land-detail')) isActive = true;
          else if (dataPath === 'survey-gazette' && (routeId === 'statutory-gazette-publishing' || routeId === 'land-search' || routeId === 'search-results')) isActive = true;
          else if (dataPath === 'verify-document' && (routeId === 'document-verification-queue')) isActive = true;
          else if (dataPath === 'grievances' && (routeId === 'grievance-hearing-desk')) isActive = true;
          else if (dataPath === 'sign-in' && (routeId === 'official-login')) isActive = true;
        }
        if (isActive) {
          link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
          link.classList.remove('text-on-surface-variant');
        }
      });
    }
  }

  window.BhoomiRouter = new BhoomiRouter();
})();

// ============================================================================
// 3. CONTEXTUAL PAGE GUIDE (PageGuide)
// ============================================================================
(function () {
  const PAGE_EXPLAINERS = {
    'official-login': {
      title: '🔐 Bhoomi Setu Gateway — Government of Karnataka',
      simpleWhat: 'Choose one of 3 pre-fed Aadhaar login credentials to test Landowner, SLAO Officer, or Chief Secretary flows.',
      actions: ['Landowner (5489-1204-4819)', 'SLAO Officer (8921-4421-0894)', 'Chief Secretary (1102-9934-0001)']
    },
    'citizen-dashboard': {
      title: '👨‍🌾 Landowner Portal — Sri. Rajesh Kumar (Bellandur)',
      simpleWhat: 'Track your ₹6.78 Cr statutory compensation money, view satellite boundary, and direct bank escrow payout.',
      actions: ['Inspect Survey 48/2A Dossier', 'Open Satellite GIS Map', 'Raise Valuation Objection']
    },
    'parcel-detail': {
      title: '📄 Land Record & Compensation Breakdown — Sy. No. 48/2A',
      simpleWhat: 'Market Value (₹3.20 Cr) + 100% Solatium Bonus (₹3.20 Cr) + 12% Interest = ₹6.78 Cr Total Statutory Award.',
      actions: ['View Solatium Calculator', 'Open Satellite Map', 'Download Gazette Notice']
    },
    'my-land-map': {
      title: '🛰️ Interactive Satellite Cadastral Map (Survey 48/2A)',
      simpleWhat: 'High-resolution satellite view of Bellandur property showing Namma Metro Phase 2A right-of-way.',
      actions: ['Measure Chainage Distance', 'Inspect Cadastral Polygon', 'Switch Satellite Layer']
    },
    'officer-dashboard': {
      title: '👔 SLAO Console — Sri. B. Shivaram, KAS',
      simpleWhat: 'Verify scanned Form 9 title deeds, apply Class-3 DSC digital seal, and schedule Lok Adalat hearings.',
      actions: ['Document Verification Queue', 'Multi-Tier Approval', 'Gazette Publishing Hub']
    },
    'document-verification-queue': {
      title: '📑 Document Verification & Digital DSC Stamping',
      simpleWhat: 'Inspect Form 9 joint survey deeds and apply verified cryptographic digital signatures.',
      actions: ['Approve & Digital Sign (DSC)', 'Issue Curative Defect Notice', 'Escalate to Tahsildar']
    },
    'executive-dashboard-1': {
      title: '🏢 State Infrastructure Command Desk — Chief Secretary',
      simpleWhat: 'Statewide corridor oversight for Namma Metro Phase 2A with live Chart.js budget and delay telemetry.',
      actions: ['Metro Phase 2A 13 Stations', 'AI Turnaround Matrix (-45 Days Saved)']
    },
    'interactive-acquisition-map': {
      title: '🗺️ Statewide Infrastructure GIS Corridor Map',
      simpleWhat: 'Interactive 18.2 km Metro corridor with all 13 stations from Central Silk Board to KR Puram.',
      actions: ['Search Parcel (48/2A)', 'Inspect Station Nodes', 'Measure Area & Distance']
    }
  };

  class PageGuide {
    renderGuide(screenId) {
      const existing = document.getElementById('bhoomi-page-guide');
      if (existing) existing.remove();

      const info = PAGE_EXPLAINERS[screenId] || {
        title: `📌 ${document.title.split('|')[0].trim()}`,
        simpleWhat: 'Official Karnataka Land Acquisition & Statutory Revenue System console.',
        actions: ['Click any button or table row to inspect details and take action.']
      };

      const guideBox = document.createElement('div');
      guideBox.id = 'bhoomi-page-guide';
      guideBox.className = 'w-full bg-gradient-to-r from-emerald-900/90 to-teal-950 text-white border-b border-emerald-700 shadow-md py-2.5 px-4 sm:px-8 select-none transition-all';

      guideBox.innerHTML = `
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div class="space-y-0.5">
            <div class="flex items-center gap-2">
              <span class="bg-emerald-500 text-gray-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Guide</span>
              <h4 class="font-bold text-sm text-emerald-100">${info.title}</h4>
            </div>
            <p class="text-white/90 text-xs max-w-3xl">${info.simpleWhat}</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" class="px-2.5 py-1 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded font-bold flex items-center gap-1 transition-colors" onclick="window.FramesEngine.openCompensationFrame()">
              <span class="material-symbols-outlined text-[15px]">calculate</span> Solatium Calc
            </button>
            <button type="button" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded font-bold flex items-center gap-1 transition-colors" onclick="window.BhoomiRouter.navigate('official-login')">
              <span class="material-symbols-outlined text-[15px]">switch_account</span> Switch User
            </button>
          </div>
        </div>
      `;

      const header = document.querySelector('header');
      if (header && header.nextElementSibling) {
        header.parentElement.insertBefore(guideBox, header.nextElementSibling);
      } else {
        const appRoot = document.getElementById('app-root');
        if (appRoot) appRoot.prepend(guideBox);
      }
    }
  }

  window.PageGuide = new PageGuide();
})();

// ============================================================================
// 4. INTERACTIVE MODAL FRAMES ENGINE (FramesEngine & Modals)
// ============================================================================
(function () {
  class FramesEngine {
    openModal(contentHtml) {
      this.closeModal();
      const modal = document.createElement('div');
      modal.id = 'bhoomi-interactive-modal';
      modal.className = 'fixed inset-0 z-[99999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn';
      modal.innerHTML = `
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleUp">
          ${contentHtml}
        </div>
      `;
      document.body.appendChild(modal);
    }

    closeModal() {
      const existing = document.getElementById('bhoomi-interactive-modal');
      if (existing) existing.remove();
    }

    openCompensationFrame() {
      this.openModal(`
        <div class="p-6">
          <div class="flex items-center justify-between border-b pb-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-emerald-600 text-[26px]">payments</span>
              <h3 class="text-base font-bold text-on-surface">100% Solatium Statutory Calculator (RFCTLARR 2013)</h3>
            </div>
            <button type="button" class="p-1 rounded hover:bg-gray-100" onclick="window.FramesEngine.closeModal()">✕</button>
          </div>
          <div class="space-y-3 text-xs">
            <div class="p-3 bg-surface-container-low rounded-lg space-y-1.5">
              <div class="flex justify-between"><span>Base Market Value (1.45 Acres):</span><span class="font-bold">₹ 3,20,00,000</span></div>
              <div class="flex justify-between text-emerald-700"><span>100% Solatium Statutory Bonus (Sec 30):</span><span class="font-bold">+ ₹ 3,20,00,000</span></div>
              <div class="flex justify-between text-blue-700"><span>12% Additional Market Value (Sec 30(3)):</span><span class="font-bold">+ ₹ 38,40,000</span></div>
              <div class="border-t pt-2 flex justify-between text-sm font-bold text-primary"><span>Total Statutory Award:</span><span>₹ 6,78,40,000</span></div>
            </div>
            <div class="p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-300 rounded-lg flex items-center justify-between">
              <div>
                <span class="font-bold text-emerald-800 dark:text-emerald-200">PFMS Direct Escrow Status:</span>
                <p class="text-[11px] text-emerald-700 dark:text-emerald-300">Canara Bank (XXXX-9182) • Ref: PFMS2025KA048912</p>
              </div>
              <span class="px-2 py-1 bg-emerald-600 text-white rounded font-bold text-[10px]">APPROVED</span>
            </div>
          </div>
          <button type="button" class="mt-4 w-full py-2 bg-primary text-white rounded-lg font-bold text-xs" onclick="window.FramesEngine.closeModal()">Close Dossier</button>
        </div>
      `);
    }

    openDocumentScanFrame() {
      this.openModal(`
        <div class="p-6">
          <div class="flex items-center justify-between border-b pb-3 mb-4">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-blue-600 text-[26px]">verified</span>
              <h3 class="text-base font-bold text-on-surface">Class-3 DSC Digital Signing Console</h3>
            </div>
            <button type="button" class="p-1 rounded hover:bg-gray-100" onclick="window.FramesEngine.closeModal()">✕</button>
          </div>
          <div class="space-y-3 text-xs">
            <p>Cryptographic Token: <strong>ePass2003Auto-98FC-4421</strong> (Valid till 2027)</p>
            <div class="p-4 border border-dashed border-emerald-500 bg-emerald-50 dark:bg-emerald-950 rounded-lg text-center">
              <span class="material-symbols-outlined text-emerald-600 text-[40px]">check_circle</span>
              <h4 class="font-bold text-emerald-800 dark:text-emerald-200 mt-1">NIC DSC Signature Applied</h4>
              <p class="text-[11px] text-emerald-700 dark:text-emerald-300">SHA-256: 8f49b1a0e238491c... Form 9 & Title Deed Verified</p>
            </div>
          </div>
          <button type="button" class="mt-4 w-full py-2 bg-primary text-white rounded-lg font-bold text-xs" onclick="window.FramesEngine.closeModal(); if(window.BhoomiInteractions) window.BhoomiInteractions.showToast('Section 19 Gazette Sealed and Dispatched to Government Press.', 'success', 'DSC Digital Sign');">Confirm & Forward</button>
        </div>
      `);
    }
  }

  window.FramesEngine = new FramesEngine();
})();

// ============================================================================
// 5. LIVE VISUAL TELEMETRY & CHARTS (BhoomiAnalytics - Chart.js)
// ============================================================================
(function () {
  class BhoomiAnalytics {
    constructor() {
      this.charts = {};
    }

    initChartsForScreen(screenId) {
      if (typeof Chart === 'undefined') return;
      if (screenId === 'executive-dashboard-1' || screenId === 'interactive-acquisition-map') {
        setTimeout(() => this.renderExecutiveCharts(), 150);
      }
    }

    renderExecutiveCharts() {
      if (document.getElementById('bhoomi-live-analytics-panel')) return;
      const main = document.querySelector('main > div, main');
      if (!main) return;

      const panel = document.createElement('div');
      panel.id = 'bhoomi-live-analytics-panel';
      panel.className = 'my-6 p-5 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg';

      panel.innerHTML = `
        <div class="flex items-center justify-between pb-3 mb-4 border-b border-outline-variant/60">
          <div>
            <h4 class="text-sm font-bold text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-[20px]">insights</span>
              State Command Visual Analytics & Budget Outlay
            </h4>
            <p class="text-[11px] text-on-surface-variant">Live telemetry synced with Karnataka Bhoomi Master DB</p>
          </div>
          <span class="px-2 py-0.5 bg-primary/10 text-primary text-[11px] font-bold rounded-full">● Live Telemetry</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
            <h5 class="text-xs font-bold mb-2">Corridor Financial Outlay (₹ Crores)</h5>
            <div class="h-48"><canvas id="chart-budget-bar"></canvas></div>
          </div>
          <div class="p-3 bg-surface-container-low rounded-lg border border-outline-variant">
            <h5 class="text-xs font-bold mb-2">Statutory Delay Bottlenecks (%)</h5>
            <div class="h-48"><canvas id="chart-delay-doughnut"></canvas></div>
          </div>
        </div>
      `;

      const target = main.querySelector('div.grid, section') || main.firstChild;
      main.insertBefore(panel, target);

      const ctx1 = document.getElementById('chart-budget-bar');
      if (ctx1) {
        new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: ['Metro 2A (ORR)', 'PRR Stage 1', 'Suburban Rail'],
            datasets: [
              { label: 'Disbursed (₹ Cr)', data: [1842, 4320, 890], backgroundColor: '#006b5b', borderRadius: 4 },
              { label: 'Pending (₹ Cr)', data: [4152, 16771, 3310], backgroundColor: '#89ece1', borderRadius: 4 }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 10 } } } } }
        });
      }

      const ctx2 = document.getElementById('chart-delay-doughnut');
      if (ctx2) {
        new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: ['High Court Writs (42%)', 'BESCOM 66kV Utility (31%)', 'Sec 15 Valuations (18%)', 'Forest NOC (9%)'],
            datasets: [{ data: [42, 31, 18, 9], backgroundColor: ['#ba1a1a', '#b45309', '#006b5b', '#004f58'], borderWidth: 2 }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 } } } } }
        });
      }
    }
  }

  window.BhoomiAnalytics = new BhoomiAnalytics();
})();

// ============================================================================
// 6. EVENT DELEGATION & UI INTERACTIONS (BhoomiInteractions)
// ============================================================================
(function () {
  class BhoomiInteractions {
    constructor() {
      this.init();
    }

    init() {
      if (!document.getElementById('bhoomi-toast-container')) {
        const c = document.createElement('div');
        c.id = 'bhoomi-toast-container';
        c.className = 'fixed top-5 right-5 z-[99999] flex flex-col gap-2 pointer-events-none max-w-md w-full px-4';
        document.body.appendChild(c);
      }
      document.addEventListener('click', (e) => this.handleClick(e));
    }

    showToast(message, type = 'success', title = 'Bhoomi Setu') {
      const c = document.getElementById('bhoomi-toast-container');
      if (!c) return;

      const toast = document.createElement('div');
      toast.className = `pointer-events-auto bg-surface-container-lowest border border-outline-variant rounded-lg p-3.5 shadow-xl flex items-start gap-3 border-l-4 ${
        type === 'success' ? 'border-l-primary' : type === 'warning' ? 'border-l-amber-600' : 'border-l-error'
      } animate-fadeIn`;

      toast.innerHTML = `
        <span class="material-symbols-outlined ${type === 'success' ? 'text-primary' : 'text-amber-600'} text-[20px] shrink-0">check_circle</span>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-on-surface">${title}</h4>
          <p class="text-[11px] text-on-surface-variant mt-0.5 leading-snug">${message}</p>
        </div>
      `;

      c.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    }

    onScreenMounted(screen) {}

    handleClick(e) {
      const target = e.target.closest('a, button, [data-path], [data-route]');
      if (!target) return;

      const dataPath = target.getAttribute('data-path');
      const href = target.getAttribute('href');
      const text = (target.innerText || '').trim();

      if (dataPath) {
        e.preventDefault();
        const map = {
          'home': 'home',
          'public-land-directory': 'available-government-land',
          'survey-gazette': 'statutory-gazette-publishing',
          'verify-document': 'document-verification-queue',
          'grievances': 'grievance-hearing-desk',
          'sign-in': 'official-login'
        };
        window.BhoomiRouter.navigate(map[dataPath] || 'home');
        return;
      }

      if (href && href.startsWith('#/')) return;

      if (text.includes('Compensation') || text.includes('₹ 6,78,40,000') || text.includes('Solatium')) {
        e.preventDefault();
        window.FramesEngine.openCompensationFrame();
        return;
      }

      if (text.includes('Approve & Digital Sign') || text.includes('DSC')) {
        e.preventDefault();
        window.FramesEngine.openDocumentScanFrame();
        return;
      }

      if (text.includes('Download Gazette PDF') || text.includes('Download Original')) {
        e.preventDefault();
        this.showToast('Karnataka State Gazette (Sec 19) downloaded: RD-LAQ-SH17-2025.pdf', 'success', 'PDF Export');
        return;
      }

      if (text.includes('Print Cause List')) {
        e.preventDefault();
        window.print();
        return;
      }

      if (text.includes('Audit Trail')) {
        e.preventDefault();
        this.showToast('Audit Trail: Form 9 uploaded by Field RI on 14 Feb 2025. Geo-hash verified.', 'info', 'Audit Trail');
        return;
      }

      if (text.includes('Reject & Issue Defect Notice')) {
        e.preventDefault();
        this.showToast('7-Day Curative Defect Notice dispatched to claimant via SMS & Registered Post.', 'warning', 'Defect Notice');
        return;
      }

      if (text.includes('Escalate to Tahsildar')) {
        e.preventDefault();
        this.showToast('File escalated to Tahsildar (Bengaluru East) for field spot mahazar.', 'info', 'File Escalation');
        return;
      }
    }
  }

  window.BhoomiInteractions = new BhoomiInteractions();
})();

// ============================================================================
// 7. PROTOTYPE HUD & THEME SWITCHER (PrototypeHUD)
// ============================================================================
(function () {
  class PrototypeHUD {
    constructor() {
      this.init();
    }

    init() {
      this.initTheme();
      window.addEventListener('DOMContentLoaded', () => this.renderHUD());
    }

    initTheme() {
      const theme = localStorage.getItem('bhoomi_theme') || 'light';
      if (theme === 'dark') document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    }

    toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('bhoomi_theme', isDark ? 'dark' : 'light');
      const icon = document.getElementById('hud-theme-icon');
      if (icon) icon.innerText = isDark ? 'light_mode' : 'dark_mode';
      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast(isDark ? 'Dark Mode' : 'Light Mode', 'info', 'Theme Switcher');
      }
    }

    renderHUD() {
      if (document.getElementById('bhoomi-prototype-hud')) return;
      const hud = document.createElement('div');
      hud.id = 'bhoomi-prototype-hud';
      hud.className = 'fixed bottom-4 right-4 z-[9998] select-none text-xs';

      hud.innerHTML = `
        <div class="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant rounded-xl shadow-2xl p-2 flex items-center gap-2">
          <button type="button" title="Toggle Dark / Light Theme" class="p-1.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-on-surface flex items-center gap-1 font-bold" onclick="window.PrototypeHUD.toggleTheme()">
            <span id="hud-theme-icon" class="material-symbols-outlined text-[16px] text-amber-500">dark_mode</span>
          </button>
          <button type="button" class="px-2.5 py-1.5 bg-primary text-white rounded-lg font-bold flex items-center gap-1 shadow-sm" onclick="window.BhoomiRouter.navigate('official-login')">
            <span class="material-symbols-outlined text-[16px]">grid_view</span>
            <span>20 Screens</span>
          </button>
        </div>
      `;
      document.body.appendChild(hud);
    }

    onRouteChanged(screen) {}
  }

  window.PrototypeHUD = new PrototypeHUD();
})();
