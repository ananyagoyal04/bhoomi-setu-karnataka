// Bhoomi Setu — Enterprise Client-Side Backend & State Management Engine
// Government of Karnataka | Land Acquisition Management & Revenue System
(function () {
  const STORAGE_KEY = 'BHOOMI_ENTERPRISE_STATE_V1';

  const DEFAULT_USERS = {
    citizen: {
      id: 'USR_CITIZEN_01',
      role: 'citizen',
      roleName: 'Registered Citizen & Landowner',
      name: 'Sri. Rajesh Kumar',
      fatherName: 'Late S. Muniyappa',
      aadhaarMasked: 'XXXX-XXXX-4819',
      mobileMasked: '+91 98450 XXXXX',
      district: 'Bengaluru Urban',
      taluk: 'Bengaluru East',
      village: 'Bellandur',
      avatarIcon: 'person',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300'
    },
    officer: {
      id: 'OFF_SLAO_04',
      role: 'officer',
      roleName: 'Special Land Acquisition Officer (SLAO)',
      name: 'Sri. B. Shivaram, KAS',
      designation: 'Special Land Acquisition Officer — Bengaluru North & East',
      empCode: 'KAS-2012-0894',
      department: 'Revenue Department, Govt of Karnataka',
      dscTokenId: 'ePass2003Auto-98FC-4421',
      avatarIcon: 'badge',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    executive: {
      id: 'EXEC_CS_01',
      role: 'executive',
      roleName: 'Executive State Monitoring Desk',
      name: 'Chief Secretary',
      designation: 'Chief Secretary to Government of Karnataka',
      department: 'Cabinet Secretariat & High Power Committee',
      avatarIcon: 'query_stats',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-300'
    },
    public: {
      id: 'GUEST_PUBLIC',
      role: 'public',
      roleName: 'Public Citizen Access',
      name: 'Public User',
      avatarIcon: 'public',
      badgeClass: 'bg-gray-100 text-gray-800 border-gray-300'
    }
  };

  class BhoomiBackend {
    constructor() {
      this.state = this.loadState();
      this.init();
    }

    init() {
      // Set default user if not logged in
      if (!this.state.currentUser) {
        this.state.currentUser = DEFAULT_USERS.officer; // default official view
        this.saveState();
      }
    }

    loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.warn('Could not read localStorage, using default state.');
      }

      return {
        currentUser: null,
        parcels: (window.BHOOMI_DATA ? window.BHOOMI_DATA.parcels : []),
        applications: [
          {
            refNo: "KA-LA-2025-PHC-00892",
            applicant: "District Health & Family Welfare Society",
            utility: "50-Bed Primary Healthcare Centre (PHC)",
            surveyNo: "56/2",
            village: "Chikkabanavara",
            extent: "3.20 Acres",
            submittedDate: "2025-03-20",
            stage: "SLAO Technical Scrutiny (In Progress)",
            assignedOfficer: "Sri. B. Shivaram (SLAO)",
            status: "IN_PROGRESS"
          }
        ],
        auditLogs: [],
        notifications: [
          {
            id: 'NOTIF_01',
            title: 'Section 19(1) Final Declaration Published',
            body: 'Karnataka Gazette Notification No. KA-GAZ-2025-BLR-0412 published for Survey 48 Series Bellandur.',
            timestamp: '10 mins ago',
            read: false,
            route: 'statutory-gazette-publishing'
          },
          {
            id: 'NOTIF_02',
            title: 'Lok Adalat Hearing Notice Issued',
            body: 'Quasi-judicial hearing scheduled on Tuesday, 25 March 2025 for Section 15(1) valuation objections.',
            timestamp: '2 hours ago',
            read: false,
            route: 'grievance-hearing-desk'
          },
          {
            id: 'NOTIF_03',
            title: 'PFMS Direct Escrow Credit Initiated',
            body: 'Direct compensation escrow fund credit generated for Survey 48/2A (₹ 6.78 Cr).',
            timestamp: '1 day ago',
            read: true,
            route: 'financial-escrow-ledger'
          }
        ]
      };
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (e) {
        console.warn('Could not save state to localStorage.');
      }
    }

    login(roleKey) {
      const user = DEFAULT_USERS[roleKey] || DEFAULT_USERS.public;
      this.state.currentUser = user;
      this.saveState();
      
      this.addAuditLog('USER_LOGIN', `User logged in with role: ${user.roleName} (${user.name})`);

      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast(
          `Authenticated as ${user.name} [${user.roleName}]. Session Active.`,
          'success',
          'Government Authentication'
        );
      }

      // Navigate to respective portal
      if (roleKey === 'citizen') {
        window.BhoomiRouter.navigate('citizen-dashboard');
      } else if (roleKey === 'officer') {
        window.BhoomiRouter.navigate('officer-dashboard');
      } else if (roleKey === 'executive') {
        window.BhoomiRouter.navigate('executive-dashboard-1');
      } else {
        window.BhoomiRouter.navigate('home');
      }

      this.updateAppHeader();
      return user;
    }

    logout() {
      this.state.currentUser = null;
      this.saveState();
      if (window.BhoomiInteractions) {
        window.BhoomiInteractions.showToast('Session ended. Redirecting to Official Sign In.', 'info', 'Logged Out');
      }
      window.BhoomiRouter.navigate('official-login');
      this.updateAppHeader();
    }

    getCurrentUser() {
      return this.state.currentUser || DEFAULT_USERS.public;
    }

    submitForm49B(formData) {
      const refNo = `KA-LA-2025-PHC-${Math.floor(1000 + Math.random() * 9000)}`;
      const newApp = {
        refNo: refNo,
        applicant: formData.applicant || "District Health & Family Welfare Society",
        utility: formData.utility || "50-Bed Primary Healthcare Centre",
        surveyNo: formData.surveyNo || "56/2",
        village: formData.village || "Chikkabanavara",
        extent: formData.extent || "3.20 Acres",
        submittedDate: new Date().toISOString().split('T')[0],
        stage: "Tahsildar Site Verification Pending",
        assignedOfficer: "Sri. B. Shivaram (SLAO)",
        status: "SUBMITTED"
      };

      this.state.applications.unshift(newApp);
      this.addAuditLog('FORM_49B_SUBMIT', `Statutory Application ${refNo} submitted for Sy ${newApp.surveyNo}`);
      this.saveState();
      return newApp;
    }

    applyDSCSignature(docId, signerPin) {
      const user = this.getCurrentUser();
      const hash = `SHA-256: ${Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`;
      const logEntry = {
        docId: docId || "FORM_9_SURVEY_CONSENT",
        signerName: user.name,
        tokenId: user.dscTokenId || "ePass2003-GOV-98FC",
        hash: hash,
        timestamp: new Date().toISOString()
      };

      this.state.auditLogs.unshift(logEntry);
      this.addAuditLog('DSC_STAMP', `Class-3 DSC Signature stamped on ${docId} by ${user.name}`);
      this.saveState();
      return logEntry;
    }

    addAuditLog(action, details) {
      this.state.auditLogs.unshift({
        action,
        details,
        user: this.getCurrentUser().name,
        timestamp: new Date().toISOString()
      });
      this.saveState();
    }

    updateAppHeader() {
      const user = this.getCurrentUser();
      const userPill = document.getElementById('gov-user-session-pill');
      if (userPill) {
        userPill.innerHTML = `
          <div class="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-lg border border-outline-variant text-xs">
            <span class="material-symbols-outlined text-primary text-[18px]">${user.avatarIcon}</span>
            <div class="flex flex-col text-left">
              <span class="font-bold text-on-surface leading-none">${user.name}</span>
              <span class="text-[10px] text-on-surface-variant font-code-sm leading-tight">${user.roleName}</span>
            </div>
            <button type="button" class="ml-2 text-primary hover:text-error text-xs font-bold underline" onclick="window.BhoomiBackend.logout()">Logout</button>
          </div>
        `;
      }
    }
  }

  window.BhoomiBackend = new BhoomiBackend();
})();
