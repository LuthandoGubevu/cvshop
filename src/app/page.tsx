import { CvUploadForm } from '@/components/cv-upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FilePenLine, Replace, Rocket } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-primary">CV Drop</h1>
      </header>

      <section className="w-full">
        <Image
          src="https://placehold.co/1920x400.png"
          alt="Person working on a laptop"
          width={1920}
          height={400}
          className="w-full object-cover"
          data-ai-hint="resume professional"
        />
      </section>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Transform Your CV into a Job-Winning Document
            </h2>
            <p className="text-lg text-muted-foreground">
              Get a professionally rewritten, formatted, and personalized CV crafted by real people—designed to make you stand out and land interviews.
            </p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              <FeatureCard icon={<FilePenLine className="h-8 w-8" />} title="Human-Crafted Rewriting" description="We don’t use generic templates—every CV is written by real people who understand what recruiters look for." />
              <FeatureCard icon={<Replace className="h-8 w-8" />} title="Before & After Transformation" description="We refine your words, structure, and layout for maximum impact." />
              <FeatureCard icon={<Rocket className="h-8 w-8" />} title="Career-Focused Targeting" description="We tailor your CV for the roles you want, emphasizing your strengths and aligning with your goals." />
            </div>
          </div>
          <div>
            <Card className="rounded-2xl shadow-xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle>Upgrade Your CV for R150</CardTitle>
                <CardDescription>Upload your current CV to start the transformation. It's a small investment for a big career boost.</CardDescription>
              </CardHeader>
              <CardContent>
                <CvUploadForm />
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
                    src="https://placehold.co/600x800.png"
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
                    src="https://placehold.co/600x800.png"
                    alt="After version of a CV"
                    width={600}
                    height={800}
                    className="rounded-2xl shadow-2xl border-2 border-primary mx-auto"
                    data-ai-hint="resume professional"
                />
            </div>
          </div>
        </section>

      </main>

      <footer className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} CV Drop. All rights reserved.</p>
      </footer>
    </div>
  );
}

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 text-accent">{icon}</div>
        <div>
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
);
