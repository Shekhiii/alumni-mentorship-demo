# Project Setup Guide

## Prerequisites

-   Node.js (v18 or later)
-   npm


## 1. Clone the repository

``` bash
git clone https://github.com/Shekhiii/alumni-mentorship-demo
cd alumni-mentorship-demo
```

## 2. Install dependencies

``` bash
npm install
```

## 3. Create a `.env` file

Create a `.env` file in the project root and add the required
environment variables. For example:

``` env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password


> Replace the values above with your own credentials.

## 4. Start the project

``` bash
node server.js
```

or, if your project uses npm scripts:

``` bash
npm start
```

## 5. Open the application

Visit:

    http://localhost:3000

## Notes

-   Install all dependencies before running the project.
-   Environment variables are required for database and email
    functionality.
-   The deployment link is not included because local setup is
    sufficient to run the project.
