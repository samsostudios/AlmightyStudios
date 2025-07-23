import loadComponent from '$utils/loadComonent';
import { initSmoothScroll } from '$utils/smoothScroll';

window.Webflow ||= [];
window.Webflow.push(() => {
  console.log('/// mainJS ///');

  initSmoothScroll();

  loadComponent('.hero-header_count', () => import('$components/workCount'));
  loadComponent('.component_transition', () => import('$components/pageTransition'));
});
