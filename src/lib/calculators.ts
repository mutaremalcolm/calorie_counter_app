
// Calculate Calories (using Harris-Benedict formula)
export const activityLevels = {
  "light: exercise 1-2 times/week": 1.375,        
  "Moderate: exercise 4-5 times/week": 1.55,
  "Heavy: daily exercise or intense exercise 6-7 times/week": 1.725,
} as const;

export const calculateCalories = (
  age: number,
  gender: "male" | "female",
  height: number,
  weight: number,
  activity: keyof typeof activityLevels
) => {
 
  // Ensure values are numbers
  const numAge = Number(age);
  const numHeight = Number(height);
  const numWeight = Number(weight);

  // Validate converted numbers
  if (isNaN(numAge) || isNaN(numHeight) || isNaN(numWeight)) {
    throw new Error("Invalid numeric inputs");
  }

  // Calculate BMR using Mifflin-St Jeor equation
  let bmr: number;
  if (gender === "male") {
    bmr = 88.362 + (13.397 * numWeight) + (4.799 * numHeight) - (5.677 * numAge);
  } else {
    bmr = 447.593 + (9.247 * numWeight) + (3.098 * numHeight) - (4.33 * numAge);
  }

  // Calculate different calorie targets
  const maintenanceCalories = bmr * activityLevels[activity];
  const loseHalfKgCalories = maintenanceCalories - 500;
  const loseOneKgCalories = maintenanceCalories - 1000;

  return {
    maintenance: Math.round(maintenanceCalories),
    loseHalfKg: Math.round(loseHalfKgCalories),
    loseOneKg: Math.round(loseOneKgCalories),
  };
};
  
  // Function to calculate the calorie deficit
export const calculateEnergyBalance = (
  caloriesConsumed: number,
  caloriesBurnt: number
) => {
  return caloriesConsumed - caloriesBurnt;
};

