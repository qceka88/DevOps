const assert = require('assert');
const fetch = require('node-fetch');
const pageUrl = "http://localhost:3333/"


suite('View Students page', function () {
    test('Page title', async function () {
        let res = await fetch(pageUrl + "students");
        let body = await res.text();
        assert.ok(body.includes("<h1>Registered Students</h1>"));
    });

    test('Students list', async function () {
        let res = await fetch(pageUrl + "students");
        let body = await res.text();
        assert.ok(body.includes("<ul><li>Steve (steve@gmail.com)</li><li>Tina (tina@yahoo.com)</li></ul>"));
    });
});
