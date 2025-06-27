"use client";

import { useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { getSuggestionsAction, type SuggestionActionInput } from "@/app/actions";
import { CvUploadForm } from '@/components/cv-upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FilePenLine, Replace, Rocket, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import AnimatedStats from '@/components/animated-stats';

export default function Home() {
  const { toast } = useToast();

  useEffect(() => {
    const processPaymentCallback = async () => {
      const url = new URL(window.location.href);
      const ref = url.searchParams.get("ref");

      if (ref) {
        // Immediately clean the URL to prevent re-triggering on refresh
        window.history.replaceState({}, document.title, window.location.pathname);
        
        const cvDataString = sessionStorage.getItem("cvForm");
        
        if (cvDataString) {
          const cvData: SuggestionActionInput = JSON.parse(cvDataString);

          // Let's show a pending toast
          const { dismiss } = toast({
            title: "Processing Submission...",
            description: "Your payment was successful. Please wait while we submit your CV.",
          });

          const response = await getSuggestionsAction(cvData);
          
          dismiss();

          if (response.error) {
            toast({
              variant: "destructive",
              title: "Submission Failed After Payment",
              description: `Your payment was successful, but we had an issue sending your CV. Please contact support. Error: ${response.error}`,
            });
          } else {
            toast({
              title: "Submission Received!",
              description: "We've received your payment and CV. We'll email your upgraded version in 2-3 business days.",
            });
          }
          
          sessionStorage.removeItem("cvForm");
        }
      }
    };

    processPaymentCallback();
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="CV Shop-Logo"
            width={100}
            height={20}
            priority
          />
        </Link>
      </header>

      <section className="relative w-full h-auto min-h-[100vh] flex items-center justify-center text-center text-white overflow-hidden px-4 pt-24 sm:pt-32">
        <Image
          src="/cv-shop.jpg"
          alt="CV Shop background"
          fill
          priority
          className="object-cover z-0"
        />
        <div className="absolute inset-0 bg-primary/80 z-10"></div>
        <div className="relative z-20 container mx-auto max-w-md sm:max-w-2xl lg:max-w-4xl text-center space-y-6">

          <div className="mb-4">
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              South Africa's Leading CV Upgrade Service
            </h3>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-3xl font-extrabold tracking-tight">
            Transform Your CV into a Job-Winning Document
          </h2>
       
          <p className="mt-6 text-base sm:text-lg text-primary-foreground/90 max-w-3xl mx-auto">
            Get a professionally rewritten, formatted, and personalized CV crafted by real people—designed to make you stand out and land interviews.
          </p>
          <div className="mt-12 grid sm:grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <FeatureCard icon={<FilePenLine className="h-8 w-8" />} title="Human-Crafted Rewriting" description="We don’t use generic templates—every CV is written by real people who understand what recruiters look for." />
            <FeatureCard icon={<Replace className="h-8 w-8" />} title="Before & After Transformation" description="We refine your words, structure, and layout for maximum impact." />
            <FeatureCard icon={<Rocket className="h-8 w-8" />} title="Career-Focused Targeting" description="We tailor your CV for the roles you want, emphasizing your strengths and aligning with your goals." />
          </div>
        </div>
      </section>
      
      <AnimatedStats />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <Card className="rounded-2xl shadow-xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-6 md:p-8 space-y-8">
                {/* --- Combined Pricing & Form Section --- */}
                <div className="space-y-4">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
                    <p className="mt-2 text-lg text-muted-foreground">
                      One flat fee for a complete, professional CV overhaul.
                    </p>
                  </div>
                  
                  <div className="text-center border rounded-lg p-6">
                    <CardTitle>CV Upgrade Service</CardTitle>
                    <p className="text-4xl font-bold text-primary pt-2">R150</p>
                    <CardDescription>One-time payment</CardDescription>
                    <ul className="mt-6 space-y-4 text-sm text-muted-foreground text-left max-w-xs mx-auto">
                      <BenefitListItem>Professional Layout & Design</BenefitListItem>
                      <BenefitListItem>Stronger Profile Summary</BenefitListItem>
                      <BenefitListItem>Expanded & Clarified Responsibilities</BenefitListItem>
                      <BenefitListItem>Well-Categorized & Expanded Skills Section</BenefitListItem>
                      <BenefitListItem>Consistent Branding</BenefitListItem>
                    </ul>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="text-center">
                    <CardTitle>Get Your CV Upgraded</CardTitle>
                    <CardDescription>Upload your CV to get started. Our experts will transform it and get back to you within 2-3 business days.</CardDescription>
                  </div>
                  <CvUploadForm />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

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
                    className="rounded-2xl shadow-lg mx-auto blur-sm"
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

        <section className="py-16 sm:py-24 bg-secondary/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                What Our Clients Say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Real stories from professionals who landed their dream jobs.
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TestimonialCard
                quote="The transformation was incredible. My new CV is professional, concise, and truly highlights my skills. I started getting callbacks almost immediately!"
                name="Thabo M."
                title="Software Engineer"
                avatarSrc="https://placehold.co/40x40.png"
                avatarFallback="TM"
              />
              <TestimonialCard
                quote="I was stuck in my job search for months. CV Shop completely revamped my resume and I got three interviews in the first week. I can't recommend them enough!"
                name="Jessica P."
                title="Marketing Manager"
                avatarSrc="https://placehold.co/40x40.png"
                avatarFallback="JP"
              />
              <TestimonialCard
                quote="As a recent graduate, I had no idea how to present my experience. The team at CV Shop created a document that gave me the confidence to apply for senior roles. Thank you!"
                name="Lerato K."
                title="Junior Accountant"
                avatarSrc="https://placehold.co/40x40.png"
                avatarFallback="LK"
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
            <h3 className="text-lg font-semibold text-primary-foreground">{title}</h3>
            <p className="mt-1 text-base text-primary-foreground/80">{description}</p>
        </div>
    </div>
);

const BenefitListItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center">
    <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
    <span>{children}</span>
  </li>
);

const TestimonialCard = ({ quote, name, title, avatarSrc, avatarFallback }: { quote: string, name: string, title: string, avatarSrc: string, avatarFallback: string }) => (
    <Card className="flex flex-col bg-card">
        <CardContent className="pt-6 flex-grow">
            <p className="text-muted-foreground italic">"{quote}"</p>
        </CardContent>
        <CardFooter className="flex items-center gap-4 mt-auto">
            <Avatar>
                <AvatarImage src={avatarSrc} alt={name} data-ai-hint="person" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{title}</p>
            </div>
        </CardFooter>
    </Card>
);
