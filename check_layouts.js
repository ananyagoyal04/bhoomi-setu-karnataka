const fs = require('fs');
const path = require('path');

const sampleScreens = [
  'bhoomi_setu_portal_home_2',
  'bhoomi_setu_official_login',
  'bhoomi_setu_citizen_dashboard',
  'bhoomi_setu_my_land_list_view',
  'bhoomi_setu_officer_dashboard',
  'bhoomi_setu_document_verification_queue',
  'bhoomi_setu_executive_state_dashboard_1',
  'bhoomi_setu_project_registry',
  'bhoomi_setu_project_detail',
  'bhoomi_setu_ml_delay_prediction_panel',
  'bhoomi_setu_interactive_acquisition_map'
];

sampleScreens.forEach(id => {
  const file = path.join(__dirname, 'stitch_bhoomi_setu_land_portal', id, 'code.html');
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    const bodyContent = bodyMatch ? bodyMatch[1] : '';
    
    // check top-level children inside body
    const hasHeader = /<header/i.test(bodyContent);
    const hasSidebar = /<aside/i.test(bodyContent) || /sidebar/i.test(bodyContent);
    const hasMain = /<main/i.test(bodyContent);
    const hasFooter = /<footer/i.test(bodyContent);
    
    console.log(`[${id}] -> hasHeader: ${hasHeader}, hasSidebar: ${hasSidebar}, hasMain: ${hasMain}, hasFooter: ${hasFooter}, length: ${html.length}`);
  }
});
