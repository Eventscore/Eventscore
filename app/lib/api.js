import fetch from 'isomorphic-fetch';

class Api {
  static headers() {
    return {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'dataType': 'json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Mashape-Key': 'some kind of key goes in here',
    }
  }

  static get(route) {
    return this.xhr(route, null, 'GET');
  }

  static put(route, params) {
    return this.xhr(route, params, 'PUT');
  }

  static post(route, params) {
    return this.xhr(route, params, 'POST');
  }

  static delete(route, params) {
    return this.xhr(route, params, 'DELETE');
  }

  static xhr(route, params, verb) {
    // const host = 'https://eventscore-server-production.herokuapp.com';
    const host = 'http://localhost:1337';
    // const host = 'http://104.236.180.140:3000'; // docker deployment link
    const url = `${host}${route}`;
    let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
    options.headers = Api.headers();
    return fetch(url, options).then( res => {
      let json = res.json();
      if (res.ok) {
        return json;
      }
      return json.then(err => {throw err});
    });
  }
}

export default Api;
