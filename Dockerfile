FROM node:10.16.0-alpine as libs

WORKDIR /opt/app
COPY package.json .
COPY yarn.lock .
RUN yarn --prod && \
    yarn cache clean


FROM node:10.16.0-alpine

WORKDIR /opt/app
ENV NODE_ENV=production
CMD ["node", "build/api.js"]
LABEL MAINTAINER="Pavel Ivanov <ivpavig@gmail.com>" VERSION="v1.0.0"

RUN chown node:node /opt/app
COPY --from=libs --chown=node:node /opt/app/node_modules node_modules
COPY --chown=node:node . .

USER node
