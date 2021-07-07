import React, { useState } from "react";

import Input from "../../components/input";
import styles from "./UserForm.module.css";

export interface UserFormData {
  username: string;
  icon: string | null;
}

export interface UserFormProps {
  onSubmit: (f: UserFormData) => unknown;
}

export default function UserFrom({ onSubmit }: UserFormProps): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [icon, setIcon] = useState<string | null>(null);

  const handleChange =
    (cb: (v: string) => unknown) => (e: React.FormEvent<HTMLInputElement>) => {
      cb(e.currentTarget.value);
    };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (username.trim() === "") return;

    onSubmit({
      username: username.trim(),
      icon: icon,
    });
    setUsername("");
    setIcon(null);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <Input
        placeholder="Username..."
        value={username}
        onChange={handleChange(setUsername)}
        maxLength={15}
        required
      />

      <button className={styles.submit_btn} type="submit">
        Accept
      </button>
    </form>
  );
}
