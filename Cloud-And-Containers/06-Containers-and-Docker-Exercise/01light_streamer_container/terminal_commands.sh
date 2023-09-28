#create new container only with  terminal
$ docker run -d --name ls-server -p 80:8080 lightstreamer:latest

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d