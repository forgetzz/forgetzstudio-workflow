import { NextRequest, NextResponse } from "next/server";

import {
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";

import {
    getSignedUrl,
} from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
    region: "auto",

    endpoint:
        `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,

    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
});

export async function POST(
    req: NextRequest,
) {
    try {
        const {
            fileName,
            contentType,
        } = await req.json();

        if (!fileName || !contentType) {
            return NextResponse.json(
                {
                    message: "fileName dan contentType wajib",
                },
                {
                    status: 400,
                },
            );
        }

        const key =
            `videos/${crypto.randomUUID()}-${fileName}`;
        const videoUrl =
            `${process.env.R2_PUBLIC_URL}/${key}`;
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME!,
            Key: key,
            ContentType: contentType,
        });

        const uploadUrl = await getSignedUrl(
            r2,
            command,
            {
                expiresIn: 600,
            },
        );

        return NextResponse.json({
            uploadUrl,
            videoUrl,
            key,
        });

    } catch (error) {
        console.error("R2 ERROR:", error);

        return NextResponse.json(
            {
                message: "Gagal membuat presigned URL",
                error:
                    error instanceof Error
                        ? error.message
                        : String(error),
            },
            {
                status: 500,
            },
        );
    }
}