FROM node:current-alpine3.15

LABEL "com.github.actions.name"="docauto"
LABEL "com.github.actions.description"="Convert odt/docx/office files to PDF"

RUN apk upgrade && \
    apk add git curl

RUN mkdir -p /home/docauto
COPY . /home/docauto
WORKDIR /home/docauto

RUN yarn set version berry
RUN yarn install
RUN yarn build

ENTRYPOINT ["node", "/home/docauto/dist/index.js"]