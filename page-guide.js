// Bhoomi Setu — Plain-English Contextual Page Explainer Guide
(function () {
  const PAGE_EXPLAINERS = {
    'official-login': {
      title: '🔐 Welcome to Bhoomi Setu — Government of Karnataka Portal',
      simpleWhat: 'This is the main login gateway where landowners, government officers, and state ministers sign in to manage land and payments.',
      simpleWho: 'Choose who you want to explore the portal as:',
      actions: [
        '👨‍🌾 Click [Landowner (Rajesh Kumar)] to see your land and ₹6.78 Cr compensation money.',
        '👔 Click [SLAO Officer (Sri Shivaram)] to verify documents and approve land payments.',
        '🏢 Click [Chief Secretary] to view big Metro & Highway projects across the state.'
      ]
    },
    'home': {
      title: '🏛️ Karnataka Public Land & Project Portal',
      simpleWhat: 'The official public homepage where citizens can search any survey plot, check Metro alignment, or view available government land.',
      simpleWho: 'Public Citizen / General Visitor',
      actions: [
        '🔍 Click [Search Land by Survey No] to look up any property.',
        '🌳 Click [Public Land Directory] to see 38 vacant government plots available for schools & clinics.',
        '🚇 Click [Bengaluru Metro Phase 2A] to see the ongoing Outer Ring Road project.'
      ]
    },
    'citizen-dashboard': {
      title: '👨‍🌾 Landowner Portal — Sri. Rajesh Kumar (Bellandur)',
      simpleWhat: 'Your personal dashboard showing all land you own, how much compensation money you will receive from the government, and your payment status.',
      simpleWho: 'Rajesh Kumar (Landowner, Survey No. 48/2A Bellandur)',
      actions: [
        '💰 Click on [Survey No. 48/2A] to see your ₹6.78 Crore compensation calculation.',
        '🗺️ Click [Map View] to see your land boundaries on a satellite map.',
        '⚖️ Click [Raise Grievance] if you want to request more money for trees or buildings.'
      ]
    },
    'parcel-detail': {
      title: '📄 Land Record & Compensation Breakdown — Sy. No. 48/2A',
      simpleWhat: 'This screen shows the exact breakdown of how the government calculated your land payment (Market Price + 100% Solatium Government Bonus + Interest).',
      simpleWho: 'Landowner Dossier: Rajesh Kumar',
      actions: [
        '💰 Click [View Compensation Money] to see the bank payout details.',
        '🛰️ Click [Open Satellite Map] to view your land on high-res Google/ESRI satellite imagery.',
        '📄 Click [Download Gazette Notice] to see the official government paper.'
      ]
    },
    'my-land-list': {
      title: '📋 All Registered Land Parcels (List View)',
      simpleWhat: 'A clean table listing all properties you own in Bengaluru Urban and their acquisition status.',
      simpleWho: 'Rajesh Kumar (Owner of 3 Land Plots)',
      actions: [
        '🔍 Click [Inspect Dossier] on any row to open the full payment and property details.',
        '🗺️ Click [Switch to Map View] to view all 3 plots on an interactive map.'
      ]
    },
    'my-land-map': {
      title: '🛰️ Interactive Satellite Map of Your Land',
      simpleWhat: 'A high-resolution satellite map showing the exact boundary of your plot (Survey 48/2A) and how the new Metro line passes next to it.',
      simpleWho: 'Rajesh Kumar (Bellandur Property)',
      actions: [
        '🔍 Click on the [Red Polygon] to see your land summary.',
        '📏 Use the [Distance Tool] on the map to measure how close the Metro station is.',
        '🌊 Click [Flood Hazard Overlay] to check if your land is near any lake or rainwater canal.'
      ]
    },
    'officer-dashboard': {
      title: '👔 Government Officer Console — Sri. B. Shivaram (SLAO)',
      simpleWhat: 'The control room for the Special Land Acquisition Officer. Here the officer checks property deeds, handles landowner complaints, and releases payment funds.',
      simpleWho: 'Sri. B. Shivaram, KAS (Special Land Acquisition Officer)',
      actions: [
        '📑 Click [Document Verification Queue] to check and stamp citizen title deeds.',
        '✍️ Click [Multi-Tier Approval] to send files to the Deputy Commissioner.',
        '⚖️ Click [Grievance Hearing Desk] to resolve landowner valuation requests.'
      ]
    },
    'document-verification-queue': {
      title: '📑 Document Verification & Digital Stamping Console',
      simpleWhat: 'The officer inspects scanned land papers (Form 9 consent, Aadhaar, bank passbook) and applies an official digital green stamp.',
      simpleWho: 'Officer Verification Desk',
      actions: [
        '🔍 Click [Inspect Document] to zoom in on the title deed.',
        '🔒 Click [Approve & Apply Digital Token Stamp] to verify the paperwork.'
      ]
    },
    'executive-dashboard-1': {
      title: '🏢 State Executive Command Desk — Chief Secretary',
      simpleWhat: 'High-level dashboard for the Chief Secretary and Ministers to track all mega projects (Metro, Ring Roads), see budgets, and fix project delays.',
      simpleWho: 'Chief Secretary to Government of Karnataka',
      actions: [
        '🤖 Click [AI Project Delay Intelligence] to see how AI finds litigation bottlenecks.',
        '🚇 Click [Projects Registry] to inspect Metro Phase 2A and Peripheral Ring Road.',
        '💰 Click [Escrow Vault] to inspect ₹342 Crore in court-deposited compensation.'
      ]
    },
    'ai-mitigation-panel': {
      title: '🤖 AI Project Turnaround & Time-Saver Simulator',
      simpleWhat: 'Our AI engine analyzes court cases and utility shifting bottlenecks, and suggests actions that save 117 days and ₹84 Crores in public money.',
      simpleWho: 'Executive Decision Maker',
      actions: [
        '⚡ Toggle any of the 4 checkboxes to see the project delay drop from +4.2 Months to +0.2 Months live!',
        '💰 Notice the public funds saved counter updating in real time.'
      ]
    },
    'interactive-acquisition-map': {
      title: '🗺️ Statewide Infrastructure GIS Corridor Map',
      simpleWhat: 'Full interactive GIS map showing the entire 18.2 km Metro Phase 2A route, all 13 stations, and color-coded survey land plots.',
      simpleWho: 'GIS Spatial Planning View',
      actions: [
        '🛰️ Toggle between [Satellite View] and [Cadastral Map] using the top-right button.',
        '🔍 Type "48/2A" in the search box to fly directly to Bellandur station.',
        '📏 Use the [Distance] and [Area] tools to measure real-world distances on the ground.'
      ]
    },
    'available-government-land': {
      title: '🌳 Public & Government Land Directory (38 Vacant Plots)',
      simpleWhat: 'A directory of 38 vacant government-owned land plots in Bengaluru that public organizations can request for hospitals, parks, or schools.',
      simpleWho: 'Public Civic Allotment Portal',
      actions: [
        '🏥 Click on [Sy. No. 56/2 Chikkabanavara] to view guidelines for building a clinic.',
        '📝 Click [Apply for Land (Form 49-B)] to submit a land request.'
      ]
    },
    'application-form': {
      title: '📝 Simple Land Request Form (Form 49-B)',
      simpleWhat: 'A simple form to request government land for public projects (e.g. building a Primary Healthcare Centre).',
      simpleWho: 'Applicant Agency',
      actions: [
        '📎 Click the [Upload Document Box] to simulate attaching a project report.',
        '👁️ Click [Preview Application] to see the official printable government dossier.',
        '✅ Click [Submit Application] to send the request to the Land Officer.'
      ]
    },
    'application-status-tracker': {
      title: '📍 Land Application Status Tracker',
      simpleWhat: 'Track your land allotment request in real time as it moves from Tahsildar site inspection to final Government Gazette order.',
      simpleWho: 'Ref No: KA-LA-2025-PHC-00892',
      actions: [
        '🔍 View each stage of approval (Site Inspection ➔ Officer Scrutiny ➔ Final Order).'
      ]
    }
  };

  class PageGuide {
    constructor() {
      this.isDismissed = false;
    }

    renderGuide(screenId) {
      // Remove previous guide
      const existing = document.getElementById('bhoomi-page-guide');
      if (existing) existing.remove();

      const info = PAGE_EXPLAINERS[screenId] || {
        title: `📌 ${document.title.split('|')[0].trim()}`,
        simpleWhat: 'This official module allows you to view and manage land acquisition records, maps, and compensation files.',
        simpleWho: 'Bhoomi Setu User',
        actions: ['Click any button or table row to inspect details and take action.']
      };

      const guideBox = document.createElement('div');
      guideBox.id = 'bhoomi-page-guide';
      guideBox.className = 'w-full bg-gradient-to-r from-emerald-900/90 to-teal-950 text-white border-b border-emerald-700 shadow-md py-3 px-4 sm:px-8 select-none transition-all duration-300';

      guideBox.innerHTML = `
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <span class="bg-emerald-500 text-gray-950 font-extrabold text-[10px] px-2 py-0.5 rounded uppercase tracking-wider">Simple Guide</span>
              <h4 class="font-bold text-sm text-emerald-100">${info.title}</h4>
            </div>
            <p class="text-white/90 leading-relaxed text-xs max-w-3xl">${info.simpleWhat}</p>
          </div>
          
          <div class="flex items-center gap-2 shrink-0">
            <button type="button" class="px-3 py-1.5 bg-emerald-700/80 hover:bg-emerald-600 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors" onclick="window.FramesEngine.openHelpdeskModal()">
              <span class="material-symbols-outlined text-[16px]">help</span> Help & FAQs
            </button>
            <button type="button" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors" onclick="window.FramesEngine.openRoleExplainerModal()">
              <span class="material-symbols-outlined text-[16px]">switch_account</span> Switch Role
            </button>
          </div>
        </div>
      `;

      // Insert guide directly below header
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
