// Bhoomi Setu — Client-Side Hash Router (Enterprise Portal)
(function () {
  const DEFAULT_ROUTE = 'official-login'; // Start with Government Authentication Gateway

  class BhoomiRouter {
    constructor() {
      this.routes = {};
      this.currentRoute = null;
      this.init();
    }

    init() {
      if (window.BHOOMI_SCREENS && Array.isArray(window.BHOOMI_SCREENS)) {
        window.BHOOMI_SCREENS.forEach(screen => {
          this.routes[screen.id] = screen;
        });
      }

      window.addEventListener('hashchange', () => this.handleHashChange());
      window.addEventListener('DOMContentLoaded', () => this.handleHashChange());
    }

    getRouteFromHash() {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      return hash || DEFAULT_ROUTE;
    }

    navigate(routeId) {
      if (this.routes[routeId] || routeId === DEFAULT_ROUTE) {
        window.location.hash = `#/${routeId}`;
      } else {
        console.warn(`Route not found: ${routeId}, falling back to ${DEFAULT_ROUTE}`);
        window.location.hash = `#/${DEFAULT_ROUTE}`;
      }
    }

    handleHashChange() {
      const routeId = this.getRouteFromHash();
      const screen = this.routes[routeId] || this.routes[DEFAULT_ROUTE];

      if (!screen) {
        console.error('No screens available to render.');
        return;
      }

      this.currentRoute = screen.id;
      this.renderScreen(screen);
      this.updateActiveNavs(screen.id);

      if (window.PageGuide && typeof window.PageGuide.renderGuide === 'function') {
        window.PageGuide.renderGuide(screen.id);
      }

      if (window.BhoomiMapEngine && typeof window.BhoomiMapEngine.initMapForScreen === 'function') {
        window.BhoomiMapEngine.initMapForScreen(screen.id);
      }

      if (window.BhoomiAnalytics && typeof window.BhoomiAnalytics.initChartsForScreen === 'function') {
        window.BhoomiAnalytics.initChartsForScreen(screen.id);
      }
      
      if (window.BhoomiInteractions && typeof window.BhoomiInteractions.onScreenMounted === 'function') {
        window.BhoomiInteractions.onScreenMounted(screen);
      }

      if (window.PrototypeHUD && typeof window.PrototypeHUD.onRouteChanged === 'function') {
        window.PrototypeHUD.onRouteChanged(screen);
      }

      if (window.BhoomiBackend && typeof window.BhoomiBackend.updateAppHeader === 'function') {
        window.BhoomiBackend.updateAppHeader();
      }

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
