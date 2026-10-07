import { Component } from 'react';

export class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Unhandled frontend error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="container py-5">
                    <div className="alert alert-danger" role="alert">
                        <h4 className="alert-heading">Ha ocurrido un error crítico</h4>
                        <p className="mb-0">
                            La aplicación no pudo cargar correctamente. Intente recargar la página.
                        </p>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

const AppProviders = ({ children }) => (
    <ErrorBoundary>{children}</ErrorBoundary>
);

export default AppProviders;
