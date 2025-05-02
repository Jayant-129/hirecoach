"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Briefcase,
  Clock,
  CheckCircle2,
  Ban,
  Award,
} from "lucide-react";
import { getJobApplications, getJobStats } from "@/actions/job-tracker";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import JobApplicationTable from "./_components/job-application-table";
import JobStatsCards from "./_components/job-stats-cards";
import JobApplicationChart from "./_components/job-application-chart";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

export default function JobTrackerPage() {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    applied: 0,
    interviewing: 0,
    offered: 0,
    rejected: 0,
    accepted: 0,
  });
  const [monthlyApplications, setMonthlyApplications] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    // Don't try to fetch data if auth isn't loaded yet or user isn't signed in
    if (!isLoaded) return;

    if (!isSignedIn) {
      toast.error("Please sign in to access the Job Tracker");
      router.push("/sign-in");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch job applications
        const result = await getJobApplications();
        if (result.error) {
          console.error("Error fetching applications:", result.error);
          toast.error(`Error: ${result.error}`);

          if (result.error === "Unauthorized") {
            router.push("/sign-in");
          }
        } else {
          setApplications(result.applications || []);
        }

        // Fetch job stats
        const statsResult = await getJobStats();
        if (statsResult.error) {
          console.error("Error fetching stats:", statsResult.error);
          toast.error(`Error fetching stats: ${statsResult.error}`);
        } else {
          setStats(
            statsResult.stats || {
              total: 0,
              applied: 0,
              interviewing: 0,
              offered: 0,
              rejected: 0,
              accepted: 0,
            }
          );
          setMonthlyApplications(statsResult.monthlyApplications || {});
        }
      } catch (error) {
        console.error("Error in fetchData:", error);
        toast.error("An unexpected error occurred. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoaded, isSignedIn, router]);

  // Filter applications by status
  const filterApplications = (status) => {
    if (status === "all") {
      return applications;
    }
    return applications.filter((app) => app.status === status);
  };

  // Calculate conversion rates
  const calculateConversionRate = (numerator, denominator) => {
    if (denominator === 0) return 0;
    return Math.round((numerator / denominator) * 100);
  };

  const interviewRate = calculateConversionRate(
    stats.interviewing + stats.offered + stats.accepted,
    stats.total
  );
  const offerRate = calculateConversionRate(
    stats.offered + stats.accepted,
    stats.interviewing + stats.offered + stats.accepted
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Job Application Tracker</h1>
        <Link href="/job-tracker/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Application
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <JobStatsCards stats={stats} isLoading={isLoading} />

      {/* Charts & Conversion Rates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Application Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <JobApplicationChart
              data={monthlyApplications}
              isLoading={isLoading}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Application to Interview</span>
                <span className="text-sm font-medium">{interviewRate}%</span>
              </div>
              <Progress value={interviewRate} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Interview to Offer</span>
                <span className="text-sm font-medium">{offerRate}%</span>
              </div>
              <Progress value={offerRate} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Tabs & Table */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Applications</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
          <TabsTrigger value="interviewing">Interviewing</TabsTrigger>
          <TabsTrigger value="offered">Offered</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <JobApplicationTable
            applications={filterApplications("all")}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="applied">
          <JobApplicationTable
            applications={filterApplications("applied")}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="interviewing">
          <JobApplicationTable
            applications={filterApplications("interviewing")}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="offered">
          <JobApplicationTable
            applications={filterApplications("offered")}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="accepted">
          <JobApplicationTable
            applications={filterApplications("accepted")}
            isLoading={isLoading}
          />
        </TabsContent>
        <TabsContent value="rejected">
          <JobApplicationTable
            applications={filterApplications("rejected")}
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
