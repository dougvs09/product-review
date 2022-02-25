import { NextRequest, NextResponse } from 'next/server';

import { User } from '@contexts/AuthContext';
import jwtDecode from 'jwt-decode';

export default function middleware(req: NextRequest) {
  const token = req.headers.get('Authorization');

  if (!token) {
    return new Response(JSON.stringify({ message: 'Missing token' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const separateToken = token.split(' ');

  if (separateToken.length !== 2) {
    return new Response(JSON.stringify({ message: 'Token malformated' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const authorized = jwtDecode<User>(token);
  if (authorized === null || authorized === undefined) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return NextResponse.next();
}
