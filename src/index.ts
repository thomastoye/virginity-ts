import { formatters } from './formatters';

const fold = (data: string) => {
    const parts = data.match(/[\s\S]{1,75}/g) || [];
    return parts.join('\r\n ');
};

interface ContactFormat {
    name?: { last?: string, first?: string, additional?: ReadonlyArray<string>, prefix?: string, suffix?: ReadonlyArray<string> };
    adr?: ReadonlyArray<{ type?: string, country?: string, street: string, city: string, zip: string, state?: string }>;
    bday?: string; // yyyy-mm-dd
    categories?: ReadonlyArray<string>;
    email?: ReadonlyArray<{ type?: string, preferred?: boolean, address: string }>;
    nickname?: ReadonlyArray<string>;
    note?: string;
    org?: { company: string, suborg1?: string, suborg2?: string };
    title?: string;
    photo?: { type: 'uri' | 'base64' | string, ext: string, photo: string };
    tel?: ReadonlyArray<{ type: 'cell' | 'home' | 'work' | string, pref?: boolean, number: string }>;
    url?: ReadonlyArray<{ type?: string, url: string }>;
    im?: ReadonlyArray<{ type: 'yahoo' | 'google' | 'aim' | 'skype' | 'qq' | 'msn' | 'icq' | 'jabber' | string, name: string }>;
}

export const compile = (data: ContactFormat) => {
    const elements: string[] = [];
    const head = 'BEGIN:VCARD\r\nVERSION:3.0';
    elements.push(head);

    if (data.name && data.hasOwnProperty('name')) {
        elements.push(formatters.name(data.name));
        elements.push(formatters.formattedName(data.name));
    }

    if (data.adr && data.hasOwnProperty('adr')) {
        const address = data.adr.map(address => formatters.adr(address));

        elements.push(...address);
    }

    if (data.bday && data.hasOwnProperty('bday')) {
        elements.push(formatters.bday(data.bday));
    }

    if (data.categories && data.hasOwnProperty('categories')) {
        elements.push(formatters.categories(data.categories));
    }

    if (data.email && data.hasOwnProperty('email')) {
        const email = data.email.map(emailAddress => formatters.email(emailAddress));

        elements.push(...email);
    }

    if (data.nickname && data.hasOwnProperty('nickname')) {
        elements.push(formatters.nickname(data.nickname));
    }

    if (data.note && data.hasOwnProperty('note')) {
        elements.push(formatters.note(data.note));
    }

    if (data.org && data.hasOwnProperty('org')) {
        elements.push(formatters.org(data.org));
    }

    if (data.title && data.hasOwnProperty('title')) {
        elements.push(formatters.title(data.title));
    }

    if (data.photo && data.hasOwnProperty('photo')) {
        elements.push(formatters.photo(data.photo));
    }

    if (data.tel && data.hasOwnProperty('tel')) {
        const tel = data.tel.map(telephone => formatters.tel(telephone));

        elements.push(...tel);
    }

    if (data.url && data.hasOwnProperty('url')) {
        const url = data.url.map((u, index) => formatters.url(u, index + 1));
        elements.push(...url);
    }

    if (data.im && data.hasOwnProperty('im')) {
        const im = data.im.map(imObject => formatters.im(imObject)).filter(x => x);

        elements.push(...(im as string[]));
    }

    elements.push('END:VCARD');

    const newLine = '\r\n';
    const folded = elements.map(fold);
    const joined = folded.join(newLine);

    return joined;
};
