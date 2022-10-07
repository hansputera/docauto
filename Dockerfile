FROM node:slim

LABEL "com.github.actions.name"="docauto"
LABEL "com.github.actions.description"="Convert odt/docx/office files to PDF"
COPY package*.json ./

RUN npm i -g yarn
RUN yarn ser version berry

COPY . .

RUN yarn build
ENTRYPOINT ["node", "./dist/index.js"]