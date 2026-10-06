import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const login = String(body.login ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    if (!login || !password) {
      return NextResponse.json(
        { error: "Please enter your username/email and password." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username: login },
          { email: login },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid username/email or password." },
        { status: 401 },
      );
    }

    const passwordIsValid = await verifyPassword(
      password,
      user.passwordHash,
    );

    if (!passwordIsValid) {
      return NextResponse.json(
        { error: "Invalid username/email or password." },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      message: "Login successful.",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Something went wrong while logging in." },
      { status: 500 },
    );
  }
}
