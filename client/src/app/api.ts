export async function getAllUsersApi() {
  try {
    const url = "http://localhost:3000/user/all";
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      return null;
    }

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
