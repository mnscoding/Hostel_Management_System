import { useState } from "react";

export const useForgotPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState(null);

  const forgotPassword = async (email) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/user/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setMessage("Password reset link sent to your email.");
    }
  };

  return { forgotPassword, isLoading, error, message };
};
