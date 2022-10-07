import {Toolkit} from 'actions-toolkit';
import path from 'node:path';
import {findFiles, parseConfig} from './utils';

Toolkit.run(async tool => {
	const workspacePath = path.resolve(tool.workspace);
	tool.log.info('Workspace path detected:', workspacePath);

	const config = parseConfig(workspacePath, tool.inputs);
	tool.log.debug(config);

	const findedFiles = await findFiles(workspacePath, config.files);
	tool.log.debug(findedFiles);
}).catch(() => process.exit(1));
