import { useState } from "react";

export const useResetPassword = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [message, setMessage] = useState(null);

  const resetPassword = async (token, newPassword) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/user/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword }),
    });

    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
      setMessage("Password has been successfully reset!");
    }
  };

  return { resetPassword, isLoading, error, message };
};
