import {Toolkit} from 'actions-toolkit';
import {ILovePDF} from 'ilovepdf-freedom';
import path from 'node:path';
import {mergePdfFiles, officeToPdfMany} from './functions';
import {findFiles, parseConfig} from './utils';

Toolkit.run(async tool => {
	const workspacePath = path.resolve(tool.workspace);
	tool.log.info('Workspace path detected:', workspacePath);

	const config = parseConfig(workspacePath, tool.inputs);
	tool.log.debug('Config:');
	tool.log.debug(config);

	let findedFiles = await findFiles(workspacePath, config.files);
	findedFiles = findedFiles.filter(fl => fl.trim() !== config.pdfPath.trim());

	tool.log.debug('Finded files:');
	tool.log.debug(findedFiles);

	tool.log.warn('Converting', findedFiles.length, 'to pdf!');
	const ilovepdf = new ILovePDF();
	findedFiles = (await officeToPdfMany(ilovepdf, findedFiles))
		.filter(x => typeof x === 'string') as string[];

	tool.log.debug(findedFiles.length, 'files converted');
	const merged = await mergePdfFiles(ilovepdf, findedFiles, config.pdfPath);

	if (merged) {
		tool.log.success(`Successfuly merging ${findedFiles.length} files`);

		try {
			await tool.exec('git', [
				'config',
				'--global',
				'user.email',
				'github-actions[bot]@users.noreply.github.com',
			]);
			await tool.exec('git', [
				'config',
				'--global',
				'user.name',
				'github-actions[bot]',
			]);
			await tool.exec('git', [
				'add',
				'.',
			]);
			await tool.exec('git', [
				'commit',
				'-m',
				'docauto: success merge',
			]);
			await tool.exec('git', ['push']);

			tool.exit.success('Done!');
		} catch (error: unknown) {
			tool.exit.failure((error as Error).message);
		}
	} else {
		tool.exit.failure('Fail to merge!');
	}
}).catch(() => process.exit(1));
