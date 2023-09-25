# Create image based on the official Node image from dockerhub
FROM node:lts-buster AS development

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
#FOR DOCKER COMPOSE
COPY frontend/package.json /usr/src/app
COPY frontend/package-lock.json /usr/src/app

#FOR TERMINAL COMMANDS
#COPY package.json /usr/src/app
#COPY package-lock.json /usr/src/app

RUN npm ci

# Get all the code needed to run the app
#FOR DOCKER COMPOSE
COPY frontend/ /usr/src/app
#FOR TERMINAL COMMANDS
#COPY . /usr/src/app

# Expose the port the app runs in
EXPOSE 3000

# Serve the app
CMD ["npm", "start"]

RUN apt-get update && apt-get install -y git

FROM development as dev-envs
RUN apt-get update && apt-get install -y git

RUN useradd -s /bin/bash -m vscode && groupadd docker && usermod -aG docker vscode

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /
CMD [ "npm", "start" ]
