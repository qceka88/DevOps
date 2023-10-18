
docker run -d --name prometheus -p 9115:9115 quay.io/prometheus/blackbox-exporter:latest

./prometheus --config.file prometheus-homies.yml
./alertmanager --config.file alertmanager-homies.yml