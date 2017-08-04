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
    			status : 'Pending Confirmation'
        });
        console.log(SendEvent);
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
      console.log(req.body.status);
        SendEventModel.update({_id: req.params.id}, {$set: {status: req.body.status}})
        .exec()
        .then( response => res.json(response))
        .catch( err => {
          return res.status(500).json({
              message: 'Error when updating status of sendEvent.',
              error: err
          });
        });
    }
};
