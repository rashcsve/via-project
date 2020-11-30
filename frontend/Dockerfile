# Creates an docker image
FROM node:12

ADD ./package.json /app/package.json
# ADD ./package-lock.json /app/package-lock.json
ADD ./nuxt.config.js /app/nuxt.config.js
ADD . /app/

WORKDIR /app
# ADD . /app/

# # global install & update
RUN npm i yarn

# # RUN rm yarn.lock
RUN yarn
RUN yarn build

# ENV HOST 0.0.0.0
# EXPOSE 3000

# start command
CMD [ "yarn", "start" ]