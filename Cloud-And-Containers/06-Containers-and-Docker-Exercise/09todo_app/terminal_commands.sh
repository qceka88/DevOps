#using a dockerfile
docker network create react-express
docker network create express-mongo
docker build frontend -f frontend/Dockerfile -t frontend
docker build backend -f backend/Dockerfile -t backend
docker run -d --name frontend -p 3000:3000 --network react-express frontend
docker run -d --name backend --network react-express backend
docker network connect backend express-mongo
docker run -d --name mongo --network express-mongo -v ./data:/data/db mongo:latest

#or can be created with docker-compose.yml !! to run with docker compose
docker network create react-express
docker network create express-mongo
docker-compose build
docker-compose up -d


#CHECK DOCKER FILES  FOR COMMENTED STATEMENTS.
# For Using docker-compose.yml DockerFiles are modified.
# Original statements are leaved