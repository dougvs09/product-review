import { NextRequest, NextResponse } from 'next/server';

import { User } from '@contexts/AuthContext';
import jwtDecode from 'jwt-decode';

export default function middleware(req: NextRequest) {
  const { token } = req.cookies;
  if (!token) {
    return NextResponse.redirect('http://localhost:3000');
  }

  const authorized = jwtDecode<User>(token);

  if (authorized === null || authorized === undefined) {
    return NextResponse.redirect('http://localhost:3000');
  }
  return NextResponse.next();
}
