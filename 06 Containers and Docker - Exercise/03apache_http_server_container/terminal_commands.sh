#create new container only with  terminal
docker run -d --name my-apache-app -p 8080:80 -v ${PWD}:/usr/local/apache2/htdocs/ httpd:latest

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d