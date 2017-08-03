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
        RouteModel.find({
          from: req.query.from,
          to: req.query.to,
          date : { $gte : new Date(req.query.date) }
        })
        .exec()
        .then( routes => {
          console.log(routes);
          return res.status(200).json(routes);
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
        const Route = new RouteModel({
    			from : req.body.from,
    			to : req.body.to,
    			date : new Date(req.body.date),
    			creator_id : req.user
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
