const { Session, Sport } = require("../models");
const { Op } = require("sequelize");

const getReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const where = {
      status: {
        [Op.ne]: "cancelled"
      }
    };

    if (startDate && endDate) {
      where.date = {
        [Op.between]: [
          new Date(startDate),
          new Date(endDate)
        ]
      };
    }

    const sessions = await Session.findAll({
      where,
      include: [
        {
          model: Sport
        }
      ],
      order: [["date", "ASC"]]
    });

    const sportPopularity = {};

    sessions.forEach(session => {
      const sportName = session.Sport
        ? session.Sport.name
        : "Unknown";

      if (!sportPopularity[sportName]) {
        sportPopularity[sportName] = 0;
      }

      sportPopularity[sportName]++;
    });

    res.json({
      totalSessions: sessions.length,
      sportPopularity,
      sessions
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to generate report",
      error: error.message
    });
  }
};

module.exports = {
  getReports
};