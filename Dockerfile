FROM --platform=linux/amd64 femtopixel/eleventy:v2.0.0-canary.35-arm64v8
COPY --from=ghcr.io/gtramontina/svgbob:0.6.6 /svgbob /bin/svgbob
