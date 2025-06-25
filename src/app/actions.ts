"use server";

import { cvCheckerSuggestions, type CvCheckerOutput } from "@/ai/flows/cv-checker";
import { adminDb, adminStorage } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

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
  try {
    const { name, email, careerGoals, cvDataUri } = input;
    console.log(`CV analysis request received for a user: ${email}`);

    // 1. Upload CV to Firebase Storage using Admin SDK
    const matches = cvDataUri.match(/^data:(.+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new Error("Invalid data URI format.");
    }
    const mimeType = matches[1];
    const base64Data = matches[2];
    const buffer = Buffer.from(base64Data, 'base64');
    const extension = mimeType.split('/')[1] ?? 'bin';
    const fileName = `cvs/${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;
    
    const file = adminStorage.file(fileName);
    await file.save(buffer, { metadata: { contentType: mimeType } });

    // A signed URL is more secure for accessing the file.
    const [downloadURL] = await file.getSignedUrl({
        action: 'read',
        expires: '03-09-2491', // A very long expiry date
    });
    console.log('File uploaded successfully to Firebase Storage:', downloadURL);

    // 2. Save submission details to Firestore
    await adminDb.collection("submissions").add({
      name,
      email,
      careerGoals,
      cvUrl: downloadURL,
      status: "pending",
      submittedAt: FieldValue.serverTimestamp(),
    });
    console.log('Submission details saved to Firestore.');

    const result: CvCheckerOutput = await cvCheckerSuggestions({ cvDataUri });
    
    // Mocking email notification
    console.log(`Email notification 'sent' to admin and user.`);
    // Actual email logic will be handled from the admin dashboard.

    return { suggestions: result.suggestions };
  } catch (error) {
    console.error("Error in getSuggestionsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: errorMessage };
  }
}
