CPUS ?= $(shell nproc --all 2> /dev/null || sysctl -n hw.ncpu 2> /dev/null || echo 1)
MAKEFLAGS += --jobs $(CPUS)
MAKEFLAGS += --warn-undefined-variables
MAKEFLAGS += --no-builtin-rules
MAKEFLAGS += --output-sync
SHELL := bash -eu -o pipefail -c
.DELETE_ON_ERROR:
.SECONDEXPANSION:

# ---

blog-title := gtramontina
blog-author := Guilherme J. Tramontina

output := dist
input := src
templates := templates
static := static

# ---

md-files := $(shell find $(input) -type f -name '*.md')
html-files := $(patsubst $(input)/%.md, $(output)/%.html, $(md-files))
static-files := $(patsubst $(static)/%, $(output)/%, $(shell find $(static) -type f))

# ---

dependencies := Makefile $(wildcard $(templates)/*)

docker := docker run --init --rm -i
image-pandoc := conoria/alpine-pandoc:latest
image-inotifywait := uadevnet/alpine-inotify-tools:latest
image-live-server := gtramontina/live-server:1.2.0

pandoc-options := \
	--title-prefix "$(blog-title)" \
	--metadata author:"$(blog-author)" \
	--variable lang=en-US \
	--template $(templates)/index.html \
	--include-before-body $(templates)/header.html \
	--include-after-body $(templates)/footer.html \
	--highlight-style monochrome \
	--css //cdn.rawgit.com/dreampulse/computer-modern-web-font/69db20e0/font/Typewriter/cmun-typewriter.css \
	--css //cdn.rawgit.com/dreampulse/computer-modern-web-font/69db20e0/font/Serif/cmun-serif.css \
	--css /stylesheet.css \
	--strip-comments \
	--section-divs \
	--from markdown+smart \
	--to html5

pandoc := $(docker) -w /blog -v $(CURDIR)/$(templates):/blog/$(templates) $(image-pandoc) pandoc $(pandoc-options)
inotifywait := $(docker) -v $(CURDIR):/data:ro $(image-inotifywait) inotifywait --exclude .git -qr /data
live-server := $(docker) -v $(CURDIR)/$(output):/app:ro -p 8080:8080 $(image-live-server)
make := MAKEFLAGS="" $(MAKE)

# ---

.INTERMEDIATE: $(TMPDIR)image-pandoc.log
$(TMPDIR)image-pandoc.log:
	@((docker images $(image-pandoc) --format "{{.ID}}" | grep -ve "^$$") ||\
		(docker pull $(image-pandoc)) ) > $@

.PRECIOUS: %/.f
%/.f:; @mkdir -p $(dir $@) && touch $@

$(output)/%.html: $(input)/%.md $(dependencies) | $(TMPDIR)image-pandoc.log $$(@D)/.f
	@cat $< | $(pandoc) > $@

$(output)/%: $(static)/% | $$(@D)/.f
	@cp $< $@

# ---

.PHONY: build
build: $(html-files) $(static-files)

.PHONY: watch
watch:
	@while true; do \
		$(make) build; \
		$(inotifywait); \
	done

.PHONY: dev
dev:
	@$(live-server) & \
	$(make) watch & \
	wait
