# simple web app template

this project is a basic template for building a web application using Ruby, Sinatra, and ActiveRecord. It provides a clean structure to help you start your own web app quickly.

## Technologies Used

- **Ruby**
- **Sinatra** (web framework)
- **Sinatra-Contrib** (helpers and extensions)
- **Sinatra-ActiveRecord** (ORM)
- **SQLite3** (database)
- **Puma** (web server)
- **BCrypt** (password hashing)
- **HTML/CSS**

## Project Structure

```
.
├── config/         # Database and environment configuration
├── db/             # Migrations and SQLite database
├── helpers/        # Reusable helper modules
├── models/         # ActiveRecord models
├── public/         # Static files (CSS, JS, images)
├── routes/         # Main Sinatra route files
├── views/          # ERB templates and partials
├── server.rb       # Main application entry point
├── Gemfile         # Ruby dependencies
├── Rakefile        # Database tasks
└── README.md
```

## Getting Started

1. Install dependencies:
   ```sh
   bundle install
   ```

2. Set up the database:
   ```sh
   bundle exec rake db:migrate
   ```

3. Start the server:
   ```sh
   bundle exec rackup -p {port}
   ```

## Project Patterns

This template follows the **MVC (Model-View-Controller)** architectural pattern, adapted for Sinatra:

- **Models**: Business logic and data access using ActiveRecord (`models/`).
- **Views**: Presentation layer using ERB templates (`views/`).
- **Controllers/Routes**: Application flow and HTTP response logic (`routes/`).
- **Helpers**: Reusable modules for auxiliary logic (`helpers/`).

The structure also separates static assets (`public/`) and configuration files (`config/`), following best practices

## Ready to Use

This template comes fully set up and ready to use. The SQLite database is preconfigured and connected through ActiveRecord, and the environment is prepared to run the application without additional setup.git init

Simply install dependencies, run migrations, and start the server to begin building your web app immediately.
