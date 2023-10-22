az login
az group create --name qceka88bazarsRG --location westeurope
az acr create --resource-group qceka88bazarsRG --name qceka88bazarcr --sku Basic
az acr login --name qceka88bazarcr
docker-compose up -d --build
docker push qceka88bazarcr.azurecr.io/bazar_qceka88:v1
docker context create aci qceka88homiesdockercontext --resource-group qceka88bazarsRG
docker context use qceka88homiesdockercontext
docker compose up