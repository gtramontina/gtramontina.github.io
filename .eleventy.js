import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import mdAbbr from "markdown-it-abbr";
import custom from "./custom/index.js";

export default (config) => {
	config.addPassthroughCopy({ static: "/" });
	config.addPairedNunjucksAsyncShortcode("svgbob", custom.svgbob);
	config.addFilter("dateFormatYYYY_MM_DD", custom.dateFormatYYYY_MM_DD);
	config.addFilter("dateISO", custom.dateISO);
	config.addFilter("collectionNewestDateItem", custom.collectionNewestDateItem);
	config.addFilter("urlAbsolute", custom.urlAbsolute);
	config.addFilter("encodeURI", custom.encodeURI);
	config.addFilter("includes", custom.includes);
	config.addFilter("collectionLive", custom.collectionLive);
	config.addFilter("collectionDraft", custom.collectionDraft);
	config.addFilter("collectionNotDraft", custom.collectionNotDraft);

	config.amendLibrary("md", (md) => md.use(mdAbbr));
	config.addPlugin(syntaxHighlight);

	return {
		dir: { input: "source", output: "public" },
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"],
	};
};
