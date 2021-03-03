import { firestore } from "../config/firebase";
const businessRatingsRef = firestore.collection("ratings");

export const ACTION_TYPES = {
  UPDATE_BUSINESSES: "UPDATE_BUSINESSES",
  SET_LOCATION: "SET_LOCATION",
  SET_DISTANCE: "SET_DISTANCE",
  SET_BUSINESS_TYPE: "SET_BUSINESS_TYPE",
};

export const updateBusinesses = (businesses) => (dispatch) => {
  Promise.all(
    businesses.map((business) => {
      business["ratings"] = []; // initialize
      return businessRatingsRef
        .where("businessId", "==", business.reference)
        .get()
        .then((snapshot) => {
          //query for the ratings of rhte given business by Id
          if (snapshot.docs.length > 0) {
            let totalRatings = 0;
            snapshot.docs.forEach((doc) => {
              const rating = doc.data();
              business.ratings.push(rating); //adding the rating to the list
              totalRatings += rating.rating;
            });
            business["averageRating"] = (
              totalRatings / snapshot.docs.length
            ).toFixed(1); // calculating the new average rating and round to 1 decimal point
          }
          return business;
        });
    })
  ).then((results) =>
    dispatch({ type: ACTION_TYPES.UPDATE_BUSINESSES, payload: results })
  );
};

export const setCurrentLocation = (lat, lng) => {
  return {
    type: ACTION_TYPES.SET_LOCATION,
    payload: { lat, lng },
  };
};

export const setCurrentDistance = (milesDistance) => {
  const metersDistance = Math.floor(milesDistance * 1609);

  return {
    type: ACTION_TYPES.SET_DISTANCE,
    payload: metersDistance,
  };
};

export const setCurrentBusinessType = (businessType) => {
  return {
    type: ACTION_TYPES.SET_BUSINESS_TYPE,
    payload: businessType,
  };
};
