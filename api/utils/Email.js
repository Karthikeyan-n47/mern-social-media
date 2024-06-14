const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    super();
    (this.to = user.email),
      (this.url = url),
      (this.name = user.username),
      (this.from = `Karthik <${process.env.EMAIL_FROM}>`);
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.GMAIL_HOST,
        pass: process.env.GMAIL_PASS,
      },
    });
  }

  async sendPasswordReset() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Password reset link. Only valid for next 30 mins.",
      text: `Hello ${this.name}, the link to reset your password is: ${this.url}  It is only valid for the next 30 minutes.`,
    };
    await this.newTransport().sendMail(mailOptions);
  }
};
