import type {ILovePDF} from 'ilovepdf-freedom';
import {officeToPdf} from './office2pdf';

export const officeToPdfMany = async (
	ilovepdf_instance: ILovePDF,
	officeFiles: string[],
): Promise<Array<string | undefined>> => Promise.all(officeFiles.map(async fl => officeToPdf(fl, ilovepdf_instance)));
