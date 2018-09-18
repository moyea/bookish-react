export default class BookListPage {
  constructor(page) {
    this.page = page;
  }

  async getHeading() {
    await this.page.waitForSelector('h1');
    const result = await this.page.evaluate(() => {
      return document.querySelector('h1').innerText
    });
    return result;
  }

  async getBooks() {
    await this.page.waitForSelector('.books');
    const books = await this.page.evaluate(() => {
      return [...document.querySelectorAll('.books .title')].map(el => el.innerText);
    });
    return books;
  }

  async getLinks() {
    await this.page.waitForSelector('a.view-detail');

    const links = await this.page.evaluate(() => {
      return [...document.querySelectorAll('a.view-detail')].map(el => el.getAttribute('href'));
    });
    return links;
  }

  async getDescription() {
    await this.page.waitForSelector('.description');
    const result = await this.page.evaluate(() => {
      return document.querySelector('.description').innerText;
    });
    return result;
  }
}
