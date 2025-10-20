import React from 'react';

const Input = ( {className = "", ...props} ) => {
    return (
        <input
            className={
                "w-full rounded-2xl border border-slate-300 px-4 py-2 outline-none transition focus:ring-2 focus:ring-sky-400 " +
                className
            }
            {...props}
        />
    );
};

export default Input;