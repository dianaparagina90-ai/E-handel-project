import React from "react";


class ProductPageErrorBoundary extends React.Component<React.PropsWithChildren> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }
    
        render() {
            if (this.state.hasError) {
                return <div className="text-center py-20 text-2xl">
                    <h2>Något gick fel.</h2>
                    <p>Försök igen</p>
                </div>      
            }

            return this.props.children;
        }
    }

export default ProductPageErrorBoundary;