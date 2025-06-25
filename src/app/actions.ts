"use server";

import { cvCheckerSuggestions, type CvCheckerOutput } from "@/ai/flows/cv-checker";
import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { Resend } from "resend";

type ActionResult = {
    suggestions?: string;
    error?: string;
}

// Type for the combined form and file data
export type SuggestionActionInput = {
    name: string;
    email: string;
    careerGoals: string;
    cvDataUri: string;
};

export async function getSuggestionsAction(input: SuggestionActionInput): Promise<ActionResult> {
  // Ensure you have set RESEND_API_KEY, RESEND_FROM_EMAIL, and ADMIN_EMAIL in your environment variables
  const resend = new Resend(process.env.RESEND_API_KEY);
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!adminEmail) {
    const errorMessage = "Admin email is not configured. The submission cannot be processed.";
    console.error(errorMessage);
    return { error: errorMessage };
  }

  try {
    const { name, email, careerGoals, cvDataUri } = input;
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
        from: `CV Shop Submissions <${process.env.RESEND_FROM_EMAIL || 'noreply@yourdomain.com'}>`,
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
            filename: `${name.replace(/[^a-zA-Z0-9]/g, "_")}_CV.pdf`,
            content: fileBuffer,
          },
        ],
    });
    console.log('Submission email sent to admin.');
    
    // 3. Save submission details to Firestore (for admin dashboard tracking)
    await adminDb.collection("submissions").add({
      name,
      email,
      careerGoals,
      cvUrl: "sent-via-email", // The CV is sent by email, not stored.
      status: "pending",
      submittedAt: FieldValue.serverTimestamp(),
    });
    console.log('Submission details saved to Firestore.');

    // 4. Run AI suggestions (as before)
    const result: CvCheckerOutput = await cvCheckerSuggestions({ cvDataUri });
    
    console.log(`AI suggestions generated for user.`);

    return { suggestions: result.suggestions };
  } catch (error) {
    console.error("Error in getSuggestionsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: errorMessage };
  }
}
