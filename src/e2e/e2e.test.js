import puppeteer from 'puppeteer';
import axios from 'axios';
import BookListPage from './pages/BookListPage';
import DetailPage from './pages/DetailPage';

const appUrlBase = 'http://localhost:3000';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});


describe('Bookish', () => {

  beforeEach(async () => {
    const books = [
      {id: 1, name: 'Refactoring', description: 'Refactoring'},
      {id: 2, name: 'Domain-driven design', description: 'Domain-driven design'}
    ];
    const promises = [];
    books.map(item =>
      promises.push(
        axios.post('http://localhost:8080/books', item, {headers: {'Content-Type': 'application/json'}})
      )
    );
    await Promise.all(promises);
  });

  afterEach(async () => {
    await axios.delete('http://localhost:8080/books?_cleanup=true').catch(err => err);
  });

  test('Heading', async () => {
    await page.goto(`${appUrlBase}/`);

    const listPage = new BookListPage(page);
    const heading = await listPage.getHeading();

    expect(heading).toEqual('Bookish');
  });

  test('Book List', async () => {
    await page.goto(`${appUrlBase}/`);

    const listPage = new BookListPage(page);
    const books = await listPage.getBooks();

    expect(books.length).toBe(2);
    expect(books[0]).toEqual('Refactoring');
    expect(books[1]).toEqual('Domain-driven design');
  });

  test('Show books which name contains keywords', async () => {
    await page.goto(`${appUrlBase}/`);
    await page.waitForSelector('input.search');
    page.type('input.search', 'design');
    await page.screenshot({path: 'search-for-design.png'});
    const listPage = new BookListPage(page);
    const books = await listPage.getBooks();
    expect(books.length).toEqual(1);
    expect(books[0]).toEqual('Domain-driven design');
  });

  test('Goto book detail', async () => {
    const detailPage = new DetailPage(browser, 1);
    await detailPage.initialize();
    const description = await detailPage.getDescription();
    expect(description).toEqual('Refactoring');
  });

  test('Write an review for a book', async () => {
    const detailPage = new DetailPage(browser, 1);
    await detailPage.initialize();
    const review = {
      name: 'Jerry',
      content: 'Excellent works'
    };
    await detailPage.addReview(review);
    const result = await detailPage.getReview(0);
    expect(result).toEqual('Excellent works');
  }, 100000);
});

afterAll(() => {
  browser.close();
});
