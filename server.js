const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
 
const app = express();
const PORT = process.env.PORT || 3000; // <-- important for Render!
 
app.use(cors());
app.use(express.json()); // bodyParser not needed anymore, express has built-in JSON parser
 
// Email sending route
app.post("/send-email", (req, res) => {
  const { name, email, orderDetails } = req.body;
 
  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});
 const mailOptions = {
    from: "vigneshmalar526@gmail.com",
    to: email,
    subject: "Order Confirmation",
    text: `Hi ${name},\n${orderDetails}Best Regards,\nR. Vignesh S/W`
  };
   
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: "❌ Email not sent", error });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "✅ Email sent successfully!" });
    }
  });
});
 
// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
