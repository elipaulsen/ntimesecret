import { decrypt as dc, encode, encrypt as ec } from 'iso-crypto';

export const encrypt = async (plaintext: string, passcode: string) => {
    const e = await ec(
        {
            data: plaintext,
            secret: passcode
        },
        {
            hash: { algorithm: 'SHA1' },
            encryption: {
                cipher: 'AES',
                size: 192,
                mode: 'CBC'
            }
        }
    );
    return e;
};

export const decrypt = async (cipher: string, passcode: string, iv: string) => {
    const d = await dc(
        {
            encrypted: cipher,
            iv,
            secret: passcode
        },
        {
            hash: { algorithm: 'SHA1' },
            encryption: {
                cipher: 'AES',
                size: 192,
                mode: 'CBC'
            }
        }
    );
    return d;
};

export const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('copied to clipboard!');
};
