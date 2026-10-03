import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { getToken } = await auth();

  const token = await getToken();

  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { message: "NEXT_PUBLIC_BASE_URL belum dikonfigurasi" },
      { status: 500 }
    );
  }

  const response = await fetch(`${apiUrl}/instagram`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    redirect: "manual",
  });

  const location = response.headers.get("location");

  if (!location) {
    const body = await response.text();

    return new NextResponse(body, {
      status: response.status,
      headers: {
        "Content-Type":
          response.headers.get("content-type") ||
          "application/json",
      },
    });
  }

  return NextResponse.json({
    url: location,
  });
}