FROM node:10-alpine

WORKDIR /app 
COPY . . 

EXPOSE 3031

RUN npm install -g serve

RUN npm install 

RUN npm run build

CMD ["serve","-s", "build", "-l","3031"]