# basic-web-dashboard

This project creates a web page that allows to view a variety of statistics from RPi services and hardware. This mainly includes data like CPU, memory, network and storage usage.
You can also show information about Docker (WIP), a running Gitea instance (WIP) or create a watcher to notify you of upcoming releases of movies or tv shows.

## Project setup
```
npm install
```
There are some things to be configured before firing Vue up:

### Set up connection with the backend express.js
Modify the URL in `api.js` to point to the [express-server](https://github.com/RPi-WebTools/express-server):
```javascript
export default axios.create({
    baseURL: 'http://192.168.0.103:3001/api'
})
```

### Set up Gitea connection
To use the Gitea parts of the page, you need to fill in two things in `gitea-api.js`:
```javascript
// set Gitea token here
const accessToken = ''

// change this url to point to your Gitea instance
const instance = axios.create({
    baseURL: 'http://192.168.0.103:3000/api/v1'
})
```

### Optional: Change locale of moment.js
If you need another localisation of the moment.js lib, change this entry in `main.js`:
```javascript
moment.locale('de')
```

## Starting the project

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Build and run Docker image
The build needs to be done on the Raspberry (or on armv7 32-bit at least), otherwise the Dockerfile will fail.
```
docker build -t rpi-webtools/dashboard .

docker run -it -p 8080:80 --name rpi-webtools-dashboard rpi-webtools/dashboard
```
#### Save the image
If you want to transfer your image between hosts, you can save the generated image directly and load it back with:
```
docker save -o <path for a generated .tar> <image name>

docker load -i <path to generated .tar>
```

## Used icons
This project uses FontAwesome icons ([license](https://fontawesome.com/license)).
