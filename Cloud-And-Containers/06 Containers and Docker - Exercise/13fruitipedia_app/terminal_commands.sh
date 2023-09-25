#using a dockerfile

docker build . -f Dockerfile -t wep_app
docker run -d --name web -p 8000:8000 -v ./static:/app/staticfiles -e DEBUG=False wep_app

#or can be created with docker-compose.yml
docker-compose up --build
