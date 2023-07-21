# Pull the official base image
FROM python:3.9
# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set work directory
WORKDIR /core

# Install dependencies
COPY requirements.txt /core/
RUN pip install -r requirements.txt

# Install psql
RUN apt-get update && apt-get install -y postgresql-client

# Copy wait-for-it
COPY wait-for-postgres.sh /wait-for-postgres.sh
RUN chmod +x /wait-for-postgres.sh

# Copy project
COPY . /core/

