const RatingModel = require('./RatingModel.js');

/**
 * RatingController.js
 *
 * @description :: Server-side logic for managing Ratings.
 */
module.exports = {

    /**
     * RatingController.create()
     */
    create: (req, res) => {
      const Rating = new RatingModel({
  			stars : req.body.stars,
  			comment : req.body.comment,
  			creator_id : req.body.creator_id
        });

        Rating.save()
        .then( Rating => res.status(201).json(Rating))
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
    			Rating.creator_id = req.body.creator_id ? req.body.creator_id : Rating.creator_id;

          return Rating;
        })
        .save()
        .then( Rating => res.json(Rating))
        .catch( err => {
          return res.status(500).json({
              message: 'Error when updating Rating.',
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
