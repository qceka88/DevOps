let server;

setup(function() {
  let boardgames = [
    {"name" : "7 Wonders", "rating" : "9.7"},
    {"name" : "Codenames", "rating" : "9.3"},
    {"name" : "One night werewolf", "rating" : "8.7"}
  ];
  const express = require('express');
  const app = express();
  server = require('http').createServer(app);
  app.set('view engine', 'pug');
  app.use(require('body-parser')
    .urlencoded({extended:true}));
  const boardgamesController = 
    require("../../controllers/boardgames-controller");
  boardgamesController.setup(app, boardgames);
  server.listen(8888);
});

teardown(function() {
  server.close();
});
