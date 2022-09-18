const custom = require("./custom");

module.exports = function(config) {
	config.addPassthroughCopy({ "static": "/" });
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

	return {
		dir: { input: "source", output: "public" },
		dataTemplateEngine: "njk",
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
		templateFormats: ["html", "njk", "md"],
	}
};
