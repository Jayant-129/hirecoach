"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  createJobApplication,
  updateJobApplication,
} from "@/actions/job-tracker";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

const formSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  jobDescription: z.string().optional(),
  jobUrl: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  location: z.string().optional(),
  salaryRange: z.string().optional(),
  status: z.enum([
    "applied",
    "interviewing",
    "offered",
    "accepted",
    "rejected",
  ]),
  contactPerson: z.string().optional(),
  contactEmail: z
    .string()
    .email("Please enter a valid email")
    .optional()
    .or(z.literal("")),
  notes: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  nextSteps: z.string().optional(),
});

export default function JobApplicationForm({ defaultValues, applicationId }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();

  // Check authentication on component mount
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast.error("Please sign in to save applications");
      router.push("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues || {
      companyName: "",
      jobTitle: "",
      jobDescription: "",
      jobUrl: "",
      location: "",
      salaryRange: "",
      status: "applied",
      contactPerson: "",
      contactEmail: "",
      notes: "",
      priority: "medium",
      nextSteps: "",
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Check if user is signed in before submitting
    if (!isSignedIn) {
      toast.error("Please sign in to save applications");
      router.push("/sign-in");
      setIsSubmitting(false);
      return;
    }

    try {
      // Create form data to pass to server action
      const formData = new FormData();

      // Add all form fields to formData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      // Call the appropriate server action based on whether we're creating or updating
      const result = applicationId
        ? await updateJobApplication(applicationId, formData)
        : await createJobApplication(formData);

      if (result.error) {
        if (result.error === "Unauthorized") {
          toast.error("Your session has expired. Please sign in again.");
          router.push("/sign-in");
        } else {
          toast.error(result.error);
        }
      } else {
        toast.success(
          applicationId
            ? "Application updated successfully"
            : "Application created successfully"
        );
        router.push("/job-tracker");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Company Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title*</FormLabel>
                <FormControl>
                  <Input placeholder="Job Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Remote, New York, NY" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="salaryRange"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. $80,000 - $100,000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Posting URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com/job-posting"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status*</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interviewing">Interviewing</SelectItem>
                    <SelectItem value="offered">Offered</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactPerson"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Person</FormLabel>
                <FormControl>
                  <Input placeholder="Contact Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@example.com"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="jobDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Paste the job description here"
                  className="min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Add any notes about this application"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {applicationId && (
          <FormField
            control={form.control}
            name="nextSteps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Next Steps</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="What are your next steps for this application?"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/job-tracker")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : applicationId
              ? "Update Application"
              : "Add Application"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
