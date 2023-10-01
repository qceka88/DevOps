az group create --name yrPosioResourceGroup --location westeurope
az acr create --resource-group yrPosioResourceGroup --name yrposiocr --sku Basic
az acr login --name yrposiocr
docker-compose up -d --build
docker context create aci yrposiocontext
docker context use yrposiocontext
docker compose up
az group delete --name yrPosioResourceGroup