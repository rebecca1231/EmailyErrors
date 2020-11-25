Number.prototype._called = {};

const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

//all puppeteer tests use async - await
test("header has correct text", async () => {
  const text = await page.getContentOf("h1");
  expect(text).toEqual("Opine");
});

test("clicking login starts oauth flow", async () => {
  await page.click(".right a");
  const url = await page.url();

  expect(url).toMatch("/accounts.google.com");
});

test("When signed in, shows new buttton", async () => {
  await page.login();
  const text = await page.getContentOf('a[href="/surveys/new"]');

  expect(text).toEqual("New");
});
