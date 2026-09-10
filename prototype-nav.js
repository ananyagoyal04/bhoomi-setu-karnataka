// Bhoomi Setu — Department Portal Switcher & Screen Directory
// Government of Karnataka | Land Acquisition Management System
(function () {
  const TOURS = [
    {
      id: 'tour-public',
      name: '1. Public Land Allotment Lifecycle (Form 49-B)',
      description: 'Public land search, civic amenity eligibility inspection, Form 49-B statutory submission, and live SLAO tracking.',
      steps: [
        { route: 'home', title: 'Portal Home', note: 'Public landing gateway and acquisition corridor overview.' },
        { route: 'land-search', title: 'Cadastral Land Search', note: 'Query parcels by District, Taluk, Hobli, and Survey Number.' },
        { route: 'search-results', title: 'Search Results', note: 'Review Survey 48 Series cadastral matches in Bellandur.' },
        { route: 'parcel-detail', title: 'Citizen Parcel Record', note: 'Inspect Section 11(1) acquisition lifecycle & compensation breakdown.' },
        { route: 'available-government-land', title: 'Govt Land Directory', note: 'Browse 38 vacant public land parcels eligible for civic allotment.' },
        { route: 'public-land-detail', title: 'Public Land Allotment Rules', note: 'Review civic amenity eligibility guidelines for Sy 56/2 Chikkabanavara.' },
        { route: 'application-form', title: 'Form 49-B Application', note: 'Fill statutory land allotment application with project DPR.' },
        { route: 'application-status-tracker', title: 'Application Tracker', note: 'Live statutory processing timeline for Ref KA-LA-2025-PHC-00892.' }
      ]
    },
    {
      id: 'tour-citizen',
      name: '2. Citizen Landowner Workflow (Rajesh Kumar)',
      description: 'Manage registered land parcels, inspect GIS survey boundaries, view notices, and verify PFMS compensation payout.',
      steps: [
        { route: 'citizen-dashboard', title: 'Citizen Dashboard', note: 'Aadhaar-verified overview of owned parcels and compensation status.' },
        { route: 'my-land-list', title: 'My Land List View', note: 'Tabular dossier of owned parcels in Bellandur, Yelahanka, and Kadubeesanahalli.' },
        { route: 'my-land-map', title: 'My Land Spatial GIS Map', note: 'Interactive spatial boundary map showing Metro alignment and buffer.' },
        { route: 'notifications', title: 'Statutory Notifications', note: 'Section 11(1) gazette alerts, hearing notices, and SMS dispatches.' },
        { route: 'parcel-detail', title: 'Parcel 48/2A Dossier', note: 'Inspect Section 19(1) declaration and compensation award details.' },
        { route: 'grievance-hearing-desk', title: 'Grievance Redressal', note: 'Raise Section 15(1) valuation objections for Lok Adalat hearing.' },
        { route: 'financial-escrow-ledger', title: 'PFMS Direct Escrow', note: 'Track direct bank compensation transfer and statutory escrow deposits.' }
      ]
    },
    {
      id: 'tour-officer',
      name: '3. SLAO Revenue Officer Workflow (Sri B. Shivaram)',
      description: 'Field inspection, title deed verification, multi-level concurrence, and digital gazette publishing.',
      steps: [
        { route: 'official-login', title: 'Official Sign In', note: 'Authentication gateway for revenue officials with 2FA token.' },
        { route: 'officer-dashboard', title: 'Field Officer Console', note: 'Manage ML delay projects and prioritize document inspection queues.' },
        { route: 'officer-parcel-detail', title: 'Officer Inspection Dossier', note: 'Statutory field inspection notes and title deed verification for Sy 48/2A.' },
        { route: 'document-verification-queue', title: 'Document Verification Queue', note: 'Split-view console for Form 9 scrutiny & DSC token digital stamping.' },
        { route: 'multi-level-approval', title: 'Multi-Tier Approval', note: 'SLAO concurrence pipeline and transmission to Deputy Commissioner.' },
        { route: 'grievance-hearing-desk', title: 'Hearing Docket', note: 'Quasi-judicial hearing desk for Section 15(1) objections.' },
        { route: 'statutory-gazette-publishing', title: 'Gazette Publishing Hub', note: 'State Gazette compiler with DSC cryptographic digital signature.' },
        { route: 'cadastral-export-hub', title: 'Cadastral & CAG Reports Hub', note: 'Export GIS shapefiles, CAG financial audit, and gazette bundles.' }
      ]
    },
    {
      id: 'tour-executive',
      name: '4. Executive State Command & Predictive AI (Chief Secretary)',
      description: 'Corridor health monitoring, ML delay forecasting, AI turnaround mitigation, and litigation oversight.',
      steps: [
        { route: 'executive-dashboard-1', title: 'Executive Dashboard (Macro)', note: 'Statewide KPIs: 1,420 Ha target, ₹4,820 Cr disbursed, corridor health matrix.' },
        { route: 'executive-dashboard-2', title: 'Executive Dashboard (Velocity)', note: 'District acquisition velocity, SLAO performance ratings, and bottleneck origins.' },
        { route: 'project-registry', title: 'Projects Registry', note: 'Track state projects: Metro Phase 2A, PRR Stage 1, Suburban Rail.' },
        { route: 'project-detail', title: 'Metro Phase 2A Detail', note: '18.2 km Outer Ring Road corridor with 348 linked survey parcels.' },
        { route: 'interactive-acquisition-map', title: 'GIS Corridor Map', note: 'Statewide spatial GIS corridor map with parcel boundaries & layer toggles.' },
        { route: 'ml-delay-prediction', title: 'ML Delay Prediction', note: 'AI predictive timeline (+4.2 months) and risk attribution factors.' },
        { route: 'ai-mitigation-panel', title: 'AI Turnaround Matrix', note: 'Automated legal and financial turnaround action plan with live simulation.' },
        { route: 'utility-relocation-matrix', title: 'Utility Relocation Matrix', note: 'Inter-agency clearance matrix for BESCOM, BWSSB, and GAIL gas lines.' },
        { route: 'legal-caveats-registry', title: 'Litigation & Caveats', note: 'High Court writ petitions and stay vacation motions registry.' },
        { route: 'climate-flood-hazard', title: 'Climate & Flood Hazard', note: 'SWD Raja Kaluve buffer zones and 100-year flood vulnerability overlay.' }
      ]
    }
  ];

  class PrototypeHUD {
    constructor() {
      this.isMinimized = false;
      this.activeTour = null;
      this.tourStepIndex = 0;
      this.init();
    }

    init() {
      this.initTheme();
      window.addEventListener('DOMContentLoaded', () => this.renderHUD());
    }

    renderHUD() {
      if (document.getElementById('bhoomi-prototype-hud')) return;

      const hud = document.createElement('div');
      hud.id = 'bhoomi-prototype-hud';
      hud.className = 'fixed bottom-4 right-4 z-[9998] font-body-md text-on-surface select-none';

      hud.innerHTML = `
        <!-- Main Floating Toolbar -->
        <div id="hud-main-bar" class="bg-surface-container-lowest/95 backdrop-blur-md border border-outline-variant rounded-xl shadow-2xl p-2.5 flex items-center gap-2 max-w-2xl transition-all duration-300">
          
          <!-- Role Indicator Pill -->
          <div class="flex items-center gap-1.5 px-2.5 py-1.5 bg-surface-container-low rounded-lg border border-outline-variant/60">
            <span id="hud-role-icon" class="material-symbols-outlined text-[18px] text-primary">badge</span>
            <div class="flex flex-col">
              <span id="hud-role-name" class="font-label-sm text-[11px] font-bold text-primary uppercase tracking-wider leading-none">Government Portal</span>
              <span id="hud-screen-name" class="font-body-sm text-[11px] text-on-surface-variant truncate max-w-[140px] leading-tight mt-0.5">Official Sign In</span>
            </div>
          </div>

          <div class="h-6 w-[1px] bg-outline-variant/60"></div>

          <!-- Fast Department Switcher -->
          <div class="hidden sm:flex items-center gap-1">
            <button type="button" title="Switch to Public Services" class="px-2 py-1 text-xs rounded hover:bg-surface-container font-label-md transition-colors" onclick="window.BhoomiBackend.login('public')">🏛️ Public</button>
            <button type="button" title="Switch to Landowner (Rajesh Kumar)" class="px-2 py-1 text-xs rounded hover:bg-surface-container font-label-md transition-colors" onclick="window.BhoomiBackend.login('citizen')">👤 Landowner</button>
            <button type="button" title="Switch to SLAO Officer (Sri Shivaram)" class="px-2 py-1 text-xs rounded hover:bg-surface-container font-label-md transition-colors" onclick="window.BhoomiBackend.login('officer')">📋 SLAO</button>
            <button type="button" title="Switch to Executive (Chief Secretary)" class="px-2 py-1 text-xs rounded hover:bg-surface-container font-label-md transition-colors" onclick="window.BhoomiBackend.login('executive')">📊 Executive</button>
          </div>

          <div class="h-6 w-[1px] bg-outline-variant/60"></div>

          <!-- Action Buttons -->
          <div class="flex items-center gap-1.5">
            <!-- Theme Toggle Button -->
            <button type="button" id="hud-btn-theme" title="Toggle Dark / Light Theme" class="p-1.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg text-xs font-bold transition-colors flex items-center gap-1" onclick="window.PrototypeHUD.toggleTheme()">
              <span id="hud-theme-icon" class="material-symbols-outlined text-[18px] text-amber-500">dark_mode</span>
            </button>
            <button type="button" id="hud-btn-screens" class="flex items-center gap-1 px-3 py-1.5 bg-primary text-on-primary rounded-lg text-xs font-label-md hover:bg-primary-container transition-all shadow-sm" onclick="window.PrototypeHUD.toggleScreensModal()">
              <span class="material-symbols-outlined text-[16px]">grid_view</span>
              <span>All 20 Screens</span>
            </button>
            <button type="button" id="hud-btn-tours" class="flex items-center gap-1 px-2.5 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-lg text-xs font-label-md text-on-surface transition-colors" onclick="window.PrototypeHUD.toggleToursModal()">
              <span class="material-symbols-outlined text-[16px] text-secondary">explore</span>
              <span class="hidden md:inline">Workflows</span>
            </button>
            <button type="button" title="Minimize toolbar" class="p-1.5 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors" onclick="window.PrototypeHUD.toggleMinimize()">
              <span class="material-symbols-outlined text-[18px]">close_fullscreen</span>
            </button>
          </div>
        </div>

        <!-- Minimized Pill -->
        <button id="hud-minimized-pill" type="button" class="hidden bg-primary text-on-primary border border-primary-container rounded-full shadow-2xl px-4 py-2 flex items-center gap-2 hover:bg-primary-container transition-all" onclick="window.PrototypeHUD.toggleMinimize()">
          <span class="material-symbols-outlined text-[18px]">account_balance</span>
          <span class="font-label-md text-xs font-bold">Bhoomi Setu (20 Screens)</span>
          <span class="material-symbols-outlined text-[16px]">open_in_full</span>
        </button>

        <!-- Active Workflow Step Card (Floating HUD) -->
        <div id="hud-tour-active-card" class="hidden mt-2 bg-surface-container-lowest border-2 border-primary rounded-xl p-3.5 shadow-2xl max-w-md animate-fadeIn">
          <div class="flex items-center justify-between gap-2 border-b border-outline-variant/60 pb-2">
            <div class="flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-[18px]">directions</span>
              <span id="tour-step-tour-name" class="font-label-md text-xs font-bold text-primary truncate max-w-[240px]">Statutory Workflow</span>
            </div>
            <span id="tour-step-count" class="font-code-sm text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">Step 1 of 8</span>
          </div>
          <div class="py-2.5">
            <h5 id="tour-step-title" class="font-headline-sm text-sm font-bold text-on-surface">Step Title</h5>
            <p id="tour-step-note" class="font-body-sm text-xs text-on-surface-variant mt-1 leading-snug">Step instructions</p>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-outline-variant/60">
            <button type="button" class="px-2.5 py-1 text-xs text-on-surface-variant hover:text-error transition-colors" onclick="window.PrototypeHUD.stopTour()">Exit Workflow</button>
            <div class="flex items-center gap-1.5">
              <button type="button" id="tour-prev-btn" class="px-2.5 py-1 bg-surface-container hover:bg-surface-container-high text-xs rounded font-label-md" onclick="window.PrototypeHUD.prevTourStep()">Previous</button>
              <button type="button" id="tour-next-btn" class="px-3 py-1 bg-primary hover:bg-primary-container text-on-primary text-xs rounded font-label-md flex items-center gap-1" onclick="window.PrototypeHUD.nextTourStep()">Next <span class="material-symbols-outlined text-[14px]">arrow_forward</span></button>
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(hud);
      this.createScreensModal();
      this.createToursModal();
    }

    createScreensModal() {
      const modal = document.createElement('div');
      modal.id = 'bhoomi-screens-modal';
      modal.className = 'fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6';

      const screens = window.BHOOMI_SCREENS || [];
      const categories = [...new Set(screens.map(s => s.category))];

      let categoriesHtml = categories.map(cat => {
        const catScreens = screens.filter(s => s.category === cat);
        return `
          <div class="space-y-3">
            <div class="flex items-center gap-2 border-b border-outline-variant/60 pb-1.5">
              <span class="font-label-md text-xs font-bold text-primary uppercase tracking-wider">${cat}</span>
              <span class="text-xs text-on-surface-variant font-code-sm">(${catScreens.length})</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              ${catScreens.map(s => `
                <div class="group relative p-3 bg-surface-container-lowest border border-outline-variant/80 rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer flex items-start gap-2.5" onclick="window.BhoomiRouter.navigate('${s.id}'); window.PrototypeHUD.toggleScreensModal();">
                  <span class="material-symbols-outlined text-primary text-[22px] shrink-0 mt-0.5 group-hover:scale-110 transition-transform">${s.icon || 'web'}</span>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <h4 class="font-label-md text-xs font-bold text-on-surface group-hover:text-primary transition-colors truncate">${s.title}</h4>
                      <span class="font-code-sm text-[10px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded shrink-0">#${s.id}</span>
                    </div>
                    <p class="font-body-sm text-[11px] text-on-surface-variant mt-1 line-clamp-2 leading-tight">${s.description || ''}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('');

      modal.innerHTML = `
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
          <div class="p-5 border-b border-outline-variant flex items-center justify-between gap-4 bg-surface-container-low">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <span class="material-symbols-outlined text-[24px]">grid_view</span>
              </div>
              <div>
                <h3 class="font-headline-sm text-lg font-bold text-on-surface">Bhoomi Setu Module Directory</h3>
                <p class="font-body-sm text-xs text-on-surface-variant">All 32 official modules and operational consoles of the Karnataka Land Acquisition Portal</p>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <input type="text" id="hud-screen-search" placeholder="Search modules..." class="px-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant rounded-lg w-48 focus:outline-none focus:border-primary" oninput="window.PrototypeHUD.filterScreens(this.value)" />
              <button type="button" class="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" onclick="window.PrototypeHUD.toggleScreensModal()">
                <span class="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>
          <div id="hud-screens-list-container" class="p-6 overflow-y-auto space-y-6 flex-1 max-h-[calc(90vh-90px)]">
            ${categoriesHtml}
          </div>
        </div>
      `;

      document.body.appendChild(modal);
    }

    createToursModal() {
      const modal = document.createElement('div');
      modal.id = 'bhoomi-tours-modal';
      modal.className = 'fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm hidden flex items-center justify-center p-4 sm:p-6';

      modal.innerHTML = `
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-w-2xl w-full flex flex-col overflow-hidden animate-scaleUp">
          <div class="p-5 border-b border-outline-variant flex items-center justify-between gap-4 bg-surface-container-low">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-on-primary">
                <span class="material-symbols-outlined text-[24px]">explore</span>
              </div>
              <div>
                <h3 class="font-headline-sm text-lg font-bold text-on-surface">Statutory Operational Workflows</h3>
                <p class="font-body-sm text-xs text-on-surface-variant">Explore end-to-end statutory land acquisition procedures under RFCTLARR Act 2013</p>
              </div>
            </div>
            <button type="button" class="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" onclick="window.PrototypeHUD.toggleToursModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
          <div class="p-6 space-y-3.5 overflow-y-auto max-h-[70vh]">
            ${TOURS.map(t => `
              <div class="p-4 bg-surface-container-low border border-outline-variant/80 rounded-xl hover:border-secondary hover:shadow-md transition-all cursor-pointer flex items-start justify-between gap-4 group" onclick="window.PrototypeHUD.startTour('${t.id}')">
                <div class="space-y-1">
                  <h4 class="font-headline-sm text-sm font-bold text-on-surface group-hover:text-secondary transition-colors">${t.name}</h4>
                  <p class="font-body-sm text-xs text-on-surface-variant leading-relaxed">${t.description}</p>
                  <div class="flex items-center gap-2 pt-1 text-[11px] font-code-sm text-primary">
                    <span class="material-symbols-outlined text-[14px]">format_list_numbered</span>
                    <span>${t.steps.length} Connected Steps</span>
                  </div>
                </div>
                <button type="button" class="px-3 py-1.5 bg-secondary text-on-primary rounded-lg text-xs font-label-md shrink-0 group-hover:bg-primary transition-colors">Start Workflow</button>
              </div>
            `).join('')}
          </div>
        </div>
      `;

      document.body.appendChild(modal);
    }

    onRouteChanged(screen) {
      const screenNameEl = document.getElementById('hud-screen-name');
      const roleNameEl = document.getElementById('hud-role-name');
      const roleIconEl = document.getElementById('hud-role-icon');

      if (screenNameEl) screenNameEl.innerText = screen.title;

      if (roleNameEl && roleIconEl) {
        if (screen.role === 'citizen') {
          roleNameEl.innerText = 'Landowner Portal';
          roleIconEl.innerText = 'person';
        } else if (screen.role === 'officer') {
          roleNameEl.innerText = 'SLAO Console';
          roleIconEl.innerText = 'badge';
        } else if (screen.role === 'executive') {
          roleNameEl.innerText = 'Chief Secretary';
          roleIconEl.innerText = 'query_stats';
        } else if (screen.role === 'auth') {
          roleNameEl.innerText = 'Sign In Gateway';
          roleIconEl.innerText = 'lock';
        } else {
          roleNameEl.innerText = 'Public Portal';
          roleIconEl.innerText = 'public';
        }
      }

      if (this.activeTour) {
        const step = this.activeTour.steps[this.tourStepIndex];
        if (step && step.route === screen.id) {
          this.updateTourStepUI();
        }
      }
    }

    toggleScreensModal() {
      const modal = document.getElementById('bhoomi-screens-modal');
      if (modal) modal.classList.toggle('hidden');
    }

    toggleToursModal() {
      const modal = document.getElementById('bhoomi-tours-modal');
      if (modal) modal.classList.toggle('hidden');
    }

    toggleMinimize() {
      this.isMinimized = !this.isMinimized;
      const mainBar = document.getElementById('hud-main-bar');
      const pill = document.getElementById('hud-minimized-pill');
      if (this.isMinimized) {
        mainBar.classList.add('hidden');
        pill.classList.remove('hidden');
      } else {
        mainBar.classList.remove('hidden');
        pill.classList.add('hidden');
      }
    }

    filterScreens(query) {
      const clean = query.toLowerCase().trim();
      const cards = document.querySelectorAll('#hud-screens-list-container .group');
      cards.forEach(c => {
        const text = c.innerText.toLowerCase();
        c.style.display = text.includes(clean) ? 'flex' : 'none';
      });
    }

    startTour(tourId) {
      this.toggleToursModal();
      this.activeTour = TOURS.find(t => t.id === tourId);
      if (!this.activeTour) return;

      this.tourStepIndex = 0;
      const card = document.getElementById('hud-tour-active-card');
      if (card) card.classList.remove('hidden');

      this.goToTourStep(0);
    }

    goToTourStep(index) {
      if (!this.activeTour) return;
      this.tourStepIndex = index;
      const step = this.activeTour.steps[index];
      if (step) {
        window.BhoomiRouter.navigate(step.route);
        this.updateTourStepUI();
      }
    }

    updateTourStepUI() {
      if (!this.activeTour) return;
      const step = this.activeTour.steps[this.tourStepIndex];
      if (!step) return;

      const tourNameEl = document.getElementById('tour-step-tour-name');
      const countEl = document.getElementById('tour-step-count');
      const titleEl = document.getElementById('tour-step-title');
      const noteEl = document.getElementById('tour-step-note');
      const prevBtn = document.getElementById('tour-prev-btn');
      const nextBtn = document.getElementById('tour-next-btn');

      if (tourNameEl) tourNameEl.innerText = this.activeTour.name;
      if (countEl) countEl.innerText = `Step ${this.tourStepIndex + 1} of ${this.activeTour.steps.length}`;
      if (titleEl) titleEl.innerText = step.title;
      if (noteEl) noteEl.innerText = step.note;

      if (prevBtn) prevBtn.disabled = this.tourStepIndex === 0;
      if (nextBtn) {
        if (this.tourStepIndex === this.activeTour.steps.length - 1) {
          nextBtn.innerHTML = `Complete <span class="material-symbols-outlined text-[14px]">done_all</span>`;
        } else {
          nextBtn.innerHTML = `Next <span class="material-symbols-outlined text-[14px]">arrow_forward</span>`;
        }
      }
    }

    nextTourStep() {
      if (!this.activeTour) return;
      if (this.tourStepIndex < this.activeTour.steps.length - 1) {
        this.goToTourStep(this.tourStepIndex + 1);
      } else {
        this.stopTour();
        if (window.BhoomiInteractions) {
          window.BhoomiInteractions.showToast('Workflow completed successfully.', 'success', 'Procedure Complete');
        }
      }
    }

    prevTourStep() {
      if (!this.activeTour) return;
      if (this.tourStepIndex > 0) {
        this.goToTourStep(this.tourStepIndex - 1);
      }
    }

    stopTour() {
      this.activeTour = null;
      this.tourStepIndex = 0;
      const card = document.getElementById('hud-tour-active-card');
      if (card) card.classList.add('hidden');
    }

    initTheme() {
      const savedTheme = localStorage.getItem('bhoomi_theme') || 'light';
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
        this.updateThemeIcon(true);
      } else {
        document.documentElement.classList.remove('dark');
        this.updateThemeIcon(false);
      }
    }

    toggleTheme() {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('bhoomi_theme', isDark ? 'dark' : 'light');
      this.updateThemeIcon(isDark);
      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast(
          isDark ? 'Dark Mode Activated' : 'Light Mode Activated',
          'info',
          'Theme Switcher'
        );
      }
    }

    updateThemeIcon(isDark) {
      const icon = document.getElementById('hud-theme-icon');
      if (icon) {
        icon.innerText = isDark ? 'light_mode' : 'dark_mode';
        icon.className = isDark ? 'material-symbols-outlined text-[18px] text-amber-300' : 'material-symbols-outlined text-[18px] text-amber-500';
      }
    }
  }

  window.PrototypeHUD = new PrototypeHUD();
})();
