import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../services/firebase';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData | Error>
) {
  if (req.method === 'GET') {
    const { id } = req.query;

    let products: DocumentData = {};

    const snapshot = await getDoc(doc(db, 'products', `${id}`));

    if (!snapshot.exists()) {
      res.status(404).json({
        name: `Error status ${res.statusCode}`,
        message: 'Product not found',
      });
      return;
    }

    products = {
      id: snapshot.id,
      data: snapshot.data(),
    };

    res.status(200).json(products);
  } else if (req.method === 'PUT') {
    const { id } = req.query;

    const data = req.body;

    await updateDoc(doc(db, 'products', `${id}`), data);

    let products: DocumentData = {};

    const snapshot = await getDoc(doc(db, 'products', `${id}`));

    if (snapshot.exists()) {
      products = {
        id: snapshot.id,
        data: snapshot.data(),
      };
    }

    res.status(200).json(products);
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    await deleteDoc(doc(db, 'products', `${id}`));

    const snapshot = await getDoc(doc(db, 'products', `${id}`));

    if (!snapshot.exists()) {
      res.status(200).json({ message: 'Deletado com sucesso!' });
    }
  } else {
    res.status(405).json({
      name: `Error status ${res.statusCode}`,
      message: 'Method Not Allowed',
    });
  }
}
