import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    const username = String(body.username ?? "").trim().toLowerCase();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");
    const confirmPassword = String(body.confirmPassword ?? "");
    const dateOfBirth = String(body.dateOfBirth ?? "");

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !password ||
      !confirmPassword ||
      !dateOfBirth
    ) {
      return NextResponse.json(
        { error: "Please fill in all fields." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters." },
        { status: 400 },
      );
    }

    const birthDate = new Date(dateOfBirth);

    if (Number.isNaN(birthDate.getTime())) {
      return NextResponse.json(
        { error: "Please enter a valid date of birth." },
        { status: 400 },
      );
    }

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 &&
        today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 13) {
      return NextResponse.json(
        { error: "You must be at least 13 years old to use Social Hub." },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return NextResponse.json(
          { error: "That username is already taken." },
          { status: 409 },
        );
      }

      return NextResponse.json(
        { error: "That email is already registered." },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        passwordHash,
        dateOfBirth: birthDate,
      },
    });

    await createSession(user.id);

    return NextResponse.json(
      {
        message: "Account created successfully.",
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Something went wrong while creating your account." },
      { status: 500 },
    );
  }
}

