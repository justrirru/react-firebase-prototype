import { collection, addDoc } from "firebase/firestore";
import React from "react";
import { db } from "./firebase";
import { useState } from "react";

const App = () => {
  const [message, setMessage] = useState("");

  const handleAddPost = async () => {
    const postRef = collection(db, "posts");
    await addDoc(postRef, {
      message,
    });
  };

  return (
    <main>
      <div>
        <header>
          <h1>React-Firebase Prototype</h1>
          <div className="flex justify-center mt-8">
            <input
              type="text"
              name="post"
              id="post"
              placeholder="Type something..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white px-5 border-2 border-blue-300"
            />
            <button
              type="submit"
              onClick={handleAddPost}
              className="bg-white px-5 hover:cursor-pointer"
            >
              Add post
            </button>
          </div>
        </header>
      </div>
    </main>
  );
};

export default App;
