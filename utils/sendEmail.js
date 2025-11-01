import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateTicketPDF = (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: [400, 250], margin: 20 });
      let buffers = [];

      doc.on("data", buffers.push.bind(buffers));
      doc.on("end", () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });

      // 🎫 Ticket Border
      doc.rect(10, 10, 380, 230).stroke();

      // 🎥 Logo Placeholder
      doc.fontSize(16).text("CINEMA LOGO", 20, 20);

      // 🎬 Movie Title
      doc.fontSize(18).font("Helvetica-Bold").text(booking.movie, 150, 20, { align: "right" });

      // 🗓️ Show Details Box
      doc.moveTo(10, 60).lineTo(390, 60).stroke(); // Divider line
      doc.fontSize(12).font("Helvetica")
        .text(`Booking ID: ${booking._id}`, 20, 70)
        .text(`Show Time: ${booking.showTime}`, 20, 90)
        .text(`Seats: ${booking.seats.join(", ")}`, 20, 110)
        .text(`Amount: Rs. ${booking.amount}`, 20, 130);

      // ✂️ Tear Line
      doc.moveTo(10, 170).lineTo(390, 170).dash(5, { space: 5 }).stroke();

      // ✅ Footer / Thank You
      doc.undash();
      doc.fontSize(14).font("Helvetica-Bold").text("Enjoy Your Movie!", 0, 180, { align: "center" });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
};



export const sendEmail = async (to, booking) => {
  const pdfBuffer = await generateTicketPDF(booking);

  const mailOptions = {
    from: `"Movie Booking 🎬" <${process.env.EMAIL_USER}>`,
    to,
    subject: "🎟️ Booking Confirmation",
    html: `
      <h2>Booking Confirmed!</h2>
      <p><strong>Booking ID:</strong> ${booking._id}</p>
      <p><strong>Movie:</strong> ${booking.movie}</p>
      <p><strong>Show Time:</strong> ${booking.showTime}</p>
      <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>
      <p><strong>Amount Paid:</strong> Rs. ${booking.amount}</p>
      <p>📎 Your e-ticket is attached as PDF.</p>
    `,
    attachments: [
      {
        filename: `Ticket-${booking._id}.pdf`,
        content: pdfBuffer,
      },
    ],
  };

  return transporter.sendMail(mailOptions);
};
