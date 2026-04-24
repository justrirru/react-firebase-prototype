import React from "react";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Input = ({ postId }) => {
  const [updatedMessage, setUpdatedMessage] = useState("");

  const handleUpdatePost = async (id) => {
    try {
      const postRef = doc(db, "posts", id);
      await updateDoc(postRef, {
        message: updatedMessage,
      });
    } catch (error) {
      console.error("Error updating post: ", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        name=""
        id="Update  Value"
        className="bg-white px-5 border-2 border-blue-300 text-black"
        value={updatedMessage}
        onChange={(e) => setUpdatedMessage(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => handleUpdatePost(postId)}
        className="bg-red-600 px-5 hover:cursor-pointer text-white"
      >
        Update
      </button>
    </div>
  );
};

export default Input;
