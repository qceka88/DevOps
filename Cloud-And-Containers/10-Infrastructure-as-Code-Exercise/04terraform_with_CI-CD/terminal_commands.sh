az ad sp create-for-rbac --name "ATGHA-Yanko123456" --role contributor --scopes /subscriptions/"your subscription id from azure portal" --sdk-auth
az group create --name StorrageTaskBoard-48395 --location westeurope
az storage account create --name yrtaskboardstorage --resource-group StorrageTaskBoard-48395 --location westeurope --sku Standard_LRS --kind StorageV2
az storage container create -n yrtaskboardcontainer --account-name yrtaskboardstorage