import { delayMs } from "../core/utils";

const tokenKey = "AUTH_TOKEN";
const pidKey = "PID";

interface IUNamePwdPair {
  profileId: string;
  userName: string;
  password: string;
}

const users: IUNamePwdPair[] = [
  {
    profileId: '1',
    userName: 'alex',
    password: '12345'
  },
  {
    profileId: '2',
    userName: 'katrin',
    password: '54321'
  }
];

class AuthService {
  get isAuthenticated(): boolean {
    return window.localStorage.getItem(tokenKey) !== null;
  }

  async authenticate(userName: string, password: string) {
    const userFound = users.find(x => x.userName === userName && x.password === password);

    await delayMs(1000, undefined);

    return userFound  && { profileId: userFound.profileId, token: Math.random() + '' }||  undefined;
  }

  setData(pid: string, token: string) {
    window.localStorage.setItem(pidKey, pid);
    window.localStorage.setItem(tokenKey, token);
  }

  getData() {
    const result = {
      profileId: window.localStorage.getItem(pidKey)!,
      token: window.localStorage.getItem(tokenKey)!
    };

    return result.profileId && result || undefined;
  }

  clearData() {
    window.localStorage.removeItem(pidKey);
    window.localStorage.removeItem(tokenKey);
  }
}

export const authService = new AuthService();