import { useState } from "react";

export default function Chat({
  messages = [],
  onSubmit = () => undefined,
}: any) {
  const [newMsg, setNewMsg] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit({ msg: newMsg });
    setNewMsg("");
  };

  return (
    <div>
      {messages.map((i: string, idx: number) => (
        <p key={idx}>{i}</p>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          placeholder="message..."
        />
        <button>Send</button>
      </form>
    </div>
  );
}
