import Keycloak from "keycloak-js";

const _kc = Keycloak({
  url: "https://cloudata.vn/auth",
  realm: "tempus",
  clientId: "tempus",
});

const initKeycloak = (onAuthenticatedCallback: any) => {
  _kc
    .init({
      checkLoginIframe: false,
      pkceMethod: "S256",
    })
    .then((authenticated: boolean) => {
      if (!authenticated) {
        // 
      }
      const { token } = _kc;
      if (authenticated && token) {
        localStorage.setItem("accessToken", token);
      }
      return _kc;
    })
    .finally(() => {
      onAuthenticatedCallback();
    });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;

const isLoggedIn = (): boolean => localStorage.getItem('accessToken') && localStorage.getItem('accessToken') != '' ? true : false;
// const isLoggedIn = (): boolean => !!_kc.token;

const updateToken = (successCallback: any) =>
  _kc
    .updateToken(5)
    .then(successCallback)

    .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const isTokenExpired = () => _kc.isTokenExpired;

const refreshTokenSuccess = () => _kc.onAuthRefreshSuccess;

const refreshTokenError = () => _kc.onAuthRefreshError;

const hasRole = (roles: any) =>
  roles.some((role: any) => _kc.hasRealmRole(role));

const keycloakService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  isTokenExpired,
  refreshTokenSuccess,
  refreshTokenError,
  hasRole,
  _kc,
};

export default keycloakService;
