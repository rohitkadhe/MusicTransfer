import ax from '../axios/axios';

class AuthService {
  getAccessToken() {
    const parsedHash = new URLSearchParams(window.location.hash.substr(1));

    let access_token = parsedHash.get('access_token');

    return access_token;
  }

  async authenticateAccount(accType) {
    const access_token = this.getAccessToken();
    if (access_token) {
      const userAccount = await this.getUserAccount(access_token);

      this.saveAccount(accType, userAccount);
      return userAccount;
    }
  }

  getAccFromSessionStorage(accType) {
    return JSON.parse(sessionStorage.getItem(accType));
  }

  async getUserAccount(access_token) {
    try {
      const auth = {
        headers: { Authorization: `Bearer ${access_token}` },
      };
      let response = await ax.get('spotify/user', auth);
      let account = response.data;
      account.access_token = access_token;
      return account;
    } catch (err) {
      return err;
    }
  }

  saveAccount(type, account) {
    sessionStorage.setItem(type, JSON.stringify(account));
  }

  isAuthenticated(accType) {
    let acc = JSON.parse(sessionStorage.getItem(accType));
    if (acc === null || acc === '') return false;
    if (acc.access_token === '') return false;
    return true;
  }
}

export default new AuthService();
