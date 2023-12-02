const assert = require('assert');
const fetch = require('node-fetch');
const pageUrl = "http://localhost:3333/"

suite('Home page', function() {
  test('Page title', async function() {
    let res = await fetch(pageUrl);
    let body = await res.text();
    assert.ok(body.includes("<h1>Students Registry</h1>"));
  });
  
  test('Students count', async function() {
    let res = await fetch(pageUrl);
    let body = await res.text();
    assert.ok(body.includes("Registered students: <b>2</b>"));
  });
});
