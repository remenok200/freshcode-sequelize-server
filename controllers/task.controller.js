const { Task } = require('../models');

module.exports.createTask = async (req, res, next) => {
  try {
    const { body } = req;
    const task = await Task.create(body);
    res.send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.findTasks = async (req, res, next) => {
  try {
    // const tasks = await Task.findAll({ where: { body: 'test' } });
    const tasks = await Task.findAll();

    res.send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.findTaskById = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const task = await Task.findByPk(id);

    res.send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    const [rowsUpdated, [task]] = await Task.update(body, {
      where: { id },
      returning: true,
    });

    if (rowsUpdated !== 1) {
      throw new Error('Can`t update task!');
    }

    res.send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const deletedRows = await Task.destroy({ where: { id } });

    if (deletedRows !== 1) {
      throw new Error('Can`t delete task!');
    }

    res.send({ data: { id } });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTaskV2 = async (req, res, next) => {
  try {
    const { task, body } = req;

    const updatedTask = await task.update(body, { returning: true });

    res.send({ data: updatedTask });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTaskV2 = async (req, res, next) => {
  try {
    const { task } = req;

    await task.destroy();

    res.send({ data: task });
  } catch (error) {
    next(error);
  }
};
