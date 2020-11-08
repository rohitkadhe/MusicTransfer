class SessionStorageService {
  clear() {
    sessionStorage.clear();
  }

  delete(key) {
    sessionStorage.removeItem(key);
  }

  save(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }
}

export default new SessionStorageService();
