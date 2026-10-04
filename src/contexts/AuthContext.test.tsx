/** @jest-environment jsdom */

import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { AuthProvider, useAuth } from "./AuthContext";

function AuthState() {
  const { isAuthenticated, role, user, logout } = useAuth();
  return (
    <>
      <p role="status">{isAuthenticated || role || user ? "Authenticated" : "Public visitor"}</p>
      <button onClick={logout}>Return home</button>
    </>
  );
}

function renderAuthState() {
  const router = {
    bfcacheId: "test-route",
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  };
  render(
    <AppRouterContext.Provider value={router}>
      <AuthProvider><AuthState /></AuthProvider>
    </AppRouterContext.Provider>,
  );
  return router;
}

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
  localStorage.clear();
});

describe("public marketing identity", () => {
  it("does not authenticate a browser-controlled legacy user or token", () => {
    localStorage.setItem("auth_user", JSON.stringify({ user_type: "buyer", user_id: "browser-controlled" }));
    localStorage.setItem("auth_token", "browser-controlled-token");

    renderAuthState();

    expect(screen.getByRole("status").textContent).toBe("Public visitor");
  });

  it("clears legacy credentials and navigates home", () => {
    localStorage.setItem("auth_user", "legacy-user");
    localStorage.setItem("auth_token", "legacy-token");
    const router = renderAuthState();

    fireEvent.click(screen.getByRole("button", { name: "Return home" }));

    expect(localStorage.getItem("auth_user")).toBeNull();
    expect(localStorage.getItem("auth_token")).toBeNull();
    expect(router.replace).toHaveBeenCalledWith("/");
  });

  it("still navigates home when browser storage is blocked", () => {
    const router = renderAuthState();
    jest.spyOn(Storage.prototype, "removeItem").mockImplementation(() => {
      throw new DOMException("Storage blocked", "SecurityError");
    });

    fireEvent.click(screen.getByRole("button", { name: "Return home" }));

    expect(router.replace).toHaveBeenCalledWith("/");
    expect(screen.getByRole("status").textContent).toBe("Public visitor");
  });
});
