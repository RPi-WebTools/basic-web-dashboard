# basic-web-dashboard

## Project setup
```
npm install
```

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

### Used icons
This project uses FontAwesome icons ([license](https://fontawesome.com/license)).
