import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string().min(1),
  time: z.string().min(1),
  visitors: z.string().min(1),
  message: z.string().optional(),
  property: z.string().min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: "Validation failed", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    console.log("[visit] request received:", {
      property: data.property,
      name: data.name,
      date: data.date,
      time: data.time,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Visit request received. Our team will confirm availability shortly.",
    });
  } catch (err) {
    console.error("[visit] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
