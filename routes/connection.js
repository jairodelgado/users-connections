var promise = require('bluebird');
var express = require('express');
var router = express.Router();

module.exports = (models) => {
  router.route('/')
    .get((req, res) => {
      models.Connection.findAll({
        attributes: [['UserId', 'source'], ['ConnectionId', 'target']]
      })
      .then((connections) => {
        res.json(connections);
      })
      .catch((exception) => {
        res.status(400).json({message: exception.message});
      });
    })
    
  router.route('/:userId')

    .get((req, res) => {
    
      models.User.find({
        where: {
          Id: req.params.userId
        }
      })
      .then((user) => {
        return user || promise.reject( new Error('Unknown user id provided') );
      })
      .then((user) => {
        return user.getConnections();
      })
      .then((connections) => {
        res.json(connections);
      })
      .catch((exception) => {
        res.status(400).json({message: exception.message});
      });
    });

  router.route('/:userId/details/:connectionId')
  
    .post((req, res) => {

      const user = models.User.find({
        where: {
          Id: req.params.userId
        }
      });
                   
      const connection = models.User.find({
         where: {
           Id: req.params.connectionId
         }
       });
       
      Promise
        .all([user, connection])
        .then(results => {
          return results[0].addConnection(results[1]);
        })
        .then((connection) => {
            res.json({message: 'Connection succesfully created!'});
          })
        .catch((exception) => {
          res.status(400).json({message: exception.message});
        });
    })
    
    .delete((req, res) => {
       const user = models.User.find({
        where: {
          Id: req.params.userId
        }
      });
                   
      const connection = models.User.find({
         where: {
           Id: req.params.connectionId
         }
       });
       
      Promise
        .all([user, connection])
        .then(result => {
          return result[0].removeConnection(result[1]);
        })
        .then(() => {
            res.json({message: 'Connection succesfully deleted!'});
          })
        .catch((exception) => {
          res.status(400).json({message: exception.message});
        });
    });

  return router;
}
