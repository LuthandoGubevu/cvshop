"use server";

import { cvCheckerSuggestions, type CvCheckerInput, type CvCheckerOutput } from "@/ai/flows/cv-checker";

type ActionResult = {
    suggestions?: string;
    error?: string;
}

export async function getSuggestionsAction(input: CvCheckerInput): Promise<ActionResult> {
  try {
    console.log("CV analysis request received for a user.");
    // In a real app, you would also get user details and may store the CV
    // file in cloud storage. This part is mocked as per the requirements.
    
    // The user's request mentioned Cloudinary, but since we are using Firebase stack,
    // this is where you would typically upload the file to Firebase Storage.

    const result: CvCheckerOutput = await cvCheckerSuggestions(input);
    
    // Mocking email notification
    console.log(`Email notification 'sent' to admin and user.`);
    // Here you would implement actual email sending logic, e.g., using Resend, SendGrid, etc.

    return { suggestions: result.suggestions };
  } catch (error) {
    console.error("Error in getSuggestionsAction:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { error: errorMessage };
  }
}
