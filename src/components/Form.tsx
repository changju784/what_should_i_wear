import React, { ReactNode, FormEventHandler } from "react";

interface FormProps {
    children: ReactNode;
    className?: string;
    onSubmit?: FormEventHandler<HTMLFormElement>;
}

const Form: React.FC<FormProps> = ({ children, className, onSubmit }) => {
    return (
        <form
            onSubmit={onSubmit}
            className={`max-w-md w-full mx-auto p-6 bg-white bg-opacity-60 rounded-xl space-y-4 shadow-md ${className}`}
        >
            {children}
        </form>
    );
};

export default Form;
