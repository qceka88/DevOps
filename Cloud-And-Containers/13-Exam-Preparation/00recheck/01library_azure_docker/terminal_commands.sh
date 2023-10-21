az group create --name qceka88LibraryDockerRG --location westeurope
az acr create --resource-group qceka88LibraryDockerRG --name qceka88librarydockercr --sku Basic
az acr login --name qceka88librarydockercr
docker-compose up -d --build
docker push qceka88librarydockercr.azurecr.io/library_docker_qceka88:v1
docker context create aci qceka88librarydockercontext
docker context use qceka88librarydockercontext

docker compose up
