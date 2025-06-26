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
    // Ensure you have set RESEND_API_KEY and ADMIN_EMAIL in your environment variables
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!resendApiKey) {
        throw new Error("Resend API key is not configured. Please set RESEND_API_KEY in your environment variables.");
    }
    // Using a hardcoded 'from' email ('onboarding@resend.dev') for testing, so no check for RESEND_FROM_EMAIL is needed.
    // In production, you would use a verified domain with Resend.
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
    const { data, error } = await resend.emails.send({
        from: 'CV Drop <onboarding@resend.dev>',
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

    if (error) {
        console.error("Resend error:", error);
        throw new Error(`Failed to send email: ${error.message}`);
    }

    console.log('Resend success response:', data);
    console.log('Submission email sent to admin.');

    return {};
  } catch (error) {
    console.error("Error in getSuggestionsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: errorMessage };
  }
}
