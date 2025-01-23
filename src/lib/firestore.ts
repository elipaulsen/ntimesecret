import { db } from '$lib/firebase.ts';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';

export interface SecretDocument {
    uuid: string;
    secret: string;
    n: number;
    createdAt: Date;
    expiresAt: Date;
    passcode: string;
}

export const saveSecret = async (secret: SecretDocument) => {
    try {
      await setDoc(doc(collection(db, "secrets"), secret.uuid), secret);
    } catch (e) {
      console.error('Error adding document: ', e);
      throw new Error('Error adding document');
    }
};

export const getSecret = async (uuid: string): Promise<SecretDocument | null> => {
    try {
      // Query Firestore for the document where uuid matches
      const secretsCollection = collection(db, 'secrets');
      const q = doc(secretsCollection, uuid); // Use uuid as the document ID
      const docSnapshot = await getDoc(q);
  
      if (docSnapshot.exists()) {
        console.log("yipee")
        const secretData: SecretDocument = docSnapshot.data() as SecretDocument;
        return secretData;
      } else {
        console.log("err")
        return null;
      }
    } catch (e) {
      console.error('Error retrieving document: ', e);
      throw new Error('Error retrieving document');
    }
  };