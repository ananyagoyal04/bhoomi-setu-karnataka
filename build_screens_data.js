const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_bhoomi_setu_land_portal');

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
  'bhoomi_setu_my_land_map_view': {
    id: 'my-land-map',
    folder: 'bhoomi_setu_my_land_map_view',
    name: 'My Registered Land (Spatial GIS Map)',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'map',
    description: 'Spatial cadastral viewer showing survey boundaries and Metro Phase 2A buffer zone'
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
  'bhoomi_setu_financial_escrow_ledger': {
    id: 'financial-escrow-ledger',
    folder: 'bhoomi_setu_financial_escrow_ledger',
    name: 'Financial Compensation & PFMS Ledger',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'account_balance',
    description: 'Statutory PFMS direct credit ledger with statutory interest and TDS computation'
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

  // Extract body classes if any
  const bodyClassMatch = htmlContent.match(/<body[^>]*class=["']([^"']*)["']/i);
  const bodyClass = bodyClassMatch ? bodyClassMatch[1] : 'bg-background font-body-md text-on-surface antialiased';

  // Sanitize path references
  innerHtml = innerHtml
    .replace(/href="#"/g, `data-route="${meta.id}"`)
    .replace(/href="javascript:void\(0\)"/g, `data-route="${meta.id}"`);

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

// Generate screens-data.js
const outputJs = `// Bhoomi Setu — 20 High-Impact Prototype Screens Data
// Generated automatically for ultra-fast loading and flawless rendering
window.BHOOMI_SCREENS = ${JSON.stringify(processedScreens, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'screens-data.js'), outputJs, 'utf8');
console.log(`Successfully processed ${processedScreens.length} core screens.`);
console.log('Saved screens-data.js successfully.');
