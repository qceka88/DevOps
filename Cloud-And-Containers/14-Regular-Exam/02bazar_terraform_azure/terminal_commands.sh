terraform init
terraform fmt | terraform validate
terraform apply -var-file="values.tfvars"