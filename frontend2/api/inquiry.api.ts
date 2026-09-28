/**
 * Protected & Centralized API Service for Inquiry Operations
 */

export type InitiativeScope =
  | "AI & Automation"
  | "Custom CRM / ERP"
  | "Web & Mobile Apps"
  | "Executive Dashboards"
  | "Every Second AI"
  | "General Advisory"
  | "Product Partnership";

export type InquiryType = "CONSULTATION" | "URGENT_RFP";

export interface CreateInquiryInput {
  fullName: string;
  company: string;
  workEmail: string;
  phone: string;
  initiativeScope: InitiativeScope[];
  technicalSpecifications: string;
  type?: InquiryType;
}

export interface InquiryApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Sanitizes input string to prevent potential XSS/injection attacks.
 */
function sanitizeInput(input: string): string {
  if (!input) return "";
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Sends inquiry data to backend securely.
 */
export async function sendInquiry(
  input: CreateInquiryInput
): Promise<InquiryApiResponse> {
  // Sanitize and prepare protected payload
  const sanitizedPayload: CreateInquiryInput = {
    fullName: sanitizeInput(input.fullName),
    company: sanitizeInput(input.company) || sanitizeInput(input.fullName),
    workEmail: sanitizeInput(input.workEmail).toLowerCase(),
    phone: sanitizeInput(input.phone) || "N/A",
    initiativeScope: input.initiativeScope && input.initiativeScope.length > 0
      ? input.initiativeScope
      : ["General Advisory"],
    technicalSpecifications: sanitizeInput(input.technicalSpecifications).slice(0, 600) || "General Inquiry",
    // Always default to CONSULTATION as specified
    type: input.type || "CONSULTATION",
  };

  try {
    const response = await fetch(`${API_BASE_URL}/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(sanitizedPayload),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = Array.isArray(data?.message)
        ? data.message.join(", ")
        : data?.message || "Server rejected request. Please check your data.";

      return {
        success: false,
        error: errorMessage,
      };
    }

    return {
      success: true,
      message: data?.message || "Inquiry submitted successfully",
      data: data?.data,
    };
  } catch {
    return {
      success: false,
      error: "Network error: Unable to reach server.",
    };
  }
}
