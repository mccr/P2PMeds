const RatingModel = require('./RatingModel.js');
const SendEventModel = require('../SendEvent/SendEventModel.js');
const UserModel = require('../User/UserModel.js');

/**
 * RatingController.js
 *
 * @description :: Server-side logic for managing Ratings.
 */
module.exports = {

  /**
   * Rating.show()
   */
  show: (req, res) => {
      const userID = req.params.id;
      RatingModel.find({ratedUser_id: userID})
      .exec()
      .then( ratings => {
        myRatings = ratings.map( r => {
          return new Promise((resolve, reject) => {
            r.populate('user_id', (err, rate) => {
              resolve(rate);
            });
          });
      });
      Promise.all(myRatings).then(myRates => {
        return res.status(200).json(myRates);
          });
      });
  },

    /**
     * RatingController.create()
     */
    create: (req, res) => {
      const Rating = new RatingModel({
  			stars : req.body.stars,
  			comment : req.body.comment,
        ratedUser_id : req.body.ratedUser_id,
  			user_id : req.user
        });

        Rating.save()
        .then( Rating => {
          SendEventModel.update({_id: req.body.petition_id}, {$set : {status: "Completed"}})
          .exec()
          .then(response => {
            UserModel.findOne({_id: Rating.ratedUser_id})
            .exec()
            .then( user => {
              user.ratingTotal = user.ratingTotal + Rating.stars;
              user.save()
              .then( user => {
                console.log(user);
                res.status(201).json(Rating);
              })
              .catch(err => {
                console.log(err);
                return res.status(500).json({
                  message: 'Error when creating Rating',
                  error: err
                });
              });
            })
            .catch(err => {
              console.log(err);
              return res.status(500).json({
                message: 'Error when creating Rating',
                error: err
              });
            });
          });

        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when creating Rating',
              error: err
          });
        });
    },

    /**
     * RatingController.update()
     */
    update: (req, res) => {
        const id = req.params.id;
        RatingModel.findOne({_id: id})
        .exec()
        .then(Rating => {
          if (!Rating) res.status(404).json({message: 'No such Rating'});

          Rating.stars = req.body.stars ? req.body.stars : Rating.stars;
    			Rating.comment = req.body.comment ? req.body.comment : Rating.comment;

          Rating.save()
          .then( Rating => res.json(Rating))
          .catch( err => {
            return res.status(500).json({
                message: 'Error when updating Rating.',
                error: err
            });
          });
        })
        .catch( err => {
          return res.status(500).json({
              message: 'Error when finding Rating.',
              error: err
          });
        });
    },

    /**
     * RatingController.remove()
     */
    remove: (req, res) => {
        const id = req.params.id;
        RatingModel.findByIdAndRemove(id)
        .exec()
        .then(Rating => res.status(204).json())
        .catch( err => {
          return res.status(500).json({
              message: 'Error when deleting the Rating.',
              error: err
          });
        });
    }
};
