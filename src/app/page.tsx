import { CvUploadForm } from '@/components/cv-upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePenLine, Replace, Rocket, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-primary">CV Shop</h1>
      </header>

      <section className="relative w-full h-[75vh] flex items-center justify-center text-center text-white overflow-hidden">
        <Image
          src="/cv-shop.jpg"
          alt="Person working on a laptop"
          fill
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-primary/80 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight">
              Transform Your CV into a Job-Winning Document
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/90 max-w-3xl mx-auto">
              Get a professionally rewritten, formatted, and personalized CV crafted by real people—designed to make you stand out and land interviews.
            </p>
            <div className="mt-10 grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <FeatureCard icon={<FilePenLine className="h-8 w-8" />} title="Human-Crafted Rewriting" description="We don’t use generic templates—every CV is written by real people who understand what recruiters look for." />
              <FeatureCard icon={<Replace className="h-8 w-8" />} title="Before & After Transformation" description="We refine your words, structure, and layout for maximum impact." />
              <FeatureCard icon={<Rocket className="h-8 w-8" />} title="Career-Focused Targeting" description="We tailor your CV for the roles you want, emphasizing your strengths and aligning with your goals." />
            </div>
        </div>
      </section>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <Card className="rounded-2xl shadow-xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle>Get Your CV Upgraded</CardTitle>
                <CardDescription>Upload your CV to get started. Our experts will transform it and get back to you within 2-3 business days.</CardDescription>
              </CardHeader>
              <CardContent>
                <CvUploadForm />
              </CardContent>
            </Card>
          </div>
        </div>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              One flat fee for a complete, professional CV overhaul.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Card className="max-w-md w-full shadow-lg rounded-2xl">
              <CardHeader className="text-center">
                <CardTitle>CV Upgrade Service</CardTitle>
                <p className="text-4xl font-bold text-primary pt-2">R150</p>
                <CardDescription>One-time payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <ul className="space-y-4 text-sm text-muted-foreground text-left">
                  <BenefitListItem>Professional Layout & Design</BenefitListItem>
                  <BenefitListItem>Stronger Profile Summary</BenefitListItem>
                  <BenefitListItem>Expanded & Clarified Responsibilities</BenefitListItem>
                  <BenefitListItem>Well-Categorized & Expanded Skills Section</BenefitListItem>
                  <BenefitListItem>Consistent Branding</BenefitListItem>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Here’s how we transform a CV →
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-muted-foreground">Before</h3>
                <Image
                    src="/before-cv.png"
                    alt="Before version of a CV"
                    width={600}
                    height={800}
                    className="rounded-2xl shadow-lg filter blur-sm mx-auto"
                    data-ai-hint="document text"
                />
            </div>
            <div className="text-center">
                <h3 className="text-2xl font-semibold mb-4 text-foreground">After</h3>
                <Image
                    src="/after-cv.png"
                    alt="After version of a CV"
                    width={600}
                    height={800}
                    className="rounded-2xl shadow-2xl border-2 border-primary mx-auto"
                />
            </div>
          </div>
        </section>

      </main>

      <footer className="border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} CV Shop. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 sm:mt-0">
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link>
                <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link>
                <Link href="/refund-policy" className="text-sm text-muted-foreground hover:text-primary">Refund Policy</Link>
                <Link href="/cancellation-policy" className="text-sm text-muted-foreground hover:text-primary">Cancellation Policy</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-accent">{icon}</div>
        <div>
            <h3 className="font-semibold text-primary-foreground">{title}</h3>
            <p className="text-sm text-primary-foreground/80">{description}</p>
        </div>
    </div>
);

const BenefitListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
    <span>{children}</span>
  </li>
);
