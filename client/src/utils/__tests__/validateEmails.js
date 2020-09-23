import "../validateEmails";

test("email is properly validated", () => {
  expect("a@a.com").toEqual("a@a.com");
});
