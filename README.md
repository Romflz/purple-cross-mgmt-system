# Purple Cross Ltd - Employee Management Dashboard

A centralized employee management system built for Purple Cross Ltd, a pharmaceutical company transitioning from Excel-based employee tracking to a modern, scalable SaaS solution.

## Overview

This Vue.js application provides Purple Cross Ltd with a comprehensive dashboard to view, edit, and manage confidential employee information for their workforce.

## Features

### Employee Grid/Table

- **Comprehensive employee listing** with the following columns:
  - Employee Full Name
  - Occupation
  - Department
  - Date of Employment
  - Termination Date
- **Action buttons** for each employee:
  - View - Display employee profile
  - Edit - Modify employee details
  - Delete - Remove employee (with confirmation)
- **Filterable and sortable** columns for easy data navigation

### Create Employee

- Floating action button positioned at bottom-right
- Comprehensive form with validation
- Save and Cancel options

### Form Validation

- Real-time validation on all input fields using zod
- Clear error messages
- Prevention of invalid data submission

## Tech Stack

- **Framework:** Vue 3
- **Language:** TypeScript
- **Build Tool:** Vite
- **Composition API:** `<script setup>` syntax

## Installation

```bash
# Clone the repository
git clone https://github.com/Romflz/purple-cross-mgmt-system.git

# Navigate to project directory
cd purple-cross-mgmt-system

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
