# Food Ordering System

## User Manual (Prerequisite)

### Windows OS

1. To run this project you need the "Node.JS" application.
2. NodeJS download link: https://nodejs.org/en/download/
3. Once NodeJS is installed, open Command Prompt and run command to install the requirements module.
    
    ```bash
    npm i -g nodemon expo-cli
    ```
    
4. After install the module, close the Command Prompt.

### Android OS

1. In order to preview the project in real time without compiling it into an APK file, we use the Expo application.
2. Download "Expo Go" Application from Play Store

### Remark

> The Android phone used to preview the project and the computer hosting the server need to be on the same network.
> 

> This project uses Firebase as the database, please create your own Firebase project first.
> 

> Environment files are not included, please create your own and name them .env or .env.local
> 
> 
> ```
> EXPO_PUBLIC_FIREBASE_apiKey=""
> EXPO_PUBLIC_FIREBASE_authDomain=""
> EXPO_PUBLIC_FIREBASE_databaseURL=""
> EXPO_PUBLIC_FIREBASE_projectId=""
> EXPO_PUBLIC_FIREBASE_storageBucket=""
> EXPO_PUBLIC_FIREBASE_messagingSenderId=""
> EXPO_PUBLIC_FIREBASE_appId=""
> ```
> 

### Install Application

1. Clone this repo or download as zip file.
2. Run command to install the requirements module.
    
    ```bash
    npm install
    ```
    
3. Run command to run the project.
    
    ```bash
    npx expo start
    ```
    
4. Using the Expo app on your Android phone, scan the QR code displayed on the command prompt.

---

## Feature

- Admin
    - Verify registration
        - Send approval notification to student / staff when confirmed register
        - One Click accept all verification
    - Manage Menu
        - Create, Update and Delete Menu.
    - Top-up Credit
        - Top-up student’s credit
        - Send top-up notification to students
    - Staff Credit
        - Reset staff’s credit
    - Sales Report
        - Display all the order record in current month or filter by date.
        - Export report to PDF
    - Order
        - Display all the student / staff order, filter by status:
            - Pending
            - Preparing
            - Ready
            - Completed
        - Automatically sends a notification to students/staff to come pick up the meal when it is ready.

- Student / Staff (User)
    - Registration
        - Register by Student / Staff ID and its email
        - Reset password by email
    - Account Detail
        - Display current user detail and credit
    - Menu
        - Display all the available meal with price
        - Select the quantity of meal and add to cart
    - Cart
        - Display the meal in cart.
        - Automatically calculate the grand total of credit.
        - When student are low credit, it will prompt the student to top-up credit.
    - Order
        - Display all the order status