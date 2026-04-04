const pusher = require("@/configs/pusher");
const { Conversation, Message, User, sequelize } = require("@/models");
const { Op, Sequelize } = require("sequelize");

class ConversationService {
  async createConversation(userId, participantId) {
    const pIds = Array.isArray(participantId) ? participantId : [participantId];
    let existedConv = null;

    if (pIds.length === 1) {
      const otherUserId = pIds[0];
      existedConv = await Conversation.findOne({
        where: {
          id: {
            [Op.in]: Sequelize.literal(`
              (SELECT conversation_id FROM conversation_participant 
               WHERE user_id IN (${userId}, ${otherUserId})
               GROUP BY conversation_id HAVING COUNT(DISTINCT user_id) = 2)
            `),
          },
        },
        include: [
          {
            model: User,
            as: "participants",
            attributes: ["id", "username", "avatar"],
            through: { attributes: [] },
          },
        ],
      });
    }

    if (existedConv) return existedConv;

    const conversation = await Conversation.create({
      last_message_at: new Date(),
    });
    const allParticipants = [...new Set([userId, ...pIds])];
    await conversation.setParticipants(allParticipants);

    return await this.getById(conversation.id, userId);
  }

  async getConversations(userId) {
    return await Conversation.findAll({
      where: {
        id: {
          [Op.in]: Sequelize.literal(
            `(SELECT conversation_id FROM conversation_participant WHERE user_id = ${userId})`,
          ),
        },
      },
      include: [
        {
          model: User,
          as: "participants",
          attributes: ["id", "username", "avatar"],
          through: { attributes: [] },
        },
        {
          model: Message,
          as: "messages",
          limit: 1,
          order: [["created_at", "DESC"]],
          include: [{ model: User, as: "sender", attributes: ["username"] }],
        },
      ],
      order: [["last_message_at", "DESC"]],
    });
  }

  async getById(id, userId) {
    return await Conversation.findByPk(id, {
      include: [
        {
          model: User,
          as: "participants",
          attributes: ["id", "username", "avatar"],
          through: { attributes: [] },
        },
        {
          model: Message,
          as: "messages",
          include: [
            {
              model: User,
              as: "sender",
              attributes: ["id", "username", "avatar"],
            },
          ],
        },
      ],
      order: [[{ model: Message, as: "messages" }, "created_at", "ASC"]],
    });
  }

  async sendMessage(userId, conversationId, content, type = "text") {
    const message = await Message.create({
      user_id: userId,
      conversation_id: +conversationId,
      content,
      type,
    });

    await Conversation.update(
      { last_message_at: new Date() },
      { where: { id: conversationId } },
    );

    const fullMessage = await Message.findByPk(message.id, {
      include: [
        { model: User, as: "sender", attributes: ["id", "username", "avatar"] },
      ],
    });

    // await pusher.trigger(`conversation-${conversationId}`, "new-message", {
    //   message: fullMessage,
    // });

    return fullMessage;
  }

  async markAsRead(userId, conversationId) {
    await Message.update(
      { read_at: new Date() },
      {
        where: {
          conversation_id: conversationId,
          user_id: { [Op.ne]: userId },
          read_at: null,
        },
      },
    );

    // await pusher.trigger(`conversation-${conversationId}`, "read-message", {
    //   conversation_id: conversationId,
    //   user_id: userId,
    // });

    return { success: true };
  }
}

module.exports = new ConversationService();
