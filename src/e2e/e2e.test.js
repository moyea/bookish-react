import puppeteer from 'puppeteer';
import axios from 'axios';
import BookListPage from "./pages/BookListPage";

const appUrlBase = 'http://localhost:3000';

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({});
  page = await browser.newPage();
});


describe('Bookish', () => {

  beforeEach(() => {
    const books = [
      {id: 1, name: "Refactoring", description: 'Refactoring'},
      {id: 2, name: "Domain-driven design", description: 'Domain-driven design'}
    ];
    return books.map(item =>
      axios.post('http://localhost:8080/books', item, {headers: {'Content-Type': 'application/json'}})
    )
  });

  afterEach(() => {
    return axios.delete('http://localhost:8080/books?_cleanup=true').catch(err => err);
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
});

afterAll(() => {
  browser.close();
});
