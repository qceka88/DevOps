#create new container only with  terminal
docker run -d --name ghost-container -p 3001:2368 -e NODE_ENV=development ghost:latest

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d