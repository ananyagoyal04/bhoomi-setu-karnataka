// Bhoomi Setu — High-Impact Data Visualizations & Analytics Engine (Chart.js)
(function () {
  class BhoomiAnalytics {
    constructor() {
      this.charts = {};
    }

    initChartsForScreen(screenId) {
      if (typeof Chart === 'undefined') {
        console.warn('Chart.js not loaded yet.');
        return;
      }
      setTimeout(() => {
        this.destroyAllCharts();
        this.renderCharts(screenId);
      }, 150);
    }

    destroyAllCharts() {
      Object.keys(this.charts).forEach(key => {
        if (this.charts[key]) {
          this.charts[key].destroy();
          delete this.charts[key];
        }
      });
    }

    renderCharts(screenId) {
      // Look for visual canvas targets on the page or inject interactive analytical cards
      const chartCanvas1 = document.getElementById('chart-budget-disbursement');
      const chartCanvas2 = document.getElementById('chart-delay-factors');
      const chartCanvas3 = document.getElementById('chart-land-classification');

      // Auto-inject analytics container if on an executive, project, or macro screen
      if (screenId === 'executive-project-dashboard' || screenId === 'macro-project-governance' || screenId === 'project-detail' || screenId === 'ai-delay-prediction-engine') {
        this.injectExecutiveChartsContainer();
      }
    }

    injectExecutiveChartsContainer() {
      if (document.getElementById('bhoomi-live-analytics-panel')) return;

      const mainContainer = document.querySelector('main > div, main');
      if (!mainContainer) return;

      const panel = document.createElement('div');
      panel.id = 'bhoomi-live-analytics-panel';
      panel.className = 'my-6 p-6 bg-surface-container-lowest border border-outline-variant/80 rounded-2xl shadow-xl';

      panel.innerHTML = `
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-outline-variant/60 gap-3">
          <div>
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-primary text-[26px]">insights</span>
              <h3 class="text-base sm:text-lg font-bold text-on-surface">State Command Visual Analytics & Fiscal Telemetry</h3>
            </div>
            <p class="text-xs text-on-surface-variant mt-0.5">Real-time statutory metrics synced with Karnataka Bhoomi Master DB & PFMS Treasury</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
              <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span> Live Sync
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Chart 1: Budget Disbursed vs Target -->
          <div class="p-4 bg-surface-container-low rounded-xl border border-outline-variant flex flex-col justify-between">
            <div class="mb-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface">Corridor Financial Outlay</h4>
              <p class="text-[11px] text-on-surface-variant">Disbursed vs Pending Statutory Award (₹ Crores)</p>
            </div>
            <div class="h-56 relative">
              <canvas id="chart-budget-bar"></canvas>
            </div>
          </div>

          <!-- Chart 2: Delay Root Causes -->
          <div class="p-4 bg-surface-container-low rounded-xl border border-outline-variant flex flex-col justify-between">
            <div class="mb-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface">Statutory Bottlenecks</h4>
              <p class="text-[11px] text-on-surface-variant">Litigation vs Utility vs Valuation Disputes</p>
            </div>
            <div class="h-56 relative">
              <canvas id="chart-delay-doughnut"></canvas>
            </div>
          </div>

          <!-- Chart 3: Land Acquisition Stage Velocity -->
          <div class="p-4 bg-surface-container-low rounded-xl border border-outline-variant flex flex-col justify-between">
            <div class="mb-3">
              <h4 class="text-xs font-bold uppercase tracking-wider text-on-surface">Section Progression</h4>
              <p class="text-[11px] text-on-surface-variant">Sec 11(1) vs Sec 19(1) vs Sec 23 Disbursed</p>
            </div>
            <div class="h-56 relative">
              <canvas id="chart-stage-polar"></canvas>
            </div>
          </div>
        </div>
      `;

      // Insert at appropriate place in main container
      const targetLocation = mainContainer.querySelector('div.grid, section, div[class*="overflow-x-auto"]') || mainContainer.firstChild;
      mainContainer.insertBefore(panel, targetLocation);

      this.createChartInstances();
    }

    createChartInstances() {
      // 1. Budget Bar Chart
      const ctx1 = document.getElementById('chart-budget-bar');
      if (ctx1) {
        this.charts.budget = new Chart(ctx1, {
          type: 'bar',
          data: {
            labels: ['Metro 2A (ORR)', 'PRR Stage 1', 'Suburban Rail'],
            datasets: [
              {
                label: 'Disbursed (₹ Cr)',
                data: [1842, 4320, 890],
                backgroundColor: '#006b5b',
                borderRadius: 6
              },
              {
                label: 'Pending Escrow (₹ Cr)',
                data: [4152, 16771, 3310],
                backgroundColor: '#89ece1',
                borderRadius: 6
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
            },
            scales: {
              x: { grid: { display: false } },
              y: { grid: { color: 'rgba(0,0,0,0.05)' } }
            }
          }
        });
      }

      // 2. Delay Doughnut Chart
      const ctx2 = document.getElementById('chart-delay-doughnut');
      if (ctx2) {
        this.charts.delay = new Chart(ctx2, {
          type: 'doughnut',
          data: {
            labels: ['High Court Writs (42%)', 'BESCOM 66kV Utility (31%)', 'Sec 15 Valuations (18%)', 'Forest NOC (9%)'],
            datasets: [{
              data: [42, 31, 18, 9],
              backgroundColor: ['#ba1a1a', '#b45309', '#006b5b', '#004f58'],
              borderWidth: 2
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 } } }
            }
          }
        });
      }

      // 3. Stage Polar / Doughnut Chart
      const ctx3 = document.getElementById('chart-stage-polar');
      if (ctx3) {
        this.charts.stage = new Chart(ctx3, {
          type: 'polarArea',
          data: {
            labels: ['Sec 23 Disbursed (312 Parcels)', 'Sec 19 Gazetted (24 Parcels)', 'Sec 11 Preliminary (12 Parcels)'],
            datasets: [{
              data: [312, 24, 12],
              backgroundColor: ['rgba(0, 107, 91, 0.8)', 'rgba(180, 83, 9, 0.8)', 'rgba(186, 26, 26, 0.8)']
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 9 } } }
            }
          }
        });
      }
    }
  }

  window.BhoomiAnalytics = new BhoomiAnalytics();
})();
