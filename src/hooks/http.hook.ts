import { useState, useCallback } from "react";

// кастомный хук запроса на сервер с обработкой ошибок
export const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | Error | null>(null);

    const request = useCallback(
        async (url: string, method = "GET", body = null, headers = { "Content-Type": "application/json" }) => {
            setLoading(true);

            try {
                const response = await fetch(url, { method, body, headers });
                if (!response.ok) throw new Error(`Couldn't fetch ${url}, status:${response.status}`);
                const data = await response.json();
                setLoading(false);
                return data;
            } catch (err) {
                setLoading(false);
                if (typeof err === "string") {
                    err.toUpperCase();
                } else if (err instanceof Error) {
                    setError(err.message);
                }

                throw err;
            }
        },
        []
    );

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
