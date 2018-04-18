export default (bool) => {
  if (bool == null) {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  return localStorage.setItem('isAuthenticated', bool);
}
