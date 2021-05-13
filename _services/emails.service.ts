// sendgmail.js
const nodemailer = require('nodemailer')

export const sendgmail = async (service: string, user: string, password: string, sender: string, receiver: string, emailMessage: string) => {

  if (service && user && password && sender && receiver && emailMessage) {
    var transporter = nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: password
      }
    })

    var mailOptions = {
      from: sender,
      to: receiver,
      subject: 'Your submitted vehicle information',
      html: emailMessage
    }

    transporter.sendMail(mailOptions, function (error, info) {
      let message = error ? error : info.response
      // console.log(message)
    })

    return 'Email info validated'
  } else {
    return 'Email cannot be sent'
  }
}