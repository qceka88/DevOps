docker network create my_test_network
docker pull
docker run -d --name wordpress_db -e MYSQL_ROOT_PASSWORD=1234 -e MYSQL_DATABASE=wordpressdb -e MYSQL_USER=wordadmin -e MYSQL_PASSWORD=1234 --expose 3306 --expose 33060 --network my_network -v ${PWD}/data:/var/lib/mysql mysql
