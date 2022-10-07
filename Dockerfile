FROM node:slim

LABEL "com.github.actions.name"="docauto"
LABEL "com.github.actions.description"="Convert odt/docx/office files to PDF"
COPY package*.json ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

RUN pnpm run build
ENTRYPOINT ["node", "./dist/index.js"]