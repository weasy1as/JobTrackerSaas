<a href="">
  <h1 align="center">AI Job Tracker SaaS</h1>
</a>

<p align="center">
A modern job application tracker with AI-powered insights, Kanban workflow, and Stripe billing.
</p>

<br/>

## Project Overview

This project is **AI-heavy by design** and is being used as an experiment in **agentic coding workflows and AI-assisted development**. The goal is to explore how far AI can be used to build, extend, and maintain a full SaaS product with minimal manual scaffolding.

The application combines job tracking with intelligent automation to enhance the job search process.

---

## Features

### 🧠 AI Job Insights
- AI-generated insights for job applications
- Helps analyze job descriptions and improve interview preparation
- Provides structured preparation suggestions per job
- Focused on extracting key skills and interview talking points

---

### 📋 Job Kanban Board
- Visual Kanban board for tracking job applications
- Drag-and-drop interface to update job progression
- Clean workflow for managing applications efficiently

---

### 💳 Stripe Billing System
- Subscription-based billing using Stripe
- Free vs Pro plan structure
- Webhook-based subscription handling
- AI features gated behind Pro plan

---

## Tech Stack

- Next.js (App Router)
- Supabase (Auth + Database)
- Stripe (Billing & Subscriptions)
- Tailwind CSS
- shadcn/ui
- dnd-kit (drag and drop)

---

## Core Workflows

### Job Tracking Flow
1. Add a job application
2. Organize applications in Kanban board
3. Move jobs through stages using drag and drop

---

### AI Flow
1. Open a job
2. View or paste job description
3. Generate AI insights for:
   - Interview preparation
   - Key skills extraction
   - Talking points for interviews

---

### Billing Flow
1. User starts on Free plan
2. Upgrade via Stripe checkout
3. Webhook updates subscription status
4. AI features become available on Pro plan
