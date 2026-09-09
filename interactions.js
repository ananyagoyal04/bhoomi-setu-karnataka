// Bhoomi Setu — Comprehensive Interactive Engine & Plain-English Event Delegator
(function () {
  class BhoomiInteractions {
    constructor() {
      this.currentScale = 1;
      this.currentLanguage = 'EN';
      this.init();
    }

    init() {
      if (!document.getElementById('bhoomi-toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'bhoomi-toast-container';
        toastContainer.className = 'fixed top-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none max-w-md w-full px-4';
        document.body.appendChild(toastContainer);
      }

      document.addEventListener('click', (e) => this.handleClick(e));
      document.addEventListener('submit', (e) => this.handleSubmit(e));
      document.addEventListener('change', (e) => this.handleChange(e));
    }

    showToast(message, type = 'success', title = 'Bhoomi Setu Notification') {
      const container = document.getElementById('bhoomi-toast-container');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `pointer-events-auto transform transition-all duration-300 ease-out translate-y-[-20px] opacity-0 bg-surface-container-lowest border border-outline-variant rounded-lg p-4 shadow-xl flex items-start gap-3 border-l-4 ${
        type === 'success' ? 'border-l-primary' : type === 'warning' ? 'border-l-amber-600' : 'border-l-error'
      }`;

      const iconName = type === 'success' ? 'check_circle' : type === 'warning' ? 'warning' : 'info';
      const iconColor = type === 'success' ? 'text-primary' : type === 'warning' ? 'text-amber-600' : 'text-error';

      toast.innerHTML = `
        <span class="material-symbols-outlined ${iconColor} text-[22px] shrink-0 mt-0.5">${iconName}</span>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2">
            <h4 class="font-label-md text-label-md font-bold text-on-surface">${title}</h4>
            <span class="font-code-sm text-code-sm text-on-surface-variant text-[11px]">${new Date().toLocaleTimeString()}</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-snug">${message}</p>
        </div>
        <button type="button" class="text-on-surface-variant hover:text-on-surface p-1 -mr-1 -mt-1 rounded" onclick="this.parentElement.remove()">
          <span class="material-symbols-outlined text-[16px]">close</span>
        </button>
      `;

      container.appendChild(toast);

      requestAnimationFrame(() => {
        toast.classList.remove('translate-y-[-20px]', 'opacity-0');
        toast.classList.add('translate-y-0', 'opacity-100');
      });

      setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-[-20px]', 'opacity-0');
        setTimeout(() => toast.remove(), 350);
      }, 4500);
    }

    onScreenMounted(screen) {
      // 1. Render contextual Page Guide
      if (window.PageGuide) {
        window.PageGuide.renderGuide(screen.id);
      }

      // 2. Re-bind screen specific enhancements
      this.enhanceScreen(screen);
    }

    enhanceScreen(screen) {
      // Accessibility buttons binding
      const fontBtns = document.querySelectorAll('button[title*="font size"], button[title*="Font size"]');
      fontBtns.forEach(btn => {
        const text = btn.innerText.trim();
        if (text === 'A-') btn.onclick = (e) => { e.preventDefault(); this.scaleFont(-0.1); };
        if (text === 'A') btn.onclick = (e) => { e.preventDefault(); this.resetFont(); };
        if (text === 'A+') btn.onclick = (e) => { e.preventDefault(); this.scaleFont(0.1); };
      });

      // Language Switcher
      const langBtns = document.querySelectorAll('[aria-label="Language switch"], button:has(.material-symbols-outlined:contains("translate"))');
      langBtns.forEach(btn => {
        if (btn.innerText.includes('EN | ಕನ್ನಡ') || btn.innerText.includes('ಕನ್ನಡ')) {
          btn.onclick = (e) => {
            e.preventDefault();
            this.toggleLanguage();
          };
        }
      });

      // Screen Enhancements
      if (screen.id === 'official-login') {
        this.enhanceLoginPage();
      } else if (screen.id === 'land-search') {
        this.enhanceSearchPage();
      } else if (screen.id === 'application-form') {
        this.enhanceApplicationForm();
      } else if (screen.id === 'ai-mitigation-panel' || screen.id === 'ml-delay-prediction') {
        this.enhanceAIMitigationPanel();
      } else if (screen.id === 'document-verification-queue') {
        this.enhanceDocQueue();
      } else if (screen.id === 'multi-level-approval') {
        this.enhanceApprovalWorkflow();
      } else if (screen.id === 'statutory-gazette-publishing') {
        this.enhanceGazettePublishing();
      } else if (screen.id === 'cadastral-export-hub') {
        this.enhanceCadastralReports();
      }

      // Mount Leaflet Maps
      if (['interactive-acquisition-map', 'my-land-map', 'climate-flood-hazard'].includes(screen.id)) {
        if (window.BhoomiMapEngine) {
          window.BhoomiMapEngine.initMapForScreen(screen.id);
        }
      }
    }

    scaleFont(delta) {
      this.currentScale = Math.max(0.85, Math.min(1.25, this.currentScale + delta));
      document.documentElement.style.fontSize = `${16 * this.currentScale}px`;
      this.showToast(`Font scaling adjusted to ${Math.round(this.currentScale * 100)}%`, 'info', 'Accessibility Display');
    }

    resetFont() {
      this.currentScale = 1;
      document.documentElement.style.fontSize = '16px';
      this.showToast('Font scaling reset to standard 100%', 'info', 'Accessibility Display');
    }

    toggleLanguage() {
      this.currentLanguage = this.currentLanguage === 'EN' ? 'KN' : 'EN';
      const label = this.currentLanguage === 'EN' ? 'English' : 'ಕನ್ನಡ (Kannada)';
      this.showToast(`Language set to ${label}. Bilingual parity active.`, 'info', 'Bilingual Mode');
    }

    enhanceLoginPage() {
      const container = document.querySelector('main .max-w-md') || document.querySelector('main div');
      if (container && !document.getElementById('quick-login-pills')) {
        const quickLoginDiv = document.createElement('div');
        quickLoginDiv.id = 'quick-login-pills';
        quickLoginDiv.className = 'mt-6 p-4 bg-surface-container-low border-2 border-primary/30 rounded-xl space-y-3';
        quickLoginDiv.innerHTML = `
          <div class="flex items-center justify-between border-b border-outline-variant/60 pb-2">
            <span class="font-bold text-xs text-primary uppercase tracking-wider flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[18px]">key</span> Select Access Portal:
            </span>
            <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">1-Click Sign In</span>
          </div>

          <div class="space-y-2">
            <!-- Citizen -->
            <button type="button" class="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-emerald-600 rounded-lg text-left transition-all hover:shadow-md flex items-center justify-between group" onclick="window.BhoomiBackend.login('citizen')">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-emerald-700 text-[24px]">person</span>
                <div>
                  <span class="font-bold text-xs text-on-surface group-hover:text-emerald-700 block">1. Landowner / Citizen (Rajesh Kumar)</span>
                  <span class="text-[11px] text-gray-500">Check your ₹6.78 Cr compensation, bank payout & land map</span>
                </div>
              </div>
              <span class="text-xs text-emerald-700 font-bold group-hover:translate-x-1 transition-transform">Enter ➔</span>
            </button>

            <!-- Officer -->
            <button type="button" class="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-blue-600 rounded-lg text-left transition-all hover:shadow-md flex items-center justify-between group" onclick="window.BhoomiBackend.login('officer')">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-blue-700 text-[24px]">badge</span>
                <div>
                  <span class="font-bold text-xs text-on-surface group-hover:text-blue-700 block">2. Land Acquisition Officer (Sri. B. Shivaram)</span>
                  <span class="text-[11px] text-gray-500">Verify property papers, apply digital stamp & approve files</span>
                </div>
              </div>
              <span class="text-xs text-blue-700 font-bold group-hover:translate-x-1 transition-transform">Enter ➔</span>
            </button>

            <!-- Executive -->
            <button type="button" class="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-purple-600 rounded-lg text-left transition-all hover:shadow-md flex items-center justify-between group" onclick="window.BhoomiBackend.login('executive')">
              <div class="flex items-center gap-2.5">
                <span class="material-symbols-outlined text-purple-700 text-[24px]">query_stats</span>
                <div>
                  <span class="font-bold text-xs text-on-surface group-hover:text-purple-700 block">3. Chief Secretary (State Executive Desk)</span>
                  <span class="text-[11px] text-gray-500">Monitor Metro & Highway projects + AI time-saver engine</span>
                </div>
              </div>
              <span class="text-xs text-purple-700 font-bold group-hover:translate-x-1 transition-transform">Enter ➔</span>
            </button>
          </div>
        `;
        container.appendChild(quickLoginDiv);
      }
    }

    enhanceSearchPage() {
      const selects = document.querySelectorAll('select');
      const districtSelect = selects[0];
      const talukSelect = selects[1];
      const hobliSelect = selects[2];
      const villageSelect = selects[3];
      const surveyInput = document.querySelector('input[type="text"]') || document.querySelector('input');

      if (surveyInput && !surveyInput.value) {
        surveyInput.value = '48/2A';
      }

      if (districtSelect && window.BHOOMI_DATA) {
        const districts = Object.keys(window.BHOOMI_DATA.locations);
        districtSelect.innerHTML = districts.map(d => `<option value="${d}">${d}</option>`).join('');
        this.updateTaluks(districtSelect.value, talukSelect, hobliSelect, villageSelect);

        districtSelect.onchange = () => {
          this.updateTaluks(districtSelect.value, talukSelect, hobliSelect, villageSelect);
        };
      }
    }

    updateTaluks(district, talukSelect, hobliSelect, villageSelect) {
      if (!talukSelect || !window.BHOOMI_DATA) return;
      const districtData = window.BHOOMI_DATA.locations[district] || {};
      const taluks = Object.keys(districtData);
      talukSelect.innerHTML = taluks.map(t => `<option value="${t}">${t}</option>`).join('');
      this.updateHoblis(district, talukSelect.value, hobliSelect, villageSelect);

      talukSelect.onchange = () => {
        this.updateHoblis(district, talukSelect.value, hobliSelect, villageSelect);
      };
    }

    updateHoblis(district, taluk, hobliSelect, villageSelect) {
      if (!hobliSelect || !window.BHOOMI_DATA) return;
      const districtData = window.BHOOMI_DATA.locations[district] || {};
      const talukData = districtData[taluk] || {};
      const hoblis = Object.keys(talukData);
      hobliSelect.innerHTML = hoblis.map(h => `<option value="${h}">${h}</option>`).join('');
      this.updateVillages(district, taluk, hobliSelect.value, villageSelect);

      hobliSelect.onchange = () => {
        this.updateVillages(district, taluk, hobliSelect.value, villageSelect);
      };
    }

    updateVillages(district, taluk, hobli, villageSelect) {
      if (!villageSelect || !window.BHOOMI_DATA) return;
      const districtData = window.BHOOMI_DATA.locations[district] || {};
      const talukData = districtData[taluk] || {};
      const villages = talukData[hobli] || ["Bellandur", "Gunjur"];
      villageSelect.innerHTML = villages.map(v => `<option value="${v}">${v}</option>`).join('');
    }

    enhanceApplicationForm() {
      const dropzones = document.querySelectorAll('div[class*="border-dashed"]');
      dropzones.forEach(dz => {
        dz.style.cursor = 'pointer';
        dz.title = 'Click to attach DPR project report';
        dz.onclick = () => {
          dz.innerHTML = `
            <div class="flex items-center justify-center gap-3 p-3 bg-secondary-container/20 border border-secondary rounded-lg">
              <span class="material-symbols-outlined text-primary text-[24px]">task</span>
              <div class="text-left">
                <p class="font-label-md text-label-md font-bold text-primary">DPR_PHC_Chikkabanavara_2025.pdf</p>
                <p class="font-code-sm text-code-sm text-on-surface-variant text-[11px]">4.2 MB • Verified & Ready for Submission</p>
              </div>
            </div>
          `;
          this.showToast('Project report attached: DPR_PHC_Chikkabanavara_2025.pdf', 'success', 'File Attached');
        };
      });

      const previewBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Preview') || b.innerText.includes('visibility'));
      if (previewBtn) {
        previewBtn.onclick = (e) => {
          e.preventDefault();
          if (window.BhoomiModals) window.BhoomiModals.openForm49BPreview();
        };
      }
    }

    enhanceAIMitigationPanel() {
      const main = document.querySelector('main');
      if (main && window.BhoomiSimulations) {
        window.BhoomiSimulations.mountSimulationControls(main.querySelector('div'));
      }
    }

    enhanceDocQueue() {
      const approveBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Digital Token') || b.innerText.includes('Approve'));
      if (approveBtn) {
        approveBtn.onclick = (e) => {
          e.preventDefault();
          if (window.BhoomiModals) window.BhoomiModals.openDSCSignModal();
        };
      }
    }

    enhanceApprovalWorkflow() {
      const signBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('DSC') || b.innerText.includes('Transmit') || b.innerText.includes('Approve'));
      if (signBtn) {
        signBtn.onclick = (e) => {
          e.preventDefault();
          if (window.BhoomiModals) window.BhoomiModals.openDSCSignModal();
        };
      }
    }

    enhanceGazettePublishing() {
      const gazetteBtn = Array.from(document.querySelectorAll('button, a')).find(b => b.innerText.includes('Publish') || b.innerText.includes('Gazette'));
      if (gazetteBtn) {
        gazetteBtn.onclick = (e) => {
          e.preventDefault();
          if (window.BhoomiModals) window.BhoomiModals.openGazetteDocument();
        };
      }
    }

    enhanceCadastralReports() {
      const exportBtns = document.querySelectorAll('button:has(.material-symbols-outlined)');
      exportBtns.forEach(btn => {
        const text = btn.innerText.toLowerCase();
        if (text.includes('spatial') || text.includes('shapefile') || text.includes('geojson')) {
          btn.onclick = (e) => {
            e.preventDefault();
            if (window.BhoomiModals) window.BhoomiModals.downloadSampleData('geojson');
          };
        } else if (text.includes('cag') || text.includes('audit') || text.includes('financial')) {
          btn.onclick = (e) => {
            e.preventDefault();
            if (window.BhoomiModals) window.BhoomiModals.downloadSampleData('csv');
          };
        } else if (text.includes('gazette') || text.includes('bundle')) {
          btn.onclick = (e) => {
            e.preventDefault();
            if (window.BhoomiModals) window.BhoomiModals.openGazetteDocument();
          };
        }
      });
    }

    handleClick(e) {
      const target = e.target.closest('a, button, [data-path], [data-route], tr[class*="hover"], div[class*="cursor-pointer"], select');
      if (!target) return;

      const dataPath = target.getAttribute('data-path');
      const href = target.getAttribute('href');
      const text = (target.innerText || '').trim();

      // 1. Data-path mapping
      if (dataPath) {
        e.preventDefault();
        this.routeDataPath(dataPath);
        return;
      }

      // 2. Hash anchor links
      if (href && href.startsWith('#/')) {
        return;
      }

      // 3. Compensation and Money Triggers
      if (text.includes('Compensation Breakdown') || text.includes('Escrow Disbursement') || text.includes('₹ 6,78,40,000') || text.includes('PFMS Direct') || text.includes('Compensation Money')) {
        e.preventDefault();
        if (window.FramesEngine) {
          window.FramesEngine.openCompensationFrame();
          return;
        }
      }

      // 4. Dispute & Grievance Triggers
      if (text.includes('Grievance') || text.includes('Statutory Objection') || text.includes('Lok Adalat') || text.includes('Raise Compensation Grievance')) {
        if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('tr')) {
          e.preventDefault();
          if (window.FramesEngine && !window.location.hash.includes('hearing-desk')) {
            window.FramesEngine.openDisputeFrame();
            return;
          }
          window.BhoomiRouter.navigate('grievance-hearing-desk');
          return;
        }
      }

      // 5. Metro Corridor Progress Trigger
      if (text.includes('Bengaluru Metro Phase 2A') || text.includes('Outer Ring Road Line') || text.includes('Silk Board to KR Puram')) {
        if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          e.preventDefault();
          if (window.FramesEngine) {
            window.FramesEngine.openMetroProgressFrame();
            return;
          }
          window.BhoomiRouter.navigate('project-detail');
          return;
        }
      }

      // 6. Helpdesk Trigger
      if (text.includes('Helpdesk') || text.includes('1800-425-9900') || text.includes('Help & FAQs')) {
        e.preventDefault();
        if (window.FramesEngine) {
          window.FramesEngine.openHelpdeskModal();
          return;
        }
      }

      // 7. Header Navigation
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        if (text === 'Home' || text.includes('ಭೂಮಿ ಸೇತು | Bhoomi Setu')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('home');
          return;
        }
        if (text === 'Public Land Directory' || text.includes('Public Land Directory')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('available-government-land');
          return;
        }
        if (text === 'Survey & Gazette' || text.includes('Survey & Gazette')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('statutory-gazette-publishing');
          return;
        }
        if (text === 'Verify Document' || text.includes('Verify Document')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('document-verification-queue');
          return;
        }
        if (text === 'Sign In' || text.includes('Sign In')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('official-login');
          return;
        }
      }

      // 8. Role Selection on Home
      if (text.includes('Registered Citizen') || text.includes('Landowner') || text.includes('Rajesh Kumar')) {
        if (target.closest('section, div[class*="grid"]')) {
          e.preventDefault();
          window.BhoomiBackend.login('citizen');
          return;
        }
      }
      if (text.includes('Special Land Acquisition Officer') || text.includes('SLAO') || text.includes('Shivaram')) {
        if (target.closest('section, div[class*="grid"]')) {
          e.preventDefault();
          window.BhoomiBackend.login('officer');
          return;
        }
      }
      if (text.includes('Executive') || text.includes('State Monitoring') || text.includes('Chief Secretary')) {
        if (target.closest('section, div[class*="grid"]')) {
          e.preventDefault();
          window.BhoomiBackend.login('executive');
          return;
        }
      }

      // 9. Cadastral Search Flow
      if (text.includes('Search Cadastral') || text === 'Search' || text.includes('Search')) {
        if (window.location.hash.includes('land-search')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('search-results');
          this.showToast('Found Survey 48 Series (Bellandur) in land registry', 'success', 'Search Results');
          return;
        }
      }
      if (text.includes('Survey No. 48/2A') || text.includes('Sy. No. 48/2A') || text.includes('48/2A') || text.includes('Inspect Dossier')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('parcel-detail');
        return;
      }

      // 10. Public Land Directory & Application Form Flow
      if (text.includes('Apply for Civic Allotment') || text.includes('Direct Form 49-B') || text.includes('Form 49-B')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('application-form');
        return;
      }
      if (text.includes('View Allotment Guidelines') || text.includes('Sy. No. 56/2') || text.includes('Chikkabanavara')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('public-land-detail');
        return;
      }
      if (text.includes('Track Existing Application') || text.includes('KA-LA-2025-PHC-00892')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('application-status-tracker');
        return;
      }
      if (text.includes('Save Draft as Form 49-B') || text.includes('Submit Statutory Application')) {
        e.preventDefault();
        if (window.BhoomiModals) {
          window.BhoomiModals.openForm49BPreview();
        } else {
          this.showToast('Form 49-B submitted! Reference: KA-LA-2025-PHC-00892', 'success', 'Application Submitted');
          setTimeout(() => window.BhoomiRouter.navigate('application-status-tracker'), 600);
        }
        return;
      }
      if (text.includes('Previous Step')) {
        e.preventDefault();
        window.history.back();
        return;
      }

      // 11. Citizen Navigation
      if (text.includes('My Land Records') || text.includes('List View')) {
        if (!text.includes('Map View')) {
          e.preventDefault();
          window.BhoomiRouter.navigate('my-land-list');
          return;
        }
      }
      if (text.includes('Cadastral Spatial View') || text.includes('Map View')) {
        e.preventDefault();
        if (window.location.hash.includes('executive') || window.location.hash.includes('project')) {
          window.BhoomiRouter.navigate('interactive-acquisition-map');
        } else {
          window.BhoomiRouter.navigate('my-land-map');
        }
        return;
      }
      if (text.includes('Notifications') || text.includes('Alerts')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('notifications');
        return;
      }

      // 12. Officer & Executive Module Navigation
      if (text.includes('Document Verification Queue') || text.includes('Dossier Queue')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('document-verification-queue');
        return;
      }
      if (text.includes('Approval Workflow') || text.includes('Approval Pipeline')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('multi-level-approval');
        return;
      }
      if (text.includes('Gazette Publishing') || text.includes('Official Gazette Publication')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('statutory-gazette-publishing');
        return;
      }
      if (text.includes('Reports Hub') || text.includes('Cadastral Export')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('cadastral-export-hub');
        return;
      }
      if (text.includes('Executive State Dashboard') || text.includes('Executive Dashboard')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('executive-dashboard-1');
        return;
      }
      if (text.includes('Projects Registry') || text.includes('Acquisition Projects')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('project-registry');
        return;
      }
      if (text.includes('GIS Corridor Map') || text.includes('Corridor Map')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('interactive-acquisition-map');
        return;
      }
      if (text.includes('ML Delay') || text.includes('Delay Prediction')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('ml-delay-prediction');
        return;
      }
      if (text.includes('AI Turnaround') || text.includes('AI Mitigation')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('ai-mitigation-panel');
        return;
      }
      if (text.includes('Litigation Registry') || text.includes('Caveat Registry')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('legal-caveats-registry');
        return;
      }
      if (text.includes('Utility Relocation') || text.includes('ROW Clearance')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('utility-relocation-matrix');
        return;
      }
      if (text.includes('Climate & Flood') || text.includes('Flood Hazard')) {
        e.preventDefault();
        window.BhoomiRouter.navigate('climate-flood-hazard');
        return;
      }
    }

    handleSubmit(e) {
      e.preventDefault();
      const currentRoute = window.BhoomiRouter.currentRoute;

      if (currentRoute === 'official-login') {
        const roleSelect = document.querySelector('select');
        const roleVal = roleSelect ? roleSelect.value.toLowerCase() : '';
        if (roleVal.includes('officer') || roleVal.includes('slao')) {
          window.BhoomiBackend.login('officer');
        } else if (roleVal.includes('executive') || roleVal.includes('secretary')) {
          window.BhoomiBackend.login('executive');
        } else {
          window.BhoomiBackend.login('citizen');
        }
      } else if (currentRoute === 'land-search') {
        this.showToast('Found Survey 48 Series in Bellandur', 'success', 'Search Results');
        window.BhoomiRouter.navigate('search-results');
      } else if (currentRoute === 'application-form') {
        if (window.BhoomiModals) {
          window.BhoomiModals.openForm49BPreview();
        } else {
          this.showToast('Form 49-B submitted with Ref: KA-LA-2025-PHC-00892', 'success', 'Form Submitted');
          window.BhoomiRouter.navigate('application-status-tracker');
        }
      } else {
        this.showToast('Action recorded in official database.', 'success', 'Record Updated');
      }
    }

    handleChange(e) {}

    routeDataPath(path) {
      const pathMap = {
        'home': 'home',
        'public-land-directory': 'available-government-land',
        'survey-gazette': 'statutory-gazette-publishing',
        'verify-document': 'document-verification-queue',
        'grievances': 'grievance-hearing-desk',
        'sign-in': 'official-login',
        'helpdesk': 'notifications'
      };

      const target = pathMap[path] || 'home';
      window.BhoomiRouter.navigate(target);
    }
  }

  window.BhoomiInteractions = new BhoomiInteractions();
})();
