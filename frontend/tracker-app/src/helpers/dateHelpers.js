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
  
  
export  function findTotalDailyStepsByDate(daysData, currentDate) {
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
  
    // Return day.id of the matching day, or null if not found
    return matchingDay ? matchingDay.id : null;
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
      console.log('FormattedDate:', formattedDate);
  
      // Find the day object where entryDate matches the formattedDate
      const matchingDay = daysData.find((day) => {
        // Format the entryDate as "dd/mm/yyyy"
        const entryDateStr = day.entryDate
          .map((part) => String(part).padStart(2, '0')) // Add leading zeros
          .join('/'); // Join the parts with slashes
        console.log('Entry Date String:', entryDateStr);
        return entryDateStr === formattedDate;
      });
  
      return matchingDay;
    } catch (error) {
      console.error('Error formatting date:', error);
      // Handle the error or return an appropriate value
    }
  
    return null; // Return null if no matching day is found
  }
  
  