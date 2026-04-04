const conversationService = require("@/services/conversation.service");
const { success, error } = require("@/utils/response");

exports.create = async (req, res) => {
  try {
    const { participantId } = req.body;
    const userId = req.user.id;
    const conversation = await conversationService.createConversation(
      userId,
      participantId,
    );
    success(res, 201, conversation);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.index = async (req, res) => {
  try {
    const result = await conversationService.getConversations(req.user.id);
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.show = async (req, res) => {
  try {
    const { conversation } = req.params;
    const result = await conversationService.getById(conversation, req.user.id);
    if (!result) error(res, 404, "Không tìm thấy cuộc trò chuyện.");
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { conversation } = req.params;
    const { content, type } = req.body;
    const message = await conversationService.sendMessage(
      req.user.id,
      conversation,
      content,
      type,
    );
    success(res, 201, message);
  } catch (err) {
    error(res, 500, err.message);
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { conversation } = req.params;
    const result = await conversationService.markAsRead(
      req.user.id,
      conversation,
    );
    success(res, 200, result);
  } catch (err) {
    error(res, 500, err.message);
  }
};
