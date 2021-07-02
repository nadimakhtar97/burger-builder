# STAGE-1 BUILD-STAGE

FROM node:12.18.3-alpine AS BUILD-STAGE

# We create a new user because by default the user is root which
# has all execution rights which creates a security hole in the container.
#RUN addgroup app && adduser -S -G app app
#RUN mkdir /app && chown app:app /app
#USER app


WORKDIR /app
#RUN mkdir data

# In docker file each line is a layer and during build if there is a change in a
# line then that layer will be rebuilt and lines following that line will also be
# rebuilt. If there is no change in a layer then during build, cache will be used.
# docker stores cache of each layer.

# We are copying package.json first and then other files because we want to rebuild the
# npm install line only if package.json has changed.

# if we put "COPY . ." above "RUN npm install" then changing even a line in the code will
# cause a rebuild of "COPY . ." and line following it "RUN npm install" which will create
# an extra network over-head and increase the build time.
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# To set environment variable.
#ENV API_URL=https://nadimakhtar97.github.io/nadim



# Diff between CMD and RUN
# RUN is a built-time insturction while CMD is a run-time instruction.
# CMD insturction has two forms 1. shell form 2. execute form.

#shell form of CMD --> docker will execute command in a separate/new shell.
# /bin/sh in linux or cmd in windows
# NOTE : There is no need for multiple CMD because only the last on one
# will take effect.

#CMD npm start



# Execute form --> docker executes the instruction in same shell .
# This is recommended to use / always use execute form.
CMD ["npm","start"]

#ENTRYPOINT ["npm","start"]

# Note: we can run multiple container of same docker image simultaneously.

# We can prune dangling images by "docker images prune"
# "docker run -d react-app" --> to run container in detached mode.
# "docker ps" --> to view running containers.
# "docker ps -a" --> to view running + stopped continers /all continers.
# "docker log [continerID]" --> To view errors occured in a container. If any problem occurs then see log.


# Port exposed by a container is not listened by host.
# To make host listen to port exposed by container we do,
# "docker run -d -p 80:3000 --name blue-sky react-app"
# -d --> detached mode
# -p --> port
# host:container
# --name --> many continer can run simultaneously so we need name them.

# What if you want to run command in a running container ??
# docker exec blue-sky ls --> list all file/directories in working dir.
# docker exec -it blue-sky sh --> open shell in a running continer in interactive mode.
# Note: blue-sky is the name of the continer it may vary container to container.

# starting and stoping a container.
# docker stop blue-sky
# docker start blue-sky

# docker run -it --name blue-sky react-app --> this will create a new conatiner each time.

# Each container has its own file system that is invisible to other container may be of same image.
# That is way we should not store any data in container's file system.

# Persisting data using volumes
# "docker create volume app-data"

# we can copy files from host to container and container to host.

# we can map our source code to a container. By doing this we can achieve realtime server feeling
# i.e when we change code on host it will be immediately reflected in container. It's magic.
# "docker run -d -p 5000:3000 -v $(pwd):/app react-app"



# STEP-2 PRODUCTION-STAGE

FROM nginx:1.12-alpine
COPY --from=BUILD-STAGE /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
