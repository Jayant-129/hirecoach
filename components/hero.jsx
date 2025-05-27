"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Play } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-16 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-slate-900/50 dark:via-slate-800/30 dark:to-slate-900/50"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="space-y-8 text-center">
          <div className="space-y-6 mx-auto max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Career Transformation
            </div>

            {/* Main heading */}
            <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-gradient text-glow leading-tight">
              Your AI Career Coach for
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Professional Success
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-[700px] subtitle-text md:text-xl lg:text-2xl leading-relaxed">
              Advance your career with personalized guidance, interview prep,
              and AI-powered tools for job success. Join thousands of
              professionals already transforming their careers.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-8">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="button-gradient px-8 py-4 text-lg font-semibold hover:scale-105 transition-transform duration-300 shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="https://github.com/Jayant-129/hirecoach">
              <Button
                size="lg"
                variant="outline"
                className="button-outline px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
              >
                <Play className="mr-2 h-5 w-5" />
                View Demo
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 mt-12 opacity-70">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Free to start
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">
                No credit card required
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">
                Setup in 2 minutes
              </span>
            </div>
          </div>

          {/* Hero image */}
          <div className="hero-image-wrapper mt-12 md:mt-16">
            <div ref={imageRef} className="hero-image">
              <div className="relative">
                <Image
                  src="/banner.jpeg"
                  width={1200}
                  height={750}
                  alt="Dashboard Preview"
                  className="rounded-2xl shadow-2xl border mx-auto"
                  priority
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
