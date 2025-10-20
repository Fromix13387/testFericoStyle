import React from 'react';


const Card = ( { title, action, children } ) => {
    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
                {action}
            </div>
            {children}
        </div>
    );
};

export default Card;