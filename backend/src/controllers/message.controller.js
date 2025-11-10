import prisma from '../config/database.js';

export const getConversations = async (req, res, next) => {
  try {
    const conversations = await prisma.conversation.findMany({
      where: {
        participantIds: { has: req.user.id },
        isArchived: false,
      },
      include: {
        participants: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        messages: {
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });

    res.json({ success: true, data: conversations });
  } catch (error) {
    next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        id: req.params.id,
        participantIds: { has: req.user.id },
      },
      include: {
        participants: { select: { id: true, firstName: true, lastName: true, avatar: true } },
        messages: {
          orderBy: { createdAt: 'asc' },
          include: {
            sender: { select: { firstName: true, lastName: true, avatar: true } },
          },
        },
      },
    });

    if (!conversation) {
      return res.status(404).json({ success: false, message: 'Conversation not found' });
    }

    res.json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

export const createConversation = async (req, res, next) => {
  try {
    const { participantId, subject, productId, orderId } = req.body;

    const conversation = await prisma.conversation.create({
      data: {
        participantIds: [req.user.id, participantId],
        subject,
        productId,
        orderId,
      },
      include: {
        participants: { select: { id: true, firstName: true, lastName: true, avatar: true } },
      },
    });

    res.status(201).json({ success: true, data: conversation });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { content, receiverId, attachments } = req.body;

    const message = await prisma.message.create({
      data: {
        conversationId: req.params.id,
        senderId: req.user.id,
        receiverId,
        content,
        attachments: attachments || [],
      },
      include: {
        sender: { select: { firstName: true, lastName: true, avatar: true } },
      },
    });

    await prisma.conversation.update({
      where: { id: req.params.id },
      data: { updatedAt: new Date() },
    });

    // Send socket notification
    const io = req.app.get('io');
    if (io) {
      io.to(`user-${receiverId}`).emit('new-message', message);
    }

    res.status(201).json({ success: true, data: message });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    await prisma.message.updateMany({
      where: { id: req.params.messageId, receiverId: req.user.id },
      data: { isRead: true, readAt: new Date() },
    });

    res.json({ success: true, message: 'Message marked as read' });
  } catch (error) {
    next(error);
  }
};
