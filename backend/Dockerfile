FROM python:3.6.9

ENV PYTHONUNBUFFERED 1

RUN mkdir /srv/docker-server
ADD . /srv/docker-server

WORKDIR /srv/docker-server

RUN pip install --upgrade pip
RUN pip install -r requirements.txt01~
