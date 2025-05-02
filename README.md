# AI Career Coach - Your Career Companion

## Project Overview

This AI Career Coach is a comprehensive web application I developed to help job seekers navigate their career journey. Leveraging artificial intelligence, this platform provides personalized assistance with resume building, cover letter generation, and interview preparation.

## Features

- **Resume Builder:** Create professional, ATS-friendly resumes with AI suggestions
- **Cover Letter Generator:** Generate customized cover letters for specific job applications
- **Interview Preparation:** Practice with AI-powered mock interviews and receive feedback
- **Career Insights:** Get personalized job recommendations and industry insights
- **Skills Gap Analysis:** Identify areas for professional development

## Features I Developed

- **Advanced Resume Analytics:** I implemented an ATS (Applicant Tracking System) scoring algorithm that analyzes resumes against job descriptions and provides targeted improvement suggestions.
- **Industry-Specific Interview Training:** Developed a sophisticated algorithm that generates industry-specific mock interview questions based on the user's target job and experience level.
- **Real-time Cover Letter Customization:** Created a dynamic cover letter generator that allows real-time customization based on job descriptions, with keyword highlighting for optimal matching.
- **Performance Analytics Dashboard:** Built comprehensive visualization tools that track a user's progress across multiple interview practice sessions and provide actionable insights.
- **Multi-format Export System:** Implemented functionality to export resumes and cover letters in multiple formats (PDF, DOCX, TXT) while maintaining professional formatting.
- **Background Batch Processing:** Created an asynchronous processing system using Inngest to handle resource-intensive AI operations without affecting user experience.

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS, shadcn/ui
- **Backend:** Next.js API routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI Integration:** Google Gemini API
- **Authentication:** Clerk Auth
- **Deployment:** Vercel
- **Background Jobs:** Inngest

## Purpose and Motivation

I created this project to address the challenges many job seekers face during their application process. The application streamlines tasks that typically require significant time and expertise, helping users present themselves more effectively to potential employers.

## Key Implementation Details

- **Modern React Architecture:** Built with Next.js App Router and React Server Components
- **Responsive Design:** Fully responsive UI implemented with Tailwind CSS
- **Data Visualization:** Interactive charts to track interview performance
- **AI Integration:** Leveraging Google's Gemini API for intelligent content generation
- **Database Design:** Well-structured PostgreSQL schema with Prisma ORM

## Installation Instructions

1. Clone the repository from [GitHub](https://github.com/Jayant-129/hirecoach)
2. Install dependencies with `npm install`
3. Set up PostgreSQL database
4. Configure environment variables in `.env` file:
   ```
   DATABASE_URL=your_postgresql_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
5. Run database migrations with `npx prisma migrate dev`
6. Start the development server with `npm run dev`

## Project Structure

- `/app` - Next.js app directory with routes and page components
- `/components` - Reusable UI components
- `/lib` - Utility functions and API client
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/actions` - Server actions for data operations
- `/hooks` - Custom React hooks

## Learning Outcomes

Through building this project, I gained significant experience with:

- Building full-stack applications with Next.js
- Implementing AI features in web applications
- User authentication and authorization
- Database design and management
- Creating intuitive and responsive UIs

## Future Enhancements

- Mobile application with React Native
- Enhanced AI model fine-tuning for industry-specific advice
- Integration with job posting platforms
- Portfolio builder functionality
- Advanced analytics dashboard

## Acknowledgments

This project was developed independently, leveraging open-source technologies and AI research. Special thanks to the communities behind React, Next.js, and Tailwind CSS for their excellent documentation and resources.
