#create new container only with  terminal
docker run -d -e ACCEPT_EULA=Y -e MSSQL_SA_PASSWORD=qwerTY@12345 -p 1433:1433 -v sqldata:/var/opt/mssql mcr.microsoft.com/mssql/server

#or can be created with docker-compose.yml
docker-compose build
docker-compose up -d