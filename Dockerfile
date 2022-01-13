FROM node:17-alpine3.12
                                                                                                                       
WORKDIR /app
                                                                                                                       
COPY . .
                                                                                                                       
RUN npm install
                                                                                                                       
EXPOSE 5000
                                                                                                                       
CMD node ./src/app.js