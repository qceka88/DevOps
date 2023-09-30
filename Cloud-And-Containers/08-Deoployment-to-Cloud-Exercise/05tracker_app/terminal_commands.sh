#check for  proper working localy
docker image build . -f Dockerfile -t tracker_app_image
docker run -d --name tracker_app_local -p 8080:8080 tracker_app_image
#proceed with azure
az login
# create resource group
az group create --name trackerappyanko --location westeurope
# create Azure container registry
az acr create --resource-group trackerappyanko --name trackerappyanko --sku Basic
#login in to container registry
az acr login --name trackerappyanko
# full login server name for your Azure container registry
az acr show --name trackerappyanko --query loginServer --output table
#tag image
docker tag tracker_app_image trackerappyanko.azurecr.io/tracker_app_image:v1
#push the image in azure
docker push trackerappyanko.azurecr.io/tracker_app_image:v1
# create and configure Azure Active Directory service principal with pull permission
$ARC_NAME='trackerappyanko'
$SERVICE_PRINCIPAL_NAME='trackerappyankosp'
$ACR_REGISTRY_ID=$(az acr show --name $ACR_NAME --query "id" --output tsv)
$PASSWORD=$(az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --scopes $ACR_REGISTRY_ID --role acrpull --query "password" --output tsv)
$USER_NAME=$(az ad sp list --display-name $SERVICE_PRINCIPAL_NAME --query "[].appId" --output tsv)

#output the service principals credentials
echo "Service principal ID: $USER_NAME"
echo "Service principal password: $PASSWORD"
az container create --resource-group trackerappyanko --name trackerappyanko --image trackerappyanko.azurecr.io/tracker_app_image:v1 --cpu 1 --memory 1 --registry-login-server trackerappyanko.azurecr.io --registry-username 4bf8b17b-4a14-4af3-a245-db4bb40f4326 --registry-password R2h8Q~ZVnjURwYNgIKcV2uKVKoItSXsJeBD.UccM --ip-address Public --dns-name-label trackerappyankodns --ports 80
#view container state of deployment
az container show --resource-group trackerappyanko --name trackerappyanko --query instanceVIew.state
#see FQDN
az container show --resource-group trackerappyanko --name trackerappyanko --query ipAddress.fqdn

#delete resource group
az group delete --name trackerappyanko