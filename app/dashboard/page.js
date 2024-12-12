"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthUserContext";
import styles from "@/app/dashboard.module.css";
const fetchCollectibles = async () => [
  {
    id: 1,
    name: "Ahsoka Tano(Deluxe Version)",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/912661/ahsoka-tano_star-wars_gallery_6557913b62bb7.jpg",
    description: "Cannot wait to get her in the mail",
    likes: 24,
    comments: 8,
    username: "blipblip",
  },
  {
    id: 2,
    name: "Jinx (Sixth Scale Figure)",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913946/hot-toys-league-of-legends-jinx-sixth-scale-figure-gallery-6740ac3aeaa6c.jpg",
    description: "I have been jinxed into getting this collectible haha",
    likes: 35,
    comments: 12,
    username: "jaycedefender",
  },
  {
    id: 3,
    name: "Scarlet Witch (WandaVision)",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/907935/the-scarlet-witch_marvel_gallery_63dc1924d9ea7.jpg",
    description: "Finally got this beauty",
    likes: 45,
    comments: 15,
    username: "HexMagik",
  },
  {
    id: 4,
    name: "Thor (Avengers Endgame)",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/904926/thor-sixth-scale-figure_marvel_gallery_5da4aa644de46.jpg",
    description: "You gotta appreciate Fat Thor",
    likes: 24,
    comments: 8,
    username: "GodofThunder",
  },
  {
    id: 5,
    name: "Hall of Heroes ",
    imageUrl:
      "https://preview.redd.it/its-been-a-crazy-past-few-months-sold-a-bunch-of-my-dc-v0-e8o5udvxwnpa1.jpg?width=640&crop=smart&auto=webp&s=339417dfb537d0c34da7705f4b0883ed6406cb19",
    description: "Rate my Setup",
    likes: 35,
    comments: 12,
    username: "realest",
  },
  {
    id: 6,
    name: "Collection for Sale",
    imageUrl: "https://live.staticflickr.com/1680/24255879075_bdb8ef3642_b.jpg",
    description: "Needthemoney",
    likes: 45,
    comments: 15,
    username: "gamblingproblems",
  },
  {
    id: 7,
    name: "Me and the Boys",
    imageUrl:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjP8joHTsKpnEi3mPLinI7e_TFWMerS0CRHy9CZwPattlGeD_YSDOM_DGQQgBrKiCNEr5RSG85AQncc89H43wxWyHNmATF0sSqGzpfUsI7O-pouTHs3l5k6u25LA_fHiEkRI5nGaMtFhBhF/s1600/IMG_1631b.JPG",
    description: "Me and the Boys with the greatest movie",
    likes: 24,
    comments: 8,
    username: "VaderLover",
  },
  {
    id: 8,
    name: "New Cosbaby's",
    imageUrl:
      "https://live.staticflickr.com/65535/49925329362_bc9fa04e74_b.jpg",
    description: "Hey Collectors- come get them",
    likes: 35,
    comments: 12,
    username: "TheThingStore",
  },
  {
    id: 9,
    name: "Chuck's Collection",
    imageUrl:
      "https://www.sideshow.com/wp/wp-content/uploads/2021/03/20201231_213444-scaled.jpg",
    description: "Got a new setup",
    likes: 45,
    comments: 15,
    username: "MoundRound",
  },
  {
    id: 10,
    name: "Ye's Collection",
    imageUrl:
      "https://www.sideshow.com/wp/wp-content/uploads/2021/02/0E6628DE-097B-4BB7-A71A-8450A522316C-scaled.jpeg",
    description: "Gotta show the king on his throne.",
    likes: 24,
    comments: 8,
    username: "NotYe",
  },
  {
    id: 11,
    name: "Preparing to Ship",
    imageUrl: "https://i.redd.it/mx1u4xcvtj4e1.jpeg",
    description: "Spent all my money, I am broke",
    likes: 35,
    comments: 12,
    username: "PoorDecisions",
  },
  {
    id: 12,
    name: "Harley Quinn (Bust)",
    imageUrl:
      "https://preview.redd.it/a-return-to-the-classic-this-harley-quinn-by-sideshow-still-v0-j412jlahjf3e1.jpg?width=2000&format=pjpg&auto=webp&s=e64bd175fd04823f6810d75895adb2b40dee4b7e",
    description: "Wish she looked like this in the movies!",
    likes: 45,
    comments: 15,
    username: "DCFan",
  },
];
const fetchUsernames = async () => [
  "Nikki24",
  "ZepZap",
  "LunaBee",
  "ThorLover",
  "CyPhi",
  "AvengersAssemble",
  "Baby",
  "luffydee",
  "piNgu",
  "juan",
  "fishlove",
  "Lyin69",
  "spainwithoutthes",
  "Revan02",
  "saiyan",
  "trekkie",
];
export default function Dashboard() {
  const { authUser } = useAuth();
  const router = useRouter();
  const [collectibles, setCollectibles] = useState([]);
  const [usernames, setUsernames] = useState([]);
  useEffect(() => {
    if (!authUser) {
      router.push("/login");
    } else {
      fetchCollectibles().then(setCollectibles);
      fetchUsernames().then(setUsernames);
    }
  }, [authUser, router]);
  if (!authUser) {
    return <p>Loading...</p>;
  }
  return (
    <div className={styles.dashboardContainer}>
      {" "}
      <header className={styles.dashboardHeader}>
        {" "}
        <div className={styles.headerContent}>
          {" "}
          <h1 className={styles.welcome}>Welcome, {authUser.email}!</h1>{" "}
        </div>{" "}
      </header>{" "}
      <section className={styles.usernamesSection}>
        {" "}
        <div className={styles.usernamesContainer}>
          {" "}
          {usernames.map((username, index) => (
            <div key={index} className={styles.usernameCard}>
              {" "}
              <div className={styles.avatar}>
                {" "}
                {username.charAt(0).toUpperCase()}{" "}
              </div>{" "}
              <p className={styles.username}>{username}</p>{" "}
            </div>
          ))}{" "}
        </div>{" "}
      </section>{" "}
      <section className={styles.collectiblesGrid}>
        {" "}
        {collectibles.map((item) => (
          <div key={item.id} className={styles.collectibleCard}>
            {" "}
            <img
              src={item.imageUrl}
              alt={item.name}
              className={styles.collectibleImage}
            />{" "}
            <div className={styles.cardContent}>
              {" "}
              <h2 className={styles.collectibleName}>{item.name}</h2>{" "}
              <p className={styles.collectibleDescription}>
                {" "}
                {item.description}{" "}
              </p>{" "}
              <p className={styles.collectibleUser}>
                {" "}
                Posted by: <strong>{item.username}</strong>{" "}
              </p>{" "}
              <div className={styles.cardActions}>
                {" "}
                <button className={styles.likeButton}>
                  👍 {item.likes}
                </button>{" "}
                <button className={styles.commentButton}>
                  {" "}
                  💬 {item.comments}{" "}
                </button>{" "}
              </div>{" "}
            </div>{" "}
          </div>
        ))}{" "}
      </section>{" "}
    </div>
  );
}
