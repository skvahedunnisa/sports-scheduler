const { Sport } = require("../models");

const createSport = async (req, res) => {
  try {
    const { name, description } = req.body;

    const sport = await Sport.create({
      name,
      description,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Sport created successfully",
      sport
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create sport",
      error: error.message
    });
  }
};

const getSports = async (req, res) => {
  try {
    const sports = await Sport.findAll();

    res.json(sports);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sports",
      error: error.message
    });
  }
};

const updateSport = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const sport = await Sport.findOne({
      where: {
        id,
        createdBy: req.user.id
      }
    });

    if (!sport) {
      return res.status(404).json({
        message: "Sport not found"
      });
    }

    await sport.update({
      name,
      description
    });

    res.json({
      message: "Sport updated successfully",
      sport
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update sport",
      error: error.message
    });
  }
};

module.exports = {
  createSport,
  getSports,
  updateSport
};