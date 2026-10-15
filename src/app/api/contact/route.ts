import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  service: z.string().min(1),
  projectType: z.string().min(1),
  budget: z.string().min(1),
  contactMethod: z.string().min(1),
  message: z.string().min(10),
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

    // In a production app you would persist this to a database and/or send
    // an email notification. For this demo we simply acknowledge receipt.
    const data = parsed.data;
    console.log("[contact] inquiry received:", {
      name: data.fullName,
      email: data.email,
      service: data.service,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry received. Our team will contact you within one business day.",
    });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
