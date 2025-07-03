# SmartPro Educational Platform

## Overview

SmartPro is a modern educational platform built as a React-based web application with Firebase backend. The application provides an interactive learning environment for students, teachers, and administrators with features including course materials, quizzes, live chat, and digital certificates. The platform is designed to be fully responsive, working seamlessly on both desktop and mobile devices.

## System Architecture

The application follows a modern full-stack architecture:

**Frontend Stack:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Tailwind CSS for responsive styling with custom design system
- ShadCN UI components for consistent interface elements
- Wouter for client-side routing
- React Hook Form with Zod validation for form handling
- TanStack Query for server state management

**Backend Stack:**
- Express.js server with TypeScript
- Firebase services:
  - Authentication for user management
  - Firestore for real-time database
  - Storage for file uploads
- Drizzle ORM configured for PostgreSQL (extensible setup)

**Development Tools:**
- ESBuild for production bundling
- PostCSS with Autoprefixer
- TypeScript for static typing
- Path aliases for clean imports

## Key Components

### Authentication System
- Firebase Authentication handles user registration and login
- Role-based access control with three user types: `admin`, `guru` (teacher), `siswa` (student)
- Protected routes ensure proper authorization
- Custom auth hooks manage authentication state

### User Management
- Student registration with school and grade information
- Teacher registration with expertise areas (requires admin approval)
- Admin dashboard for managing pending teacher approvals
- User status tracking (active, pending, rejected)

### Learning Management
- Course material management by teachers
- Interactive quiz system
- Progress tracking for students
- Digital certificate generation with QR codes
- Live chat functionality between students and teachers

### Subscription System
- Premium content access control
- Subscription request management
- Payment integration preparation

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Custom design tokens for branding consistency
- Collapsible navigation for mobile devices
- Touch-friendly interfaces

## Data Flow

1. **User Registration:** Users register through role-specific forms, with data stored in Firestore
2. **Authentication:** Firebase Auth manages login sessions with custom user data fetching
3. **Content Access:** Role-based routing directs users to appropriate dashboards
4. **Real-time Updates:** Firestore enables real-time data synchronization across components
5. **File Management:** Firebase Storage handles uploaded course materials and certificates

## External Dependencies

### Core Dependencies
- **Firebase SDK:** Complete backend-as-a-service platform
- **Radix UI:** Accessible component primitives
- **React Hook Form:** Form state management
- **TanStack Query:** Server state synchronization
- **Wouter:** Lightweight routing solution

### Development Dependencies
- **Vite:** Fast development server and build tool
- **TypeScript:** Static type checking
- **Tailwind CSS:** Utility-first CSS framework
- **ESBuild:** Fast JavaScript bundler

### Optional Integrations
- **Drizzle ORM:** Database abstraction layer (configured for future PostgreSQL integration)
- **Neon Database:** Serverless PostgreSQL (environment-dependent)

## Deployment Strategy

**Development Environment:**
- Vite dev server with hot module replacement
- Firebase emulators for local development
- Environment variables for configuration

**Production Build:**
- Client-side: Vite builds optimized static assets
- Server-side: ESBuild bundles Express server
- Static assets served by Express in production
- Firebase hosting recommended for deployment

**Environment Configuration:**
- Firebase configuration through environment variables
- Fallback to demo configuration for easy setup
- Database URL configuration for optional PostgreSQL integration

## Changelog

Changelog:
- July 02, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.