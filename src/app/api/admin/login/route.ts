import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || '123456';

    if (username === expectedUser && password === expectedPass) {
      return NextResponse.json({ success: true, token: 'authenticated' });
    }

    return NextResponse.json(
      { success: false, error: 'Tên đăng nhập hoặc mật khẩu không chính xác.' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error during login' }, { status: 500 });
  }
}
