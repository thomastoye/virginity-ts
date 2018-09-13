const escape = (str: string | undefined) => {
    if (!(typeof str === 'string')) {
        return '';
    }

    return str
        .replace(/\n/g, '\\n')
        .replace(/,/g, '\\,')
        .replace(/;/g, '\\;');
};

const escapeThenJoin = (array: ReadonlyArray<string>, joinChar: string) => array.map((d) => escape(d)).join(joinChar);

const imLookup: { [key: string]: string } = {
    yahoo: 'X-YAHOO:',
    google: 'X-GTALK:',
    aim: 'X-AIM:',
    skype: 'X-SKYPE:',
    qq: 'X-QQ:',
    msn: 'X-MSN:',
    icq: 'X-ICQ:',
    jabber: 'X-JABBER:',
};

export const formatters = {
    name: (data: { last?: string, first?: string, additional?: ReadonlyArray<string>, prefix?: string, suffix?: ReadonlyArray<string> }) => {
        const base = 'N:';
        const last = (data.last) ? escape(data.last) : '';
        const first = (data.first) ? escape(data.first) : '';
        const additional = (data.additional) ? escapeThenJoin(data.additional, ' ') : '';
        const prefix = (data.prefix) ? escape(data.prefix) : '';
        const suffix = (data.suffix) ? escapeThenJoin(data.suffix, ',') : '';
        const n = [last, first, additional, prefix, suffix].join(';');
        return base + n;
    },
    formattedName: (data: { last?: string, first?: string, additional?: ReadonlyArray<string>, prefix?: string, suffix?: ReadonlyArray<string> }) => {
        const base = 'FN:';
        const prefix = (data.prefix) ? escape(data.prefix) : '';
        const first = (data.first) ? escape(data.first) : '';
        const additional = (data.additional) ? escapeThenJoin(data.additional, ' ') : '';
        const last = (data.last) ? escape(data.last) : '';
        const suffix = (data.suffix) ? '\\, ' + escapeThenJoin(data.suffix, '\\, ') : '';
        const items = [prefix, first, additional, last].filter(d => d !== '');
        return base + items.join(' ') + suffix;
    },
    adr: (data: { type?: string, country?: string, street: string, city: string, zip: string, state?: string }) => {
        const base = 'ADR';
        let type = (data.type) ? data.type : '';
        type = 'TYPE=' + type + ':';
        const country = (data.country) ? data.country : '';
        const address = [base, type, '', escape(data.street), escape(data.city), escape(data.state), escape(data.zip), escape(country)].join(';');
        return address;
    },
    bday: (data: string) => {
        // for now, assume that date is coming in formatted yyyy-mm-dd
        const base = 'BDAY:';
        return base + data;
    },
    categories: (data: ReadonlyArray<string>) => {
        const base = 'CATEGORIES:';
        const categories = escapeThenJoin(data, ',');
        return base + categories;
    },
    email: (data: { type?: string, preferred?: boolean, address: string }) => {
        const base = 'EMAIL;';
        let type = (data.type) ? 'TYPE=' + escape(data.type) : 'TYPE=';
        if (data.preferred) {
            type += ',pref';
        }
        type += ':';
        const address = escape(data.address);
        return base + type + address;
    },
    nickname: (data: ReadonlyArray<string>) => {
        const base = 'NICKNAME:';
        const names = escapeThenJoin(data, ',');
        return base + names;
    },
    note: (data: string) => {
        const base = 'NOTE:';
        const note = escape(data);
        return base + note;
    },
    org: (data: { company: string, suborg1?: string, suborg2?: string }) => {
        const base = 'ORG:';
        const company = (data.company) ? escape(data.company) : '';
        const suborg1 = (data.suborg1) ? escape(data.suborg1) : '';
        const suborg2 = (data.suborg2) ? escape(data.suborg2) : '';
        return base + [company, suborg1, suborg2].join(';');
    },
    title: (data: string) => {
        const base = 'TITLE:';
        return base + escape(data);
    },
    photo: (data: { type: string, ext: string, photo: string }) => {
        const base = 'PHOTO;';
        let meta;
        if (data.type === 'uri') {
            meta = 'VALUE=uri:';
        } else {
            meta = 'ENCODING=b;TYPE=' + data.ext + ':';
        }
        return base + meta + data.photo;
    },
    tel: (data: { type: 'cell' | 'home' | 'work' | string, pref?: boolean, number: string }) => {
        const base = 'TEL;';
        let type = (data.type) ? escape(data.type) : '';
        type = 'TYPE=' + type;
        if (data.pref) {
            type += ',pref:';
        } else {
            type += ':';
        }
        return base + type + escape(data.number);
    },
    url: (data: { type?: string, url: string }, i: number) => {
        const item = 'item' + i;
        const url = item + '.URL:' + data.url;
        let label = item + '.X-ABLabel:';
        if (data.type === 'homepage') {
            label += '_$!<HomePage>!$_';
        } else {
            label += escape(data.type);
        }
        return url + '\r\n' + label;
    },
    im: (data: { type: string, name: string }) => {
        if (imLookup.hasOwnProperty(data.type)) {
            return (imLookup[data.type] as string) + escape(data.name);
        } else {
            return false;
        }
    },
};
