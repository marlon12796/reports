import { type StyleDictionary, type TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './section/header.section';
import { DateFormatter } from 'src/common/helpers/date-formatter';

const styles: StyleDictionary = {
	header: {
		fontSize: 22,
		bold: true,
		alignment: 'center',
		margin: [0, 50, 0, 20],
	},
	body: {
		fontSize: 16,
		margin: [0, 70],
	},
	signature: {
		fontSize: 14,
		bold: true,
		marginBottom: 2,
	},
	footer: {
		fontSize: 10,
		italics: true,
		alignment: 'center',
		margin: [0, 20],
	},
};
interface ReportValues {
	employerName: string;
	employerPosition: string;
	employerCompany: string;
	employeeName: string;
	employeePosition: string;
	employeeStartDate: Date;
	employeeHours: number;
	employeeWorkSchedule: string;
}
export const getEmploymentLetterByIdReport = (reportValues: ReportValues): TDocumentDefinitions => {
	const {
		employeeHours,
		employeeName,
		employeePosition,
		employeeStartDate,
		employeeWorkSchedule,
		employerCompany,
		employerName,
		employerPosition,
	} = reportValues;
	const doc: TDocumentDefinitions = {
		styles,
		pageMargins: [40, 60],
		header: headerSection({}),
		content: [
			{ text: 'CONSTANCIA DE EMPLEO', style: 'header' },
			{
				text: `Yo,${employerName}, en mi calidad de ${employerPosition} de ${employerCompany}, por medio de la presente certifico que ${employeeName} ha sido empleado en nuestra empresa desde el ${DateFormatter.getDDMMYYYY(employeeStartDate)}. \n\n
        Durante su empleo, el Sr(a). ${employeeName} ha desempeñado el cargo de ${employeePosition} , demostrando responsabilidad, compromiso y habilidades profesionales en sus labores.\n\n
        La jornada laboral del Sr(a). ${employeeName} es de ${employeeHours} horas semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y procedimientos establecidos por la empresa.\n\n
        Esta constancia se expide a solicitud del interesado para los fines que considere conveniente. \n\n`,
			},
			{ text: `Atentamente`, style: 'signature' },
			{ text: employerName, style: 'signature' },
			{ text: employerPosition, style: 'signature' },
			{ text: employerCompany, style: 'signature' },
			{ text: DateFormatter.getDDMMYYYY(new Date()), style: 'signature' },
		],
		footer: {
			text: 'Este documento es una constancia de empleo y no representa un compromiso laboral.',
			style: 'footer',
		},
	};
	return doc;
};
