FROM ubuntu:18.04

WORKDIR /usr/src/app

COPY website.sh .

RUN chmod +x website.sh

RUN apt-get update

RUN apt-get -y install curl

CMD ./website.sh