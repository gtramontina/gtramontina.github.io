11ty-version := 3.1.2
11ty := npx @11ty/eleventy@$(11ty-version)

dev:
	@NODE_ENV=development $(11ty) --serve
.PHONY: dev

build:
	@DEBUG=* $(11ty)
.PHONY: build

clean:
	@rm -rf public/
.PHONY: clean
