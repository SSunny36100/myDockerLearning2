FROM ubuntu:18.04

WORKDIR /usr/video

RUN apt-get update && apt-get install -y curl python
RUN curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl
RUN chmod a+rx /usr/local/bin/youtube-dl 

ENV LC_ALL=C.UTF-8 

RUN useradd -m userapp
RUN chown -R userapp /usr/video

USER userapp

ENTRYPOINT ["/usr/local/bin/youtube-dl"] 
