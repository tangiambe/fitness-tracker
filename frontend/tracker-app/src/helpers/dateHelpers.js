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