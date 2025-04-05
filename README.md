# AI Career Coach Project

## Student Information

- **Name:** Jayant Agarwal
- **Registration Number:** 22BBS0158
- **Course:** Web Development
- **Professor:** Ramesh C

## Project Overview

This AI Career Coach project is a web-based application designed to provide personalized career guidance to users. The system uses artificial intelligence to analyze user inputs and deliver tailored resume building assistance, cover letter generation, and interview preparation support.

## Features

- **Resume Builder:** Create professional, ATS-friendly resumes with AI suggestions
- **Cover Letter Generator:** Generate customized cover letters for specific job applications
- **Interview Preparation:** Practice with AI-powered mock interviews and receive feedback
- **Career Insights:** Get personalized job recommendations and industry insights
- **Skills Gap Analysis:** Identify areas for professional development

## Technologies Used

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** PostgreSQL
- **ORM:** Prisma
- **AI Integration:** Google Gemini API
- **Authentication:** NextAuth.js

## Installation Instructions

1. Clone the repository from [GitHub](https://github.com/Jayant-129/hirecoach)
2. Install dependencies with `npm install`
3. Set up PostgreSQL database
4. Configure environment variables in `.env` file:
   ```
   DATABASE_URL=your_postgresql_connection_string
   GEMINI_API_KEY=your_gemini_api_key
   NEXTAUTH_SECRET=your_nextauth_secret
   ```
5. Run database migrations with `npx prisma migrate dev`
6. Start the development server with `npm run dev`

## Project Structure

- `/app` - Next.js app directory with routes and page components
- `/components` - Reusable UI components
- `/lib` - Utility functions and API client
- `/prisma` - Database schema and migrations
- `/public` - Static assets

## Future Improvements

- Mobile application with React Native
- Enhanced AI model fine-tuning for industry-specific advice
- Integration with job posting platforms
- Portfolio builder functionality
- Advanced analytics dashboard

## Acknowledgments

Special thanks to Professor Ramesh C for guidance throughout the development process.
