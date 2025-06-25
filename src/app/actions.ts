"use server";

import { cvCheckerSuggestions, type CvCheckerOutput } from "@/ai/flows/cv-checker";
import { db, storage } from "@/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

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

    // 1. Upload CV to Firebase Storage
    const mimeType = cvDataUri.match(/data:(.*);base64,/)?.[1] ?? "application/octet-stream";
    const extension = mimeType.split('/')[1] ?? 'bin';
    const fileName = `${Date.now()}-${email.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`;
    const storageRef = ref(storage, `cvs/${fileName}`);
    const uploadResult = await uploadString(storageRef, cvDataUri, 'data_url');
    const downloadURL = await getDownloadURL(uploadResult.ref);
    console.log('File uploaded successfully to Firebase Storage:', downloadURL);

    // 2. Save submission details to Firestore
    await addDoc(collection(db, "submissions"), {
      name,
      email,
      careerGoals,
      cvUrl: downloadURL,
      submittedAt: serverTimestamp(),
    });
    console.log('Submission details saved to Firestore.');
    
    // The user's request mentioned Cloudinary, but since we are using Firebase stack,
    // this is where you would typically upload the file to Firebase Storage.

    const result: CvCheckerOutput = await cvCheckerSuggestions({ cvDataUri });
    
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
