const EMAILJS_API = "https://api.emailjs.com/api/v1.0/email/send";

type EmailPayload = {
  formType: string;
  userName: string;
  userEmail: string;
  userPhone?: string;
  formData: Record<string, unknown>;
};

function formatFormData(data: Record<string, unknown>) {
  return Object.entries(data)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (c) => c.toUpperCase())
        .trim();
      return `${label}: ${String(value)}`;
    })
    .join("\n");
}

export type EmailResult =
  | { sent: true }
  | { sent: false; reason: "not-configured" | "failed"; error?: string };

export async function sendNotificationEmail(
  payload: EmailPayload
): Promise<EmailResult> {
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;
  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "myprojects.faraz@gmail.com";

  if (!publicKey || !serviceId || !templateId) {
    console.warn(
      "[email] EmailJS is not configured (missing EMAILJS_PUBLIC_KEY / EMAILJS_SERVICE_ID / EMAILJS_TEMPLATE_ID). Skipping email send."
    );
    return { sent: false, reason: "not-configured" };
  }

  try {
    const res = await fetch(EMAILJS_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        ...(privateKey ? { accessToken: privateKey } : {}),
        template_params: {
          to_email: toEmail,
          form_type: payload.formType,
          user_name: payload.userName,
          user_email: payload.userEmail,
          user_phone: payload.userPhone ?? "",
          form_data: formatFormData(payload.formData),
          submitted_at: new Date().toLocaleString("en-US"),
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("[email] EmailJS responded with an error:", res.status, text);
      return { sent: false, reason: "failed", error: `HTTP ${res.status}` };
    }

    return { sent: true };
  } catch (err) {
    console.error("[email] Failed to send email:", err);
    return {
      sent: false,
      reason: "failed",
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}
