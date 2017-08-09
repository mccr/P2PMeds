const RouteModel = require('./RouteModel.js');
const SendEventModel = require('../SendEvent/SendEventModel.js');
const RatingModel = require('../Rating/RatingModel.js');
const UserModel = require('../User/UserModel.js');

/**
 * RouteController.js
 *
 * @description :: Server-side logic for managing Routes.
 */
module.exports = {

    /**
     * RouteController.list()
     */
    list: (req, res) => {
        RouteModel.find({
          from: req.query.from,
          to: req.query.to,
          date : { $gte : new Date(req.query.date) }
        })
        .exec()
        .then( routes => {
          routesFound = routes.map( r => {
            return new Promise((resolve, reject) => {
              r.populate('creator_id', (err, route) => {
                SendEventModel.find({route_id: r._id})
                .exec()
                .then( petitions => {
                  RatingModel.find({ratedUser_id: route.creator_id._id})
                  .exec()
                  .then( ratings => {
                    resolve({
                      route: route,
                      petitions: petitions,
                      ratings: ratings
                    });
                  });
                });
              });
            });
        });
        Promise.all(routesFound).then(routesFoundData => {
          return res.status(200).json(routesFoundData);
            });
        })
        .catch( err => {
          return res.status(500).json({
                  message: 'Error when getting Route.',
                  error: err
              });
        });
    },

    /**
     * RouteController.show()
     */
    show: (req, res) => {
        const id = req.params.id;
        RouteModel.findOne({_id: id})
        .exec()
        .then( Route => {
            if (!Route) return res.status(404).json({message: 'No such Route'});
            return res.json(Route);
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when getting Route.',
              error: err
          });
        });
    },

    /**
     * RouteController.create()
     */
    create: (req, res) => {
      console.log(req.body);
      console.log(req.user);
        const Route = new RouteModel({
    			from : req.body.from,
    			to : req.body.to,
    			date : new Date(req.body.date),
    			creator_id : req.user
        });

        Route.save()
        .then( Route => {
          RouteModel.find({creator_id: Route.creator_id})
          .exec()
          .then( userRoutes => {
            UserModel.findOne({_id: Route.creator_id})
            .exec()
            .then( user => {
              if(userRoutes.length > 1) user.badges[0].active = 'true';
              if(userRoutes.length == 3) user.badges[1].active = 'true';
              if(userRoutes.length == 5) user.badges[2].active = 'true';
              user.save()
              .then( user => {
                console.log(user.badges[0]);
                res.status(201).json(Route);
              });
            });
          });
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when creating Route',
              error: err
          });
        });
    },

    /**
     * RouteController.update()
     */
    update: (req, res) => {
        const id = req.params.id;
        RouteModel.findOne({_id: id})
        .exec()
        .then(Route => {

            if (!Route) return res.status(404).json({message: 'No such Route'});

          Route.from = req.body.from ? req.body.from : Route.from;
    			Route.to = req.body.to ? req.body.to : Route.to;
    			Route.date = req.body.date ? new Date(req.body.date) : Route.date;

          Route.save()
          .then(Route => res.json(Route))
          .catch( err => {
            return res.status(500).json({
                message: 'Error when updating Route.',
                error: err
            });
          });
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when finding Route.',
              error: err
          });
        });
    },

    /**
     * RouteController.remove()
     */
    remove: (req, res) => {
        const id = req.params.id;
        RouteModel.findByIdAndRemove(id)
        .exec()
        .then( Route => res.status(204).json())
        .catch( err => {
          return res.status(500).json({
              message: 'Error when deleting the Route.',
              error: err
          });
        });
    }
};
