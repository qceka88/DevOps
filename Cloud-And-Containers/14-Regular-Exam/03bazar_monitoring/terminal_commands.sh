
docker run -d --name prometheus -p 9115:9115 quay.io/prometheus/blackbox-exporter:latest

./prometheus --config.file prometheus_exam.yml
./alertmanager --config.file alertmanager_exam.yml