#using a dockerfile
docker build . -f TaskBoard.Webapp/Dockerfile -t qceka88/taskboard_app
docker push qceka88/taskboard_app:latest

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d
docker push qceka88/taskboard_app:latest