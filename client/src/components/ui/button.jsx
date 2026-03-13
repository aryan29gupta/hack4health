import React from "react";

// Simple utility to combine class names
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

// Button variant styles
const buttonStyles = {
  // Base styles
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus:ring-2 focus:ring-offset-2",
  
  // Variants
  variants: {
    default: "bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:ring-blue-500",
    destructive: "bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500",
    outline: "border border-gray-300 bg-white shadow-sm hover:bg-gray-50 hover:text-gray-900 focus:ring-blue-500 text-gray-700",
    secondary: "bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus:ring-gray-500",
    ghost: "hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-500 text-gray-700",
    link: "text-blue-600 underline-offset-4 hover:underline focus:ring-blue-500",
    gradientCTA: "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:from-blue-700 hover:to-purple-700 focus:ring-purple-500",
  },
  
  // Sizes
  sizes: {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 py-1.5 text-xs",
    lg: "h-11 px-6 py-3 text-base",
    icon: "h-9 w-9 p-0",
  }
};

function Button({ 
  children,
  className = "",
  variant = "default",
  size = "default",
  disabled = false,
  onClick,
  type = "button",
  ...props 
}) {
  const variantClass = buttonStyles.variants[variant] || buttonStyles.variants.default;
  const sizeClass = buttonStyles.sizes[size] || buttonStyles.sizes.default;
  
  const buttonClass = cn(
    buttonStyles.base,
    variantClass,
    sizeClass,
    className
  );

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

// Example usage component to demonstrate all variants
function ButtonShowcase() {
  return (
    <div className="p-8 space-y-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Button Components</h2>
      
      {/* Default buttons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button variant="gradientCTA">Gradient CTA</Button>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">🚀</Button>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">States</h3>
        <div className="flex flex-wrap gap-4">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      {/* Healthcare themed examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700">Healthcare Examples</h3>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="gradientCTA" 
            size="lg"
            className="shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            Book Consultation
          </Button>
          <Button 
            variant="outline"
            className="border-white/20 bg-white/10 text-gray-700 hover:bg-white/15"
          >
            Learn More
          </Button>
          <Button variant="secondary" size="sm">
            Emergency Call
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ButtonShowcase;