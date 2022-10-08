import type {ILovePDF} from 'ilovepdf-freedom';
import path from 'node:path';
import {saveBufferToFile} from './saveBufferToFile';

export const mergePdfFiles = async (
	ilovepdf_instance: ILovePDF,
	pdfFiles: string[],
	outputPath: string,
): Promise<string | undefined> => {
	const task = await ilovepdf_instance.newTask('merge');
	if (!task) {
		return undefined;
	}

	await Promise.all(pdfFiles.map(async fl => task.addFileLocal(fl, path.basename(fl))));
	await task.process({});

	const dlBuf = await (task.download as () => Promise<Buffer | undefined>)();
	if (!dlBuf) {
		return undefined;
	}

	await saveBufferToFile(outputPath, dlBuf);
	return outputPath;
};
