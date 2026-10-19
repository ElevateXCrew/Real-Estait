import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendNotificationEmail } from "@/lib/email";

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

    const data = parsed.data;

    console.log("[contact] inquiry received:", {
      name: data.fullName,
      email: data.email,
      service: data.service,
      timestamp: new Date().toISOString(),
    });

    const email = await sendNotificationEmail({
      formType: "Contact Inquiry",
      userName: data.fullName,
      userEmail: data.email,
      userPhone: data.phone,
      formData: {
        name: data.fullName,
        email: data.email,
        phone: data.phone,
        service: data.service,
        projectType: data.projectType,
        budget: data.budget,
        preferredContactMethod: data.contactMethod,
        message: data.message,
      },
    });

    if (email.sent === false && email.reason === "failed") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Your inquiry could not be sent right now. Please try again or contact us directly by phone or email.",
        },
        { status: 502 }
      );
    }

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
