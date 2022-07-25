# # build environment
# FROM node:13.12.0-alpine as react-build

# ENV HOME=/home

# ENV PATH $HOME/app/node_modules/.bin:$PATH

# # Set env variable
# ARG REACT_APP_ENDPOINT
# ENV REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT

# RUN echo "Api endpoint = " $REACT_APP_ENDPOINT

# COPY package.json package-lock.json $HOME/app/

# COPY src/ $HOME/app/src

# COPY public/ $HOME/app/public

# WORKDIR $HOME/app

# # React running setup (for front-end)

# RUN rm -rf node_modules/

# RUN npm install

# # RUN npm install react-scripts@3.4.1 -g

# RUN npm run build

FROM node:13.12.0-alpine as react-build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Set env variable
ARG REACT_APP_ENDPOINT
ENV REACT_APP_ENDPOINT=$REACT_APP_ENDPOINT
RUN echo "Api endpoint = " $REACT_APP_ENDPOINT

COPY package.json ./
COPY package-lock.json ./
RUN npm install
# RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine

# ENV HOME=/home

COPY nginx.conf /etc/nginx/conf.d/default.conf

# COPY --from=react-build $HOME/app/build /usr/share/nginx/html

COPY --from=react-build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
