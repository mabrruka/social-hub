
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/auth/session";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const allowedTypes: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
};

export async function PATCH(request: Request) {
    try {
        const userId = await getSessionUserId();

        if (!userId) {
            return NextResponse.json(
                { error: "Please sign in first." },
                { status: 401 },
            );
        }

        const formData = await request.formData();
        const bioValue = formData.get("bio");
        const avatar = formData.get("avatar");

        if (typeof bioValue !== "string" || bioValue.length > 300) {
            return NextResponse.json(
                { error: "Your bio must be 300 characters or fewer." },
                { status: 400 },
            );
        }

        const updateData: {
            bio: string | null;
            avatarUrl?: string;
        } = {
            bio: bioValue.trim() || null,
        };

        if (avatar instanceof File && avatar.size > 0) {
            const extension = allowedTypes[avatar.type];

            if (!extension) {
                return NextResponse.json(
                    { error: "Choose a JPG, PNG, WebP, or GIF image." },
                    { status: 400 },
                );
            }

            if (avatar.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: "Your photo must be 5 MB or smaller." },
                    { status: 400 },
                );
            }

            const uploadDirectory = path.join(
                process.cwd(),
                "public",
                "uploads",
            );

            await mkdir(uploadDirectory, { recursive: true });

            const filename = `${randomUUID()}${extension}`;

            await writeFile(
                path.join(uploadDirectory, filename),
                Buffer.from(await avatar.arrayBuffer()),
            );

            updateData.avatarUrl = `/uploads/${filename}`;
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: updateData,
            select: {
                id: true,
                firstName: true,
                lastName: true,
                username: true,
                bio: true,
                avatarUrl: true,
            },
        });

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Profile update error:", error);

        return NextResponse.json(
            { error: "Unable to update your profile." },
            { status: 500 },
        );
    }
}
