import { useEffect } from "react";

export const Story = () => {
  useEffect(() => {
    const body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello!" }],
    });
    const callApi = async () => {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body,
      });
      const data = await res.json();
    };

    callApi();
  }, []);
  return <div>Story</div>;
};
