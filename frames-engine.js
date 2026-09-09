// Bhoomi Setu — Rich Interactive Modal Frames Engine
// Provides visual, plain-English modal frames for every feature
(function () {
  class FramesEngine {
    constructor() {
      this.init();
    }

    init() {
      // Escape closes modal
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeFrame();
      });
    }

    closeFrame() {
      const modal = document.getElementById('bhoomi-feature-frame');
      if (modal) modal.remove();
    }

    createFrame(title, subtitle, icon, contentHtml, footerHtml = '') {
      this.closeFrame();

      const modal = document.createElement('div');
      modal.id = 'bhoomi-feature-frame';
      modal.className = 'fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-fadeIn font-sans';

      modal.innerHTML = `
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] flex flex-col overflow-hidden animate-scaleUp">
          <!-- Header -->
          <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <span class="material-symbols-outlined text-[24px]">${icon}</span>
              </div>
              <div>
                <h3 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">${title}</h3>
                <p class="font-body-sm text-xs text-on-surface-variant">${subtitle}</p>
              </div>
            </div>
            <button type="button" class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors" onclick="window.FramesEngine.closeFrame()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto max-h-[calc(92vh-140px)] space-y-4">
            ${contentHtml}
          </div>

          <!-- Footer -->
          ${footerHtml ? `
            <div class="p-4 border-t border-outline-variant bg-surface-container-low flex items-center justify-between gap-3">
              ${footerHtml}
            </div>
          ` : ''}
        </div>
      `;

      modal.onclick = (e) => {
        if (e.target === modal) this.closeFrame();
      };

      document.body.appendChild(modal);
    }

    // 1. Land Compensation & Money Payout Frame
    openCompensationFrame() {
      const content = `
        <div class="space-y-4 text-xs font-sans">
          <!-- Top summary banner -->
          <div class="p-5 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span class="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">Total Approved Compensation Money</span>
              <h2 class="text-2xl sm:text-3xl font-extrabold font-mono mt-1">₹ 6,78,40,000</h2>
              <p class="text-xs text-white/80 mt-0.5">Calculated under Right to Fair Compensation Act (RFCTLARR 2013)</p>
            </div>
            <div class="bg-white/10 border border-white/20 px-4 py-2 rounded-lg text-center">
              <span class="text-[10px] text-emerald-200 block uppercase font-bold">Payment Status</span>
              <span class="text-xs font-bold text-emerald-100 flex items-center gap-1 mt-0.5">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Direct PFMS Bank Transfer Active
              </span>
            </div>
          </div>

          <!-- 3-Part Money Calculation Breakdown -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div class="p-3.5 bg-surface-container rounded-lg border border-outline-variant space-y-1">
              <span class="text-gray-500 font-bold block">1. Basic Land Value</span>
              <p class="text-lg font-bold text-on-surface font-mono">₹ 3,20,00,000</p>
              <p class="text-[11px] text-gray-500">Market guidance value for 1.45 Acres (58 Guntas) in Bellandur.</p>
            </div>
            <div class="p-3.5 bg-surface-container rounded-lg border border-outline-variant space-y-1">
              <div class="flex items-center justify-between">
                <span class="text-gray-500 font-bold">2. 100% Solatium Bonus</span>
                <span class="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-1.5 py-0.5 rounded">Govt 2X Rule</span>
              </div>
              <p class="text-lg font-bold text-emerald-700 font-mono">+ ₹ 3,20,00,000</p>
              <p class="text-[11px] text-gray-500">Compulsory 100% bonus mandated by law to protect landowners.</p>
            </div>
            <div class="p-3.5 bg-surface-container rounded-lg border border-outline-variant space-y-1">
              <span class="text-gray-500 font-bold block">3. Statutory Interest</span>
              <p class="text-lg font-bold text-primary font-mono">+ ₹ 38,40,000</p>
              <p class="text-[11px] text-gray-500">12% interest calculated from Section 11(1) preliminary notice date.</p>
            </div>
          </div>

          <!-- Bank Account Details -->
          <div class="p-4 bg-surface-container-low rounded-xl border border-outline-variant space-y-2">
            <h4 class="font-bold text-sm text-on-surface flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-[18px]">account_balance</span>
              Beneficiary Bank Deposit Details
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-1">
              <div>
                <span class="text-gray-500 block">Bank Name:</span>
                <strong>Canara Bank</strong>
              </div>
              <div>
                <span class="text-gray-500 block">Account Number:</span>
                <strong class="font-mono">XXXX-XXXX-9182</strong>
              </div>
              <div>
                <span class="text-gray-500 block">IFSC Code:</span>
                <strong class="font-mono">CNRB0001892</strong>
              </div>
              <div>
                <span class="text-gray-500 block">PFMS Ref No:</span>
                <strong class="font-mono text-primary">PFMS2025KA048912</strong>
              </div>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.FramesEngine.closeFrame()">Close</button>
        <button type="button" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5" onclick="window.BhoomiModals.downloadSamplePDF('Land_Compensation_Award_Statement_Sy48_2A.pdf')">
          <span class="material-symbols-outlined text-[16px]">download</span> Download Official Statement PDF
        </button>
      `;

      this.createFrame('Land Compensation & Bank Payment Breakdown', 'Official statutory payout dossier for Survey No. 48/2A Bellandur', 'payments', content, footer);
    }

    // 2. Court Dispute & Lok Adalat Explanation Frame
    openDisputeFrame() {
      const content = `
        <div class="space-y-4 text-xs font-sans">
          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2 text-amber-950">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-amber-600 text-[22px]">gavel</span>
              <h4 class="font-bold text-sm text-amber-900">What is this dispute about? (Plain English Summary)</h4>
            </div>
            <p class="leading-relaxed">
              The landowner (Sri. Rajesh Kumar) submitted a request stating that his 1.45-acre property contains <strong>14 mature coconut trees, a functional borewell, and a residential compound wall</strong> which were undervalued during the initial survey.
            </p>
            <p class="leading-relaxed">
              Instead of dragging this to court for years, the Revenue Officer has referred this case to the <strong>Special Lok Adalat Fast-Track Bench</strong> on <strong>Tuesday, 25 March 2025</strong> to revise the solatium and add <strong>₹ 18.5 Lakhs</strong>.
            </p>
          </div>

          <div class="p-4 bg-surface-container-low border border-outline-variant rounded-xl space-y-3">
            <h4 class="font-bold text-sm text-on-surface">Available Options:</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div class="p-3 bg-white border border-gray-200 rounded-lg space-y-1">
                <span class="font-bold text-primary block">Option A: Accept Revised Lok Adalat Settlement</span>
                <p class="text-[11px] text-gray-500">Receive additional ₹18.5 Lakhs immediately without legal delay.</p>
                <button class="mt-2 text-xs bg-primary text-white px-3 py-1 rounded font-bold w-full" onclick="window.FramesEngine.closeFrame(); window.BhoomiInteractions.showToast('Settlement accepted! ₹18.5 Lakh added to PFMS payout queue.', 'success');">Accept Settlement ➔</button>
              </div>
              <div class="p-3 bg-white border border-gray-200 rounded-lg space-y-1">
                <span class="font-bold text-gray-800 block">Option B: Attend In-Person Hearing</span>
                <p class="text-[11px] text-gray-500">Present tree valuation receipts before SLAO Sri Shivaram on 25 March 2025.</p>
                <button class="mt-2 text-xs bg-surface-container text-on-surface px-3 py-1 rounded font-bold w-full" onclick="window.FramesEngine.closeFrame(); window.BhoomiInteractions.showToast('Hearing confirmation SMS sent to registered mobile +91 98450 XXXXX.', 'info');">Confirm Attendance ➔</button>
              </div>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.FramesEngine.closeFrame()">Close</button>
      `;

      this.createFrame('Property Valuation Objection (Lok Adalat Desk)', 'Section 15(1) Tree & Asset Valuation Review', 'balance', content, footer);
    }

    // 3. Metro Construction Progress Frame
    openMetroProgressFrame() {
      const content = `
        <div class="space-y-4 text-xs font-sans">
          <div class="p-4 bg-surface-container rounded-xl border border-outline-variant flex items-center justify-between gap-4">
            <div>
              <span class="text-xs text-primary font-bold uppercase tracking-wider">Project Corridor</span>
              <h3 class="text-base font-bold text-on-surface">Bengaluru Metro Phase 2A (Silk Board to KR Puram)</h3>
              <p class="text-xs text-on-surface-variant mt-0.5">18.2 km Elevated Line along Outer Ring Road</p>
            </div>
            <div class="text-right">
              <span class="text-2xl font-extrabold text-primary font-mono">89.6%</span>
              <span class="block text-[10px] text-gray-500">Land Acquired (312/348 Parcels)</span>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Station Construction & Land Acquisition Status:</h4>
            <div class="space-y-1.5 text-xs max-h-60 overflow-y-auto">
              <div class="flex items-center justify-between p-2.5 bg-white border rounded-lg">
                <span class="font-bold">1. Central Silk Board Interchange</span>
                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Acquired • Piers 82%</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-white border rounded-lg">
                <span class="font-bold">2. HSR Layout Station</span>
                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Acquired • Concourse Cast</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-white border rounded-lg">
                <span class="font-bold">3. Bellandur Station (Near Sy 48/2A)</span>
                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Acquired (Sec 19 Gazetted)</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-white border rounded-lg">
                <span class="font-bold">4. Kadubeesanahalli Station</span>
                <span class="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">Utility Shifting (BESCOM 66kV)</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-white border rounded-lg">
                <span class="font-bold">5. Marathahalli Station</span>
                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Acquired • Viaduct Erected</span>
              </div>
              <div class="flex items-center justify-between p-2.5 bg-white border rounded-lg">
                <span class="font-bold">6. KR Puram Terminal Hub</span>
                <span class="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">100% Acquired • Intermodal Work</span>
              </div>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.FramesEngine.closeFrame()">Close</button>
        <button type="button" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold" onclick="window.FramesEngine.closeFrame(); window.BhoomiRouter.navigate('interactive-acquisition-map');">View Entire Corridor on GIS Map ➔</button>
      `;

      this.createFrame('Namma Metro Phase 2A Construction Progress', 'Outer Ring Road Transit Alignment & Land Readiness', 'train', content, footer);
    }

    // 4. Role Switcher Modal
    openRoleExplainerModal() {
      const content = `
        <div class="space-y-4 text-xs font-sans">
          <p class="text-on-surface-variant text-sm">
            Bhoomi Setu provides 3 distinct roles tailored to everyone involved in land acquisition. Select any role below to instantly switch your view:
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <!-- Role 1 -->
            <div class="p-4 bg-surface-container-low border border-outline-variant hover:border-primary rounded-xl cursor-pointer flex flex-col justify-between group transition-all" onclick="window.FramesEngine.closeFrame(); window.BhoomiBackend.login('citizen');">
              <div class="space-y-1.5">
                <span class="material-symbols-outlined text-emerald-700 text-[28px]">person</span>
                <h4 class="font-bold text-sm text-on-surface group-hover:text-primary">👨‍🌾 Citizen & Landowner</h4>
                <p class="text-on-surface-variant text-[11px] leading-relaxed">
                  <strong>Sri. Rajesh Kumar</strong> (Landowner, Bellandur). View your property survey plot, check your ₹6.78 Cr compensation, and track direct bank payment.
                </p>
              </div>
              <button class="mt-4 text-xs bg-emerald-700 text-white px-3 py-1.5 rounded font-bold w-full">Switch to Landowner ➔</button>
            </div>

            <!-- Role 2 -->
            <div class="p-4 bg-surface-container-low border border-outline-variant hover:border-primary rounded-xl cursor-pointer flex flex-col justify-between group transition-all" onclick="window.FramesEngine.closeFrame(); window.BhoomiBackend.login('officer');">
              <div class="space-y-1.5">
                <span class="material-symbols-outlined text-blue-700 text-[28px]">badge</span>
                <h4 class="font-bold text-sm text-on-surface group-hover:text-primary">👔 Land Officer (SLAO)</h4>
                <p class="text-on-surface-variant text-[11px] leading-relaxed">
                  <strong>Sri. B. Shivaram, KAS</strong> (Special Land Acquisition Officer). Scrutinize Form 9 deeds, apply digital green stamps, and approve gazettes.
                </p>
              </div>
              <button class="mt-4 text-xs bg-blue-700 text-white px-3 py-1.5 rounded font-bold w-full">Switch to SLAO Officer ➔</button>
            </div>

            <!-- Role 3 -->
            <div class="p-4 bg-surface-container-low border border-outline-variant hover:border-primary rounded-xl cursor-pointer flex flex-col justify-between group transition-all" onclick="window.FramesEngine.closeFrame(); window.BhoomiBackend.login('executive');">
              <div class="space-y-1.5">
                <span class="material-symbols-outlined text-purple-700 text-[28px]">query_stats</span>
                <h4 class="font-bold text-sm text-on-surface group-hover:text-primary">🏢 State Executive</h4>
                <p class="text-on-surface-variant text-[11px] leading-relaxed">
                  <strong>Chief Secretary, Govt of Karnataka</strong>. Monitor all Metro & Highway corridors, and run AI turnaround simulations saving 117 days.
                </p>
              </div>
              <button class="mt-4 text-xs bg-purple-700 text-white px-3 py-1.5 rounded font-bold w-full">Switch to Chief Secretary ➔</button>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.FramesEngine.closeFrame()">Close</button>
      `;

      this.createFrame('Switch Active Portal Role', 'Explore the system from different perspectives', 'switch_account', content, footer);
    }

    // 5. Helpdesk & FAQs Modal
    openHelpdeskModal() {
      const content = `
        <div class="space-y-4 text-xs font-sans">
          <div class="p-3.5 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-[28px]">headset_mic</span>
            <div>
              <h4 class="font-bold text-sm text-primary">Government Toll-Free Land Helpline: 1800-425-9900</h4>
              <p class="text-gray-600 text-xs">Available Monday to Saturday (9:00 AM – 6:00 PM) in Kannada & English</p>
            </div>
          </div>

          <div class="space-y-2">
            <h4 class="font-bold text-xs uppercase tracking-wider text-gray-700">Frequently Asked Questions (Plain English):</h4>
            
            <div class="p-3 bg-white border rounded-lg space-y-1">
              <strong class="text-gray-900 block">Q1: How is my land compensation money calculated?</strong>
              <p class="text-gray-600 text-[11px]">
                Under the RFCTLARR 2013 law, you receive the market value of your land PLUS an additional 100% Solatium government bonus (which doubles the base amount), plus 12% interest.
              </p>
            </div>

            <div class="p-3 bg-white border rounded-lg space-y-1">
              <strong class="text-gray-900 block">Q2: How do I receive the money?</strong>
              <p class="text-gray-600 text-[11px]">
                Payments are transferred directly into your Aadhaar-linked bank account through the Public Financial Management System (PFMS) with zero middleman involvement.
              </p>
            </div>

            <div class="p-3 bg-white border rounded-lg space-y-1">
              <strong class="text-gray-900 block">Q3: What if I have buildings, trees, or crops on my land?</strong>
              <p class="text-gray-600 text-[11px]">
                You can raise a Section 15(1) valuation objection in the [Grievances] tab. A horticulture/PWD officer will re-inspect and add the valuation to your final settlement.
              </p>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.FramesEngine.closeFrame()">Close</button>
      `;

      this.createFrame('Citizen Assistance & Frequently Asked Questions', 'Clear answers to land acquisition and payment questions', 'help_outline', content, footer);
    }
  }

  window.FramesEngine = new FramesEngine();
})();
