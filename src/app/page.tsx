import { CvUploadForm } from '@/components/cv-upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, FileText, BotMessageSquare, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-3xl font-bold text-primary">CV Drop</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 gap-16 items-start">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-foreground">
              Elevate Your CV with AI-Powered Feedback
            </h2>
            <p className="text-lg text-muted-foreground">
              Upload your CV and get instant, actionable suggestions to fix common mistakes, improve language, and make your profile stand out to recruiters.
            </p>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <FeatureCard icon={<FileText className="h-8 w-8" />} title="Instant AI Analysis" description="Our AI scans your CV for spelling errors and outdated phrases." />
              <FeatureCard icon={<BotMessageSquare className="h-8 w-8" />} title="Targeted Suggestions" description="Receive clear, actionable advice to enhance your CV's impact." />
              <FeatureCard icon={<Award className="h-8 w-8" />} title="Land Your Dream Job" description="A polished CV is the first step towards your next career move." />
            </div>
          </div>
          <div>
            <Card className="rounded-2xl shadow-xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
              <CardHeader>
                <CardTitle>Get Started for Free</CardTitle>
                <CardDescription>Upload your CV to receive feedback in seconds.</CardDescription>
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
              Ready for a Professional Touch?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              While our AI provides great initial feedback, our premium upgrade service offers a complete professional rewrite of your CV.
            </p>
          </div>
          <div className="mt-12 flex justify-center">
            <Card className="w-full max-w-lg rounded-2xl shadow-xl border-2 border-primary/50">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Premium CV Upgrade</CardTitle>
                <CardDescription>A small investment for a big career boost.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-extrabold tracking-tight text-foreground">R150</span>
                  <span className="text-xl font-medium text-muted-foreground">once-off</span>
                </div>
                <div className="space-y-4 pt-6 border-t">
                  <h3 className="text-center font-semibold text-foreground">Improvements & Strengths in the Upgraded CV</h3>
                  <ul className="space-y-3">
                    <BenefitItem>
                      <strong>Professional Layout &amp; Design:</strong> A modern, clean layout that enhances readability.
                    </BenefitItem>
                    <BenefitItem>
                      <strong>Stronger Profile Summary:</strong> A concise, tailored summary that highlights your key strengths.
                    </BenefitItem>
                    <BenefitItem>
                      <strong>Impactful Responsibilities:</strong> Duties rewritten with action verbs and impact-based language.
                    </BenefitItem>
                    <BenefitItem>
                      <strong>Expanded Skills Section:</strong> A well-categorized list showcasing your diverse abilities.
                    </BenefitItem>
                    <BenefitItem>
                      <strong>Consistent Branding:</strong> A unified professional image across all sections.
                    </BenefitItem>
                  </ul>
                </div>
                <Button size="lg" className="w-full">
                  Purchase Upgrade
                </Button>
              </CardContent>
            </Card>
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
)

const BenefitItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start gap-3">
    <Check className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
    <span className="text-sm text-muted-foreground">{children}</span>
  </li>
);
