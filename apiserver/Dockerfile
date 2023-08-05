FROM python:3.9
FROM gcc:latest

RUN apt-get update && apt-get install -y nodejs default-jdk

WORKDIR /app

COPY seccomp_profile.json /seccomp_profile.json
