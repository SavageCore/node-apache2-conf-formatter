import test from 'ava';
import m from '..';

const jetpack = require('fs-jetpack');

/* eslint ava/no-skip-test: 0 */

test('throws on incorrect input', async t => {
	const number = await t.throws(m.format(123));
	t.is(number.message, 'Expected a string, got number');

	const res = await t.throws(m.format());
	t.is(res.message, 'Expected a string, got undefined');
});

test('throws on file not found', async t => {
	const format = await t.throws(m.format('test/fixture/missing.txt'));
	t.is(format.message, 'File does not exist: test/fixture/missing.txt');
});

test('default options', async t => {
	const formatted = await m.format('test/fixture/default.txt');
	const output = await jetpack.readAsync('test/fixture/output/default.txt');
	t.is(formatted, output);
});

test('set indentation style', async t => {
	const formatted = await m.format('test/fixture/tab.txt', {useTabs: true});
	const output = await jetpack.readAsync('test/fixture/output/tab.txt');
	t.is(formatted, output);
});

test('set indentation width', async t => {
	const formatted = await m.format('test/fixture/tabwidth.txt', {tabWidth: 4});
	const output = await jetpack.readAsync('test/fixture/output/tabwidth.txt');
	t.is(formatted, output);
});

test('trims line', async t => {
	const formatted = await m.format('test/fixture/trim.txt');
	const output = await jetpack.readAsync('test/fixture/output/trim.txt');
	t.is(formatted, output);
});
