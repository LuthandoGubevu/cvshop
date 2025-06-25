import Link from 'next/link';

export default function CancellationPolicyPage() {
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
          <h2 className="text-3xl font-extrabold tracking-tight">Cancellation Policy</h2>
          <p className="text-muted-foreground">Last Updated: June 25, 2024</p>

          <div className="space-y-4 text-muted-foreground">
              <p>This policy outlines the conditions under which you can cancel your CV Upgrade service with CV Shop.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">How to Cancel</h3>
              <p>To cancel your order, you must contact us via email as soon as possible after placing your order. Please include your name, order number, and a clear statement requesting cancellation.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">Cancellation Window & Refunds</h3>
              <p><strong>Full Refund:</strong> You are eligible for a full refund if you cancel your order before our team has begun working on your CV. Typically, work begins within a few hours of your submission.</p>
              <p><strong>No Refund:</strong> If you request to cancel after the upgrade process has started, you will not be eligible for a refund. At that point, our resources have already been allocated to your project.</p>

              <p>We will notify you via email to confirm whether your cancellation request was processed in time for a refund.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
