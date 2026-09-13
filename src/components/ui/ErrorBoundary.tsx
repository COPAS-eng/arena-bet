"use client";
import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleHome = () => {
    const router = useRouter();
    router.push("/");
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="min-h-[calc(100vh-56px)] flex items-center justify-center p-4">
          <div className="w-full max-w-md text-center p-8 bg-[#141414] border border-[#272727] rounded-xl">
            <div className="h-16 w-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-4" role="img" aria-label="Erro">
              <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            </div>
            <h2 className="text-xl font-black mb-2">Oops, algo deu errado</h2>
            <p className="text-zinc-400 mb-6">Encontramos um erro inesperado. Tente recarregar a página.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={this.handleRetry} variant="secondary">Tentar novamente</Button>
              <Button onClick={this.handleHome} variant="outline">Ir para Início</Button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left text-xs text-zinc-500">
                <summary className="cursor-pointer mb-2">Detalhes do erro (dev)</summary>
                <pre className="bg-[#0a0a0a] p-3 rounded overflow-auto">{this.state.error?.stack}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}