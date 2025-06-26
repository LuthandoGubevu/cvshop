"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { adminDb } from '@/lib/firebase-admin';
// import { adminStorage } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { Resend } from 'resend';
import UpgradedCvEmail from '@/emails/upgraded-cv-email';

// --- AUTH ACTIONS ---

export async function login(secretKey: string): Promise<{ success?: true; error?: string }> {
  if (secretKey === process.env.ADMIN_SECRET_KEY) {
    cookies().set('admin-auth', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }
  return { error: 'Invalid secret key.' };
}

export async function logout() {
  cookies().delete('admin-auth');
  redirect('/admin/login');
}

// --- SUBMISSION ACTIONS ---

export interface Submission {
  id: string;
  name: string;
  email: string;
  careerGoals: string;
  cvUrl: string;
  status: 'pending' | 'in-progress' | 'completed';
  submittedAt: {
    _seconds: number;
    _nanoseconds: number;
  } | Date;
  upgradedCvUrl?: string;
}

export async function getSubmissions(): Promise<Submission[]> {
  const snapshot = await adminDb.collection('submissions').orderBy('submittedAt', 'desc').get();
  if (snapshot.empty) {
    return [];
  }
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
    submittedAt: (doc.data().submittedAt as FirebaseFirestore.Timestamp).toDate(),
  })) as Submission[];
}

export async function updateSubmissionStatus(id: string, status: Submission['status']) {
  try {
    await adminDb.collection('submissions').doc(id).update({ status });
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    return { error: 'Failed to update status.' };
  }
}

export async function handleUpgradedCvUpload(submissionId: string, formData: FormData) {
  try {
    console.warn("Firebase Storage is temporarily disabled. Upgraded CV upload is not available.");
    return { error: 'File upload is temporarily disabled.' };
    /*
    const file = formData.get('file') as File;
    if (!file) {
      throw new Error('No file provided.');
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `upgraded-cvs/${submissionId}-${file.name}`;
    const storageFile = adminStorage.file(fileName);
    await storageFile.save(buffer, { metadata: { contentType: file.type } });

    const [downloadURL] = await storageFile.getSignedUrl({
        action: 'read',
        expires: '03-09-2491',
    });
    
    await adminDb.collection('submissions').doc(submissionId).update({
      upgradedCvUrl: downloadURL,
    });

    revalidatePath('/admin');
    return { success: true, url: downloadURL };
    */
  } catch (error) {
    console.error("Upload failed:", error);
    return { error: 'Failed to upload upgraded CV.' };
  }
}

export async function sendEmailAction(submissionId: string) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const doc = await adminDb.collection('submissions').doc(submissionId).get();
    if (!doc.exists) {
      throw new Error('Submission not found.');
    }
    const submission = doc.data() as Submission;

    if (!submission.upgradedCvUrl) {
      return { error: 'No upgraded CV found to send.' };
    }

    await resend.emails.send({
      from: `CV Shop <${process.env.RESEND_FROM_EMAIL}>`,
      to: [submission.email],
      subject: 'Your Upgraded CV is Ready!',
      react: UpgradedCvEmail({ 
        userName: submission.name, 
        downloadUrl: submission.upgradedCvUrl 
      }),
    });
    
    // Update status to completed after sending
    await adminDb.collection('submissions').doc(submissionId).update({
      status: 'completed',
    });

    revalidatePath('/admin');
    return { success: true };

  } catch (error) {
    console.error("Email sending failed:", error);
    return { error: 'Failed to send email.' };
  }
}
