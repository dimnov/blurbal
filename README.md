# Blurbal 📚  
 
A React Native app built with Expo that allows users to share and browse book reviews. The app features authentication and a database powered by Supabase.  
 
## ✨ Features  
- **Authentication**: Secure login handled by Supabase.  
- **Home Feed**: Infinite scrolling feed of user-submitted book reviews.  
- **Add Review**: Users can post reviews with a book title, image, rating, and caption.  
- **Profile**: Displays the user’s name and their posted reviews.  
 
## 🛠️ Tech Stack  
- **React Native** (Expo)  
- **Supabase** (Auth & Database)  
 
## 📱 App Structure  
### 🔑 Login Page  
Users must log in via Supabase authentication before accessing the app.  
 
### 🏠 Home (Main Feed)  
Displays all reviews from users with infinite scrolling. Each review post contains:  
- **User’s Profile** (Name & Avatar)  
- **Book Image** (Largest element)  
- **Book Title**  
- **Star Rating (1-5)**  
- **Caption/Description**  
- **Date** (e.g., _Shared on March 15, 2025_)  
 
### ➕ Add Review  
Users can submit a new review by providing:  
- **Book Title**  
- **Book Image**  
- **Caption**  
- **Star Rating (1-5)**  
 
### 👤 Profile  
Displays the user’s name and their posted reviews.  
 
### Installation  
```sh
git clone https://github.com/your-username/book-review-app.git  
cd book-review-app  
npm install  
