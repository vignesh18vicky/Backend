const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
 
const app = express();
app.use(cors());
app.use(bodyParser.json());
 
// Email sending route
app.post("/send-email", (req, res) => {
  const { name, email, orderDetails } = req.body;
 
  // 1. Configure the transporter (email sender)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "vigneshmalar526@gmail.com",       // your Gmail address
      pass: "ywtx rpim ayhj hqhf"          // vigneshmalar526@gmail.com -- ywtx rpim ayhj hqhf
    }
  });
 
  // 2. Compose the email
  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: email,
    subject: "Order Confirmation",
    text: `Hi ${name},\n${orderDetails}Best Regards,\nR. Vignesh S/W`
  };
 
  // 3. Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.status(500).send("Email not sent");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent");
    }
  });
});
 
// Start the server
app.listen(3000, () => {
  console.log("✅ Server started on port 3000");
});