// __tests__/setupTests.ts
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    route: "/",
    pathname: "/",
    query: {},
    asPath: "/",
    push: jest.fn(),
    replace: jest.fn(),
    reload: jest.fn(),
    back: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    beforePopState: jest.fn(),
    isFallback: false,
  }),
}));

jest.mock("@/context/ToastContext", () => ({
  useToast: jest.fn(() => ({ showToast: jest.fn() })),
  ToastProvider: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));
jest.mock("axios");

afterEach(() => {
  jest.clearAllMocks();
  jest.clearAllTimers();
});
