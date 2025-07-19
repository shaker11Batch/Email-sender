const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const nodemailer = require("nodemailer");
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors, express.json())

// Test Route 
app.get('/', (req, res) => {
    res.send('Backend is running')
})

const emailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.zap_email,
        pass: process.env.zap_email_pass
    }
})

console.log(process.env.zap_email)
// Email Router 
app.get('/send-payment-email', async (req, res) => {
    const paymentInfo = {
        transactionId: "aaaaaaaaaaaaaaaaaa",
        user: "shakeru449@gmail.com",
        parcelInfo: 'send 20 kg Mango'
    }
    const emailObj = {
        from: `"Zap Email Sender" ${process.env.zap_email}`,
        to: paymentInfo.user,
        subject: "zap parcel Delivery payment confirmation",
        html: `
        <p>Thank you for the payment. We have received your delivery payment</p>
        <br/>
        <br/>
        <h3>Transaction Id: ${paymentInfo.transactionId}</h3>
        <br/>
        <br/>
        <p>If you facr any issue, please reply to this email address</p>
        <button>Click Here</button>
        <br/>
        <br/>
        <p>Parcel Info : ${paymentInfo.parcelInfo}</p>

        `

    }

    try {
        const emailInfo = await emailTransporter.sendMail(emailObj)
        console.log('email sent', emailInfo.messageId)
        res.send({result: 'success'})
    }
    catch (error) {
        console.log('email send error')
        res.send({result: 'email failed'})
    }

})



app.listen(port, () => {
    console.log(`server is running on ${port}`)
})