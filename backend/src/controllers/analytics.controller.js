import prisma from '../config/database.js';

export const trackEvent = async (req, res, next) => {
  try {
    const { eventType, data, sessionId } = req.body;

    await prisma.analyticsEvent.create({
      data: {
        eventType,
        userId: req.user?.id,
        sessionId,
        data: data || {},
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        referrer: req.headers.referer,
      },
    });

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getAnalytics = async (req, res, next) => {
  try {
    const { startDate, endDate, eventType } = req.query;

    const where = {};
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }
    if (eventType) where.eventType = eventType;

    const events = await prisma.analyticsEvent.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 1000,
    });

    const summary = {
      totalEvents: events.length,
      uniqueUsers: new Set(events.map(e => e.userId).filter(Boolean)).size,
      eventsByType: events.reduce((acc, e) => {
        acc[e.eventType] = (acc[e.eventType] || 0) + 1;
        return acc;
      }, {}),
    };

    res.json({ success: true, data: { events, summary } });
  } catch (error) {
    next(error);
  }
};
