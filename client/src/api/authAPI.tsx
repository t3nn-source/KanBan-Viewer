import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try {
    const response = await fetch('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: userInfo.username,
        password: userInfo.password
      }),
    });
    if (!response.ok) {
      throw new Error('Login failed');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    throw new Error('Login failed');
  }
}



export { login };
