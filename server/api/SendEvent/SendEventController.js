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
        SendEventModel.update({_id: id}, {$set: {status: req.body.status}})
        .exec()
        .then( SendEvent => {
          if (!SendEvent) res.status(404).json({message: 'No such SendEvent'});
          res.status(200).json(SendEvent);
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when finding SendEvent.',
              error: err
          });
        });
    }
};
