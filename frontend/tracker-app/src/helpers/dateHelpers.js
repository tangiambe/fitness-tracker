import DateTimeDisplay from '../components/dashboard/DateTimeDisplay';

export function findTotalCaloriesConsumedByDate(daysData, currentDate) {
  // Format the currentDate to match the entryDate format
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Find the day object where entryDate matches the formattedDate
  const matchingDay = daysData.find((day) => {
    const entryDateStr = day.entryDate.join('-');
    return entryDateStr === formattedDate;
  });

  // Return totalCaloriesConsumed of the matching day, or 0 if not found
  return matchingDay ? matchingDay.totalCaloriesConsumed : 0;
}


export function findTotalDailyStepsByDate(daysData, currentDate) {
  // Format the currentDate to match the entryDate format
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });

  // Find the day object where entryDate matches the formattedDate
  const matchingDay = daysData.find((day) => {
    const entryDateStr = day.entryDate.join('-');
    return entryDateStr === formattedDate;
  });

  // Return totalDailySteps of the matching day, or 0 if not found
  return matchingDay ? matchingDay.totalDailySteps : 0;
}
export function findDayIdByDate(daysData, currentDate) {
  try {
    // Check if currentDate is a valid Date object
    if (!(currentDate instanceof Date) || isNaN(currentDate)) {
      throw new Error('Invalid date');
    }

    // Format the currentDate to match the entryDate format
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${year}/${month}/${day}`;

    // Find the day object where entryDate matches the formattedDate
    const matchingDay = daysData.find((day) => {
      // Format the entryDate as "dd/mm/yyyy"
      const entryDateStr = day.entryDate
        .map((part) => String(part).padStart(2, '0')) // Add leading zeros
        .join('/'); // Join the parts with slashes

      return entryDateStr === formattedDate;
    });

    return matchingDay ? matchingDay.id : null;
  } catch (error) {
    // Handle the error or return an appropriate value
    console.error('Error formatting date:', error);
    return null;
  }
}

export function findDayByDate(daysData, currentDate) {
  try {
    // Check if currentDate is a valid Date object
    if (!(currentDate instanceof Date) || isNaN(currentDate)) {
      throw new Error('Invalid date');
    }

    // Format the currentDate to match the entryDate format
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${year}/${month}/${day}`;
    // console.log('FormattedDate:', formattedDate);

    // Find the day object where entryDate matches the formattedDate
    const matchingDay = daysData.find((day) => {
      // Format the entryDate as "dd/mm/yyyy"
      const entryDateStr = day.entryDate
        .map((part) => String(part).padStart(2, '0')) // Add leading zeros
        .join('/'); // Join the parts with slashes
      return entryDateStr === formattedDate;
    });

    return matchingDay;
  } catch (error) {
    // Handle the error or return an appropriate value
  }

  return null; // Return null if no matching day is found
}
export function findNutritionByDate(daysData, currentDate) {
  try {
    // Check if currentDate is a valid Date object
    if (!(currentDate instanceof Date) || isNaN(currentDate)) {
      throw new Error('Invalid date');
    }

    // Format the currentDate to match the entryDate format
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const formattedDate = `${year}/${month}/${day}`;

    // Find the day object where entryDate matches the formattedDate
    const matchingDay = daysData.find((day) => {
      // Format the entryDate as "dd/mm/yyyy"
      const entryDateStr = day.entryDate
        .map((part) => String(part).padStart(2, '0')) // Add leading zeros
        .join('/'); // Join the parts with slashes

      return entryDateStr === formattedDate;
    });

    if (matchingDay) {
      // Return the nutrition list if matchingDay is found
      return matchingDay.nutritions;
    }
  } catch (error) {
    console.error('Error:', error);
    // Handle the error or return an appropriate value
  }

  return null; // Return null if no matching day is found
}

export function formatDateToYYYYMMDD(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateAsMMMDD(dateString) {
  const date = new Date(dateString);
  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const month = monthNames[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  return `${month} ${day}`;
}


