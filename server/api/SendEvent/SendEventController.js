const SendEventModel = require('./SendEventModel.js');

/**
 * SendEventController.js
 *
 * @description :: Server-side logic for managing SendEvents.
 */
module.exports = {

    /**
     * SendEventController.create()
     */
    create: (req, res) => {
        const SendEvent = new SendEventModel({
          route_id: req.body.route_id,
    			requestUser : req.user,
    			status : 'pending confirmation'
        });

        SendEvent.save()
        .then( SendEvent => res.status(201).json(SendEvent))
        .catch( err => {
          return res.status(500).json({
              message: 'Error when creating SendEvent',
              error: err
          });
        });
    },

    /**
     * SendEventController.update()
     */
    update: (req, res) => {
        const id = req.params.id;
        SendEventModel.findOne({_id: id})
        .exec()
        .then( SendEvent => {
          if (!SendEvent) res.status(404).json({message: 'No such SendEvent'});

			SendEvent.status = req.body.status ? req.body.status : SendEvent.status;

            SendEvent.save()
            .then(SendEvent => res.json(SendEvent))
            .catch( err => {
              return res.status(500).json({
                  message: 'Error when updating SendEvent.',
                  error: err
              });
            });
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when finding SendEvent.',
              error: err
          });
        });
    }
};
