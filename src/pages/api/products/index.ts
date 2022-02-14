import type { NextApiRequest, NextApiResponse } from 'next';
import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../services/firebase';

type ProductsData = {
  name: string;
  price: string;
  category: string;
  description: string;
  rating: number;
  brand: string;
  picture: string;
  createdAt: string;
  dayOfPurchase: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductsData | Error | DocumentData>
) {
  if (req.method === 'POST') {
    const {
      name,
      description,
      price,
      category,
      rating,
      brand,
      picture,
      createdAt,
      dayOfPurchase,
    }: ProductsData = req.body;

    if (!name || !price || !category) {
      res.status(400).json({
        name: `Error status ${res.statusCode}`,
        message: 'Missing data',
      });
    }

    const data = {
      name,
      price,
      category,
      description,
      rating,
      brand,
      picture,
      createdAt,
      dayOfPurchase,
    };

    await addDoc(collection(db, 'products'), data);

    res.status(200).json(data);
  } else if (req.method === 'GET') {
    const { category } = req.query;

    const products: DocumentData = [];

    if (category) {
      const snapshot = await getDocs(
        query(
          collection(db, 'products'),
          where('category', '==', `${category}`)
        )
      );
      snapshot.forEach((doc) => {
        const productsWithId = {
          id: doc.id,
          data: doc.data(),
        };
        products.push(productsWithId);
      });
    }

    const snapshot = await getDocs(collection(db, 'products'));
    snapshot.forEach((doc) => {
      const productsWithId = {
        id: doc.id,
        data: doc.data(),
      };
      products.push(productsWithId);
    });

    res.status(200).json(products);
  } else {
    res.status(405).json({
      name: `Error status ${res.statusCode}`,
      message: 'Method Not Allowed',
    });
  }
}
