import nodemailer from 'nodemailer';

const sendEmail = async ({emailTo, subject, code, content}) => {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        }
    });

    const message = {
        from: process.env.SENDER_EMAIL,
        to: emailTo,
        subject,
        html: `
            <div>
            <h3> Use this bellow code to ${content}</h3>
            <p> <strong> Code : </strong> ${code}</p>
</div> 
        `
    };

    await transporter.sendMail(message);
}

export default sendEmail;