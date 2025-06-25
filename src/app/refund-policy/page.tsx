import Link from 'next/link';

export default function RefundPolicyPage() {
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
          <h2 className="text-3xl font-extrabold tracking-tight">Refund Policy</h2>
          <p className="text-muted-foreground">Last Updated: June 25, 2024</p>
          
          <div className="space-y-4 text-muted-foreground">
              <p>Our goal at CV Shop is your complete satisfaction. We are committed to delivering a high-quality, professionally upgraded CV. Please read our refund policy carefully.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">General Policy</h3>
              <p>Due to the personalized and service-based nature of our work, we do not offer refunds once the CV upgrade process has begun. The time and expertise invested by our team are non-recoverable.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">Satisfaction Guarantee & Revisions</h3>
              <p>We stand by the quality of our work. If you are not satisfied with the initial upgraded CV, you are entitled to one (1) free revision. To request a revision, please reply to the delivery email with your specific feedback and desired changes within 7 days of receipt. We will work with you to ensure the final document meets your expectations.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">Non-Delivery</h3>
              <p>In the unlikely event that you do not receive your upgraded CV within the stated 2-3 business day timeframe, please contact us immediately. If we fail to deliver the service, you will be entitled to a full refund.</p>

              <h3 className="text-xl font-semibold text-foreground pt-4">Exceptions</h3>
              <p>Refunds may be considered on a case-by-case basis for exceptional circumstances. All such requests must be submitted in writing to our support team.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
