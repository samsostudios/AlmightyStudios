import { gsap } from 'gsap';

class WorkCount {
  private workItems: HTMLElement[];
  private workText: HTMLElement;
  private workCount: number;

  constructor() {
    this.workItems = [...document.querySelectorAll('[data-header-count]')] as HTMLElement[];
    this.workText = document.querySelector('.hero-header_count') as HTMLElement;
    this.workCount = this.workItems.length;

    this.startCount();
  }

  private startCount() {
    const element = this.workText;
    const targetValue = this.workCount;

    gsap.to(element, {
      innerHTML: targetValue,
      duration: 2,
      snap: { innerHTML: 1 },
      ease: 'power1.out',
      onUpdate: () => {
        if (element) {
          const rounded = Math.ceil(Number(element.textContent));
          console.log(rounded, element.textContent);
          element.innerHTML = `${rounded}`;
        }
      },
    });
  }
}
export const workCount = () => {
  new WorkCount();
};

export default workCount;
