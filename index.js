'use strict';
const readLine = require('readline');
const repeat = require('repeat-string');
const jetpack = require('fs-jetpack');

let curDepth = 0;

module.exports = {
	format: (file, options) => {
		return new Promise(async (resolve, reject) => { // eslint-disable-line no-async-promise-executor
			if (typeof file !== 'string') {
				reject(new TypeError(`Expected a string, got ${typeof file}`));
				return;
			}

			if (!jetpack.exists(file)) {
				reject(new TypeError(`File does not exist: ${file}`));
				return;
			}

			const options_ = Object.assign({
				useTabs: false,
				tabWidth: 2
			}, options);

			const lineReader = readLine.createInterface({
				input: jetpack.createReadStream(file)
			});

			let buffer = '';

			lineReader.on('line', line => {
				let indent = '';
				// Trim whitespace
				line = line.trim();
				if (line[0] === '<') {
					if (line[1] === '/') {
						indent = endBlock(options_);
					} else {
						indent = startBlock(options_);
					}
				} else {
					indent = getIndent(options_);
				}

				if (line.length === 0) {
					indent = '';
				}

				buffer += `${indent}${line}\n`;
			}).on('close', () => {
				resolve(buffer);
			});
		});
	}
};

function startBlock(options) {
	const indent = getIndent(options);
	curDepth += 1;
	return indent;
}

function endBlock(options) {
	curDepth -= 1;
	return getIndent(options);
}

function getIndent(options) {
	let tab = ' ';
	if (options.useTabs) {
		tab = '\t';
	}

	return repeat(tab, options.tabWidth * curDepth);
}
