// Bhoomi Setu — Interactive Government Modals & Document Generators
(function () {
  class BhoomiModals {
    constructor() {
      this.activeModal = null;
      this.init();
    }

    init() {
      // Listen for escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeModal();
      });
    }

    closeModal() {
      const modal = document.getElementById('bhoomi-dynamic-modal');
      if (modal) modal.remove();
      this.activeModal = null;
    }

    createModalWrapper(title, subtitle, contentHtml, footerHtml = '') {
      this.closeModal();

      const modal = document.createElement('div');
      modal.id = 'bhoomi-dynamic-modal';
      modal.className = 'fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn';

      modal.innerHTML = `
        <div class="bg-surface-container-lowest border border-outline-variant rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-scaleUp">
          <!-- Header -->
          <div class="p-5 border-b border-outline-variant bg-surface-container-low flex items-center justify-between gap-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary">
                <span class="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div>
                <h3 class="font-headline-sm text-base sm:text-lg font-bold text-on-surface">${title}</h3>
                <p class="font-body-sm text-xs text-on-surface-variant">${subtitle}</p>
              </div>
            </div>
            <button type="button" class="p-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-lg transition-colors" onclick="window.BhoomiModals.closeModal()">
              <span class="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
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
        if (e.target === modal) this.closeModal();
      };

      document.body.appendChild(modal);
      this.activeModal = modal;
    }

    // 1. Form 49-B PDF Dossier Preview
    openForm49BPreview() {
      const content = `
        <div class="bg-white p-6 border border-gray-300 rounded-lg shadow-sm font-sans text-gray-800 space-y-4">
          <div class="text-center border-b pb-4 space-y-1">
            <p class="text-xs uppercase tracking-widest font-bold text-gray-600">ಕರ್ನಾಟಕ ಸರ್ಕಾರ | Government of Karnataka</p>
            <h2 class="text-lg font-bold text-primary">FORM 49-B: STATUTORY APPLICATION FOR CIVIC LAND ALLOTMENT</h2>
            <p class="text-xs text-gray-500">Under Karnataka Land Revenue Act & Civic Allotment Rules 2025</p>
            <div class="inline-block bg-teal-50 border border-teal-300 text-teal-800 text-xs px-3 py-1 rounded font-mono font-bold mt-1">
              Application Ref: KA-LA-2025-PHC-00892
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4 text-xs pt-2">
            <div>
              <span class="text-gray-500 block">Applicant Agency / Trust:</span>
              <strong class="text-sm">District Health & Family Welfare Society</strong>
            </div>
            <div>
              <span class="text-gray-500 block">Proposed Public Utility:</span>
              <strong class="text-sm">50-Bed Primary Healthcare Centre (PHC) & Maternity Wing</strong>
            </div>
            <div>
              <span class="text-gray-500 block">Identified Government Parcel:</span>
              <strong>Sy. No. 56/2, Chikkabanavara Village (Bengaluru North)</strong>
            </div>
            <div>
              <span class="text-gray-500 block">Requested Extent:</span>
              <strong>3.20 Acres (Gomal Converted Civic Zone)</strong>
            </div>
          </div>

          <div class="border-t pt-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Attached Statutory Dossier</h4>
            <div class="space-y-1.5 text-xs">
              <div class="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span class="flex items-center gap-2"><span class="material-symbols-outlined text-green-600 text-[16px]">check_circle</span> DPR_PHC_Chikkabanavara_2025.pdf</span>
                <span class="text-gray-400 font-mono">4.2 MB • SHA-256 Verified</span>
              </div>
              <div class="flex items-center justify-between p-2 bg-gray-50 rounded border">
                <span class="flex items-center gap-2"><span class="material-symbols-outlined text-green-600 text-[16px]">check_circle</span> Health_Dept_Administrative_Sanction.pdf</span>
                <span class="text-gray-400 font-mono">1.8 MB • Digitally Signed</span>
              </div>
            </div>
          </div>

          <div class="border-t pt-4 flex items-center justify-between text-xs text-gray-500">
            <div>
              <p>Submitted via Bhoomi Setu Single Window Portal</p>
              <p class="font-mono text-[10px]">Timestamp: ${new Date().toLocaleString()}</p>
            </div>
            <div class="text-right">
              <div class="w-16 h-16 bg-gray-100 border border-gray-300 rounded flex items-center justify-center font-mono text-[9px] text-gray-400 ml-auto">
                [ QR SEAL ]
              </div>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.BhoomiModals.closeModal()">Close Preview</button>
        <div class="flex gap-2">
          <button type="button" class="px-4 py-2 bg-secondary text-white rounded-lg text-xs font-bold flex items-center gap-1.5" onclick="window.BhoomiModals.downloadSamplePDF('Form_49B_KA-LA-2025-PHC-00892.pdf')">
            <span class="material-symbols-outlined text-[16px]">download</span> Export Application PDF
          </button>
          <button type="button" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold" onclick="window.BhoomiModals.closeModal(); window.BhoomiRouter.navigate('application-status-tracker'); window.BhoomiInteractions.showToast('Application Form 49-B Transmitted to SLAO Desk!', 'success');">
            Submit & Track Application
          </button>
        </div>
      `;

      this.createModalWrapper('Form 49-B Dossier Preview', 'Official Land Allotment Application Summary', content, footer);
    }

    // 2. Official Gazette Publication Document
    openGazetteDocument() {
      const content = `
        <div class="bg-amber-50/40 p-6 border-2 border-amber-900/30 rounded-lg shadow-sm font-serif text-gray-900 space-y-4 max-w-3xl mx-auto">
          <div class="text-center border-b-2 border-double border-amber-900/40 pb-4">
            <p class="text-xs uppercase tracking-widest font-bold">ಕರ್ನಾಟಕ ರಾಜ್ಯಪತ್ರ | THE KARNATAKA GAZETTE</p>
            <p class="text-[11px] italic">OFFICIAL PUBLICATION • PUBLISHED BY AUTHORITY</p>
            <h2 class="text-base sm:text-lg font-bold mt-2 uppercase">SPECIAL NOTIFICATION UNDER SECTION 19(1)</h2>
            <p class="text-xs">The Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013</p>
            <p class="font-mono text-xs font-bold text-primary mt-1">Notification No: KA-GAZ-2025-BLR-0412 • Date: 25th March 2025</p>
          </div>

          <div class="text-xs leading-relaxed space-y-2.5">
            <p>
              Whereas by notification of Government of Karnataka under Section 11(1) of the RFCTLARR Act 2013, it was declared that land in <strong>Bellandur Village, Varthur Hobli, Bengaluru East Taluk</strong> was required for public infrastructure: <strong>Bengaluru Metro Phase 2A (Silk Board to KR Puram Alignment)</strong>.
            </p>
            <p>
              Now, therefore, in exercise of powers conferred under Section 19(1), the Governor of Karnataka hereby declares that the schedule of land specified hereunder is definitively acquired:
            </p>
          </div>

          <div class="border border-gray-300 rounded overflow-hidden text-[11px] font-sans">
            <table class="w-full text-left">
              <thead class="bg-gray-100 border-b">
                <tr>
                  <th class="p-2">Survey No.</th>
                  <th class="p-2">Khatedar / Landowner</th>
                  <th class="p-2">Extent</th>
                  <th class="p-2">Statutory Award</th>
                </tr>
              </thead>
              <tbody>
                <tr class="border-b bg-white">
                  <td class="p-2 font-bold text-primary">Sy. No. 48/2A</td>
                  <td class="p-2">Rajesh Kumar S/o S. Muniyappa</td>
                  <td class="p-2">1.45 Acres</td>
                  <td class="p-2 font-mono">₹ 6,78,40,000</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="p-2 font-bold text-primary">Sy. No. 48/1</td>
                  <td class="p-2">Smt. Shanthamma & Others</td>
                  <td class="p-2">2.10 Acres</td>
                  <td class="p-2 font-mono">₹ 9,45,00,000</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="pt-4 border-t border-amber-900/30 flex items-center justify-between text-xs font-sans">
            <div class="space-y-1">
              <div class="flex items-center gap-1.5 text-green-700 font-bold">
                <span class="material-symbols-outlined text-[18px]">verified</span>
                <span>Digitally Signed with Class-3 Government DSC</span>
              </div>
              <p class="font-mono text-[10px] text-gray-500">Signer: Sri. B. Shivaram, SLAO Bengaluru North • Cert ID: 98FC-4421-E3B0</p>
            </div>
            <div class="text-right">
              <span class="px-3 py-1 bg-green-100 text-green-800 border border-green-300 font-bold rounded text-xs">GAZETTED & PUBLISHED</span>
            </div>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.BhoomiModals.closeModal()">Close Gazette</button>
        <button type="button" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5" onclick="window.BhoomiModals.downloadSamplePDF('Karnataka_Gazette_Sec19_KA-GAZ-2025-BLR-0412.pdf')">
          <span class="material-symbols-outlined text-[16px]">download</span> Download Gazette PDF
        </button>
      `;

      this.createModalWrapper('Statutory Karnataka Gazette Dossier', 'Official State Publication Archive', content, footer);
    }

    // 3. DSC Token Signing Dialog
    openDSCSignModal() {
      const content = `
        <div class="space-y-4 text-xs font-sans">
          <div class="p-3 bg-secondary-container/30 border border-secondary rounded-lg flex items-center gap-3">
            <span class="material-symbols-outlined text-primary text-[28px]">token</span>
            <div>
              <h4 class="font-bold text-sm text-primary">Class-3 Department Cryptographic Token Detected</h4>
              <p class="text-on-surface-variant text-[11px]">Hardware Token: ePass2003Auto • Signer: Sri. B. Shivaram (SLAO)</p>
            </div>
          </div>

          <div class="space-y-2">
            <label class="font-bold text-on-surface block">Enter Token PIN / Authorization Passphrase:</label>
            <input type="password" id="dsc-pin-input" value="123456" class="w-full px-3 py-2 bg-surface-container border border-outline-variant rounded-lg text-sm font-mono focus:outline-none focus:border-primary" />
            <span class="text-[10px] text-on-surface-variant font-mono">SHA-256 Hash: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</span>
          </div>
        </div>
      `;

      const footer = `
        <button type="button" class="px-4 py-2 bg-surface-container text-on-surface rounded-lg text-xs font-bold" onclick="window.BhoomiModals.closeModal()">Cancel</button>
        <button type="button" class="px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold flex items-center gap-1.5" onclick="window.BhoomiModals.executeDSCSign()">
          <span class="material-symbols-outlined text-[16px]">lock</span> Apply Cryptographic Signature
        </button>
      `;

      this.createModalWrapper('Digital Signature Certificate (DSC) Stamping', 'Statutory Officer Concurrence Seal', content, footer);
    }

    executeDSCSign() {
      this.closeModal();
      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast('DSC Digital Signature Successfully Applied! SHA-256 Hash appended to statutory record.', 'success', 'DSC Token Stamped');
      }
    }

    // 4. Download Real Sample Data (GeoJSON / CSV / PDF)
    downloadSampleData(type) {
      if (type === 'geojson') {
        const geojson = {
          type: "FeatureCollection",
          features: (window.BHOOMI_DATA ? window.BHOOMI_DATA.parcels : []).map(p => ({
            type: "Feature",
            properties: {
              surveyNo: p.surveyNo,
              village: p.village,
              owner: p.owner,
              extent: p.extentAcres,
              stage: p.stage,
              award: p.totalAward
            },
            geometry: {
              type: "Polygon",
              coordinates: [p.polygon || [[77.675, 12.927], [77.678, 12.929], [77.679, 12.926], [77.675, 12.927]]]
            }
          }))
        };
        const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/geo+json' });
        this.triggerDownload(blob, 'Bhoomi_Setu_Cadastral_Parcels.geojson');
      } else if (type === 'csv') {
        const csvContent = "Survey_No,Village,Taluk,Owner,Extent,Stage,Total_Award_INR,PFMS_Status\n" +
          "48/2A,Bellandur,Bengaluru East,Rajesh Kumar,1.45 Acres,Section 19(1) Declared,67840000,PFMS Direct Credit Initiated\n" +
          "48/1,Bellandur,Bengaluru East,Shanthamma & Others,2.10 Acres,Section 23 Award Finalized,94500000,Disbursed to Canara Bank\n" +
          "56/2,Chikkabanavara,Bengaluru North,Govt of Karnataka,3.20 Acres,Civic Allotment Available,0,Government Public Land\n";
        const blob = new Blob([csvContent], { type: 'text/csv' });
        this.triggerDownload(blob, 'Bhoomi_Setu_CAG_Audit_Financial_Ledger.csv');
      }
    }

    downloadSamplePDF(filename) {
      const sampleText = `GOVERNMENT OF KARNATAKA - BHOOMI SETU\nOfficial Statutory Document: ${filename}\nGenerated via Bhoomi Setu Land Acquisition & Revenue Portal\nTimestamp: ${new Date().toISOString()}\nStatus: Verified & Concurred under RFCTLARR Act 2013.`;
      const blob = new Blob([sampleText], { type: 'text/plain' });
      this.triggerDownload(blob, filename.replace('.pdf', '.txt'));
    }

    triggerDownload(blob, filename) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast(`Exported ${filename} successfully. Check your browser downloads!`, 'success', 'File Downloaded');
      }
    }
  }

  window.BhoomiModals = new BhoomiModals();
})();
