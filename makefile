hugo := docker-compose run --rm --service-ports

build:
	@$(hugo) build
.PHONY: build

dev:
	@$(hugo) server
.PHONY: dev

shell:
	@$(hugo) shell
.PHONY: shell
