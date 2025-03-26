import Link from "next/link";
import { Crosshair, MessageCircleWarning, SquareActivity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">M</span>
            </div>
            <span className="text-xl font-bold text-foreground">Metrytics</span>
          </div>
          <div>
            <Button asChild variant="default">
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </nav>

        <section className="flex flex-col md:flex-row items-center justify-between py-8 md:py-12 lg:py-16">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Understand your website traffic with simple analytics
            </h1>
            <p className="text-lg text-muted-foreground md:mb-8">
              Get insights into visitor behavior, track performance, errors, and
              make data-driven decisions to optimize your website.
            </p>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0">
            <Card>
              <CardContent className="p-4">
                <Image
                  src="/preview.png"
                  alt="Metrytics Dashboard Preview"
                  className="rounded-md w-full h-auto"
                  height={800}
                  width={1200}
                />
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-4 lg:py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-8 md:mb-12">
            Analytics made simple
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-row  gap-4 text-primary mb-4 text-2xl">
                    {feature.icon}
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <footer className="pt-6 border-t border-border mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xs">
                  A
                </span>
              </div>
              <span className="text-foreground font-semibold">Metrytics</span>
            </div>
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Metrytics. All rights reserved.
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              <a href="api/license" target="_blank" rel="noopener noreferrer">
                MIT License
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

// Features data
const features = [
  {
    icon: <SquareActivity />,
    title: "Visitor Insights",
    description:
      "Track browser, operating system, device, and geographic location of your visitors.",
  },
  {
    icon: <Crosshair />,
    title: "Custom Events (coming soon)",
    description:
      "Define and track specific user interactions to measure what matters to your business.",
  },
  {
    icon: <MessageCircleWarning />,
    title: "Errors (coming soon)",
    description:
      "Capture and view errors that occur on your website to help improve your user experience.",
  },
];
