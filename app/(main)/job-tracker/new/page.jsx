import React from "react";
import JobApplicationForm from "../_components/job-application-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewJobApplicationPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Add New Job Application</CardTitle>
        </CardHeader>
        <CardContent>
          <JobApplicationForm />
        </CardContent>
      </Card>
    </div>
  );
}
