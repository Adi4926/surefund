import nodemailer from "nodemailer";

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (transporter) return transporter;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
}

const NOTIFY_TO = process.env.NOTIFY_EMAIL_TO || "info@surefund.in";

async function send(subject: string, html: string) {
  try {
    await getTransporter().sendMail({
      from: `"SureFund Financial Services" <${process.env.SMTP_USER}>`,
      to: NOTIFY_TO,
      subject,
      html,
    });
  } catch (err) {
    // Email failures should never break the lead-capture flow
    console.error("Email notification failed:", err);
  }
}

export async function notifyNewLead(lead: {
  fullName: string;
  mobile: string;
  productType: string;
  qualification: string;
}) {
  await send(
    `🆕 New Lead: ${lead.productType} — ${lead.fullName}`,
    `<h2>New Lead Received</h2>
     <p><b>Name:</b> ${lead.fullName}</p>
     <p><b>Mobile:</b> ${lead.mobile}</p>
     <p><b>Product:</b> ${lead.productType}</p>
     <p><b>Qualification:</b> ${lead.qualification}</p>`
  );
}

export async function notifyNewApplication(app: {
  fullName: string;
  productType: string;
  loanAmount: number;
}) {
  await send(
    `📄 New Loan Application — ${app.fullName}`,
    `<h2>New Loan Application Submitted</h2>
     <p><b>Name:</b> ${app.fullName}</p>
     <p><b>Product:</b> ${app.productType}</p>
     <p><b>Amount Requested:</b> ₹${app.loanAmount.toLocaleString("en-IN")}</p>`
  );
}

export async function notifyNewCibilRequest(req: {
  fullName: string;
  mobile: string;
  pan: string;
}) {
  await send(
    `📊 New CIBIL Check Request — ${req.fullName}`,
    `<h2>New Free CIBIL Check Request</h2>
     <p><b>Name:</b> ${req.fullName}</p>
     <p><b>Mobile:</b> ${req.mobile}</p>
     <p><b>PAN:</b> ${req.pan}</p>`
  );
}

export async function notifyContactForm(msg: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}) {
  await send(
    `✉️ Contact Form — ${msg.subject}`,
    `<h2>New Contact Form Submission</h2>
     <p><b>Name:</b> ${msg.name}</p>
     <p><b>Email:</b> ${msg.email}</p>
     <p><b>Phone:</b> ${msg.phone}</p>
     <p><b>Subject:</b> ${msg.subject}</p>
     <p><b>Message:</b> ${msg.message}</p>`
  );
}
export async function sendOtpEmail(toEmail: string, otp: string) {
  try {
    await getTransporter().sendMail({
      from: `"SureFund Financial Services" <${process.env.SMTP_USER}>`,
      to: toEmail,
      subject: `Your SureFund Login OTP: ${otp}`,
      html: `<h2>Your Login OTP</h2>
             <p>Your one-time password is: <b style="font-size:20px">${otp}</b></p>
             <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>`,
    });
    return true;
  } catch (err) {
    console.error("OTP email failed:", err);
    return false;
  }
}