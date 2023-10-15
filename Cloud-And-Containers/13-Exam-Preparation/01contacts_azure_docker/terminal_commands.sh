az login
az group create --name qceka88ContactsDockerRG --location westeurope
az acr create --resource-group qceka88ContactsDockerRG --name qceka88contactsdockercr --sku Basic
az acr login --name qceka88contactsdockercr
docker-compose up -d --build
docker push qceka88contactsdockercr.azurecr.io/contacts_azure_docker:v1
docker context create aci qceka88contactsdockercontext
docker context use qceka88contactsdockercontext
docker compose up