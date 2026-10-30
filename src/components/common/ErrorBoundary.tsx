import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-2xl mx-auto my-8 p-6 rounded-2xl bg-amber-50/90 border border-amber-300 text-stone-800 text-center space-y-3 font-serif shadow-sm">
          <div className="text-2xl">ॐ शांति</div>
          <h3 className="text-lg font-bold text-amber-900">
            {this.props.fallbackTitle || 'इस खंड को लोड करने में क्षणिक बाधा आई'}
          </h3>
          <p className="text-sm text-stone-600">
            कृपया पृष्ठ को पुनः लोड करें। कोर वैदिक इंजन सुरक्षित रूप से संचालित है।
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
          >
            पुनः प्रयास करें
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
