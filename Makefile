
analysis:
	./node_modules/.bin/plato -r -d report src

build:
	docker-compose up --build -d

# Just starts the services
start:
	docker-compose start

# Just stops the containers, keeping the data
stop:
	docker-compose stop

# Brings down the single container and destroys EVERYTHING
destroy:
	docker-compose down

deps:
	npm install

test:
	npm test

cover:
	npm run coverage

run:
	npm start

run-client:
	npm run client
