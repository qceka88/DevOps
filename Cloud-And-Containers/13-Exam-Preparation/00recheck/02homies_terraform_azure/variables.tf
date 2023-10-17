variable "resource_group_name" {
  type        = string
  description = "Resource group name in Azure"
}
variable "resource_group_location" {
  type        = string
  description = "Resource group location in Azure"
}
variable "app_service_plan_name" {
  type        = string
  description = "App service plan name in Azure"
}
variable "app_service_name" {
  type        = string
  description = "App service name in Azure"
}

variable "mssql_server_name" {
  type        = string
  description = "MSSQL server name in Azure"
}

variable "mssql_database_name" {
  type        = string
  description = "MSSQL database name in Azure"
}

variable "mssql_admin_username" {
  type        = string
  description = "Admin username for DB in Azure"
}

variable "mssql_admin_password" {
  type        = string
  description = "Admin password for DB in Azure"
}

variable "firewall_rule_name" {
  type        = string
  description = "Firewall rule name in Azure"
}

variable "github_repo_url" {
  type        = string
  description = "URL of GitHub repo of APP"
}