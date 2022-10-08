import type {ILovePDF} from 'ilovepdf-freedom';
import {readFile} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {saveBufferToFile} from './saveBufferToFile';

export const officeToPdf = async (
	filePath: string,
	ilovepdfInstance: ILovePDF,
): Promise<string | undefined> => {
	if (path.basename(filePath).endsWith('.pdf')) {
		const fileOutput = path.resolve(tmpdir(), path.basename(filePath));
		const dlBuf = await readFile(filePath);
		await saveBufferToFile(fileOutput, dlBuf);

		return fileOutput;
	}

	const task = await ilovepdfInstance.newTask('officepdf');
	if (!task) {
		return undefined;
	}

	await task.addFileLocal(filePath, path.basename(filePath));
	await task.process({});

	const dlBuf = await (task.download as () => Promise<Buffer | undefined>)();
	if (!dlBuf) {
		return undefined;
	}

	const fileOutput = path.resolve(tmpdir(), path.basename(filePath));
	await saveBufferToFile(fileOutput, dlBuf);
	return fileOutput;
};
