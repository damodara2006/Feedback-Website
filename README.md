# Feedback Website

This project is a feedback management system that allows users to submit feedback, report bugs, or request features. It includes a **React-based frontend** and an **Express.js-based backend**.

---

## Project Overview

### Hosted link
    https://feedback-hk.netlify.app/

### Features
- **Feedback Submission**: Users can submit feedback, report bugs, or request features.
- **Email Verification**: Users must verify their email via OTP before submitting feedback.
- **File Uploads**: Users can upload images for bug reports.
- **Admin Dashboard**: Admins can view and manage submitted feedback.

---

## Frontend Pages

### 1. **Home Page**
- **File**: [`frontend/src/Home.jsx`](frontend/src/Home.jsx)
- **Description**: 
  - The main page where users can submit feedback, report bugs, or request features.
  - Includes email verification via OTP.
  - Allows users to upload images for bug reports.
  - Displays a confirmation view after successful submission.

- **Key Features**:
  - Input fields for name, email, and feedback content.
  - Dropdown to select feedback type (Bug, Feature, or Feedback).
  - File upload for bug images.
  - OTP-based email verification.

---

### 2. **Admin Dashboard**
- **File**: [`frontend/src/Admin.jsx`](frontend/src/Admin.jsx)
- **Description**:
  - A page for admins to view all submitted feedback.
  - Displays feedback details such as name, email, type, and message.
  - Allows admins to filter feedback by type (Bug, Feature, or Feedback).

- **Key Features**:
  - Table view of all feedback submissions.
  - Search and filter functionality.

---

### 3. **Form View**
- **File**: [`frontend/src/FormView.jsx`](frontend/src/FormView.jsx)
- **Description**:
  - A detailed view of a single feedback submission.
  - Displays all information related to the feedback, including uploaded images.

- **Key Features**:
  - View detailed feedback information.
  - Option to navigate back to the admin dashboard.

---

## Backend Overview

### Key Features
- **API Endpoints**:
  - `/verify`: Sends OTP for email verification.
  - `/submit`: Submits feedback data to the database.
  - `/bugupload`: Handles image uploads for bug reports.
  - `/feedbacks`: Retrieves all feedback submissions.

- **Technologies**:
  - **Express.js**: Backend framework.
  - **MongoDB**: Database for storing feedback.
  - **Multer**: Middleware for file uploads.
  - **Cloudinary**: Image storage service.
  - **Nodemailer**: Email service for OTP verification.

---

## Installation

### Prerequisites
- Node.js
- MongoDB
- Cloudinary account for image storage

### Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
