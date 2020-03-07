import * as moment from 'moment';

export default class FormatHelper {
    static getDateVal(d: any): Date {
        try {
            if (d) {
                return d.substr(0, 10);
            }
        } catch (e) {
            console.log(e);
        }
    }

    static formatDate(params) {
        if (params.value) {
            return moment(params.value).format('MM-DD-YYYY');
        }
    }

    static parseNumber(rawData: any): number | '' {
        // tslint:disable:curly
        if (typeof rawData === 'number') return rawData;

        if (isNaN(rawData) || typeof rawData === 'undefined') return '';

        if (typeof rawData === 'string' && isNaN(Number(rawData))) {
            return '';
        } else if (typeof rawData === 'string') {
            return Number(rawData);
        }
        return '';
        // tslint:enable:curly
    }
}
