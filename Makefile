DATABASE_NAME:=shop_together_couchdb
DATABASE_IMAGE:="couchdb:3.3.3"
LOCAL_NETWORK:=local_testing_network
PORT:=5984

build_shop_together_image:
	@yarn
	@yarn build
	@docker build -t shop_together:$(shell git describe --tags) .

start_couchdb:
	@if [ "$(shell docker inspect -f '{{.State.Running}}' ${DATABASE_NAME} 2>/dev/null)" = "false" ]; then \
		docker start ${DATABASE_NAME}; \
	elif [ $(shell docker container inspect ${DATABASE_NAME} > /dev/null 2>&1; echo $$?) = 1 ]; then \
		echo "Creating a new database, this will take a moment."; \
		docker run -d \
		--name ${DATABASE_NAME} \
		--network ${LOCAL_NETWORK} \
		-p ${PORT}:${PORT} \
		--expose ${PORT} \
		-e COUCHDB_USER=admin \
		-e COUCHDB_PASSWORD=password \
		${DATABASE_IMAGE}; \
	fi


stop_couchdb:
	@if [ "$(shell docker inspect -f '{{.State.Running}}' ${DATABASE_NAME} 2>/dev/null)" = "true" ]; then \
		docker container stop ${DATABASE_NAME}; \
	fi

.seed_couchdb:
	@./ops/seedTestData.sh ops

.remove_couchdb: stop_couchdb
	@if [ "$(shell docker inspect -f '{{.State.Running}}' ${DATABASE_NAME} 2>/dev/null)" = "false" ]; then \
		docker container rm ${DATABASE_NAME}; \
	fi;
