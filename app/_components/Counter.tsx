"use client";
import { useState } from "react";

type CounterProps = { users: [] };
export default function Counter({ users }: CounterProps) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>There are {users.length} users</p>
      <button onClick={() => setCount((n) => n + 1)}>{count}</button>
    </div>
  );
}
