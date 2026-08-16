import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TEXT } from "@/constants";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Catches unexpected render errors and shows a fallback instead of a blank page.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Unhandled application error:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center"
        >
          <h1 className="text-xl font-semibold">{TEXT.errorTitle}</h1>
          <p className="text-sm text-muted-foreground">
            {TEXT.errorBody}
          </p>
          <Button onClick={() => window.location.reload()}>{TEXT.reload}</Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
