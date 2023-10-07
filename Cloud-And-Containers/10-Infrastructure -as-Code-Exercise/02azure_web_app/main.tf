terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.75.0"
    }
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
  location = "West Europe"
  name     = "ContatBookRG${random_integer.ri.result}"
}

resource "azurerm_service_plan" "as" {
  location            = azurerm_resource_group.rg.location
  name                = "contact_book_${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "lwa" {
  location            = azurerm_resource_group.rg.location
  name                = "my-linux-app-${random_integer.ri.result}"
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.as.id
  site_config {
    application_stack {
      node_version = "16-lts"
    }
    always_on = false
  }
}

resource "azurerm_app_service_source_control" "sc" {
  app_id                 = azurerm_linux_web_app.lwa.id
  repo_url               = "https://github.com/nakov/ContactBook"
  branch                 = "master"
  use_manual_integration = true
}
