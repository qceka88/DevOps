#using a dockerfile
docker build tracker_app -f tracker_app/Dockerfile -t qceka88/tracker_app
docker push qceka88/tracker_app
docker run -d --name tracker_app -p 8080:80 qceka88/tracker_app

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d