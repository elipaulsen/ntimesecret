import { db } from '$lib/firebase';
import { collection, doc, getDoc, increment, setDoc, updateDoc } from 'firebase/firestore';
//import { decrypt, encrypt } from './utils';

const secretsCollection = collection(db, 'secrets');

export interface SecretDocument {
    uuid: string;
    secret: string;
    n: number;
    createdAt: number;
    expiresAt: number;
    passcode: string;
}

export const saveSecret = async (secret: SecretDocument) => {
    try {
        if (secret.passcode) {
            //encrypt secret
        }
        await setDoc(doc(secretsCollection, secret.uuid), secret);
    } catch (e) {
        console.error('Error adding document: ', e);
        throw new Error('Error adding document');
    }
};

export const getSecret = async (uuid: string): Promise<SecretDocument | null> => {
    try {
        const docRef = doc(secretsCollection, uuid);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
            const secretData: SecretDocument = docSnapshot.data() as SecretDocument;
            if (secretData.passcode) {
                //decrypt secret
            }

            if (secretData.expiresAt >= new Date().getTime() && secretData.n >= 1) {
                await updateDoc(docRef, {
                    n: increment(-1)
                });
                return secretData;
            }
        }
        return null;
    } catch (e) {
        console.error('Error retrieving document: ', e);
        throw new Error('Error retrieving document');
    }
};
