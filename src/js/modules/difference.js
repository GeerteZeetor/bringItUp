export class Difference {
  constructor(oldOfficer, newOfficer, items) {
    this.oldOfficer = document.querySelector(oldOfficer);
    this.newOfficer = document.querySelector(newOfficer);
    this.items = items;
  }

  bindTriggers(colum) {
    let count = 0;
    try {
      const items = colum.querySelectorAll(this.items);
      colum.querySelector('.plus').addEventListener('click', () => {
        if (count !== items.length - 2) {
          items[count].style.display = 'flex';
          items[count].style.animationDuration = '0.6s';
          items[count].classList.add('animated', 'fadeInUp');
          count++;
        } else {
          items[count].style.display = 'flex';
          items[count].style.animationDuration = '0.6s';
          items[count].classList.add('animated', 'fadeInUp');
          items[items.length - 1].remove();
        }
      });
    } catch (e) {}
  }

  hideItems(colum) {
    try {
      colum.querySelectorAll(this.items).forEach((item, i, arr) => {
        if (i !== arr.length - 1) {
          item.style.display = 'none';
        }
      });
    } catch (e) {}
  }

  init() {
    try {
      this.hideItems(this.oldOfficer);
      this.hideItems(this.newOfficer);
      this.bindTriggers(this.oldOfficer);
      this.bindTriggers(this.newOfficer);
    } catch (e) {}
  }
}
