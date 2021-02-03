import React from 'react';


export const errorMessage = (msg) => (
    <div className="alert alert-danger" role="alert">
        {msg}
    </div>
)

export const successMessage = (msg) => (
    <div className="alert alert-success" role="alert">
        {msg}
    </div>
)