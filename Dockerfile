FROM femtopixel/eleventy:v2.0.2-alpha.2
COPY --from=ghcr.io/gtramontina/svgbob:0.7.2 /svgbob /bin/svgbob
