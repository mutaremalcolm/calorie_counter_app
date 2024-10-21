
// Activity Levels
export const activityLevels = {
    "Light: exercise 1-2 times/week": 1.375,
    "Moderate: exercise 4-5 times/week": 1.55,
    "Heavy: daily exercise or intense exercise 6-7 times/week": 1.725,
  };

// Calculate Calories (using Harris-Benedict formula)
 export const calculateCalories = (
    age: number,
    gender: "male" | "female",
    height: number,
    weight: number,
    activity: keyof typeof activityLevels
  ) => {
    let bmr;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
    } else {
      bmr = 447.593 + 9.247 * weight + 3.098 * height - 4.33 * age;
    }
  
    const maintenanceCalories = bmr * activityLevels[activity];
    const loseHalfKgCalories = maintenanceCalories - 500;
    const loseOneKgCalories = maintenanceCalories - 1000;
  
    return {
      maintenance: Math.round(maintenanceCalories),
      loseHalfKg: Math.round(loseHalfKgCalories),
      loseOneKg: Math.round(loseOneKgCalories),
    };
  };

