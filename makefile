docker := docker-compose run --rm --service-ports

build:
	@$(docker) hugo-build
.PHONY: build

dev:
	@$(docker) hugo-server
.PHONY: dev

shell:
	@$(docker) hugo-shell
.PHONY: shell
