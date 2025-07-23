import gsap from 'gsap';

class PageTransition {
  private component: HTMLElement;
  private links: HTMLAnchorElement[];
  private filteredLinks: HTMLAnchorElement[];
  private transitionMain: HTMLElement;
  private transitionAccent: HTMLElement;
  private transitionLogo: HTMLElement;
  private delay: number;

  constructor() {
    this.component = document.querySelector('.component_transition') as HTMLElement;
    this.links = [...document.querySelectorAll('a')].map((item) => item as HTMLAnchorElement);
    this.filteredLinks = this.filterLinks();
    this.transitionMain = this.component.querySelector('.transition_main') as HTMLElement;
    this.transitionAccent = this.component.querySelector('.transition_accent') as HTMLElement;
    this.transitionLogo = this.component.querySelector('.transition_logo') as HTMLElement;
    this.delay = 0;

    this.checkPage();
    this.setListeners();
  }

  private checkPage() {
    const windowLocation = window.location.pathname;

    if (windowLocation === '/') {
      //   gsap.to(this.component, { display: 'none' });
      this.delay = 1;
    }

    this.animateOut();
  }

  private setListeners() {
    this.filteredLinks.forEach((item) => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const destination = item.href;
        this.animateIn(destination);
      });
    });

    // On Back Button
    window.onpageshow = function (event) {
      if (event.persisted) {
        window.location.reload();
      }
    };
  }

  private animateIn(link: string) {
    console.log('in');
    const tl = gsap.timeline({
      onComplete: () => {
        window.location.href = link;
      },
    });

    tl.set([this.transitionMain, this.transitionAccent], { y: '99%' });
    tl.set(this.component, { display: 'flex' });
    tl.to(this.transitionMain, { duration: 1, y: '0%', ease: 'power2.out' });
    tl.to(this.transitionAccent, { duration: 1, y: '0%', ease: 'power4.out' }, '<');
    tl.to(this.transitionLogo, { duration: 0.5, opacity: 1, ease: 'power1.out' }, '<');
  }

  private animateOut() {
    const tl = gsap.timeline({
      onComplete: () => {
        // Reenable Scrolling
        gsap.set('html', { height: 'auto' });
        gsap.set('body', { overflow: 'auto' });
      },
    });
    tl.to(this.transitionMain, { delay: this.delay, duration: 1, y: '-100%', ease: 'power4.out' });
    tl.to(this.transitionAccent, { duration: 1, y: '-100%', ease: 'power2.out' }, '<');
    tl.to(this.transitionLogo, { duration: 0.25, opacity: 0, ease: 'power4.out' }, '<');
    tl.set(this.component, { display: 'none' });
  }

  private filterLinks() {
    const returnFilter = this.links.filter((link: HTMLAnchorElement) => {
      const temp = new URL(link.href, window.location.origin); // Create a URL object from the anchor's href
      const classList = link.className;

      const isInternal = temp.hostname === window.location.host;
      const isNotAnchor = !temp.href.includes('#');
      const isNotExternal = link.target !== '_blank';

      const isExcluded = /(w-commerce|cart_)/.test(classList);

      return isInternal && isNotAnchor && isNotExternal && !isExcluded;
    });

    return returnFilter;
  }
}
export const pageTransition = () => {
  new PageTransition();
};
export default pageTransition;

// document.addEventListener('load', () => {
//   console.log('load');
// });
