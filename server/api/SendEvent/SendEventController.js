const SendEventModel = require('./SendEventModel.js');
const UserModel = require('../User/UserModel.js');
const RouteModel = require('../Route/RouteModel.js');

/**
 * SendEventController.js
 *
 * @description :: Server-side logic for managing SendEvents.
 */
module.exports = {
  /**
   * SendEvent.show()
   */
  show: (req, res) => {
      const userID = req.params.id;
      SendEventModel.find({requestUser: userID})
      .exec()
      .then( petitions => {
        petitionsMade = petitions.map( p => {
          return new Promise((resolve, reject) => {
            p.populate('route_id', (err, petition) => {
              UserModel.findOne({_id: petition.route_id.creator_id})
              .exec()
              .then( user => {
                console.log(user);
                petition.route_id.creator_id = user;
                resolve(petition);
              });
            });
          });
      });
      Promise.all(petitionsMade).then(petitionsMadeData => {
        return res.status(200).json(petitionsMadeData);
          });
      });
  },
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
        SendEventModel.update({_id: req.params.id}, {$set: {status: req.body.status}})
        .exec()
        .then( response => {
          RouteModel.find({creator_id: req.body.creatorID}, {_id: 1})
          .exec()
          .then( routes => {
            routesID = routes.map( r => r._id);
            SendEventModel.find({route_id: {$in: routesID}})
            .exec()
            .then( petitions => {
              let completedPetitions = petitions.filter( p => p.status == 'Delivered' || p.status == 'Completed');
              let rejectedPetitions = petitions.filter( p => p.status == 'Rejected');

              UserModel.find({_id: req.body.creatorID})
              .exec()
              .then( user => {
                if(completedPetitions.length == 3) user.badges[3].active = 'true';
                if(completedPetitions.length == 6) user.badges[4].active = 'true';
                if(completedPetitions.length == 10) user.badges[5].active = 'true';
                if(rejectedPetitions.length == 3) user.badges[9].active = 'true';
                res.json(response);
              });
            });
          });
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when updating status of sendEvent.',
              error: err
          });
        });
    }
};
