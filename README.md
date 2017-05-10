# Webhook handler
[![bitHound Overall Score](https://www.bithound.io/github/codebrewery/web-node_webhook/badges/score.svg)](https://www.bithound.io/github/codebrewery/web-node_webhook) [![bitHound Dependencies](https://www.bithound.io/github/codebrewery/web-node_webhook/badges/dependencies.svg)](https://www.bithound.io/github/codebrewery/web-node_webhook/master/dependencies/npm) [![bitHound Code](https://www.bithound.io/github/codebrewery/web-node_webhook/badges/code.svg)](https://www.bithound.io/github/codebrewery/web-node_webhook)

This is a lightweight server and client which will enable you to run shell commands on an instance via webhooks.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?https://github.com/codebrewery/web-node_webhook)

## Inspiration

This project was created as a hobby project for May 4th (StarWars day) which would enable a slack command in the office to have a cardboard r2d2 (with raspberry pi) to express it in r2-d2 speak. I used this python script https://github.com/hug33k/PyTalk-R2D2 for the r2-d2 sounds.

After checking out this open-source project https://github.com/adnanh/webhook I'd decided the architecture was not actually what I wanted. I was looking for a central service which would consume the webhooks, and clients would be able to register and configure themselves and respond to the webhook requests. For communication between server and client I decided to go for socketio.

Since it's actually a useful tool for automation and deployments, I've decided to open-source it.

## How does it work?
### Server
The server captures incoming POST requests, validates and relays them to the client. All webhook configuration is determined by the client and not the server.
### Client
The client contains the configuration for the webhook and the command to run. It will connect to the server over a socket connection and authenticates using JSON webtoken. Multiple clients are supported as long as their APP (id) is unique.

---

## Install

    npm install

## Run
### Server

    npm run server
    
### Client

    npm run client
 

## Configuration

### Environment variables

The server accepts the following environment variables:

- `TOKEN` (Server/Client) This is the password the server will use to authenticate the client with, make sure to change it
- `SECRET` (Server) The JWT secret
- `SECRET_EXPIRY` (Server) The JWT secret expiry. Note that the JWT check is only done at socket connection and not in subsequent messages.
- `PORT` (Server) The port the server will listen on. Default: 8080
- `APP` (Client) The client ID, should be unique per client.
- `SERVER_URL` (Client) The server URL which the client will connect with.

### Webhooks

Now this is the real meat.

The client will check for a `hooks.json` configuration file in the repo root, the user home directory and in the src directory in that order.

The `hooks.json` file holds the configuration for all the hooks. You can define multiple.

Example `hooks.json` configuration:

	[
	  {
	    "id": "r2d2",
	    "execute-command": "python3 ./r2d2.py",
	    "command-working-directory": "/Users/codebrewery/PyTalk-R2D2-master/src",
	    "response-message": "Executing r2d2 script",
	    "pass-arguments-to-command": [
	      {
	        "source": "payload",
	        "name": "text"
	      }
	    ],
	    "trigger-rule": {
	      "match": {
	        "type": "value",
	        "value": "<YOUR-GENERATED-TOKEN>",
	        "parameter": {
	          "source": "payload",
	          "name": "token"
	        }
	      }
	    }
	  }
	]

For more info on the configuration I'd like to point to the json used in https://github.com/adnanh/webhook as I took that as a reference. They have a detailed wiki https://github.com/adnanh/webhook/wiki.

Currently only the `match` trigger rule is supported.

## Security

It should be quite obvious but allowing an external influence run shell commands poses quite a security risk. Therefore I recommend you always run the server over SSL, change the default server `SECRET` and the `APP_TOKEN` environment variables.

## Docker

### Server

You are able to run the server in a docker environment. For production I would recommend to proxy it with for example nginx and only accept requests over SSL.

### Client

Since the client needs shell access, running it inside a container won't do anything for you.

## TODO

- Add tests, this is an open-source project and would like high coverage ;)
- Add some tools, such as versioning and CI
- Enable all json configuration based on https://github.com/adnanh/webhook/wiki/Hook-Definition

