import React from 'react';

const Button = ( {children, className = "", variant = "primary", ...props} ) => {
    const styles = {
        primary:
            "bg-sky-600 hover:bg-sky-700 text-white",
        ghost:
            "bg-white hover:bg-slate-50 border border-slate-300 text-slate-700",
        danger:
            "bg-rose-600 hover:bg-rose-700 text-white",
    };
    return (
        <button
            className={
                "rounded-2xl px-4 py-2 font-medium shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60 " +
                styles[variant] +
                " " +
                className
            }
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;