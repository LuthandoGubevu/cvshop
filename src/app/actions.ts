"use server";

import { Resend } from "resend";

type ActionResult = {
    error?: string;
}

// Type for the combined form and file data
export type SuggestionActionInput = {
    name: string;
    email: string;
    careerGoals: string;
    cvDataUri: string;
    filename: string;
};

export async function getSuggestionsAction(input: SuggestionActionInput): Promise<ActionResult> {
  try {
    // Ensure you have set RESEND_API_KEY, RESEND_FROM_EMAIL, and ADMIN_EMAIL in your environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!resendApiKey) {
        throw new Error("Resend API key is not configured. Please set RESEND_API_KEY in your environment variables.");
    }
    if (!fromEmail) {
        throw new Error("Resend 'from' email is not configured. Please set RESEND_FROM_EMAIL in your environment variables (e.g., 'noreply@yourdomain.com'). It must be a verified domain in Resend.");
    }
    if (!adminEmail) {
        throw new Error("Admin email is not configured. Please set ADMIN_EMAIL in your environment variables.");
    }
    
    const resend = new Resend(resendApiKey);
    const { name, email, careerGoals, cvDataUri, filename } = input;
    console.log(`CV submission received from user: ${email}`);

    // 1. Convert data URI to buffer for email attachment
    const matches = cvDataUri.match(/^data:.+;base64,(.+)$/);
    if (!matches || matches.length < 2) {
      throw new Error("Invalid data URI format.");
    }
    const base64Data = matches[1];
    const fileBuffer = Buffer.from(base64Data, 'base64');
    
    // 2. Send email to admin with CV attached
    await resend.emails.send({
        from: `CV Shop Submissions <${fromEmail}>`,
        to: adminEmail,
        subject: `New CV Submission from ${name}`,
        html: `
          <h3>New CV Submission</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Career Goals:</strong></p>
          <p>${careerGoals.replace(/\n/g, '<br>')}</p>
        `,
        attachments: [
          {
            filename: filename,
            content: fileBuffer,
          },
        ],
    });
    console.log('Submission email sent to admin.');
    
    // Firebase is no longer used for tracking.

    return {};
  } catch (error) {
    console.error("Error in getSuggestionsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: errorMessage };
  }
}
