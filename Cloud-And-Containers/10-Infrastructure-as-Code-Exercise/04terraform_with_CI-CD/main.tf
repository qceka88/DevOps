terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.75.0"
    }
  }
  backend "azurerm" {
    resource_group_name  = "StorrageTaskBoard-48395"
    storage_account_name = "yrtaskboardstorage"
    container_name       = "yrtaskboardcontainer"
    key                  = "terraform.tfstate"
  }
}

provider "azurerm" {
  features {}
}

resource "random_integer" "ri" {
  max = 99999
  min = 10000
}


resource "azurerm_resource_group" "rg" {
  location = var.resource_group_location
  name     = "${var.resource_group_name}-${random_integer.ri.result}"
}

resource "azurerm_service_plan" "as" {
  location            = azurerm_resource_group.rg.location
  name                = "${var.app_service_plan_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "F1"
}


resource "azurerm_mssql_server" "mssql_server" {
  name                         = "${var.mssql_server_name}-${random_integer.ri.result}"
  resource_group_name          = azurerm_resource_group.rg.name
  location                     = azurerm_resource_group.rg.location
  version                      = "12.0"
  administrator_login          = var.mssql_admin_username
  administrator_login_password = var.mssql_admin_password
}

resource "azurerm_mssql_database" "mssql_database" {
  name           = "${var.mssql_database_name}-${random_integer.ri.result}"
  collation      = "SQL_Latin1_General_CP1_CI_AS"
  license_type   = "LicenseIncluded"
  sku_name       = "S0"
  zone_redundant = false
  server_id      = azurerm_mssql_server.mssql_server.id
}

resource "azurerm_mssql_firewall_rule" "sql_firewall_rule" {
  name             = "${var.firewall_rule_name}-${random_integer.ri.result}"
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
  server_id        = azurerm_mssql_server.mssql_server.id
}

resource "azurerm_linux_web_app" "lwa" {
  location            = azurerm_resource_group.rg.location
  name                = "${var.app_service_name}-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.as.id

  site_config {
    application_stack {
      dotnet_version = "6.0"
    }
    always_on = false
  }
  connection_string {
    name  = "DefaultConnection"
    type  = "SQLAzure"
    value = "Data Source=tcp:${azurerm_mssql_server.mssql_server.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_mssql_database.mssql_database.name};User ID=${azurerm_mssql_server.mssql_server.administrator_login};Password=${azurerm_mssql_server.mssql_server.administrator_login_password};Trusted_Connection=False;MultipleActiveResultSets=True;"
  }
}

resource "azurerm_app_service_source_control" "sc" {
  app_id                 = azurerm_linux_web_app.lwa.id
  repo_url               = var.github_repo_url
  branch                 = "main"
  use_manual_integration = true
}
