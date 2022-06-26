const { User } = require('../models');

module.exports.createUser = async (req, res, next) => {
  try {
    const { body } = req;

    const user = await User.create(body);

    user.password = undefined;

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.findUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
      where: { firstName: 'Test' },
    });

    // const users = await User.findAll({
    //   attributes: ['email', 'firstName', 'lastName']
    // });

    res.send({ data: users });
  } catch (error) {
    next(error);
  }
};

module.exports.findUserById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const user = await User.findByPk(id, {
      attributes: {
        exclude: ['password'],
      },
    });

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUser = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const [rowsUpdated, [user]] = await User.update(body, {
      where: { id },
      returning: true,
    });

    if (rowsUpdated !== 1) {
      throw new Error('Cant update user');
    }

    user.password = undefined;

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUser = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const deletedRows = await User.destroy({
      where: { id },
    });

    if (deletedRows !== 1) {
      throw new Error('Cant delete user');
    }

    res.send({ data: { id } });
  } catch (error) {
    next(error);
  }
};

module.exports.updateUserv2 = async (req, res, next) => {
  try {
    const { user, body } = req;

    const updatedUser = await user.update(body, {
      returning: true,
    });

    updatedUser.password = undefined;

    res.send({ data: updatedUser });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteUserv2 = async (req, res, next) => {
  try {
    const { user } = req;

    await user.destroy();

    res.send({ data: user });
  } catch (error) {
    next(error);
  }
};
