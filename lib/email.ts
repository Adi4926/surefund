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
    `Your ${app.productType} Application Has Been Received — SureFund`,
    `<!DOCTYPE html>
    <html>
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding: 32px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">

              <!-- Header with clickable logo -->
              <tr>
                <td style="background-color:#0f2d52; padding: 24px 40px;">
                  <a href="https://surefund.in" target="_blank" style="text-decoration:none;">
                    <img src="https://surefund.in/logo.png" alt="SureFund Financial Services" height="46" style="display:block; border:0;" />
                  </a>
                </td>
              </tr>

              <!-- Status Banner -->
              <tr>
                <td style="background-color:#eef7f0; padding: 16px 40px; border-bottom: 1px solid #d9ede0;">
                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="color:#1e8e3e; font-size:14px; font-weight:bold;">
                        &#10003; Application Received
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <!-- Body -->
              <tr>
                <td style="padding: 32px 40px;">
                  <p style="margin:0 0 8px 0; font-size:15px; color:#333333;">Dear ${app.fullName},</p>
                  <p style="margin:0 0 24px 0; font-size:15px; color:#555555; line-height:1.6;">
                    Thank you for choosing <strong>SureFund Financial Services</strong>. We've successfully received your application and it is now under review by our team.
                  </p>

                  <!-- Details Card -->
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border:1px solid #e5e9ef; border-radius:6px; margin-bottom: 24px;">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:6px 0; color:#8a94a3; font-size:13px;">Application ID</td>
                            <td align="right" style="padding:6px 0; color:#0f2d52; font-size:14px; font-weight:bold;">${app.applicationId}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; color:#8a94a3; font-size:13px; border-top:1px solid #e5e9ef;">Product</td>
                            <td align="right" style="padding:6px 0; color:#333333; font-size:14px; border-top:1px solid #e5e9ef;">${app.productType}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; color:#8a94a3; font-size:13px; border-top:1px solid #e5e9ef;">Amount Requested</td>
                            <td align="right" style="padding:6px 0; color:#333333; font-size:14px; font-weight:bold; border-top:1px solid #e5e9ef;">₹${app.loanAmount.toLocaleString("en-IN")}</td>
                          </tr>
                          <tr>
                            <td style="padding:6px 0; color:#8a94a3; font-size:13px; border-top:1px solid #e5e9ef;">Status</td>
                            <td align="right" style="padding:6px 0; border-top:1px solid #e5e9ef;">
                              <span style="background-color:#fff4e5; color:#b06500; font-size:12px; font-weight:bold; padding:3px 10px; border-radius:12px;">Under Review</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:0 0 24px 0; font-size:14px; color:#555555; line-height:1.6;">
                    Our team will verify your documents and get in touch with you shortly with the next steps. You can reply directly to this email if you have any questions.
                  </p>

                  <p style="margin:0; font-size:14px; color:#333333;">
                    Regards,<br/>
                    <strong>Team SureFund</strong>
                  </p>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="background-color:#f8fafc; padding: 20px 40px; border-top:1px solid #e5e9ef;">
                  <p style="margin:0 0 6px 0; font-size:12px; color:#8a94a3; line-height:1.6;">
                    This is an automated message from SureFund Financial Services. Please do not share your Application ID with anyone.
                  </p>
                  <p style="margin:0; font-size:12px; color:#8a94a3;">
                    &copy; ${new Date().getFullYear()} SureFund Financial Services. All rights reserved.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`
  );
}
