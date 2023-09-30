docker login azure
docker context create aci nginxacicontext
docker context use nginxacicontext
docker run -d -p 80:80 registry.hub.docker.com/nginxdemos/hello
docker ps
docker logs elastic-rosalind
