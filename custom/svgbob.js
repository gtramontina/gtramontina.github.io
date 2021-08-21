const exec = require("util").promisify(require("child_process").exec);

module.exports = async (
	content,
	{
		background = "transparent",
		fillColor = "black",
		scale = 1,
		fontSize = 14,
		strokeWidth = 1.25,
		altText = "",
		title = "",
	} = {}
) => {

	const cmd = `cat << "EOF" | ${content}EOF
svgbob \
--background "${background}" \
--fill-color "${fillColor}" \
--scale ${scale} \
--font-size ${fontSize} \
--stroke-width ${strokeWidth} \
| base64`;

	console.log(`Painting image with svgbob: ${cmd}`);
	const { stdout } = await exec(cmd);

	return `<figure><img alt="${altText}" title="${title}" src="data:image/svg+xml;base64,${stdout}"></figure>`
};
