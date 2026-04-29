import { redirect } from "next/navigation";
import { isPreviewMode } from "@/lib/runtime";

type PreviewSession = {
  user: {
    id: string;
    email: string;
  };
};

const previewSession: PreviewSession = {
  user: {
    id: "preview-user",
    email: "preview@ankommen.app",
  },
};

export const handlers = {
  GET: () => Response.json({ message: "Auth is disabled in preview mode." }, { status: 503 }),
  POST: () => Response.json({ message: "Auth is disabled in preview mode." }, { status: 503 }),
};

export async function signIn(..._args: unknown[]) {
  redirect("/home");
}

export async function signOut(options?: { redirectTo?: string }) {
  redirect(options?.redirectTo ?? "/");
}

export function auth(arg?: unknown) {
  if (typeof arg === "function") {
    return (req: unknown) =>
      arg({
        ...((req as Record<string, unknown>) ?? {}),
        auth: previewSession,
      });
  }

  if (!isPreviewMode) {
    return Promise.resolve(null);
  }

  return Promise.resolve(previewSession);
}
