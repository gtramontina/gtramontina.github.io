docker-run := docker-compose run --rm --service-ports

dev:
	@$(docker-run) server
.PHONY: dev

build:
	@$(docker-run) build
.PHONY: build

clean:
	@rm -rf public/
.PHONY: clean
