import { exec } from "node:child_process";
import { promisify } from "node:util";

const $ = promisify(exec);

export default async (
	content,
	{
		background = "transparent",
		fillColor = "light-dark(#ffffff, #333333)",
		scale = 1,
		fontSize = 14,
		strokeColor = "light-dark(#333333, #ffffff)",
		strokeWidth = 1.25,
		altText = "",
		title = "",
	} = {},
) => {
	const cmd = `cat << "EOF" | ${content}EOF
svgbob \
--background "${background}" \
--fill-color "${fillColor}" \
--scale ${scale} \
--font-size ${fontSize} \
--stroke-color "${strokeColor}" \
--stroke-width ${strokeWidth} \
`;

	console.debug(`Painting image with svgbob: ${cmd}`);
	const { stdout } = await $(cmd);
	const patched = stdout.replace(/<style>/, "<style>.svgbob{color-scheme:light dark;}");
	const base64 = Buffer.from(patched).toString("base64");

	return `<figure><img alt="${altText}" title="${title}" src="data:image/svg+xml;base64,${base64}"></figure>`;
};
