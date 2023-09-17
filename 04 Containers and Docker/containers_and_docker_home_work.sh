#for this homework we will run simple nginx server
$ docker images: return to user  images of docker
$ docker pull nginxdemos/hello : pull nginx demo
$ docker run -p 5000:80 nginxdemos/hello : set port for nginx server
$ docker run -p 5001:80 -d --name my_test_name nginxdemos/hello : create a container with name and port
$ docker logs [ID or name of container]:  returns logs for mentioned container
$ docker ps -a: return all containers
$ docker ps:  return only working containers
$ docker start [id or name of container]: run the container
$ docker stop [id or name of conainer]: stops the running container
$ docker rm [id or name of container]: removes the container
$ docker rmi [name of image]: removes the image

#building up node.js application
$ vue init browserify MyWebsite # create app with name MyWebSite
# next we need to go in the directory fo created app
$ cd /MyWebsite
# after dhis we need to install npm
$ npm install
# next step is to pull node.js version 16
$ docker pull npm:16
# start server locally with next command line
$ npm run dev

