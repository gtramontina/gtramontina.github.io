FROM femtopixel/eleventy:v1.0.0-canary.39-i386
COPY --from=ghcr.io/gtramontina/svgbob:0.5.3 /svgbob /bin/svgbob
