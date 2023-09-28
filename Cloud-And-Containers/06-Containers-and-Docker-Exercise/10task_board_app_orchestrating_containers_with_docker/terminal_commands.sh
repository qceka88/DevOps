#using a dockerfile
docker network create taskboard_network
docker build . -f TaskBoard.Webapp/Dockerfile -t qceka88/taskboard_app
docker run -d --name web_app -p 5000:80 --network taskboard_network qceka88/taskboard_app
docker run -d --name sqlserver -p 1433:1433 --network taskboard_network -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=qwerty@12345 -v sqldata:/var/opt/mssql mcr.microsoft.com/mssql/server
docker push qceka88/taskboard_app:latest
docker-compose down --rmi all --volumes

#or can be created with docker-compose.yml
docker network create taskboard_network
docker-compose build
docker-compose up -d
docker push qceka88/taskboard_app:latest
docker-compose down --rmi all --volumes