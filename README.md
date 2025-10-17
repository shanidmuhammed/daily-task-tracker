# Daily Task Tracker

## Overview
This project is a dynamic and user-friendly daily task tracker web application that uses SQLite as the database backend. It is implemented following the MVC (Model-View-Controller) architecture pattern, similar to how Odoo ERP structures its codebase, ensuring a clean, organized, and scalable code design.

The application operates as a Single Page Application (SPA), meaning it dynamically updates content without full page reloads, resulting in a fast and smooth user experience. It integrates essential features like add, edit, delete, mark all as completed, clear completed, and includes a modern dark mode toggle.

## Development Process
The project was developed gradually by implementing each feature and environment setup step-by-step, with a clear commit history available in the repository to demonstrate progress and iterative development. For secure and smooth development of the database integration, a separate branch was used specifically for adding the SQLite backend, ensuring isolation and stability during that phase of development.

## Key Features
- **SQLite Database:** Lightweight and reliable storage for task data.
- **MVC Architecture:** Clear separation of database (model), user interface (view), and application logic (controller), enhancing maintainability and scalability.
- **Single Page Application:** Dynamic content updates without refreshing the page, providing a seamless user experience.
- **User-Friendly UI/UX:** Intuitive and simple design with professional-grade buttons for marking and deleting tasks.
- **Inline Editing:** Tasks can be edited with a single tap/click directly inline—no separate page or form needed.
- **Smart Save:** Changes are saved automatically when clicking outside the input box, making editing effortless.
- **Dark Mode:** Toggle switch with a half-moon icon that allows users to switch between light and dark themes, with preferences saved locally.
- **Modern Button Styles:** Uses clean, modern toggle buttons for marking task completion and delete buttons with smooth hover effects.

## How to Run Locally
1. Clone the repository.
```bash
git clone https://github.com/yourusername/daily-task-tracker.git
cd daily-task-tracker
```
2. Create a Python virtual environment and activate it.
3. Install dependencies
```
pip install -r requirements.txt
```
4. Run the Flask application with `flask run` or `python app.py`.
5. Then browse to `http://localhost:5000`

## Hosting Platform
The app is hosted on Render.com, a cloud platform that supports Python web applications and SQLite databases. Ensuring smooth and hassle-free operation of the application in a production environment.

## Difficulties Faced
- The dynamic SPA behavior with proper API calls for database synchronization.
- Implementing real-time inline editing with smooth user interactions without page reloads.
- Handling deployment adjustments for SQLite and dynamic port configurations.

## Extra Features Added
- Dark mode toggle with persistent user preference saved in local storage.
- Mark all tasks as completed functionality for bulk actions.
- Elegant, modern button design replacing traditional checkbox inputs for better UX.
- Automatic task saving on focus loss from the editing input field.
