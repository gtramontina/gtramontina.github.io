import { spawn } from "node:child_process";

const $ = (cmd, args, input) =>
	new Promise((resolve, reject) => {
		const child = spawn(cmd, args);
		let output = "";
		child.stdout?.on("data", (d) => (output += d));
		child.on("close", (code) =>
			code === 0
				? resolve(output)
				: reject(new Error(`Exit ${code}.\n${child.stderr}`)),
		);
		child.stdin?.write(input);
		child.stdin?.end();
	});

const errorElement = `<figure><code style="color:red;background-color:pink;text-align:center;border:1px dotted red;border-radius:5px;padding:5px 10px;">Error rendering SVGBob image</code></figure>`;

const viewBoxPatch = {
	regexp:
		/<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" width="(?<width>\d+(?:\.\d+)?)" height="(?<height>\d+(?:\.\d+)?)" class="svgbob">/,
	replacement: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 $1 $2" class="svgbob">`,
};

const stylesPatch = {
	regexp: /<style>/,
	replacement: (dashArray) => `<style>
	@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&amp;display=swap');
	.svgbob {
		color-scheme:light dark;
		.broken { stroke-dasharray: ${dashArray} !important; }
	}`,
};

const render = async (
	content,
	{
		background = "transparent",
		fillColor = "light-dark(#ffffff, #333333)",
		fontFamily = '"JetBrains Mono", monospace',
		fontSize = 12,
		scale = 1,
		strokeColor = "light-dark(#333333, #ffffff)",
		strokeWidth = 1.25,
		dashArray = "5",
		altText = "",
		title = "",
		width = 0,
		height = 0,
		asImg = false,
	} = {},
) => {
	content = content
		.split("\n")
		.filter((line) => line.trim().length > 0)
		.join("\n");

	console.debug(`[svgbob] painting image:`);
	console.debug(content);
	const stdout = await $("svgbob", [
		"--background", background,
		"--fill-color", fillColor,
		"--font-family", fontFamily,
		"--font-size", fontSize,
		"--scale", scale,
		"--stroke-color", strokeColor,
		"--stroke-width", strokeWidth,
	], content);
	console.debug(`[svgbob] image painted.`)

	const {
		groups: { width: originalWidth, height: originalHeight },
	} = stdout.match(viewBoxPatch.regexp);
	const imageWidth = width ? width : originalWidth;
	const imageHeight = height ? height : originalHeight;
	const dimensions = `width="${imageWidth}"${height ? ` height="${imageHeight}"` : ""}`;

	const patched = stdout
		.replace(stylesPatch.regexp, stylesPatch.replacement(dashArray))
		.replace(viewBoxPatch.regexp, viewBoxPatch.replacement);
	const base64 = Buffer.from(patched).toString("base64");

	return asImg
		? `<img alt="${altText}" title="${title}" ${dimensions} src="data:image/svg+xml;base64,${base64}">`
		: `<object type="image/svg+xml" ${dimensions} data="data:image/svg+xml;base64,${base64}"></object>`;
};

// ---

const figcaption = ({ caption } = {}) =>
	caption ? `<figcaption>${caption}</figcaption>` : "";

export default async (content, attributes) => {
	try {
		return `<figure>${await render(content, attributes)}${figcaption(attributes)}</figure>`;
	} catch (error) {
		console.error(`Error rendering SVGBob image: ${error}`);
		return errorElement;
	}
};
