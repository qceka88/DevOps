az group create --name yankotaskBoardResourceGroup --location westeurope
az acr create --resource-group yankotaskBoardResourceGroup --name yankotaskboardappcr --sku Basic
az acr login --name yankotaskboardappcr
docker-compose up -d --build
docker tag yankotaskboardappcr.azurecr.io/taskboard_image_yanko yankotaskboardappcr.azurecr.io/taskboard_image_yanko:v1
docker push yankotaskboardappcr.azurecr.io/taskboard_image_yanko:v1
az acr repository show --name yankotaskboardappcr --repository taskboard_image_yanko
docker context create aci yankotaskboardcontext
docker context use yankotaskboardcontext
docker compose up
