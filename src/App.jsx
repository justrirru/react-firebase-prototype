import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import React from "react";
import { db } from "./firebase";
import { useState, useEffect } from "react";
import Input from "./components/Input";

const App = () => {
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState([]);
  const [roomsQuery, setRoomsQuery] = useState(0);
  const [bathroomsQuery, setBathroomsQuery] = useState(0);
  const [squareFootageQuery, setSquareFootageQuery] = useState(0);

  const handleAddPost = async () => {
    try {
      const postRef = collection(db, "posts");
      await addDoc(postRef, {
        message,
      });
      setPosts((prev) => [
        ...prev,
        {
          id: (Math.random(), message),
        },
      ]);
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

  const handleDeletePost = async (id) => {
    try {
      const docRef = doc(db, "posts", id);
      await deleteDoc(docRef);
      const newPosts = posts.filter((post) => post.id !== id);
      setPosts(newPosts);
    } catch (error) {
      console.error("Error deleting post: ", error);
    }
  };

  const queryForDocuments = async () => {
    try {
      const collectionRef = collection(db, "posts");

      // 1. Convert all inputs to integers
      const roomsInt = parseInt(roomsQuery);
      const bathroomsInt = parseInt(bathroomsQuery);
      const sqftInt = parseInt(squareFootageQuery);

      // 2. Start with a base query (including your limit)
      let userQuery = query(collectionRef, limit(3));

      // 3. Conditionally add filters based on user input
      userQuery = query(
        userQuery,
        where("rooms", "==", roomsInt),
        where("bathrooms", "==", bathroomsInt),
        where("squareFootage", ">=", sqftInt),
      );

      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        console.log("No matching documents found.");
        return;
      }

      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    } catch (error) {
      // If you use multiple filters, check the console for the auto-index link!
      console.error("Error querying documents: ", error);
    }
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
              className="bg-white px-5 hover:cursor-pointer border-blue-300 border-2"
            >
              Add post
            </button>
          </div>
          <div className="flex flex-col items-center mt-8 text-white gap-5">
            <h2>Query</h2>
            <div className="flex justify-center">
              <h3>Rooms</h3>
              <input
                type="number"
                name="roomsQuery"
                id="roomsQuery"
                value={roomsQuery}
                onChange={(e) => setRoomsQuery(e.target.value)}
                className="bg-white px-5 border-2 border-blue-300 text-black"
              />
            </div>
            <div className="flex justify-center">
              <h3>Bathrooms</h3>
              <input
                type="number"
                name="bathroomsQuery"
                id="bathroomsQuery"
                value={bathroomsQuery}
                onChange={(e) => setBathroomsQuery(e.target.value)}
                className="bg-white px-5 border-2 border-blue-300 text-black"
              />
            </div>
            <div className="flex justify-center">
              <h3>Square Footage</h3>
              <input
                type="number"
                name="squareFootageQuery"
                id="squareFootageQuery"
                value={squareFootageQuery}
                onChange={(e) => setSquareFootageQuery(e.target.value)}
                className="bg-white px-5 border-2 border-blue-300 text-black"
              />
            </div>
            <button
              type="submit"
              onClick={queryForDocuments}
              className="bg-white px-5 hover:cursor-pointer border-blue-300 text-black border-2"
            >
              Search
            </button>
          </div>
          <div className="flex flex-col items-center mt-8 text-white gap-5">
            <h2>Listings</h2>
            {posts.map((post) => {
              return (
                <div key={post.id} className="flex justify-center gap-2">
                  <p>{post.message}</p>
                  <button
                    type="submit"
                    onClick={() => handleDeletePost(post.id)}
                    className="bg-red-600 px-5 hover:cursor-pointer text-white"
                  >
                    Delete
                  </button>
                  <Input postId={post.id} />
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
