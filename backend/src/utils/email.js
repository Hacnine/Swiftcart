import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = async (options) => {
  const mailOptions = {
    from: `${process.env.FROM_NAME || 'Wholesale Marketplace'} <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', options.email);
  } catch (error) {
    console.error('Email error:', error);
    throw new Error('Email could not be sent');
  }
};

export const sendWelcomeEmail = async (user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Welcome to Wholesale Marketplace!</h1>
      <p>Hi ${user.firstName},</p>
      <p>Thank you for joining our platform. We're excited to have you on board!</p>
      <p>Get started by exploring thousands of wholesale products from verified suppliers.</p>
      <a href="${process.env.FRONTEND_URL}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-top: 16px;">
        Start Shopping
      </a>
      <p style="margin-top: 24px; color: #666;">Best regards,<br>Wholesale Marketplace Team</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Welcome to Wholesale Marketplace',
    html,
  });
};

export const sendOrderConfirmationEmail = async (order, user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Order Confirmation</h1>
      <p>Hi ${user.firstName},</p>
      <p>Thank you for your order! Your order #${order.orderNumber} has been confirmed.</p>
      <div style="background-color: #f5f5f5; padding: 16px; border-radius: 4px; margin: 16px 0;">
        <p><strong>Order Number:</strong> ${order.orderNumber}</p>
        <p><strong>Total Amount:</strong> $${order.totalAmount.toFixed(2)}</p>
        <p><strong>Status:</strong> ${order.status}</p>
      </div>
      <a href="${process.env.FRONTEND_URL}/orders/${order.id}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px;">
        View Order Details
      </a>
      <p style="margin-top: 24px; color: #666;">Best regards,<br>Wholesale Marketplace Team</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: `Order Confirmation - #${order.orderNumber}`,
    html,
  });
};

export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333;">Password Reset Request</h1>
      <p>Hi ${user.firstName},</p>
      <p>You requested a password reset. Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 4px; margin-top: 16px;">
        Reset Password
      </a>
      <p style="margin-top: 16px;">This link will expire in 1 hour.</p>
      <p style="color: #666;">If you didn't request this, please ignore this email.</p>
      <p style="margin-top: 24px; color: #666;">Best regards,<br>Wholesale Marketplace Team</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request',
    html,
  });
};

export const sendVendorApprovalEmail = async (vendor, user) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #28a745;">Congratulations! Your Vendor Account is Approved</h1>
      <p>Hi ${user.firstName},</p>
      <p>Great news! Your vendor account "${vendor.storeName}" has been approved.</p>
      <p>You can now start listing your products and selling on our platform.</p>
      <a href="${process.env.FRONTEND_URL}/vendor/dashboard" style="display: inline-block; padding: 12px 24px; background-color: #28a745; color: white; text-decoration: none; border-radius: 4px; margin-top: 16px;">
        Go to Vendor Dashboard
      </a>
      <p style="margin-top: 24px; color: #666;">Best regards,<br>Wholesale Marketplace Team</p>
    </div>
  `;

  await sendEmail({
    email: user.email,
    subject: 'Vendor Account Approved',
    html,
  });
};
