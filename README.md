# Getting Started with My Tasks Application

This project was created with [React](https://reactjs.org/) and [Django](https://www.djangoproject.com/).
This was made for me to learn [React](https://reactjs.org/)

# Installation

### 1.clone this repository

    git clone https://github.com/rabbit463/react_todo_app.git

### 2. install [npm](https://www.npmjs.com/get-npm) (if not already installed)

### 3. go to front end directory

    cd react_todo_app\front_end

### 4. install front end npm dependencies

    npm install

### 5. compile and build react app

    npm run build

### 6. go to the back end directory

    cd ../back_end

### 7. install [python](https://www.python.org/downloads/) (if not already installed)

### 8. create virtual environment (optional but recommended)

    python3 -m venv venv

### 9. activate virtual environment

    .\venv\Scripts\activate

### 10. install back end python dependencies

    pip install -r requirements.txt

### 11. migrate database

    manage.py makemigrations
    manage.py migrate

### 12. run server

    python manage.py runserver

go to http://127.0.0.1:8000/ in your favorite browser
