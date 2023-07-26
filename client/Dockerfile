# frontend/Dockerfile
# pull official base image
FROM node:14

# set working directory
WORKDIR /app

# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
RUN npm install vite -g --silent

# Install Material-UI, its peer dependencies and icons
RUN npm install @mui/material @emotion/react @emotion/styled @mui/styles @mui/icons-material

# Install React Router
RUN npm install react-router-dom

# add app
COPY . ./

# start app
CMD ["npm", "run", "dev"]

