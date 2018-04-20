# WASTE4THINK NGSI CONNECTOR
Module for reading csv file from pilot site users and sending it to Orion context broker.

# Installation
1. Download the repository.
2. *OPTIONAL* You may need to use npm 5.2.0 since there are issues with npm 5.3.0 on Windows 10.
3. Install npm modules: npm install.
4. Install nested npm modules: npx recursive-install. (this will instll modules from package.json files from upload-module, login-module, etc..)
5. Start up server: npm start (we used nodemon)/nodemon.
6. If u want to change port on witch api is running change it in config.json: port default one is 3000

# Software to use
1. Nodejs/Express
2. Fiware Orion Context Broker

# Docker
1. For docker installation https://docs.docker.com/install/#desktop
2. Download docker image using "docker pull despotsen/apiconnector".
3. Run the downloaded docker image: "docker run -p 3000:3000 -d despotsen/apiconnector".
5. To run container from image, for example: docker run -p 3000:3000 -d csvmodule
6. In case u want to change or deploy app on docker using your own setting edit/change dockerfile provided in root of project.

* Most used docker commands
To see images: docker images.
To see containers: docker containers.
In case u need to stop images/containers use docker stop [image/container name or ID].
To build an image with Dockerfile: docker build -t csvmodule .

# Orion Contex Broker Locally
1. OCB used in our project can be found on https://hub.docker.com/r/fiware/orion/
2. Follow the fastes way in order to setup enviroment (if u dont have one)
3. In case of input/output error restart docker if error still persists check running containers/images
using "docker ps -a" and "docker images -a"
4. If problem persists remove container using command docker rm [container name/hash]
5. In emergancy case if all else fail https://forums.docker.com/t/command-to-remove-all-unused-images/20/2

