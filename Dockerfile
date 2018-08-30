FROM node:6

WORKDIR /home/node/

COPY . /home/node/

RUN npm install

EXPOSE 3000

CMD ["npm","start"]
