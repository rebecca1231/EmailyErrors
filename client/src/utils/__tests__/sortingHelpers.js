import { compareTitle, compareDate } from "../sortingHelpers";

const surveys = [
  { title: "bananas", dateSent: "20190101" },
  { title: "carrots", dateSent: "20200101" },
  { title: "apples", dateSent: "20180101" },
];

test("compareTitle helps sort surveys by title", () => {
  expect(surveys.sort(compareTitle)[0]).toEqual({
    title: "carrots",
    dateSent: "20200101",
  });
});

test("compareDate helps sort surveys by date", () => {
  expect(surveys.sort(compareDate)[2]).toEqual({
    title: "apples",
    dateSent: "20180101",
  });
});
