# URL Shortener
You can create short form url for your original url and track click times of it. Try this App [**here**](https://shihtingjustin.github.io/url_shortener_vue/#/).

You can just use this App as a guest, or sign in with test accounts to use urls management feature.
#### Test accounts

| name |     email     | password |
|:----:|:-------------:|:--------:|
| LH44 | user1@amg.com |   123    |
| NR6  | user2@amg.com |   123    |


![](https://i.imgur.com/6DVNr6e.jpg)
![](https://i.imgur.com/ZRBf9pn.jpg)



## Features
* Users can create short url after signed in
* Users can see their own urls after signed in
* Users can be redirected to original site via short url

## API
* POST /api/urls - create short url
* GET /api/:urls - get original url

You can refer to the API document [**here**](https://url-shortener-api-server.herokuapp.com/api-docs/#/)

## Stack
* Backend
    * Node.js
    * Express.js
    * MongoDB
    * Redis (cache)
    * Mocha.js (testing)
    * Travis CI (CI/CD)
    * Heroku (deployment)
    * Swagger (document)
    * Docker (environment)

* Frontend [**(Frontend Repository)**](https://github.com/ShihTingJustin/url_shortener_vue)
    * Vue
    * Vue Router
    * Vuex
    * Bootstrap
    * github-pages (deployment)


## Prerequisite
Install [docker](https://www.docker.com/) in your computer.

## Setup
1. clone repository
```
git clone https://github.com/ShihTingJustin/url_shortener_api.git
```
2. go to project directory
```
cd url_shortener_api
```
3. start the App
```
docker-compose up
```
4. use the App on
```
http://localhost:8080/
```

## Author
[ShihTingJustin](https://github.com/ShihTingJustin) (Justin)
* [LinkedIn](https://www.linkedin.com/in/justinhuang777/) 
* [Medium](https://medium.com/%E4%BD%A0%E6%98%AF%E8%87%AA%E7%94%B1%E7%9A%84)
* [Teaching Assistant at ALPHA Camp](https://lighthouse.alphacamp.co/users/2842/ta_profile)