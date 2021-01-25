const { titleCase } = require('title-case');

const tagLabelMapping = new Map([
	['css', 'CSS'],
	['javascript', 'JavaScript'],
	['webgl', 'WebGL'],
]);

module.exports = (eleventyConfig) => {
	eleventyConfig.addFilter('formatTag', (tag) => {
		if (tagLabelMapping.has(tag)) {
			return tagLabelMapping.get(tag);
		}
	
		return titleCase(tag);
	});
    
    return { dir: { input: 'src/site' } };
};
