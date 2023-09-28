#create new container only with  terminal
docker network create mariadb_network
docker run -d --name mariadb_server -e MARIADB_USER=maria_user -e MARIADB_PASSWORD=db_password -e MARIADB_ROOT_PASSWORD=secret_password --network mariadb_network mariadb:latest
docker run -d --name mariadb_client --network mariadb_network -e MARIADB_ROOT_PASSWORD=secret_password mariadb:latest
#open container
docker exec -it mariadb_client bash
#grant access in db
mariadb -h mariadb_server -u maria_user -p
#in db
SELECT VERSION();

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d
#open container
docker exec -it mariadb_client bash
#grant access in db
mariadb -h mariadb_server -u maria_user -p
#in db
SELECT VERSION();