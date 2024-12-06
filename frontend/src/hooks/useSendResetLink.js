import { useState } from "react";

export const useSendResetLink = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendResetLink = async (email) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/user/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Failed to send reset link");
      }

      const data = await response.json();
      alert(data.message); // Show success message
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { sendResetLink, isLoading, error };
};
