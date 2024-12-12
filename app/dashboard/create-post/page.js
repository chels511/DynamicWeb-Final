"use client";
import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useAuth } from "@/app/context/AuthUserContext";
import styles from "@/app/createpost.module.css";

const imagesJson = [
  {
    id: 1,
    figureName: "Iron Man Mark LXXXV Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/904599/iron-man-mark-lxxxv_marvel_gallery_63f7f3a569dc8.jpg",
  },
  {
    id: 2,
    figureName: "Captain America (2012 Version) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/904929/captain-america-2012-version_marvel_gallery_63dd4f26d685c.jpg",
  },
  {
    id: 3,
    figureName: "Jinx (Arcane League of Legends) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913946/hot-toys-league-of-legends-jinx-sixth-scale-figure-gallery-6740ac3aeaa6c.jpg",
  },
  {
    id: 4,
    figureName: "Ahsoka Tano (Ahsoka) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/912661/ahsoka-tano_star-wars_gallery_6557913b62bb7.jpg",
  },
  {
    id: 5,
    figureName: "Scarlet Witch (WandaVision) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/907935/the-scarlet-witch_marvel_gallery_63dc1924d9ea7.jpg",
  },
  {
    id: 6,
    figureName: "Luke and Leia Deluxe (1:10 Scale) by Iron Studios",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/913947/iron-studios-star-wars-luke-and-leia-deluxe-1-10-scale-statues-gallery-672e8f7625ec7.jpg",
  },
  {
    id: 7,
    figureName: "T-1000 (2.0) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913843/hot-toys-terminator-t-1000-20-sixth-scale-figure-gallery-67224af79f8e7.jpg",
  },
  {
    id: 8,
    figureName: "Batman and Bruce Wayne Quarter Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/914017/iron-studios-dc-comics-batman-and-bruce-wayne-quarter-scale-statue-gallery-6751f2e0ac25b.jpg",
  },
  {
    id: 9,
    figureName: "Maki Zen'in Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/912225/maki-zenin_jujutsu-kaisen_gallery_6425bcb618f8e.jpg",
  },
  {
    id: 10,
    figureName: "Darth Maul (The Clone Wars) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/907130/darth-maul_star-wars_gallery_63d99f1801c44.jpg",
  },
  {
    id: 11,
    figureName:
      "Wonder Woman VS Hydra Bonus Version (1:3 Scale) by Prime 1 Studio",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/9075882/wonder-woman-vs-hydra-bonus-version_dc-comics_gallery_66ba7d1643602.jpg",
  },
  {
    id: 12,
    figureName: "Gambit (1:10 Scale Statue) by PCS",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913733/gambit__gallery_66c67a46cc2c7.jpg",
  },
  {
    id: 13,
    figureName: "Batgirl Premium Format",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/300854/batgirl_dc-comics_gallery_66f59053ebea7.jpg",
  },
  {
    id: 14,
    figureName: "Darth Revan Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/913303/darth-revan_star-wars_gallery_6622b9e9e52f9.jpg",
  },
  {
    id: 15,
    figureName: "Vi Cosbaby",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/913253/hot-toys-league-of-legends-vi-cosbaby-collectible-figure-gallery-671c0df7ea104.jpg",
  },
  {
    id: 16,
    figureName: "Magneto vs Sentinel Deluxe",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/912542/magneto-110-scale-statue-by-iron-studios_marvel_gallery_6564c946179bc.jpg",
  },
  {
    id: 17,
    figureName: "Captain Rex Premium Format",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/height=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/300856/captain-rex-premium-format-figure_star-wars_gallery_664ff21fa3112.jpg",
  },
  {
    id: 18,
    figureName: "Kazuma Kuwabara (Version 2) by Kotobukiya",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/913533/kazuma-kuwabara-version-2_yuyu-hakusho_gallery_6679dcec276db.jpg",
  },
  {
    id: 19,
    figureName: "Doc Brown (Deluxe Version) Sixth Scale Figure",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/quality=90,f=auto/https://www.sideshow.com/storage/product-images/909291/doc-brown-deluxe-version_back-to-the-future_gallery_6137c4e1791b5.jpg",
  },
  {
    id: 20,
    figureName: "Michelangelo Deluxe(1:3 Scale) by PCS",
    imageUrl:
      "https://www.sideshow.com/cdn-cgi/image/width=850,quality=90,f=auto/https://www.sideshow.com/storage/product-images/9139832/pcs-teenage-mutant-ninja-turtles-michelangelo-deluxe-1-3-scale-statue-gallery-6741140fb4373.jpg",
  },
];

export default function CreatePostPage() {
  const { authUser } = useAuth();
  const [figureName, setFigureName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [type, setType] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(imagesJson);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      alert("You need to be logged in to create a post.");
      return;
    }

    try {
      const db = getFirestore();
      const postsRef = collection(db, "posts");

      await addDoc(postsRef, {
        userId: authUser.uid,
        figureName,
        description,
        brand,
        manufacturer,
        type,
        imageUrl: selectedImage?.imageUrl || null,
        createdAt: serverTimestamp(),
      });

      setFigureName("");
      setDescription("");
      setBrand("");
      setManufacturer("");
      setType("");
      setSelectedImage(null);
      setSuccessMessage("Post created successfully!");
    } catch (error) {
      console.error("Error creating post:", error.message);
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Add New Collectible</h1>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Figure Name:
          <input
            type="text"
            value={figureName}
            onChange={(e) => setFigureName(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className={styles.textarea}
          />
        </label>
        <label className={styles.label}>
          Brand:
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Manufacturer:
          <input
            type="text"
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Type:
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Select an Image:
          <select
            value={selectedImage?.id || ""}
            onChange={(e) =>
              setSelectedImage(
                images.find((image) => image.id === Number(e.target.value))
              )
            }
            required
            className={styles.select}
          >
            <option value="" disabled>
              Select an image
            </option>
            {images.map((image) => (
              <option key={image.id} value={image.id}>
                {image.figureName}
              </option>
            ))}
          </select>
        </label>
        {selectedImage && (
          <div className={styles.imagePreview}>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.figureName}
              className={styles.previewImage}
            />
          </div>
        )}
        <button type="submit" className={styles.submitButton}>
          Create Post
        </button>
      </form>
      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}
    </div>
  );
}
