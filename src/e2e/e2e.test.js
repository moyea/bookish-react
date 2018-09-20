import puppeteer from 'puppeteer';
import axios from 'axios';
import BookListPage from './pages/BookListPage';

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

  test('Goto book detail', async () => {
    await page.goto(`${appUrlBase}/`);

    const listPage = new BookListPage(page);
    const links = await listPage.getLinks();

    await Promise.all([
      page.waitForNavigation({waitUntil: 'networkidle2'}),
      page.goto(`${appUrlBase}${links[0]}`)
    ]);
    const url = await page.evaluate('location.href');

    expect(url).toEqual(`${appUrlBase}/books/1`);

    const description = await listPage.getDescription();
    expect(description).toEqual('Refactoring');
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

  test('Write an review for a book', async () => {
    await page.goto(`${appUrlBase}/`);
    await page.waitForSelector('a.view-detail');

    const listPage = new BookListPage(page);
    const links = await listPage.getLinks();

    await Promise.all([
      page.waitForNavigation({waitUntil: 'networkidle2'}),
      page.goto(`${appUrlBase}${links[0]}`)
    ]);

    const url = await page.evaluate('location.href');
    expect(url).toEqual(`${appUrlBase}/books/1`);

    await page.waitForSelector('input[name="name"]');
    page.type('input[name="name"]', 'Jerry');
    await page.waitFor(100);
    await page.waitForSelector('textarea[name="content"]');
    page.type('textarea[name="content"]', 'Excellent works');

    await page.waitForSelector('button[name="submit"]');
    await page.screenshot({path: 'submit-review.png'});
    page.click('button[name="submit"]');

    await page.waitForSelector('.review');

    const reviews = await page.evaluate(() => {
      return [...document.querySelectorAll('.review')].map(el => el.innerText);
    });

    expect(reviews.length).toEqual(1);
    expect(reviews[0]).toEqual('Excellent works');
  }, 100000);
});

afterAll(() => {
  browser.close();
});
