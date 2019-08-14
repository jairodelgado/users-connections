var promise = require('bluebird');
var express = require('express');
var router = express.Router();

module.exports = (models) => {
  router.route('/')

    .get((req, res) => {
      models.User.findAll()
      .then((users) => {
        res.json(users);
      })
      .catch((exception) => {
        res.status(400).json({message: exception.message});
      });
    })

    .post((req, res) => {
      models.User.create(req.body)
        .then((user) => {
            res.json({message: 'User succesfully created!'});
          })
        .catch((exception) => {
          res.status(400).json({message: exception.message});
        });
    });

  router.route('/details/:userId')
    
    .get((req, res) => {
      models.User.find({
        where: {
          id: req.params.userId
        }
      })
      .then((user) => {
        return user || promise.reject( new Error('Unknown user id provided') );
      })
      .then((user) => {
        res.json(user);
      })
      .catch((exception) => {
        res.status(400).json({message: exception.message});
      });
    })

    .put((req, res) => {
      models.User.find({
        where: {
          id: req.params.userId
        }
      })
      .then((user) => {
        return user || promise.reject( new Error('Unknown user id provided') );
      })
      .then((user) => {
        return user.updateAttributes(req.body);
      })
      .then(() => {
          res.json({message: 'User succesfully updated!'});
        })
      .catch((exception) => {
        res.status(400).json({message: exception.message});
      });
    })

    .delete((req, res) => {
      models.User.find({
        where: {
          id: req.params.userId
        }
      })
      .then((user) => {
        return user || promise.reject( new Error('Unknown user id provided') );
      })
      .then((user) => {
        return user.destroy();
      })
      .then(() => {
          res.json({message: 'User succesfully deleted!'});
        })
      .catch((exception) => {
        res.status(400).json({message: exception.message});
      });
    });

  return router;
}
