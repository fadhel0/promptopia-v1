"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ProfileComponent from "@/components/Profile";

const Profile = () => {
  const { data: session } = useSession();
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setMyPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]); // Only run the effect once on initial render

  useEffect(() => {
    if (session?.user) {
      console.log(myPosts);
      console.log(session.user.id);
    }
  }, [myPosts, session]);

  const handleEdit = () => {};

  const handleDelete = async () => {};

  return (
    <ProfileComponent
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default Profile;
