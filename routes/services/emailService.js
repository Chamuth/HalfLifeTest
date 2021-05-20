let nodemailer = require("nodemailer");
const User = require("../../models/User");
const { PaymentMethod, BookingType } = require("./../utils/enums");
let transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mangotestlk@gmail.com",
    pass: "cctestpasswordforthis",
  },
});

const sendEmail = (options) => {
  transport.sendMail(options, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const getEmailForUserId = (userid) => {
  return new Promise((res, rej) => {
    User.findById(userid)
      .then((user) => {
        res(user.email);
      })
      .catch((err) => {
        rej(err);
      });
  });
};

const reservationCreatedEmail = (reservation) => {
  getEmailForUserId(reservation.userid).then((email) => {
    console.log("Sending email to " + email);
    // add more details and send, wip
    sendEmail({
      from: "mangotestlk@gmail.com",
      to: email,
      subject: "MangoHolidays Reservation",
      text: "Hello world",
      html: `
        <h3>Confirmation of your reservation with MangoHolidays</h3>

        <p>Room: ${reservation.roomid}</p>
        <p>Booking Type: ${BookingType(reservation.type)}</p>
        <p>Reservation From: ${new Date(reservation.start).toLocaleString()}</p>
        <p>Reservation To: ${new Date(reservation.end).toLocaleString()}</p>
        <p>Payment Method: ${PaymentMethod(reservation.paymentMethod)}</p>
      `,
    });
  });
};

const reservationCancelledEmail = (userid) => {
  getEmailForUserId(userid).then((email) => {
    sendEmail({
      from: "mangotestlk@gmail.com",
      to: email,
      subject: "MangoHolidays Reservation Cancellation",
      text: "Hello world",
      html: `
        <h3>Your Reservation has been cancelled</h3>
        <p>Please visit the dashboard to check your pending reservations</p>
      `,
    });
  });
};

module.exports = { reservationCreatedEmail, reservationCancelledEmail };
