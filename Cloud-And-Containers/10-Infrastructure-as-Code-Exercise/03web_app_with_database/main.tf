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
  name     = "WebAppRG-${random_integer.ri.result}"
}

#in progress