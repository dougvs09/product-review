import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@services/firebase';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

type ProductsData = {
  name: string;
  price: string;
  category: string;
  description: string;
  rating: number;
  brand: string;
  file: Blob;
  createdAt: Date;
  dayOfPurchase: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsData | Error | DocumentData>
) {
  const {
    name,
    description,
    price,
    category,
    rating,
    brand,
    file,
    dayOfPurchase,
  }: ProductsData = req.body;

  const { filter } = req.query;
  if (req.method === 'POST') {
    if (
      !name ||
      !price ||
      !category ||
      !rating ||
      !brand ||
      !dayOfPurchase ||
      !description
    ) {
      res.status(400).json({
        name: `Error status ${res.statusCode}`,
        message: 'Missing data',
      });
    }

    const picture = file;

    const data = {
      name,
      price,
      category,
      description,
      rating,
      brand,
      picture: picture || null,
      createdAt: new Date(),
      dayOfPurchase,
    };

    await addDoc(collection(db, 'products'), data);

    res.status(200).json(data);
  } else if (req.method === 'GET') {
    const products: DocumentData = [];

    if (category) {
      const snapshot = await getDocs(
        query(collection(db, 'products'), where('category', '==', `${filter}`))
      );
      snapshot.forEach((doc) => {
        const productsWithId = {
          id: doc.id,
          data: doc.data(),
        };
        products.push(productsWithId);
      });
    } else {
      const snapshot = await getDocs(collection(db, 'products'));
      snapshot.forEach((doc) => {
        const productsWithId = {
          id: doc.id,
          data: doc.data(),
        };
        products.push(productsWithId);
      });
    }

    res.status(200).json(products);
  } else {
    res.status(405).json({
      name: `Error status ${res.statusCode}`,
      message: 'Method Not Allowed',
    });
  }
}
