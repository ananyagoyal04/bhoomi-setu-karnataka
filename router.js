// Bhoomi Setu — Client-Side Hash Router (Enterprise Portal)
(function () {
  const DEFAULT_ROUTE = 'official-login'; // Start with Government Authentication Gateway

  class BhoomiRouter {
    constructor() {
      this.routes = {};
      this.currentRoute = null;
      this.init();
    }

    loadScreens() {
      if (window.BHOOMI_SCREENS && Array.isArray(window.BHOOMI_SCREENS)) {
        window.BHOOMI_SCREENS.forEach(screen => {
          this.routes[screen.id] = screen;
        });
      }
    }

    init() {
      this.loadScreens();
      window.addEventListener('hashchange', () => this.handleHashChange());
      
      if (document.readyState === 'loading') {
        window.addEventListener('DOMContentLoaded', () => this.handleHashChange());
      } else {
        this.handleHashChange();
      }

      // Safeguard retry in case scripts loaded slightly asynchronously
      setTimeout(() => this.handleHashChange(), 50);
      setTimeout(() => this.handleHashChange(), 200);
    }

    getRouteFromHash() {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      return hash || DEFAULT_ROUTE;
    }

    navigate(routeId) {
      this.loadScreens();
      if (this.routes[routeId] || routeId === DEFAULT_ROUTE) {
        window.location.hash = `#/${routeId}`;
      } else {
        console.warn(`Route not found: ${routeId}, falling back to ${DEFAULT_ROUTE}`);
        window.location.hash = `#/${DEFAULT_ROUTE}`;
      }
    }

    handleHashChange() {
      this.loadScreens();

      const routeId = this.getRouteFromHash();
      const screen = this.routes[routeId] || this.routes[DEFAULT_ROUTE] || (window.BHOOMI_SCREENS ? window.BHOOMI_SCREENS[0] : null);

      if (!screen) {
        console.warn('Waiting for screens dataset...');
        return;
      }

      this.currentRoute = screen.id;
      this.renderScreen(screen);
      this.updateActiveNavs(screen.id);

      // Safe hooks execution with try-catch so nothing blocks rendering
      try {
        if (window.PageGuide && typeof window.PageGuide.renderGuide === 'function') {
          window.PageGuide.renderGuide(screen.id);
        }
      } catch (err) { console.warn('PageGuide error:', err); }

      try {
        if (window.BhoomiMapEngine && typeof window.BhoomiMapEngine.initMapForScreen === 'function') {
          window.BhoomiMapEngine.initMapForScreen(screen.id);
        }
      } catch (err) { console.warn('MapEngine error:', err); }

      try {
        if (window.BhoomiAnalytics && typeof window.BhoomiAnalytics.initChartsForScreen === 'function') {
          window.BhoomiAnalytics.initChartsForScreen(screen.id);
        }
      } catch (err) { console.warn('Analytics error:', err); }
      
      try {
        if (window.BhoomiInteractions && typeof window.BhoomiInteractions.onScreenMounted === 'function') {
          window.BhoomiInteractions.onScreenMounted(screen);
        }
      } catch (err) { console.warn('Interactions error:', err); }

      try {
        if (window.PrototypeHUD && typeof window.PrototypeHUD.onRouteChanged === 'function') {
          window.PrototypeHUD.onRouteChanged(screen);
        }
      } catch (err) { console.warn('PrototypeHUD error:', err); }

      try {
        if (window.BhoomiBackend && typeof window.BhoomiBackend.updateAppHeader === 'function') {
          window.BhoomiBackend.updateAppHeader();
        }
      } catch (err) { console.warn('Backend update error:', err); }

      window.scrollTo({ top: 0, behavior: 'instant' });
    }

    renderScreen(screen) {
      const appRoot = document.getElementById('app-root');
      if (!appRoot) return;

      document.title = `${screen.title} | Bhoomi Setu — Government of Karnataka`;
      document.body.className = screen.bodyClass || 'bg-background font-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container';
      appRoot.innerHTML = screen.html;
    }

    updateActiveNavs(routeId) {
      const links = document.querySelectorAll('nav a, header a, [data-path]');
      links.forEach(link => {
        const dataPath = link.getAttribute('data-path');
        let isActive = false;

        if (dataPath) {
          if (dataPath === 'home' && (routeId === 'home' || routeId === 'home-alt')) isActive = true;
          else if (dataPath === 'public-land-directory' && (routeId === 'available-government-land' || routeId === 'public-land-detail')) isActive = true;
          else if (dataPath === 'survey-gazette' && (routeId === 'statutory-gazette-publishing' || routeId === 'land-search' || routeId === 'search-results')) isActive = true;
          else if (dataPath === 'verify-document' && (routeId === 'document-verification-queue')) isActive = true;
          else if (dataPath === 'grievances' && (routeId === 'grievance-hearing-desk')) isActive = true;
          else if (dataPath === 'sign-in' && (routeId === 'official-login')) isActive = true;
        }

        if (isActive) {
          link.classList.add('text-primary', 'font-bold', 'border-b-2', 'border-primary');
          link.classList.remove('text-on-surface-variant');
          link.setAttribute('aria-current', 'page');
        }
      });
    }
  }

  window.BhoomiRouter = new BhoomiRouter();
})();
