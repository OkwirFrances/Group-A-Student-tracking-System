# Use the official Python runtime image
FROM python:3.13  
 
# Create the app directory
RUN mkdir /app
 
# Set the working directory inside the container
WORKDIR /app

# Copy the Django project to the container
COPY . /app/
 
# Set environment variables 
# Prevents Python from writing pyc files to disk
ENV PYTHONDONTWRITEBYTECODE=1
#Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1 
 
# Upgrade pip
RUN pip install --upgrade pip 

# run this command to install all dependencies 
RUN pip install --no-cache-dir -r backend/requirements.txt
 
# Expose the Django port
EXPOSE 8000

# Change to a specific folder, within /app
WORKDIR /app/backend

# RUN python manage.py collectstatic --noinput

# RUN mv /app/frontend/dist /app/backend/staticfiles/frontend

# Run Django’s development server
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
# ENTRYPOINT ["bash", "build.sh"]
