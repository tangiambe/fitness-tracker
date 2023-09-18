// registrationService.js

export async function handleRegistration(formData) {
    try {
      const response = await fetch("https://your-api-url/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        // Registration was successful
        return { success: true };
      } else {
        // Registration failed
        const errorResponse = await response.json();
        return { success: false, error: errorResponse.message };
      }
    } catch (error) {
      // Network or other errors
      return { success: false, error: "Network error" };
    }
  }
  