// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      username: req.user.username,
      email: req.user.email,
      id: req.user.id,
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.end();
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an null
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        username: req.user.username,
        email: req.user.email,
        id: req.user.id,
      });
    }
  });

  app.post("/api/characters", (req, res) => {
    db.Character.create({
      seed: req.body.seed,
      faction: req.body.faction,
      level: 1,
      health: req.body.health,
      mana: req.body.mana,
      ClassId: req.body.ClassId,
      UserId: req.body.UserId
    })
      .then((result) => {

        return db.Character.findOne({
          where: {
            id: result.id
          },
          include: db.Class
        })
        // res.json({
        //   seed: result.seed,
        //   faction: result.faction,
        //   level: result.level,
        //   health: result.health,
        //   mana: result.mana,
        //   ClassId: req.body.ClassId,
        //   UserId: req.body.UserId
        // })
      })
      .then((response) => {
        res.json(response)
      })
      .catch((err) => {
        console.log(err);
        res.status(401).json(err);
      });
  });

  app.get("/api/characters", (req, res) => {
    db.Character.findAll({
      include: db.Class
      // include: [{
      //   model: db.Class,
      //   as: 'ClassId'
      // }]
    })
      .then((result) => {
        res.json(result);
      })
  })

};
