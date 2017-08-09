var UserModel = require('./UserModel.js'),
    RouteModel = require('../Route/RouteModel.js'),
    SendEventModel = require('../SendEvent/SendEventModel.js'),
    RatingModel = require('../Rating/RatingModel.js');


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
        RouteModel.find({creator_id: User._id})
        .exec()
        .then(routes => {
          routePetitions = routes.map( r => {
            return new Promise((resolve, reject) => {
              SendEventModel.find({route_id: r._id})
              .exec()
              .then( petitions => {
                  resolve(petitions);
              });
            });
          });
          Promise.all(routePetitions).then(data => {
            var merged = [].concat.apply([], data);
            petitionsPromises = merged.map(p => {
              return new Promise((resolve, reject) => {
                  p.populate('requestUser route_id', (err, petition) => {
                    resolve(petition);
                  });
              });
            });
          });
          Promise.all(petitionsPromises).then(createData => {
            return res.status(200).json({
                User: User,
                routes:routes,
                createData: createData
                });
            });
      });
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
    console.log(req.file);
    const id = req.params.id;
    console.log(id);
    UserModel.findOne({_id: id})
      .exec()
      .then(User => {
        if (!User) return res.status(404).json({message: 'No such User'});

        User.email = req.body.email ? req.body.email : User.email;
        User.profilePic = req.file.filename ? `/uploads/${req.file.filename}` : User.profilePic;

        User.save()
        .then(userSaved => res.json(userSaved))
        .catch(err => {
          return res.status(500).json({
            message: 'Error when saving User.',
            error: err
          });
        });
      })
      .catch(err => {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      });
  }
};
