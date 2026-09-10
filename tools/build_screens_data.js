const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const baseDir = path.join(rootDir, 'stitch_bhoomi_setu_land_portal');

const screenMetadata = {
  'bhoomi_setu_official_login': {
    id: 'official-login',
    folder: 'bhoomi_setu_official_login',
    name: 'Official Sign-In Gateway',
    role: 'auth',
    category: 'Authentication',
    icon: 'lock',
    description: 'Department authentication gateway with 3 pre-fed Aadhaar login cards'
  },
  'bhoomi_setu_portal_home_2': {
    id: 'home',
    folder: 'bhoomi_setu_portal_home_2',
    name: 'Portal Home (Main Gateway)',
    role: 'public',
    category: 'Public Services',
    icon: 'home',
    description: 'Karnataka Land Acquisition & Spatial Portal home page with role selector and corridor overview'
  },
  'bhoomi_setu_land_search': {
    id: 'land-search',
    folder: 'bhoomi_setu_land_search',
    name: 'Statutory Land Search',
    role: 'public',
    category: 'Public Services',
    icon: 'travel_explore',
    description: 'Search land parcels by District, Taluk, Hobli, Village, and Survey Number'
  },
  'bhoomi_setu_search_results': {
    id: 'search-results',
    folder: 'bhoomi_setu_search_results',
    name: 'Cadastral Search Results',
    role: 'public',
    category: 'Public Services',
    icon: 'manage_search',
    description: 'Search results for Survey No. 48 Series in Varthur Hobli'
  },
  'bhoomi_setu_available_government_land': {
    id: 'available-government-land',
    folder: 'bhoomi_setu_available_government_land',
    name: 'Public & Government Land Directory',
    role: 'public',
    category: 'Public Services',
    icon: 'holiday_village',
    description: 'Directory of public and government land parcels available for civic allotment'
  },
  'bhoomi_setu_public_land_detail': {
    id: 'public-land-detail',
    folder: 'bhoomi_setu_public_land_detail',
    name: 'Public Land Allotment Rules (Sy 56/2)',
    role: 'public',
    category: 'Public Services',
    icon: 'policy',
    description: 'Detailed civic amenity guidelines, eligibility checklist, and boundary for Sy 56/2 Chikkabanavara'
  },
  'bhoomi_setu_application_form': {
    id: 'application-form',
    folder: 'bhoomi_setu_application_form',
    name: 'Land Allotment Form 49-B',
    role: 'public',
    category: 'Public Services',
    icon: 'assignment',
    description: 'Statutory application form for institutional land allotment with DPR upload'
  },
  'bhoomi_setu_application_status_tracker': {
    id: 'application-status-tracker',
    folder: 'bhoomi_setu_application_status_tracker',
    name: 'Application Status Tracker',
    role: 'public',
    category: 'Public Services',
    icon: 'checklist_rtl',
    description: 'Live multi-stage timeline tracker for Primary Healthcare Centre allotment (KA-LA-2025-PHC-00892)'
  },
  'bhoomi_setu_citizen_dashboard': {
    id: 'citizen-dashboard',
    folder: 'bhoomi_setu_citizen_dashboard',
    name: 'Citizen Landowner Dashboard',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'person',
    description: 'Landowner portal for Rajesh Kumar with Aadhaar verified land parcels and PFMS direct payout'
  },
  'bhoomi_setu_my_land_list_view': {
    id: 'my-land-list',
    folder: 'bhoomi_setu_my_land_list_view',
    name: 'My Registered Land (List View)',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'format_list_bulleted',
    description: 'Comprehensive table of all citizen-owned survey parcels with statutory notice badges'
  },
  'bhoomi_setu_parcel_detail': {
    id: 'parcel-detail',
    folder: 'bhoomi_setu_parcel_detail',
    name: 'Citizen Parcel Record (Sy 48/2A)',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'description',
    description: 'Statutory acquisition lifecycle, land attributes, and compensation breakdown for Sy 48/2A Bellandur'
  },
  'bhoomi_setu_my_land_map_view': {
    id: 'my-land-map',
    folder: 'bhoomi_setu_my_land_map_view',
    name: 'My Registered Land (Spatial GIS Map)',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'map',
    description: 'Spatial cadastral viewer showing survey boundaries and Metro Phase 2A buffer zone'
  },
  'bhoomi_setu_officer_dashboard': {
    id: 'officer-dashboard',
    folder: 'bhoomi_setu_officer_dashboard',
    name: 'Field Officer SLAO Console',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'badge',
    description: 'Command console for Sri B. Shivaram with ML delay alerts and document verification pipeline'
  },
  'bhoomi_setu_document_verification_queue': {
    id: 'document-verification-queue',
    folder: 'bhoomi_setu_document_verification_queue',
    name: 'Document Verification & Stamping Queue',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'fact_check',
    description: 'Split-view document verification console with digital token stamping tool'
  },
  'bhoomi_setu_multi_level_approval_workflow': {
    id: 'multi-level-approval',
    folder: 'bhoomi_setu_multi_level_approval_workflow',
    name: 'Multi-Tier Statutory Approval Pipeline',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'account_tree',
    description: '4-Tier statutory concurrence workflow (Revenue Inspector -> SLAO -> DC -> Secretary)'
  },
  'bhoomi_setu_grievance_hearing_desk': {
    id: 'grievance-hearing-desk',
    folder: 'bhoomi_setu_grievance_hearing_desk',
    name: 'Statutory Objection & Lok Adalat Hearing Desk',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'gavel',
    description: 'Quasi-judicial docket for Section 15(1) objections and Lok Adalat hearings'
  },
  'bhoomi_setu_statutory_gazette_publishing': {
    id: 'statutory-gazette-publishing',
    folder: 'bhoomi_setu_statutory_gazette_publishing',
    name: 'Official State Gazette Publishing Hub',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'newspaper',
    description: 'State Gazette notification compiler with Kannada/English parity and DSC digital signature'
  },
  'bhoomi_setu_executive_state_dashboard_1': {
    id: 'executive-dashboard-1',
    folder: 'bhoomi_setu_executive_state_dashboard_1',
    name: 'Executive State Command Desk',
    role: 'executive',
    category: 'Executive & State Command',
    icon: 'query_stats',
    description: 'High-level macro acquisition monitoring with corridor health indices and budget disbursement'
  },
  'bhoomi_setu_interactive_acquisition_map': {
    id: 'interactive-acquisition-map',
    folder: 'bhoomi_setu_interactive_acquisition_map',
    name: 'Statewide Infrastructure GIS Corridor Map',
    role: 'executive',
    category: 'Executive & State Command',
    icon: 'travel_explore',
    description: 'Full spatial GIS corridor map with Metro Phase 2A route and 13 stations'
  },
  'bhoomi_setu_ai_mitigation_recommendations_panel': {
    id: 'ai-mitigation-panel',
    folder: 'bhoomi_setu_ai_mitigation_recommendations_panel',
    name: 'AI Project Delay Prediction & Turnaround Matrix',
    role: 'executive',
    category: 'Executive & State Command',
    icon: 'psychology',
    description: 'AI delay attribution matrix with automated escrow and litigation turnaround levers'
  }
};

const processedScreens = [];

for (const [folderKey, meta] of Object.entries(screenMetadata)) {
  const filePath = path.join(baseDir, folderKey, 'code.html');
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    continue;
  }

  let htmlContent = fs.readFileSync(filePath, 'utf8');

  // Extract body content
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let innerHtml = bodyMatch ? bodyMatch[1] : htmlContent;

  // Extract body classes
  const bodyClassMatch = htmlContent.match(/<body[^>]*class=["']([^"']*)["']/i);
  let bodyClass = bodyClassMatch ? bodyClassMatch[1] : 'bg-background font-body-md text-on-surface antialiased';

  // 1. SPECIFIC SCREEN ENHANCEMENTS & CLEAN NAVIGATION WIRING
  if (meta.id === 'official-login') {
    bodyClass = 'bg-background font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-gutter-desktop';
    
    // Inject the 3 Pre-fed Aadhaar Quick Login Cards into official-login screen HTML
    const quickLoginPillsHtml = `
      <!-- 3 Pre-Fed Aadhaar Logins -->
      <div id="quick-login-pills" class="p-4 bg-surface-container-low border-2 border-primary/30 rounded-xl space-y-3">
        <div class="flex items-center justify-between border-b border-outline-variant/60 pb-2">
          <span class="font-bold text-xs text-primary uppercase tracking-wider flex items-center gap-1.5">
            <span class="material-symbols-outlined text-[18px]">badge</span> 3 Demo Aadhaar Logins:
          </span>
          <span class="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">Pre-Fed Cards</span>
        </div>

        <div class="space-y-2.5">
          <!-- Citizen -->
          <button type="button" data-role="citizen" class="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-emerald-600 rounded-lg text-left transition-all hover:shadow-md flex items-center justify-between group">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-emerald-700 text-[26px]">person</span>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-on-surface group-hover:text-emerald-700">1. Citizen / Landowner (Rajesh Kumar)</span>
                  <span class="font-code-sm text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 rounded font-bold">5489-1204-4819</span>
                </div>
                <span class="text-[11px] text-gray-500 block">Sy 48/2A Bellandur • ₹6.78 Cr Compensation & Bank Escrow</span>
              </div>
            </div>
            <span class="text-xs text-emerald-700 font-bold group-hover:translate-x-1 transition-transform shrink-0">Enter ➔</span>
          </button>

          <!-- Officer -->
          <button type="button" data-role="officer" class="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-blue-600 rounded-lg text-left transition-all hover:shadow-md flex items-center justify-between group">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-blue-700 text-[26px]">badge</span>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-on-surface group-hover:text-blue-700">2. SLAO Officer (Sri. B. Shivaram, KAS)</span>
                  <span class="font-code-sm text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-1.5 py-0.2 rounded font-bold">8921-4421-0894</span>
                </div>
                <span class="text-[11px] text-gray-500 block">KAS Officer Token • Verify Title Deeds & Apply Digital DSC Seal</span>
              </div>
            </div>
            <span class="text-xs text-blue-700 font-bold group-hover:translate-x-1 transition-transform shrink-0">Enter ➔</span>
          </button>

          <!-- Executive -->
          <button type="button" data-role="executive" class="w-full p-3 bg-surface-container-lowest border border-outline-variant hover:border-purple-600 rounded-lg text-left transition-all hover:shadow-md flex items-center justify-between group">
            <div class="flex items-center gap-2.5">
              <span class="material-symbols-outlined text-purple-700 text-[26px]">query_stats</span>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-bold text-xs text-on-surface group-hover:text-purple-700">3. Chief Secretary (Executive Desk)</span>
                  <span class="font-code-sm text-[10px] bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 px-1.5 py-0.2 rounded font-bold">1102-9934-0001</span>
                </div>
                <span class="text-[11px] text-gray-500 block">Statewide Command • Metro Phase 2A Tracker & AI Delay Mitigation</span>
              </div>
            </div>
            <span class="text-xs text-purple-700 font-bold group-hover:translate-x-1 transition-transform shrink-0">Enter ➔</span>
          </button>
        </div>
      </div>
    `;

    // Place quick login pills inside the main container before the tabs
    if (!innerHtml.includes('id="quick-login-pills"')) {
      innerHtml = innerHtml.replace(
        /(<div class="w-full bg-surface-container-lowest rounded-xl shadow-md[^>]*>[\s\S]*?<\/div>\s*<\/div>)/i,
        `$1\n${quickLoginPillsHtml}`
      );
    }

    // Wire OTP & credentials buttons
    innerHtml = innerHtml
      .replace(/<span>Send Verification OTP<\/span>/g, `<span>Send Verification OTP</span>`)
      .replace(/<button([^>]*)>\s*<span>Send Verification OTP<\/span>/i, `<button$1 data-role="citizen"><span>Send Verification OTP</span>`)
      .replace(/<button([^>]*)>\s*<span>Authenticate Officer Login<\/span>/i, `<button$1 data-role="officer"><span>Authenticate Officer Login</span>`)
      .replace(/<button([^>]*)>\s*<span>Sign In with DSC Certificate<\/span>/i, `<button$1 data-role="executive"><span>Sign In with DSC Certificate</span>`);
  }

  // 2. Home Screen Buttons
  if (meta.id === 'home') {
    innerHtml = innerHtml
      .replace(/<span>Citizen Portal →<\/span>/g, `<span>Citizen Portal →</span>`)
      .replace(/<button([^>]*)>\s*<span>Citizen Portal →<\/span>/i, `<button$1 data-role="citizen"><span>Citizen Portal →</span>`)
      .replace(/<button([^>]*)>\s*<span>Officer Access →<\/span>/i, `<button$1 data-role="officer"><span>Officer Access →</span>`)
      .replace(/<button([^>]*)>\s*<span>Departmental Login →<\/span>/i, `<button$1 data-role="executive"><span>Departmental Login →</span>`)
      .replace(/href="#role-access"/g, `href="#role-access"`)
      .replace(/href="#gazette-notifications"/g, `data-route="statutory-gazette-publishing"`)
      .replace(/href="#survey-check"/g, `data-route="land-search"`)
      .replace(/href="#notifications-sec4"/g, `data-route="statutory-gazette-publishing"`)
      .replace(/href="#download-forms"/g, `data-route="application-form"`)
      .replace(/href="#grievance"/g, `data-route="grievance-hearing-desk"`)
      .replace(/href="#gis-full"/g, `data-route="interactive-acquisition-map"`);
  }

  // 3. Citizen Dashboard Screen
  if (meta.id === 'citizen-dashboard') {
    innerHtml = innerHtml
      .replace(/href="#"/g, `data-route="parcel-detail"`)
      .replace(/data-route="citizen-dashboard"/g, `data-route="parcel-detail"`);
  }

  // 4. Land Search & Search Results
  if (meta.id === 'land-search') {
    innerHtml = innerHtml.replace(/<button([^>]*)>\s*<span>Search Cadastral Records<\/span>/i, `<button$1 data-route="search-results"><span>Search Cadastral Records</span>`);
  }

  // 5. Public Land & Application
  if (meta.id === 'public-land-detail') {
    innerHtml = innerHtml.replace(/data-route="public-land-detail"/g, `data-route="application-form"`);
  }
  if (meta.id === 'application-form') {
    innerHtml = innerHtml.replace(/data-route="application-form"/g, `data-route="application-status-tracker"`);
  }

  // 6. Officer Flows
  if (meta.id === 'officer-dashboard') {
    innerHtml = innerHtml
      .replace(/href="#verify-queue"/g, `data-route="document-verification-queue"`)
      .replace(/href="#approval-workflow"/g, `data-route="multi-level-approval"`)
      .replace(/href="#grievances"/g, `data-route="grievance-hearing-desk"`)
      .replace(/href="#gazette-hub"/g, `data-route="statutory-gazette-publishing"`);
  }

  // 7. Executive Flows
  if (meta.id === 'executive-dashboard-1') {
    innerHtml = innerHtml
      .replace(/href="#gis-corridor"/g, `data-route="interactive-acquisition-map"`)
      .replace(/href="#ai-turnaround"/g, `data-route="ai-mitigation-panel"`);
  }

  // General Sanitization: replace remaining dead hashes with safe defaults
  innerHtml = innerHtml
    .replace(/href="#"/g, `href="javascript:void(0)"`)
    .replace(/href="javascript:void\(0\)"/g, `href="javascript:void(0)"`);

  processedScreens.push({
    id: meta.id,
    folder: meta.folder,
    title: meta.name,
    role: meta.role,
    category: meta.category,
    icon: meta.icon,
    description: meta.description,
    bodyClass: bodyClass,
    html: innerHtml
  });
}

// Generate screens-data.js in root
const outputJs = `// Bhoomi Setu — Core Prototype Screens Data (20 Targeted Flows)
// Generated automatically for ultra-fast loading and flawless rendering
window.BHOOMI_SCREENS = ${JSON.stringify(processedScreens, null, 2)};
`;

fs.writeFileSync(path.join(rootDir, 'screens-data.js'), outputJs, 'utf8');

// Generate clean screens_info.json in root
fs.writeFileSync(path.join(rootDir, 'screens_info.json'), JSON.stringify(processedScreens.map(s => ({
  id: s.id,
  title: s.title,
  role: s.role,
  category: s.category,
  icon: s.icon,
  description: s.description
})), null, 2), 'utf8');

console.log(`Successfully compiled ${processedScreens.length} core screens into screens-data.js and screens_info.json.`);
