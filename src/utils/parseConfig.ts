import type {InputType} from 'actions-toolkit/lib/inputs';
import type {InterfaceConfiguration} from '../@typings';
import path from 'node:path';

/**
 * Parse github args
 * @param {string} workspacePath Workspace path
 * @param {InputType} inputs Input Args
 * @return {InterfaceConfiguration} parsed config
 */
export const parseConfig = (
	workspacePath: string,
	inputs: InputType,
): InterfaceConfiguration => {
	const config: InterfaceConfiguration = {
		files: [],
		pdfPath: '',
	};

	if (typeof inputs.pdfPath === 'string') {
		config.pdfPath = path.resolve(workspacePath, inputs.pdfPath);
	}

	if (typeof inputs.files === 'string') {
		config.files = inputs.files.split('##');
	}

	if (!config.files?.length) {
		config.files = ['docx', 'odt', 'doc'];
	} else if (!config.pdfPath?.length) {
		config.pdfPath = path.resolve(
			workspacePath,
			'converted__docauto.pdf',
		);
	}

	return config;
};
