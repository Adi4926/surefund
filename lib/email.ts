import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = "SureFund Financial Services <noreply@surefund.in>";
const NOTIFY_TO = process.env.NOTIFY_EMAIL_TO || "info@surefund.in";

async function send(subject: string, html: string) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: NOTIFY_TO,
      subject,
      html,
    });
    if (result.error) {
      console.error("Resend API error (admin notify):", result.error);
    }
  } catch (err) {
    console.error("Email notification failed:", err);
  }
}

async function sendTo(toEmail: string, subject: string, html: string) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: toEmail,
      subject,
      html,
    });
    if (result.error) {
      console.error("Resend API error (customer email):", result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Customer email failed:", err);
    return false;
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
  return sendTo(
    toEmail,
    `Your SureFund Login OTP: ${otp}`,
    `<h2>Your Login OTP</h2>
     <p>Your one-time password is: <b style="font-size:20px">${otp}</b></p>
     <p>This OTP is valid for 10 minutes. Do not share it with anyone.</p>`
  );
}

export async function sendApplicationConfirmationEmail(
  toEmail: string,
  app: {
    fullName: string;
    productType: string;
    loanAmount: number;
    applicationId: string;
  }
) {
  return sendTo(
    toEmail,
    `✅ Your ${app.productType} Application Has Been Received — SureFund`,
    `<div style="font-family: sans-serif; max-width: 560px; margin: 0 auto;">
       <h2 style="color: #1d4ed8;">Application Received Successfully</h2>
       <p>Dear ${app.fullName},</p>
       <p>Thank you for applying with <b>SureFund Financial Services</b>. Your application has been received and is now under review.</p>
       <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
         <tr>
           <td style="padding: 8px 0; color: #6b7280;">Application ID</td>
           <td style="padding: 8px 0; font-weight: bold;">${app.applicationId}</td>
         </tr>
         <tr>
           <td style="padding: 8px 0; color: #6b7280;">Product</td>
           <td style="padding: 8px 0; font-weight: bold;">${app.productType}</td>
         </tr>
         <tr>
           <td style="padding: 8px 0; color: #6b7280;">Amount Requested</td>
           <td style="padding: 8px 0; font-weight: bold;">₹${app.loanAmount.toLocaleString("en-IN")}</td>
         </tr>
       </table>
       <p>Our team will review your documents and reach out to you shortly to guide you through the next steps.</p>
       <p style="margin-top: 24px;">Regards,<br/><b>Team SureFund</b></p>
     </div>`
  );
}