# after install prometheus. we need to run a container
docker run -d --name prometheus -p 9115:9115 quay.io/prometheus/blackbox-exporter:latest
# get probe at https://softuni.org
# configure prometheus.yml
./prometheus --config.file prometheus-blackbox.yml

promtool check config your_config.yml
