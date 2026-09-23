const { Session, Sport } = require("../models");
const { Op } = require("sequelize");

const getReports = async (req, res) => {
  try {

    const { startDate, endDate } = req.query;

    const where = {};

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

    const now = new Date();

    const playedSessions = sessions.filter(session => {

      if (session.status === "cancelled") {
        return false;
      }

      const sessionDateTime = new Date(
        `${session.date.toISOString().slice(0, 10)}T${session.time}`
      );

      return sessionDateTime < now;
    });

    const sportPopularity = {};

    playedSessions.forEach(session => {

      const sportName = session.Sport
        ? session.Sport.name
        : "Unknown";

      if (!sportPopularity[sportName]) {
        sportPopularity[sportName] = 0;
      }

      sportPopularity[sportName]++;
    });

    res.json({
      totalSessions: playedSessions.length,
      sportPopularity,
      sessions: playedSessions
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