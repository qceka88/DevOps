const assert = require('assert');
const fetch = require('node-fetch');

suite('Add Boardgames page', function() {
  test('Page title', async function() {
    let res = await fetch("http://localhost:8888/add-boardgame");
    let body = await res.text();
    assert.ok(body.includes("<h1>Add New Boardgame</h1>"));
  });

  test('Boardgame HTML form', async function() {
    let res = await fetch("http://localhost:8888/add-boardgame");
    let body = await res.text();
    
    let nameFieldFound = body.includes('<input id="name" type="text" name="name"/>');
    assert.ok(nameFieldFound, "Field 'name' is missing");

    let ratingFieldFound = body.includes('<input id="rating" type="text" name="rating"/>');
    assert.ok(ratingFieldFound, "Field 'rating' is missing");

    let buttonAddFound = body.includes('<button type="submit">Add</button>');
    assert.ok(buttonAddFound, "Button [Add] is missing");
  });

  test('Add valid boardgame', async function() {
    let res = await fetch(
      "http://localhost:8888/add-boardgame",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Tokaido&rating=8.6"
      }
    );
    let body = await res.text();
    let boardgamesReturned = body.includes(
		"<ul><li>7 Wonders (9.7)</li><li>Codenames (9.3)</li><li>One night werewolf (8.7)</li><li>Tokaido (8.6)</li></ul>");
    assert.ok(boardgamesReturned, "Add boardgame failed");
  });

  test('Add invalid boardgame', async function() {
     let res = await fetch(
      "http://localhost:8888/add-boardgame",
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "name=Ticket to ride&rating="
      }
    );
    let body = await res.text();
    let errMsg = body.includes("Cannot add boardgame. Name and rating fields are required!");
    assert.ok(errMsg, "Add invalid boardgame should display an error message");

    res = await fetch("http://localhost:8888/");
    body = await res.text();
	assert.ok(body.includes("Added boardgames: <b>3</b>"), 
		"Add invalid boardgame should not change the boardgames count");
  });
});
