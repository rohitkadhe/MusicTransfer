import ax from '../axios/axios';

class AuthService {
  getAccessToken() {
    const parsedHash = new URLSearchParams(window.location.hash.substr(1));

    let access_token = parsedHash.get('access_token');

    return access_token;
  }

  async authenticateAccount(account_type) {
    const access_token = this.getAccessToken();
    if (access_token) {
      const user = await this.getUser(access_token);

      this.saveAccount(account_type, user);
      return user;
    }
  }

  getCurrentAccount(account_type) {
    return JSON.parse(localStorage.getItem(account_type));
  }

  async getUser(access_token) {
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
    localStorage.setItem(type, JSON.stringify(account));
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  isAuthenticated(account_type) {
    let acc = localStorage.getItem(account_type);
    if (acc === undefined || acc === '') return false;
    if (acc.access_token === '') return false;
    return true;
  }
}

export default new AuthService();
