// Bhoomi Setu — Live AI Delay Prediction & Mitigation Simulation Engine
(function () {
  class BhoomiSimulations {
    constructor() {
      this.state = {
        actionEscrow: true,
        actionHCVacation: true,
        actionUtility: true,
        actionLokAdalat: true
      };
    }

    mountSimulationControls(container) {
      if (!container || document.getElementById('bhoomi-sim-controls')) return;

      const simBox = document.createElement('div');
      simBox.id = 'bhoomi-sim-controls';
      simBox.className = 'my-6 p-5 bg-surface-container-lowest border-2 border-secondary rounded-xl shadow-lg';

      simBox.innerHTML = `
        <div class="flex items-center justify-between border-b border-outline-variant/60 pb-3 mb-4">
          <div class="flex items-center gap-2.5">
            <span class="material-symbols-outlined text-secondary text-[24px]">tune</span>
            <div>
              <h4 class="font-headline-sm text-sm font-bold text-on-surface">Interactive AI Turnaround Simulator (Karnataka State Engine)</h4>
              <p class="font-body-sm text-xs text-on-surface-variant">Toggle statutory legal & financial turnaround levers to calculate optimized project timeline</p>
            </div>
          </div>
          <div class="text-right">
            <span id="sim-live-badge" class="font-code-sm text-xs bg-secondary/15 text-secondary px-2.5 py-1 rounded-full font-bold">● SIMULATION LIVE</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
          <!-- Toggle 1 -->
          <label class="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3 cursor-pointer hover:border-secondary transition-colors">
            <input type="checkbox" id="toggle-escrow" class="mt-1 h-4 w-4 text-primary rounded" ${this.state.actionEscrow ? 'checked' : ''} onchange="window.BhoomiSimulations.onToggleChange('actionEscrow', this.checked)">
            <div>
              <div class="flex items-center justify-between">
                <span class="font-label-md text-xs font-bold text-on-surface">Section 64/77 Escrow Motion</span>
                <span class="font-code-sm text-[11px] text-secondary font-bold">-45 Days (₹32.4 Cr)</span>
              </div>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Deposit disputed award in Civil Court statutory vault to secure immediate physical possession.</p>
            </div>
          </label>

          <!-- Toggle 2 -->
          <label class="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3 cursor-pointer hover:border-secondary transition-colors">
            <input type="checkbox" id="toggle-hc" class="mt-1 h-4 w-4 text-primary rounded" ${this.state.actionHCVacation ? 'checked' : ''} onchange="window.BhoomiSimulations.onToggleChange('actionHCVacation', this.checked)">
            <div>
              <div class="flex items-center justify-between">
                <span class="font-label-md text-xs font-bold text-on-surface">High Court Special Stay Vacation</span>
                <span class="font-code-sm text-[11px] text-secondary font-bold">-30 Days (₹24.0 Cr)</span>
              </div>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Urgent vacation application with Govt Pleader under public interest infrastructure fast-track.</p>
            </div>
          </label>

          <!-- Toggle 3 -->
          <label class="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3 cursor-pointer hover:border-secondary transition-colors">
            <input type="checkbox" id="toggle-utility" class="mt-1 h-4 w-4 text-primary rounded" ${this.state.actionUtility ? 'checked' : ''} onchange="window.BhoomiSimulations.onToggleChange('actionUtility', this.checked)">
            <div>
              <div class="flex items-center justify-between">
                <span class="font-label-md text-xs font-bold text-on-surface">Tripartite Utility Shifting Deposit</span>
                <span class="font-code-sm text-[11px] text-secondary font-bold">-27 Days (₹18.5 Cr)</span>
              </div>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Joint escrow deposit with BESCOM & BWSSB for 24/7 concurrent transmission line shifting.</p>
            </div>
          </label>

          <!-- Toggle 4 -->
          <label class="p-3 bg-surface-container-low rounded-lg border border-outline-variant flex items-start gap-3 cursor-pointer hover:border-secondary transition-colors">
            <input type="checkbox" id="toggle-lok-adalat" class="mt-1 h-4 w-4 text-primary rounded" ${this.state.actionLokAdalat ? 'checked' : ''} onchange="window.BhoomiSimulations.onToggleChange('actionLokAdalat', this.checked)">
            <div>
              <div class="flex items-center justify-between">
                <span class="font-label-md text-xs font-bold text-on-surface">Expedited Lok Adalat Redressal</span>
                <span class="font-code-sm text-[11px] text-secondary font-bold">-15 Days (₹9.1 Cr)</span>
              </div>
              <p class="font-body-sm text-[11px] text-on-surface-variant mt-0.5">Continuous conciliation bench for Section 15(1) landowner tree and structure valuation objections.</p>
            </div>
          </label>
        </div>

        <!-- Real-time KPI Result Banner -->
        <div class="p-4 bg-surface-container rounded-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div class="space-y-1">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Projected Timeline Delay</span>
            <div id="sim-delay-display" class="font-headline-lg text-2xl font-extrabold text-secondary">+0.2 Months</div>
            <span id="sim-delay-sub" class="font-body-sm text-[11px] text-secondary">Optimized (Down from +4.2 Mo)</span>
          </div>
          <div class="space-y-1 border-x border-outline-variant/60 px-2">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Statutory Days Recovered</span>
            <div id="sim-days-display" class="font-headline-lg text-2xl font-extrabold text-primary">117 Days</div>
            <span class="font-body-sm text-[11px] text-on-surface-variant">Across 348 Survey Parcels</span>
          </div>
          <div class="space-y-1">
            <span class="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider">Public Cost Overrun Prevented</span>
            <div id="sim-savings-display" class="font-headline-lg text-2xl font-extrabold text-secondary font-mono">₹ 84.0 Cr</div>
            <span class="font-body-sm text-[11px] text-secondary font-semibold">Idle Contractor & Inflation Savings</span>
          </div>
        </div>
      `;

      container.prepend(simBox);
      this.recalculate();
    }

    onToggleChange(key, value) {
      this.state[key] = value;
      this.recalculate();
    }

    recalculate() {
      let daysSaved = 0;
      let costSavedCr = 0;

      if (this.state.actionEscrow) { daysSaved += 45; costSavedCr += 32.4; }
      if (this.state.actionHCVacation) { daysSaved += 30; costSavedCr += 24.0; }
      if (this.state.actionUtility) { daysSaved += 27; costSavedCr += 18.5; }
      if (this.state.actionLokAdalat) { daysSaved += 15; costSavedCr += 9.1; }

      // Baseline delay is 126 days (~4.2 months)
      const baseDays = 126;
      const remainingDelayDays = Math.max(5, baseDays - daysSaved);
      const remainingDelayMonths = (remainingDelayDays / 30).toFixed(1);

      const delayEl = document.getElementById('sim-delay-display');
      const delaySubEl = document.getElementById('sim-delay-sub');
      const daysEl = document.getElementById('sim-days-display');
      const savingsEl = document.getElementById('sim-savings-display');

      if (delayEl) {
        delayEl.innerText = `+${remainingDelayMonths} Months`;
        if (remainingDelayMonths <= 1.0) {
          delayEl.className = 'font-headline-lg text-2xl font-extrabold text-secondary';
          if (delaySubEl) delaySubEl.innerText = 'Optimal (Down from +4.2 Mo)';
        } else {
          delayEl.className = 'font-headline-lg text-2xl font-extrabold text-amber-700';
          if (delaySubEl) delaySubEl.innerText = 'Partial Mitigation Active';
        }
      }

      if (daysEl) daysEl.innerText = `${daysSaved} Days`;
      if (savingsEl) savingsEl.innerText = `₹ ${costSavedCr.toFixed(1)} Cr`;

      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast(
          `AI Mitigation Recalculated: ${daysSaved} Statutory Days Recovered • ₹${costSavedCr.toFixed(1)} Cr Savings`,
          'success',
          'Timeline Recomputed'
        );
      }
    }
  }

  window.BhoomiSimulations = new BhoomiSimulations();
})();
