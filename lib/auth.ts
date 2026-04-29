import { redirect } from "next/navigation";
import { isPreviewMode } from "@/lib/runtime";

type PreviewSession = {
  user: {
    id: string;
    email: string;
  };
};

type PreviewAuthHandlerArg = {
  auth: PreviewSession;
} & Record<string, unknown>;

type AuthFn = {
  (): Promise<PreviewSession | null>;
  <T>(handler: (req: PreviewAuthHandlerArg) => T): (req: unknown) => T;
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

export const auth: AuthFn = ((arg?: unknown) => {
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
}) as AuthFn;
