'use strict';
const readLine = require('readline');
const repeat = require('repeat-string');
const jetpack = require('fs-jetpack');

let curDepth = 0;

module.exports = {
	format: (file, options) => {
		return new Promise(async (resolve, reject) => {
			if (typeof file !== 'string') {
				reject(new TypeError(`Expected a string, got ${typeof file}`));
				return;
			}

			if (!jetpack.exists(file)) {
				reject(new TypeError(`File does not exist: ${file}`));
				return;
			}

			const opts = Object.assign({
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
						indent = endBlock(opts);
					} else {
						indent = startBlock(opts);
					}
				} else {
					indent = getIndent(opts);
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

function startBlock(opts) {
	const indent = getIndent(opts);
	curDepth += 1;
	return indent;
}

function endBlock(opts) {
	curDepth -= 1;
	return getIndent(opts);
}

function getIndent(opts) {
	let tab = ' ';
	if (opts.useTabs) {
		tab = '\t';
	}
	return repeat(tab, opts.tabWidth * curDepth);
}
