FROM ubuntu:18.04

WORKDIR /usr/videos


ENV LC_ALL=C.UTF-8 

RUN apt-get update && apt-get install -y curl python && \
	curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl && \
	chmod a+rx /usr/local/bin/youtube-dl && \
	rm -rf /var/lib/apt/lists/* && \
	#apt-get purge -y --auto-remove curl && \ 
	rm -rf /var/lib/apt/lists/* && \
    useradd -m appuser && \
	chown -R appuser /usr/videos
	

USER appuser

ENTRYPOINT ["/usr/local/bin/youtube-dl"] 
