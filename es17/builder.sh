#!/bin/bash
echo Reading repo : https://github.com/SSunny36100/myDockerLearning2
apt-get update
apt-get install git
git clone https://github.com/SSunny36100/myDockerLearning2
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release
apt-get install docker -y

cd ./myDockerLearning2/es16/fancy-todo
docker build -t pf-fancy-todo . 


