function setup(app, boardgames) {
    app.get('/', function(req, res) {
      let model = {
        title: "My Boardgames Colletion",
        msg: "Boardgames Collection",
        boardgames: boardgames
      };
      res.render('home', model);
    });
    
    app.get('/loaderio-97355a48d08652424ffe033c5cf3d460.txt', function(req, res) {
      res.send('loaderio-97355a48d08652424ffe033c5cf3d460');
    });
  
    app.get('/boardgames', function(req, res) {
      let model = {title: "Boardgames", boardgames};
      res.render('boardgames', model);
    });
  
    app.get('/about', function(req, res) {
      let model = {title: "About"};
      res.render('about', model);
    });
  
    app.get('/add-boardgame', function(req, res) {
      let model = {title: "Add Boardgame"};
      res.render('add-boardgame', model);
    });
  
    function paramEmpty(p) {
      if (typeof(p) != 'string')
        return true;
      if (p.trim().length == 0)
        return true;
      return false;
    }
  
    app.post('/add-boardgame', function(req, res) {
      if (paramEmpty(req.body.name) || paramEmpty(req.body.rating) ) {
        let model = {
          title: "Add Boardgame", 
          errMsg: "Cannot add boardgame. Name and rating fields are required!"
        };
        res.render('add-boardgame', model);
        return;
      }
      let boardgame = {
        name: req.body.name,
        rating: req.body.rating
      };
      boardgames.push(boardgame);
      res.redirect('/boardgames');
    });
  }
  
  module.exports = { setup };