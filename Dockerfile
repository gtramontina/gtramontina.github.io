FROM femtopixel/eleventy:v2.0.1-alpha.3
COPY --from=ghcr.io/gtramontina/svgbob:0.6.6 /svgbob /bin/svgbob
