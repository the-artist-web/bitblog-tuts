export type FieldError = {
    code: string;
    message?: string;
    errors?: Record<
        string,
        {
            type?: string;
            value?: unknown;
            msg: string;
            path?: string;
            location?: string;
        }
    >;
};