import * as fs from 'node:fs/promises';

export const saveBufferToFile = async (
	filePath: string,
	data: Buffer,
): Promise<boolean> => {
	const write = await fs.writeFile(filePath, data).catch(e => e as Error);

	return write === undefined;
};
