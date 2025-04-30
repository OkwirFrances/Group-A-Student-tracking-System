# Use the official Python runtime image
# FROM python:3.13  
FROM nikolaik/python-nodejs:python3.13-nodejs23

# Create the app directory
RUN mkdir /app
 
# Set the working directory inside the container
WORKDIR /app

# Copy the Django project to the container
COPY . /app/

WORKDIR /app/frontend

# RUN npm install --global corepack@latest && corepack enable && \
#     corepack prepare pnpm@latest-10 --activate && pnpm config set store-dir ~/.pnpm-store \
RUN npm install -g pnpm && \
    pnpm install && pnpm build

# RUN mkdir /app/backend/staticfiles \
#     && mv /app/frontend/dist /app/backend/staticfiles/reactapp

WORKDIR /app/backend

# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 
 
# Upgrade pip
RUN pip install --upgrade pip 

# run this command to install all dependencies 
RUN pip install --no-cache-dir -r requirements.txt
 
# Expose the Django port
EXPOSE 8000


RUN python manage.py collectstatic --noinput \
    && python manage.py migrate --noinput
    # && python manage.py loaddata initial_data.json

RUN mkdir /app/backend/staticfiles \
    && mv /app/frontend/dist /app/backend/staticfiles/reactapp


# Run Django’s development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT ["bash", "build.sh"]
