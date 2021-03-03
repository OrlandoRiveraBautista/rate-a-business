import React, { useState, useEffect } from "react";
import { auth, firebase, firestore } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { connect } from "react-redux";
import { Rate, Typography } from "antd";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

function RatingStars({ business, updateRatings }) {
  const [user] = useAuthState(auth);
  // Setting some local states
  const [ratingValue, setRatingValue] = useState(null);
  const [userRateDoc, setUserRateDoc] = useState(null);

  const ratingsRef = firestore.collection("ratings"); // Accessing the database

  useEffect(() => {
    // will run when user changes
    if (!user) return setRatingValue(null);
    setUserRateDoc(null);
    ratingsRef
      .where("uid", "==", user.uid)
      .where("businessId", "==", business.reference)
      .limit(1)
      .get()
      .then((snapshot) => {
        if (snapshot.docs.length > 0) {
          // Check if the user has rated the business before
          const ratingDoc = snapshot.docs[0];
          setUserRateDoc(ratingDoc);
          setRatingValue(ratingDoc.data().ratingValue);
        }
      });
    return () => {
      setRatingValue(null);
    };
  }, [user]);

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  const handleRating = (value) => {
    if (!user) return signInWithGoogle(); // If user is not signed in, they will be prompt to sign in
    const confirm = window.confirm(
      `Leave a ${value} star rating for ${business.name}?`
    );
    if (!confirm) return;

    setRatingValue(value);

    // Check if the user has already rated business before
    if (userRateDoc) {
      // if user has rated before :
      userRateDoc.ref.update({ ratings: value }); // update to new rating
      const newRatings = business.ratings.map((rate) => {
        if (rate.uid === user.uid) {
          rate.rating = value;
        }
        return rate;
      });
      updateRatings(newRatings);
    } else {
      // First time rating
      const newRatingDoc = {
        rating: value,
        uid: user.uid,
        photoURL: user.photoURL,
        email: user.email,
        displayName: user.displayName,
        businessId: business.reference,
      };

      // Create new rating document
      ratingsRef.add(newRatingDoc).then(async (docRef) => {
        const userRateDoc = await docRef.get();
        setUserRateDoc(userRateDoc);
        updateRatings([...business.ratings, newRatingDoc]);
      });
    }
  };

  return (
    <div>
      <span>
        <Rate tooltips={desc} onChange={handleRating} value={ratingValue} />{" "}
        {ratingValue ? (
          <span className="ant-rate-text">{desc[ratingValue - 1]}</span>
        ) : (
          " "
        )}{" "}
      </span>{" "}
      {userRateDoc && ratingValue ? (
        <Typography.Text type="success">
          You rated this business "{desc[ratingValue - 1]}"
        </Typography.Text>
      ) : (
        "Please leave a rating."
      )}
    </div>
  );
}

export default connect(null, {})(RatingStars);
