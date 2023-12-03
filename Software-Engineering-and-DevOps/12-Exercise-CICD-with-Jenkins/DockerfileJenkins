FROM jenkins/jenkins:lts

USER root

RUN apt-get install -y curl \
  && curl -sL https://deb.nodesource.com/setup_16.x | bash - \
  && apt-get install -y nodejs \
  && curl -L https://www.npmjs.com/install.sh | sh

RUN apt update && curl -fsSL https://get.docker.com | sh
RUN usermod -aG docker jenkins
