# Readme

You can run the APP in with docker. You need to have docker and docker-compose installed locally.

To run the app:

```
$ docker-compose up
```

And then you can access it at http://localhost:1337

At the moment, only the method to issue license key is implemented:

```
# request
$ curl --request POST \
  --url http://localhost:1337/license-keys \
  --header 'content-type: application/json' \
  --data '{
	"userId": "doge",
	"features": ["makeFrappe"]
}'

# response
{
  "licenseKey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkb2dlIiwiaWF0IjoxNTYwODQ4MTAyfQ.1txpI2oC-yEeFuGTj3l6VM-WGDbJ6CZhCMyohy3PBvs"
}
```
