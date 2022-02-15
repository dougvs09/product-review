import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@services/firebase';
import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from 'firebase/firestore';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DocumentData | Error>
) {
  const { id } = req.query;

  const data = req.body;

  if (req.method === 'GET') {
    let products: DocumentData = {};

    const snapshot = await getDoc(doc(db, 'products', `${id}`));

    if (!snapshot.exists()) {
      res.status(404).json({
        error: {
          name: `Error status ${res.statusCode}`,
          message: 'Product not found',
        },
      });
      return;
    }

    products = {
      id: snapshot.id,
      data: snapshot.data(),
    };

    res.status(200).json(products);
  } else if (req.method === 'PUT') {
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
    await deleteDoc(doc(db, 'products', `${id}`));

    const snapshot = await getDoc(doc(db, 'products', `${id}`));

    if (!snapshot.exists()) {
      res.status(200).json({ message: 'Successfully deleted' });
    }
  } else {
    res.status(405).json({
      error: {
        name: `Error status ${res.statusCode}`,
        message: 'Method Not Allowed',
      },
    });
  }
}
