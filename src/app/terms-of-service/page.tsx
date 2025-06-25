import Link from 'next/link';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
      <header className="border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
              <h1 className="text-2xl font-bold text-primary">
                  <Link href="/">CV Shop</Link>
              </h1>
              <Link href="/" className="text-sm font-medium text-primary hover:underline">Back to Home</Link>
          </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold tracking-tight">Terms of Service</h2>
          <p className="text-muted-foreground">Last Updated: June 25, 2024</p>

          <div className="space-y-4 text-muted-foreground">
              <p>Welcome to CV Shop. By using our services, you agree to be bound by the following terms and conditions. Please read them carefully.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">1. Service Description</h3>
              <p>CV Shop provides a professional CV rewriting and formatting service. Upon payment, we will enhance your submitted CV content and design, delivering the final product via email within the timeframe specified (typically 2-3 business days).</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">2. User Responsibilities</h3>
              <p>You are responsible for providing accurate and truthful information in your CV. We are not liable for any misrepresentations made by you. You must have the right to use and share the content you provide to us.</p>
              
              <h3 className="text-xl font-semibold text-foreground pt-4">3. Payment</h3>
              <p>Payment for our CV upgrade service is due in full before any work begins. All payments are processed through a secure third-party payment gateway.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">4. Delivery and Revisions</h3>
              <p>The upgraded CV will be delivered to the email address you provide. Our service includes one free revision. Requests for revision must be made within 7 days of receiving the upgraded CV. Additional revisions may be subject to a fee.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">5. Intellectual Property</h3>
              <p>You retain ownership of the original content you provide. Upon delivery, you are granted a license to use the upgraded CV for personal, non-commercial purposes. CV Shop retains the right to use the format and non-personal elements of the CV for promotional purposes.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">6. Limitation of Liability</h3>
              <p>CV Shop does not guarantee job interviews or employment. Our service is designed to improve the quality of your CV. Our liability is limited to the amount paid for the service.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">7. Changes to Terms</h3>
              <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
