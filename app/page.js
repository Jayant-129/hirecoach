import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  Star,
  Users,
  TrendingUp,
  Shield,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Trust Indicators */}
      <section className="w-full py-8 bg-background border-t border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-sm text-muted-foreground font-medium">
              Trusted by professionals from
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-muted-foreground">
                Google
              </div>
              <div className="text-2xl font-bold text-muted-foreground">
                Microsoft
              </div>
              <div className="text-2xl font-bold text-muted-foreground">
                Apple
              </div>
              <div className="text-2xl font-bold text-muted-foreground">
                Meta
              </div>
              <div className="text-2xl font-bold text-muted-foreground">
                Amazon
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-background via-muted/20 to-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Succeed
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive suite of AI-powered tools helps you navigate
              every aspect of your career journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="pt-8 pb-6 text-center flex flex-col items-center h-full">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <div className="relative">{feature.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-blue-600">Thousands</span> of
              Professionals
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our growing community of successful career-focused
              individuals
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div className="group cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-4xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-300">
                  50+
                </h3>
                <p className="text-muted-foreground font-medium">
                  Industries Covered
                </p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-4xl font-bold text-purple-600 group-hover:scale-110 transition-transform duration-300">
                  1000+
                </h3>
                <p className="text-muted-foreground font-medium">
                  Interview Questions
                </p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-4xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">
                  95%
                </h3>
                <p className="text-muted-foreground font-medium">
                  Success Rate
                </p>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-white/20 group-hover:shadow-lg transition-all duration-300">
                <h3 className="text-4xl font-bold text-orange-600 group-hover:scale-110 transition-transform duration-300">
                  24/7
                </h3>
                <p className="text-muted-foreground font-medium">AI Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm mb-6">
              <Target className="w-4 h-4 mr-2" />
              Simple Process
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              How It{" "}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Four simple steps to accelerate your career growth with AI-powered
              guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center text-center space-y-6 group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 md:py-24 bg-gradient-to-br from-muted/30 via-background to-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6">
              <Star className="w-4 h-4 mr-2" />
              User Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              What Our{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Users Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover how professionals worldwide are advancing their careers
              with our AI-powered platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card
                key={index}
                className="group relative bg-background/80 backdrop-blur-sm border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-14 w-14 flex-shrink-0">
                        <Image
                          width={56}
                          height={56}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/50 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">
                          {testimonial.author}
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-primary font-semibold">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote className="relative">
                      <div className="flex text-yellow-500 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-muted-foreground italic relative leading-relaxed">
                        <span className="text-3xl text-primary absolute -top-4 -left-2">
                          &quot;
                        </span>
                        {testimonial.quote}
                        <span className="text-3xl text-primary absolute -bottom-4 right-0">
                          &quot;
                        </span>
                      </p>
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm mb-6">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Common Questions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our platform and how it can
              help accelerate your career
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-l-4 border-l-transparent hover:border-l-primary/50 transition-colors duration-300"
                >
                  <AccordionTrigger className="text-left hover:text-primary transition-colors duration-300 px-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground px-4 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="gradient rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 rounded-3xl"></div>
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center space-y-6 max-w-4xl mx-auto">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white font-medium text-sm mb-4">
                  <Trophy className="w-4 h-4 mr-2" />
                  Start Your Success Story
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
                  Ready to Accelerate Your Career?
                </h2>
                <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of professionals who are advancing their
                  careers with AI-powered guidance. Start your journey today!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Link href="/dashboard" passHref>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="h-14 px-8 text-lg font-semibold hover:scale-105 transition-transform duration-300"
                    >
                      Start Your Journey Today{" "}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/about" passHref>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-lg font-semibold border-white/30 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
