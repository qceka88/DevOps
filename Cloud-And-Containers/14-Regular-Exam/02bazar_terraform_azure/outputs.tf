/* Custom output data from our app after start */
output "webapp_url" {
  value = azurerm_linux_web_app.lwa.default_hostname
}
output "webapp_ip-s" {
  value = azurerm_linux_web_app.lwa.outbound_ip_addresses
}