#!/usr/bin/env bash

if [ ! -f "/app/backend/staticfiles/reactapp/index.html" ]; then

    echo COLLECTING STATIC FILES... && python manage.py collectstatic --noinput
    echo RUNNING MIGRATIONS... && python manage.py makemigrations &&  python manage.py migrate
    
    mv /app/frontend/dist /app/backend/staticfiles/reactapp

fi
ls -la /app/backend/staticfiles/
echo ===============================================================
ls -la /app/backend/staticfiles/reactapp/
echo ===============================================================
ls -la /app/frontend/
echo ===============================================================

echo SPINING UP SERVER...

# Dynamically assigned by heroku
python manage.py runserver 0.0.0.0:${PORT}