import { describe, expect, it, jest } from "@jest/globals";
import Link from "next/link";
import type { ReactNode } from "react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { renderToString } from "react-dom/server";
import { AuthProvider, useAuth } from "./AuthContext";
import { ShowcaseProvider, useShowcase } from "./ShowcaseContext";

function renderPublicContent(children: ReactNode) {
  const router = {
    bfcacheId: "test-route",
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };
  return renderToString(
    <AppRouterContext.Provider value={router}>
      <AuthProvider>
        <ShowcaseProvider>{children}</ShowcaseProvider>
      </AuthProvider>
    </AppRouterContext.Provider>,
  );
}

function DemoReadiness() {
  const { isLoaded: authLoaded } = useAuth();
  const { isLoaded: showcaseLoaded } = useShowcase();
  return <p>{authLoaded && showcaseLoaded ? "Demo ready" : "Demo awaiting browser storage"}</p>;
}

describe("public content inside demo providers", () => {
  it("server-renders public content before browser storage is available", () => {
    const html = renderPublicContent(
      <main>
        <h1>Explore CropFresh</h1>
        <Link href="/#choose-role">Choose your role</Link>
      </main>,
    );

    expect(html).toContain("<h1>Explore CropFresh</h1>");
    expect(html).toContain('href="/#choose-role"');
  });

  it("keeps demo readiness pending during server rendering", () => {
    const html = renderPublicContent(<DemoReadiness />);

    expect(html).toContain("Demo awaiting browser storage");
    expect(html).not.toContain("Demo ready");
  });
});
