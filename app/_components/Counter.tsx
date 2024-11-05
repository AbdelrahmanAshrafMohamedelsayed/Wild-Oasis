"use client";

import { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
  return (
    <div>
        <h1>Counter</h1>
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
