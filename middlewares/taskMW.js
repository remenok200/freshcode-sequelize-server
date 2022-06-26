const { Task } = require('../models');

module.exports.findTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const task = await Task.findByPk(id);

    if (!task) {
      throw new Error('Task not found!');
    }

    req.task = task;

    next();
  } catch (error) {
    next(error);
  }
};
