const { Session, Sport, SessionPlayer, User } = require("../models");

const createSession = async (req, res) => {
  try {
    const {
      sportId,
      title,
      team1Players,
      team2Players,
      additionalPlayers,
      date,
      time,
      venue
    } = req.body;

    const sport = await Sport.findByPk(sportId);

    if (!sport) {
      return res.status(404).json({
        message: "Sport not found"
      });
    }

    const session = await Session.create({
      sportId,
      createdBy: req.user.id,
      title,
      team1Players,
      team2Players,
      additionalPlayers,
      date,
      time,
      venue,
      status: "active"
    });

    res.status(201).json({
      message: "Session created successfully",
      session
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create session",
      error: error.message
    });
  }
};
const getSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      include: [
        {
          model: Sport
        },
        {
          model: SessionPlayer,
          include: [
            {
              model: User,
              attributes: ["id", "name", "email"]
            }
          ]
        }
      ],
      order: [["date", "ASC"]]
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch sessions",
      error: error.message
    });
  }
};
const joinSession = async (req, res) => {
  try {
    const { id } = req.params;

    const session = await Session.findByPk(id);

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    if (session.status !== "active") {
      return res.status(400).json({
        message: "This session is not active"
      });
    }

    const sessionDate = new Date(
      `${session.date.toISOString().slice(0, 10)}T${session.time}`
    );

    if (sessionDate < new Date()) {
      return res.status(400).json({
        message: "You cannot join a past session"
      });
    }

    const existingPlayer = await SessionPlayer.findOne({
      where: {
        sessionId: id,
        userId: req.user.id
      }
    });

    if (existingPlayer) {
      return res.status(400).json({
        message: "You already joined this session"
      });
    }

    const playerCount = await SessionPlayer.count({
      where: {
        sessionId: id
      }
    });

    const maxAdditionalPlayers =
      session.additionalPlayers ?? session.maxPlayers ?? 0;

    if (playerCount >= maxAdditionalPlayers) {
      return res.status(400).json({
        message: "No additional player slots available"
      });
    }

    await SessionPlayer.create({
      sessionId: id,
      userId: req.user.id
    });

    res.json({
      message: "Joined session successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to join session",
      error: error.message
    });
  }
};
const getMySessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: {
        createdBy: req.user.id
      },
      include: [{ model: Sport }]
    });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch your sessions",
      error: error.message
    });
  }
};

const getJoinedSessions = async (req, res) => {
  try {
    const { SessionPlayer } = require("../models");

    const joined = await SessionPlayer.findAll({
      where: {
        userId: req.user.id
      },
      include: [{
        model: Session,
        include: [{ model: Sport }]
      }]
    });

    res.json(joined);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch joined sessions",
      error: error.message
    });
  }
};
const cancelSession = async (req, res) => {
  try {
    const { reason } = req.body;

    const session = await Session.findOne({
      where: {
        id: req.params.id,
        createdBy: req.user.id
      }
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found"
      });
    }

    if (session.status === "cancelled") {
      return res.status(400).json({
        message: "Session is already cancelled"
      });
    }

    await session.update({
      status: "cancelled",
      cancelReason: reason,
      cancelledAt: new Date()
    });

    res.json({
      message: "Session cancelled successfully",
      session
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel session",
      error: error.message
    });
  }
};


module.exports = {
  createSession,
  getSessions,
  joinSession,
  getMySessions,
  getJoinedSessions,
  cancelSession
};