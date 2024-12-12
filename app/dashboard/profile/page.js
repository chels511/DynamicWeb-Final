"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthUserContext";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import styles from "@/app/userprofile.module.css";
export default function ProfilePage() {
  const { authUser } = useAuth();
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    if (authUser) {
      const fetchUserPosts = async () => {
        try {
          const db = getFirestore();
          const postsRef = collection(db, "posts");
          const q = query(postsRef, where("userId", "==", authUser.uid));
          const querySnapshot = await getDocs(q);
          const posts = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setUserPosts(posts);
        } catch (error) {
          console.error("Error fetching user posts:", error.message);
        }
      };
      fetchUserPosts();
    }
  }, [authUser]);
  if (!authUser) {
    return (
      <div className={styles.loadingContainer}>
        {" "}
        <p>Loading your profile...</p>{" "}
      </div>
    );
  }
  return (
    <div className={styles.profileContainer}>
      {" "}
      <div className={styles.userInfo}>
        {" "}
        <img
          src={`https://api.dicebear.com/5.x/initials/svg?seed=${authUser.email}`}
          alt={`${authUser.email}'s Avatar`}
          className={styles.avatar}
        />{" "}
        <h1 className={styles.userName}>{authUser.email}</h1>{" "}
        <p className={styles.userBio}>
          {" "}
          Welcome to your profile! View your posts and manage your collection.{" "}
        </p>{" "}
      </div>{" "}
      <div className={styles.postsSection}>
        {" "}
        <h2 className={styles.sectionTitle}>Your Posts</h2>{" "}
        <div className={styles.postsRows}>
          {" "}
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post.id} className={styles.postRow}>
                {" "}
                <img
                  src={post.imageUrl}
                  alt={post.figureName}
                  className={styles.postImage}
                />{" "}
                <div className={styles.postInfo}>
                  {" "}
                  <h3 className={styles.postTitle}>{post.figureName}</h3>{" "}
                  <p className={styles.postDescription}>{post.description}</p>{" "}
                  <p className={styles.postBrand}>
                    {" "}
                    <strong>Brand:</strong> {post.brand || "N/A"}{" "}
                  </p>{" "}
                  <p className={styles.postManufacturer}>
                    {" "}
                    <strong>Manufacturer:</strong> {post.manufacturer || "N/A"}{" "}
                  </p>{" "}
                  <p className={styles.postType}>
                    {" "}
                    <strong>Type:</strong> {post.type || "N/A"}{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            ))
          ) : (
            <p className={styles.noPostsMessage}>
              {" "}
              You haven't created any posts yet. Start by creating your first
              post!{" "}
            </p>
          )}{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
