module.exports = {
	svgbob: require("./svgbob"),
	dateISO: (date) => date.toISOString(),
	dateFormatYYYY_MM_DD: (date) => new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(date),
	urlAbsolute: (path, base) => new URL(path, base).toString(),
	encodeURI: (input) => encodeURI(input),
	includes: (item, collection) => collection.includes(item),
	collectionNewestDateItem: (collection) => (!collection || !collection.length) ? new Date() : new Date(Math.max(...(collection || []).map(item => item.date))),
	collectionLive: (collection) => collection.filter(p => p.date <= new Date()),
	collectionDraft: (collection) => collection.filter(p => p.data.draft),
	collectionNotDraft: (collection) => collection.filter(p => !p.data.draft)
}
