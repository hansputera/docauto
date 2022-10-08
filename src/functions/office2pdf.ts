
import type {ILovePDF} from 'ilovepdf-freedom';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {saveBufferToFile} from './saveBufferToFile';

export const officeToPdf = async (
	filePath: string,
	ilovepdfInstance: ILovePDF,
): Promise<string | undefined> => {
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
