import { getItem, removeItem } from "./localStorage";

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  const authToken = getItem("auth_token");
  let newUrl = url;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json"
  };

  if (authToken) {
    headers.authorization = authToken;
  } else if (options.authToken) {
    headers.authorization = options.authToken;
  }

  if (
    !options.method ||
    options.method === "GET" ||
    options.method === "DELETE" ||
    options.method === "POST"
  ) {
    if (options.query) {
      const queryString = serializeParams(options.query);
      newUrl = `${url}?${queryString}`;
    }
  }

  if (options.useDefaultContentType) {
    delete headers["Content-Type"];
    delete headers.Accept;
  }

  options.headers = { ...headers, ...options.headers };
  options.credentials = "include"; // eslint-disable-line

  return fetch(newUrl, options)
    .then(checkStatus)
    .then(response => {
      if (options.doNotParseAsJson) {
        return response;
      } else {
        return parseJSON(response);
      }
    })
    .then(data => data);
}

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status !== 204) {
    // do not try to parse empty response
    return response.json();
  }
  return true;
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {objct} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */

function checkStatus(response) {
  /*
  Local storage stores strings, hence getItem can return either:
    --> undefined [(undefined || true) --> true]
    --> 'false' [('false' || true) --> 'false']
    --> 'true' [('true' || true) --> 'true']
*/
  const redirect = JSON.parse(getItem("redirect_to_login") || true);
  removeItem("redirect_to_login");

  if (response.ok) {
    // response.status >= 200 && response.status < 300
    return response;
  }
  if (response.status === 401) {
    removeItem("auth_token");
    removeItem("user_id");
    removeItem("auth_time");
    if (redirect) {
      location.href = "/login"; // eslint-disable-line
    }
  }
}

export function serializeParams(obj) {
  const str = [];
  Object.keys(obj).forEach(p => {
    if (obj.hasOwnProperty(p) && obj[p] !== undefined && obj[p] !== null) {
      // we need to pass 0 and empty string
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  });
  return str.join("&");
}
