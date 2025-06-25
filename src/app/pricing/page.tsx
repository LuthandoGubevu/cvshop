import Link from 'next/link';

export default function PricingPage() {
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
          <h2 className="text-3xl font-extrabold tracking-tight">Pricing Structure</h2>
          <p className="text-lg text-muted-foreground">
            At CV Shop, we believe in transparent and straightforward pricing. Our goal is to provide exceptional value without any hidden fees or complicated tiers.
          </p>
          
          <div className="border bg-card text-card-foreground rounded-lg p-6">
            <h3 className="text-2xl font-bold">CV Upgrade Service — R150 (One-Time Payment)</h3>
            <p className="mt-2 text-muted-foreground">
              For a single, flat fee of R150, you receive a complete, professional overhaul of your CV. This is a one-time payment for a comprehensive service designed to elevate your career profile.
            </p>
            <h4 className="mt-6 font-semibold text-lg">What's Included:</h4>
            <ul className="mt-4 list-disc list-inside space-y-2 text-muted-foreground">
              <li><strong>Professional Rewriting:</strong> Our experts will rewrite your CV content to be more impactful, using action verbs and results-oriented language.</li>
              <li><strong>Modern Layout & Design:</strong> We'll reformat your CV into a clean, modern, and easy-to-read layout that appeals to recruiters.</li>
              <li><strong>Tailored Profile Summary:</strong> A concise, personalized summary that highlights your key strengths and career goals.</li>
              <li><strong>Skills Enhancement:</strong> We'll help you identify and articulate both technical and soft skills to present a well-rounded professional profile.</li>
              <li><strong>One Free Revision:</strong> We are committed to your satisfaction. After you receive your upgraded CV, you are entitled to one round of revisions to ensure it perfectly matches your expectations.</li>
            </ul>
          </div>

          <p className="text-muted-foreground">
            There are no recurring charges or subscriptions. The R150 fee covers the entire process from submission to the final, polished document delivered to your email.
          </p>
        </div>
      </main>
    </div>
  );
}
