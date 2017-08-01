var UserModel = require('./UserModel.js');

/**
 * UserController.js
 *
 * @description :: Server-side logic for managing Users.
 */
module.exports = {
  /**
   * UserController.show()
   */
  show: (req, res) => {
    const id = req.params.id;
    UserModel.findOne({_id: id})
      .exec()
      .then(User => {
        if (!User) return res.status(404).json({message: 'No such User'});
        return res.json(User);
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      });
  },
  /**
   * UserController.update()
   */
  update: (req, res) => {
    const id = req.params.id;
    UserModel.findOne({_id: id})
      .exec()
      .then(User => {
        if (!User) return res.status(404).json({message: 'No such User'});

        User.email = req.body.email ? req.body.email : User.email;
        User.sendEvent = req.body.sendEvent ? req.body.sendEvent : User.sendEvent;
        User.rating = req.body.rating ? req.body.rating : User.rating;
        User.badge = req.body.badge ? req.body.badge : User.badge;

        return User;
      }).save( User => res.json(User))
      .catch(err => {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      });
  }
};
