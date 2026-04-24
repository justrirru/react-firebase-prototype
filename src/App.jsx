import { collection, addDoc, getDocs } from "firebase/firestore";
import React from "react";
import { db } from "./firebase";
import { useState, useEffect } from "react";

const App = () => {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);

  const handleAddPost = async () => {
    try {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        message,
      });
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsRef = collection(db, "posts");
        const postsDoc = await getDocs(postsRef);
        if (!postsDoc.empty) {
          const posts = postsDoc.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPosts(posts);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      }
    };

    getPosts();
  }, []);

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
          <div className="flex flex-col items-center mt-8 text-white">
            <h2 className="mb-4">Listings</h2>
            {posts.map((post) => {
              return (
                <div key={post.id}>
                  <h3>{post.message}</h3>
                </div>
              );
            })}
          </div>
        </header>
      </div>
    </main>
  );
};

export default App;
