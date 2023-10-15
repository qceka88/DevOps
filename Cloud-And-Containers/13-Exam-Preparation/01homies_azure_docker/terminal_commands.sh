az login
az group create --name qceka88HomiesDockerRG --location westeurope
az acr create --resource-group qceka88HomiesDockerRG --name qceka88homiesdockercr --sku Basic
az acr login --name qceka88homiesdockercr
docker-compose up -d --build
docker push qceka88homiesdockercr.azurecr.io/homies_docker_qceka88:v1
docker context create aci qceka88homiesdockercontext
docker context use qceka88homiesdockercontext
docker compose up