const RouteModel = require('./RouteModel.js');

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
        RouteModel.find()
        .exec()
        .then( Routes => res.json(Routes))
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
        const Route = new RouteModel({
    			from : req.body.from,
    			to : req.body.to,
    			date : req.body.date,
    			creator_id : req.body.creator_id,
    			sendEvent : []
        });

        Route.save()
        .then( Route => res.status(201).json(Route))
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
    			Route.date = req.body.date ? req.body.date : Route.date;
    			Route.sendEvent = req.body.sendEvent ? req.body.sendEvent : Route.sendEvent;

          return Route;
        }).save()
        .then(Route => res.json(Route))
        .catch( err => {
          return res.status(500).json({
              message: 'Error when updating Route.',
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
