// Email service for sending appointment confirmations
export class EmailService {
  static async sendAppointmentConfirmation(appointment, confirmation) {
    const emailData = {
      to: appointment.email,
      subject: this.getEmailSubject(confirmation.status),
      html: this.generateEmailTemplate(appointment, confirmation),
    }

    // Option 1: Using Resend (recommended)
    if (process.env.REACT_APP_RESEND_API_KEY) {
      return this.sendWithResend(emailData)
    }

    // Option 2: Using your own API endpoint
    return this.sendWithCustomAPI(emailData)
  }

  static getEmailSubject(status) {
    const subjects = {
      confirmed: "✅ Appointment Confirmed - Raj Clinic",
      rescheduled: "📅 Appointment Rescheduled - Raj Clinic",
      cancelled: "❌ Appointment Cancelled - Raj Clinic",
      completed: "✨ Thank you for visiting - Raj Clinic",
    }
    return subjects[status] || "Appointment Update - Raj Clinic"
  }

  static generateEmailTemplate(appointment, confirmation) {
    const statusMessages = {
      confirmed: "Your appointment has been confirmed!",
      rescheduled: "Your appointment has been rescheduled.",
      cancelled: "Your appointment has been cancelled.",
      completed: "Thank you for your visit!",
    }

    const serviceNames = {
      diabetes: "Diabetes Treatment",
      cancer: "Cancer Treatment Consultation",
      counseling: "Mental Health Counseling",
      general: "General Consultation",
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment ${confirmation.status}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; }
          .footer { background: #f9fafb; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; }
          .status-badge { display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; margin: 10px 0; }
          .confirmed { background: #dcfce7; color: #166534; }
          .rescheduled { background: #fef3c7; color: #92400e; }
          .cancelled { background: #fee2e2; color: #dc2626; }
          .completed { background: #dbeafe; color: #1e40af; }
          .details { background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { display: flex; justify-content: space-between; margin: 10px 0; }
          .detail-label { font-weight: bold; color: #374151; }
          .detail-value { color: #6b7280; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 Raj Clinic</h1>
            <p>Your Healthcare Partner</p>
          </div>
          
          <div class="content">
            <h2>Hello ${appointment.full_name},</h2>
            
            <div class="status-badge ${confirmation.status}">
              ${statusMessages[confirmation.status]}
            </div>
            
            <div class="details">
              <h3>Appointment Details:</h3>
              <div class="detail-row">
                <span class="detail-label">Service:</span>
                <span class="detail-value">${serviceNames[appointment.service_type]}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Date:</span>
                <span class="detail-value">${new Date(confirmation.confirmedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Time:</span>
                <span class="detail-value">${confirmation.confirmedTime}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Doctor:</span>
                <span class="detail-value">Dr. Sanjay Pal</span>
              </div>
              ${
                confirmation.notes
                  ? `
              <div class="detail-row">
                <span class="detail-label">Notes:</span>
                <span class="detail-value">${confirmation.notes}</span>
              </div>
              `
                  : ""
              }
            </div>
            
            ${
              confirmation.status === "confirmed"
                ? `
            <h3>What to Bring:</h3>
            <ul>
              <li>Valid ID and insurance card</li>
              <li>List of current medications</li>
              <li>Previous medical records (if applicable)</li>
              <li>Any relevant test results</li>
            </ul>
            
            <h3>Before Your Visit:</h3>
            <ul>
              <li>Arrive 15 minutes early for check-in</li>
              <li>Bring a list of questions or concerns</li>
              <li>Wear comfortable clothing</li>
            </ul>
            `
                : ""
            }
            
            ${
              confirmation.status === "rescheduled"
                ? `
            <p><strong>Please note:</strong> Your original appointment has been moved to the new date and time shown above. If this doesn't work for you, please contact us immediately.</p>
            `
                : ""
            }
            
            ${
              confirmation.status === "cancelled"
                ? `
            <p>If you'd like to reschedule, please contact us or book a new appointment online.</p>
            <a href="${process.env.REACT_APP_WEBSITE_URL}/appointment" class="button">Book New Appointment</a>
            `
                : ""
            }
          </div>
          
          <div class="footer">
            <h3>Contact Information</h3>
            <p>📞 +91 98765 43210</p>
            <p>📧 info@rajclinic.com</p>
            <p>📍 123 Health Street, Medical District</p>
            
            <p style="margin-top: 20px; font-size: 12px; color: #6b7280;">
              This is an automated message. Please do not reply to this email.
              If you have questions, please contact us using the information above.
            </p>
          </div>
        </div>
      </body>
      </html>
    `
  }

  static async sendWithResend(emailData) {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Raj Clinic <appointments@rajclinic.com>",
          to: [emailData.to],
          subject: emailData.subject,
          html: emailData.html,
        }),
      })

      if (!response.ok) {
        throw new Error(`Email sending failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending email with Resend:", error)
      throw error
    }
  }

  static async sendWithCustomAPI(emailData) {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error(`Email sending failed: ${response.statusText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending email with custom API:", error)
      throw error
    }
  }
}
