const assert = require('assert');
const fetch = require('node-fetch');
const pageUrl = "http://localhost:3333/"

suite('About page', function () {
    test('Page title', async function () {
        let res = await fetch(pageUrl + "about");
        let body = await res.text();
        assert.ok(body.includes("<title>About</title>"));
        assert.ok(body.includes("<h1>About</h1>"));
    });
});
