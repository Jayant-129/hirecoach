"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Clock, CheckCircle2, Ban, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function JobStatsCards({ stats, isLoading }) {
  const statCards = [
    {
      title: "Total Applications",
      value: stats.total,
      icon: <Briefcase className="h-5 w-5 text-muted-foreground" />,
      className: "bg-muted/10",
    },
    {
      title: "Applied",
      value: stats.applied,
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      className: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      title: "Interviewing",
      value: stats.interviewing,
      icon: <Clock className="h-5 w-5 text-amber-500" />,
      className: "bg-amber-50 dark:bg-amber-900/20",
    },
    {
      title: "Offered",
      value: stats.offered,
      icon: <Award className="h-5 w-5 text-green-500" />,
      className: "bg-green-50 dark:bg-green-900/20",
    },
    {
      title: "Accepted",
      value: stats.accepted,
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
      className: "bg-emerald-50 dark:bg-emerald-900/20",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <Ban className="h-5 w-5 text-red-500" />,
      className: "bg-red-50 dark:bg-red-900/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((card, index) => (
        <Card key={index} className={card.className}>
          <CardContent className="p-4 flex flex-row justify-between items-center">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">{card.title}</p>
              {isLoading ? (
                <Skeleton className="h-7 w-10" />
              ) : (
                <p className="text-2xl font-bold">{card.value}</p>
              )}
            </div>
            {card.icon}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
