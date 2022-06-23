FROM --platform=linux/amd64 femtopixel/eleventy:v2.0.0-canary.11-amd64
COPY --from=ghcr.io/gtramontina/svgbob:0.6.6 /svgbob /bin/svgbob
