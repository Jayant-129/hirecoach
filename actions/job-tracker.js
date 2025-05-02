"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Get all job applications for a user
export async function getJobApplications() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.error("No userId found in auth");
      return { error: "Unauthorized" };
    }

    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      console.error("User not found for clerkUserId:", userId);
      return { error: "User not found" };
    }

    const applications = await db.jobApplication.findMany({
      where: { userId: user.id },
      orderBy: { applicationDate: "desc" },
      include: {
        interviews: {
          orderBy: { interviewDate: "asc" },
        },
      },
    });

    return { applications };
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return { error: error.message || "Failed to fetch job applications" };
  }
}

// Create a new job application
export async function createJobApplication(formData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.error("No userId found in createJobApplication");
      return { error: "Unauthorized" };
    }

    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      console.error("User not found for clerkUserId:", userId);
      return { error: "User not found" };
    }

    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const jobUrl = formData.get("jobUrl");
    const location = formData.get("location");
    const salaryRange = formData.get("salaryRange");
    const status = formData.get("status") || "applied";
    const contactPerson = formData.get("contactPerson");
    const contactEmail = formData.get("contactEmail");
    const notes = formData.get("notes");
    const priority = formData.get("priority") || "medium";

    // Validate required fields
    if (!companyName || !jobTitle) {
      return { error: "Company name and job title are required" };
    }

    const application = await db.jobApplication.create({
      data: {
        userId: user.id,
        companyName,
        jobTitle,
        jobDescription,
        jobUrl,
        location,
        salaryRange,
        status,
        contactPerson,
        contactEmail,
        notes,
        priority,
      },
    });

    revalidatePath("/job-tracker");
    return { success: true, application };
  } catch (error) {
    console.error("Error creating job application:", error);
    return { error: error.message || "Failed to create job application" };
  }
}

// Update a job application
export async function updateJobApplication(id, formData) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) {
    return { error: "Unauthorized" };
  }

  try {
    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Make sure the application belongs to the user
    const existingApplication = await db.jobApplication.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingApplication) {
      return { error: "Job application not found" };
    }

    const companyName = formData.get("companyName");
    const jobTitle = formData.get("jobTitle");
    const jobDescription = formData.get("jobDescription");
    const jobUrl = formData.get("jobUrl");
    const location = formData.get("location");
    const salaryRange = formData.get("salaryRange");
    const status = formData.get("status");
    const contactPerson = formData.get("contactPerson");
    const contactEmail = formData.get("contactEmail");
    const notes = formData.get("notes");
    const priority = formData.get("priority");
    const nextSteps = formData.get("nextSteps");

    // Validate required fields
    if (!companyName || !jobTitle) {
      return { error: "Company name and job title are required" };
    }

    const application = await db.jobApplication.update({
      where: { id },
      data: {
        companyName,
        jobTitle,
        jobDescription,
        jobUrl,
        location,
        salaryRange,
        status,
        contactPerson,
        contactEmail,
        notes,
        priority,
        nextSteps,
      },
    });

    revalidatePath("/job-tracker");
    revalidatePath(`/job-tracker/${id}`);
    return { success: true, application };
  } catch (error) {
    console.error("Error updating job application:", error);
    return { error: "Failed to update job application" };
  }
}

// Delete a job application
export async function deleteJobApplication(id) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) {
    return { error: "Unauthorized" };
  }

  try {
    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Make sure the application belongs to the user
    const existingApplication = await db.jobApplication.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingApplication) {
      return { error: "Job application not found" };
    }

    await db.jobApplication.delete({
      where: { id },
    });

    revalidatePath("/job-tracker");
    return { success: true };
  } catch (error) {
    console.error("Error deleting job application:", error);
    return { error: "Failed to delete job application" };
  }
}

// Add an interview to a job application
export async function addInterview(applicationId, formData) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) {
    return { error: "Unauthorized" };
  }

  try {
    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Make sure the application belongs to the user
    const existingApplication = await db.jobApplication.findFirst({
      where: {
        id: applicationId,
        userId: user.id,
      },
    });

    if (!existingApplication) {
      return { error: "Job application not found" };
    }

    const interviewDate = new Date(formData.get("interviewDate"));
    const interviewType = formData.get("interviewType");
    const interviewerNames = formData.get("interviewerNames");
    const notes = formData.get("notes");

    // Validate required fields
    if (!interviewDate || !interviewType) {
      return { error: "Interview date and type are required" };
    }

    const interview = await db.jobInterview.create({
      data: {
        jobApplicationId: applicationId,
        interviewDate,
        interviewType,
        interviewerNames,
        notes,
      },
    });

    // Update the job application status to interviewing if it's currently "applied"
    if (existingApplication.status === "applied") {
      await db.jobApplication.update({
        where: { id: applicationId },
        data: { status: "interviewing" },
      });
    }

    revalidatePath(`/job-tracker/${applicationId}`);
    return { success: true, interview };
  } catch (error) {
    console.error("Error adding interview:", error);
    return { error: "Failed to add interview" };
  }
}

// Update an interview
export async function updateInterview(interviewId, applicationId, formData) {
  const { userId: clerkUserId } = auth();

  if (!clerkUserId) {
    return { error: "Unauthorized" };
  }

  try {
    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { error: "User not found" };
    }

    // Make sure the application belongs to the user
    const existingApplication = await db.jobApplication.findFirst({
      where: {
        id: applicationId,
        userId: user.id,
      },
    });

    if (!existingApplication) {
      return { error: "Job application not found" };
    }

    const interviewDate = new Date(formData.get("interviewDate"));
    const interviewType = formData.get("interviewType");
    const interviewerNames = formData.get("interviewerNames");
    const notes = formData.get("notes");
    const feedback = formData.get("feedback");
    const status = formData.get("status");

    // Validate required fields
    if (!interviewDate || !interviewType) {
      return { error: "Interview date and type are required" };
    }

    const interview = await db.jobInterview.update({
      where: { id: interviewId },
      data: {
        interviewDate,
        interviewType,
        interviewerNames,
        notes,
        feedback,
        status,
      },
    });

    revalidatePath(`/job-tracker/${applicationId}`);
    return { success: true, interview };
  } catch (error) {
    console.error("Error updating interview:", error);
    return { error: "Failed to update interview" };
  }
}

// Get job application statistics
export async function getJobStats() {
  try {
    const { userId } = await auth();

    if (!userId) {
      console.error("No userId found in auth for getJobStats");
      return { error: "Unauthorized" };
    }

    // Get user ID from clerk ID
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true },
    });

    if (!user) {
      console.error("User not found for clerkUserId:", userId);
      return { error: "User not found" };
    }

    // Get counts by status
    const statusCounts = await db.jobApplication.groupBy({
      by: ["status"],
      where: { userId: user.id },
      _count: { status: true },
    });

    // Format the status counts
    const stats = {
      total: 0,
      applied: 0,
      interviewing: 0,
      offered: 0,
      rejected: 0,
      accepted: 0,
    };

    statusCounts.forEach((statusCount) => {
      stats[statusCount.status] = statusCount._count.status;
      stats.total += statusCount._count.status;
    });

    // Get application counts by month (for the last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const applications = await db.jobApplication.findMany({
      where: {
        userId: user.id,
        applicationDate: {
          gte: sixMonthsAgo,
        },
      },
      select: {
        applicationDate: true,
      },
      orderBy: {
        applicationDate: "asc",
      },
    });

    // Group applications by month
    const monthlyApplications = applications.reduce((acc, app) => {
      const month = app.applicationDate.toLocaleString("default", {
        month: "short",
      });
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {});

    return {
      stats,
      monthlyApplications,
    };
  } catch (error) {
    console.error("Error fetching job stats:", error);
    return { error: error.message || "Failed to fetch job statistics" };
  }
}
