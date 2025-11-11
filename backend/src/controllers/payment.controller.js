import Stripe from 'stripe';
import prisma from '../config/database.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, orderId, currency = 'usd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency,
      metadata: { orderId, userId: req.user.id },
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const handleWebhook = async (req, res, next) => {
  const sig = req.headers['stripe-signature'];

  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        
        // Update order
        await prisma.order.updateMany({
          where: { id: paymentIntent.metadata.orderId },
          data: {
            paymentStatus: 'COMPLETED',
            paymentIntentId: paymentIntent.id,
            paidAt: new Date(),
            status: 'CONFIRMED',
          },
        });

        // Create notification
        await prisma.notification.create({
          data: {
            userId: paymentIntent.metadata.userId,
            type: 'PAYMENT_SUCCESS',
            title: 'Payment Successful',
            message: 'Your payment has been processed successfully',
          },
        });
        break;

      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object;
        
        await prisma.order.updateMany({
          where: { id: failedPayment.metadata.orderId },
          data: { paymentStatus: 'FAILED' },
        });

        await prisma.notification.create({
          data: {
            userId: failedPayment.metadata.userId,
            type: 'PAYMENT_FAILED',
            title: 'Payment Failed',
            message: 'Your payment could not be processed',
          },
        });
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

export const getPaymentMethods = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: [
        { id: 'STRIPE', name: 'Credit/Debit Card', icon: '💳' },
        { id: 'PAYPAL', name: 'PayPal', icon: '🅿️' },
        { id: 'BANK_TRANSFER', name: 'Bank Transfer', icon: '🏦' },
        { id: 'COD', name: 'Cash on Delivery', icon: '💵' },
      ],
    });
  } catch (error) {
    next(error);
  }
};
