const assert = require('assert');
const fetch = require('node-fetch');

suite('View Boardgames page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/boardgames");
    let body = await res.text();
    assert.ok(body.includes("<h1>Added Boardgames</h1>"));
  });
  
  test('Boardgames list', async function() {
    let res = await fetch("http://localhost:8888/boardgames");
    let body = await res.text();
    assert.ok(body.includes("<ul><li>7 Wonders (9.7)</li><li>Codenames (9.3)</li><li>One night werewolf (8.7)</li></ul>"));
  });
});
