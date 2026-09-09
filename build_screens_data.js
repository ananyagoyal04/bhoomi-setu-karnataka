const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'stitch_bhoomi_setu_land_portal');

const screenMetadata = {
  'bhoomi_setu_portal_home_2': {
    id: 'home',
    folder: 'bhoomi_setu_portal_home_2',
    name: 'Portal Home (Main Gateway)',
    role: 'public',
    category: 'Public Services',
    icon: 'home',
    description: 'Karnataka Land Acquisition & Spatial Portal home page with role selector and corridor overview'
  },
  'bhoomi_setu_portal_home_1': {
    id: 'home-alt',
    folder: 'bhoomi_setu_portal_home_1',
    name: 'Portal Home (Alternate View)',
    role: 'public',
    category: 'Public Services',
    icon: 'cottage',
    description: 'Alternate public portal home view variant'
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
  'bhoomi_setu_parcel_detail': {
    id: 'parcel-detail',
    folder: 'bhoomi_setu_parcel_detail',
    name: 'Citizen Parcel Record (Sy 48/2A)',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'description',
    description: 'Statutory acquisition lifecycle, land attributes, and compensation breakdown for Sy 48/2A Bellandur'
  },
  'bhoomi_setu_available_government_land': {
    id: 'available-government-land',
    folder: 'bhoomi_setu_available_government_land',
    name: 'Public & Government Land Directory',
    role: 'public',
    category: 'Public Services',
    icon: 'holiday_village',
    description: 'Directory of 38 public and government land parcels available for allotment'
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
  'bhoomi_setu_notifications_center': {
    id: 'notifications',
    folder: 'bhoomi_setu_notifications_center',
    name: 'Statutory Notifications & Alerts',
    role: 'citizen',
    category: 'Citizen & Landowner',
    icon: 'notifications_active',
    description: 'Section 11(1) notices, Joint Measurement schedules, and SMS/Email dispatch center'
  },
  'bhoomi_setu_official_login': {
    id: 'official-login',
    folder: 'bhoomi_setu_official_login',
    name: 'Official Sign-In Gateway',
    role: 'auth',
    category: 'Authentication',
    icon: 'lock',
    description: 'Department authentication gateway with role presets for SLAO, Executive, and Citizen'
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
  'bhoomi_setu_officer_parcel_detail': {
    id: 'officer-parcel-detail',
    folder: 'bhoomi_setu_officer_parcel_detail',
    name: 'Officer Hearing Dossier (Sy 48/2A)',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'folder_shared',
    description: 'Official inspection case, title deed verification, and statutory award docket'
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
    name: 'Official Gazette Publishing & DSC Hub',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'newspaper',
    description: 'State gazette compiler with DSC cryptographic token signing and instant publishing'
  },
  'bhoomi_setu_cadastral_export_reports_hub': {
    id: 'cadastral-export-hub',
    folder: 'bhoomi_setu_cadastral_export_reports_hub',
    name: 'Cadastral Export & Statutory Reports Hub',
    role: 'officer',
    category: 'Revenue Officer & SLAO',
    icon: 'download_for_offline',
    description: 'Official export center for Gazette bundles, GIS shapefiles, and CAG financial audits'
  },
  'bhoomi_setu_executive_state_dashboard_1': {
    id: 'executive-dashboard-1',
    folder: 'bhoomi_setu_executive_state_dashboard_1',
    name: 'Executive State Dashboard (Macro & Corridors)',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'query_stats',
    description: 'State-level executive command center for Chief Secretary with corridor health matrix'
  },
  'bhoomi_setu_executive_state_dashboard_2': {
    id: 'executive-dashboard-2',
    folder: 'bhoomi_setu_executive_state_dashboard_2',
    name: 'Executive State Dashboard (District Velocity)',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'analytics',
    description: 'District-wise acquisition velocity, SLAO rankings, and bottleneck origin analysis'
  },
  'bhoomi_setu_project_registry': {
    id: 'project-registry',
    folder: 'bhoomi_setu_project_registry',
    name: 'Acquisition Projects Registry',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'folder_open',
    description: 'State infrastructure directory covering Metro Phase 2A, PRR, STRR, and Suburban Rail'
  },
  'bhoomi_setu_project_detail': {
    id: 'project-detail',
    folder: 'bhoomi_setu_project_detail',
    name: 'Bengaluru Metro Phase 2A Project Detail',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'train',
    description: 'Comprehensive project dossier with 348 linked survey parcels and station alignment'
  },
  'bhoomi_setu_interactive_acquisition_map': {
    id: 'interactive-acquisition-map',
    folder: 'bhoomi_setu_interactive_acquisition_map',
    name: 'GIS Interactive Acquisition Corridor Map',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'layers',
    description: 'Full GIS spatial corridor map with layer controls and parcel boundary popups'
  },
  'bhoomi_setu_ml_delay_prediction_panel': {
    id: 'ml-delay-prediction',
    folder: 'bhoomi_setu_ml_delay_prediction_panel',
    name: 'ML Delay Prediction & Risk Attribution',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'psychology',
    description: 'Machine learning timeline projection, risk attribution factors, and historical precedents'
  },
  'bhoomi_setu_ai_mitigation_recommendations_panel': {
    id: 'ai-mitigation-panel',
    folder: 'bhoomi_setu_ai_mitigation_recommendations_panel',
    name: 'AI Mitigation & Turnaround Recommendations',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'auto_awesome',
    description: 'Automated legal and financial turnaround action matrix with live simulation engine'
  },
  'bhoomi_setu_financial_escrow_ledger': {
    id: 'financial-escrow-ledger',
    folder: 'bhoomi_setu_financial_escrow_ledger',
    name: 'Statutory Compensation & Court Escrow Ledger',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'account_balance',
    description: 'PFMS direct bank transfers and Civil Court Section 64/77 disputed title escrow vault'
  },
  'bhoomi_setu_legal_caveats_registry': {
    id: 'legal-caveats-registry',
    folder: 'bhoomi_setu_legal_caveats_registry',
    name: 'Litigation & High Court Caveat Registry',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'balance',
    description: 'High Court writ petitions registry with stay order tracking and vacation motions'
  },
  'bhoomi_setu_utility_relocation_matrix': {
    id: 'utility-relocation-matrix',
    folder: 'bhoomi_setu_utility_relocation_matrix',
    name: 'Inter-Agency Utility Relocation & ROW Matrix',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'electrical_services',
    description: 'Multi-agency shifting matrix for BESCOM power lines, BWSSB water mains, and GAIL gas'
  },
  'bhoomi_setu_climate_flood_hazard_map_overlay': {
    id: 'climate-flood-hazard',
    folder: 'bhoomi_setu_climate_flood_hazard_map_overlay',
    name: 'Climate & Flood Hazard Map Overlay',
    role: 'executive',
    category: 'Executive State Command',
    icon: 'flood',
    description: 'Hydrological spatial overlay for SWD Raja Kaluve buffer zones and flood risk mitigation'
  }
};

const screens = [];

for (const [folderName, meta] of Object.entries(screenMetadata)) {
  const codePath = path.join(baseDir, folderName, 'code.html');
  if (!fs.existsSync(codePath)) {
    console.warn(`Warning: Missing code.html for ${folderName}`);
    continue;
  }
  const html = fs.readFileSync(codePath, 'utf8');

  // Extract body classes
  const bodyClassMatch = html.match(/<body[^>]*class=["']([^"']*)["']/i);
  const bodyClass = bodyClassMatch ? bodyClassMatch[1] : 'bg-background font-body-md text-on-surface antialiased';

  // Extract inner body content
  const bodyInnerMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  let bodyContent = bodyInnerMatch ? bodyInnerMatch[1] : html;

  // Remove any inline tailwind script tags or google font link tags inside body to prevent duplication
  bodyContent = bodyContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (tag) => {
    if (tag.includes('cdn.tailwindcss.com') || tag.includes('tailwind-config')) {
      return '';
    }
    return tag;
  });

  screens.push({
    id: meta.id,
    folder: folderName,
    title: meta.name,
    role: meta.role,
    category: meta.category,
    icon: meta.icon,
    description: meta.description,
    bodyClass: bodyClass,
    html: bodyContent.trim()
  });
}

console.log(`Successfully processed ${screens.length} screens.`);

// Generate screens-data.js
const outputCode = `// Bhoomi Setu Screen Templates & Metadata
// Auto-generated from Stitch project screens
window.BHOOMI_SCREENS = ${JSON.stringify(screens, null, 2)};
`;

fs.writeFileSync(path.join(__dirname, 'screens-data.js'), outputCode);
console.log('Saved screens-data.js successfully.');
