import fs from 'node:fs/promises';

/**
 * Find files function
 * @param {string} workspacePath Current workspace path
 * @param {string[]} filesMatch Files Match config
 * @return {Promise<string[]>}
 */
export const findFiles = async (
	workspacePath: string,
	filesMatch: string[],
): Promise<string[]> => {
	const files: string[] = await fs.readdir(workspacePath);
	const filesMatchRegex = new RegExp(`.(${filesMatch.join('|')})`, 'gi');

	return files.filter(file => filesMatchRegex.test(file));
};
