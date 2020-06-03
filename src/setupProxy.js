const axios = require("axios");

module.exports = app => {
    app.get(`/api/randomworkout/`, (req, res, next) => {
      const queryParam = '?accessToken=' + session.getAccessToken().getJwtToken();
      let urlParam = 'all'
      axios.get(`https://uwbx85xxs4.execute-api.us-east-1.amazonaws.com/api/workout/random/` + urlParam + queryParam, {
        headers: { 'Authorization' : session.getIdToken().getJwtToken() }
      })
        .then(res => {
          res.send(info.data)
        })
        .catch(err => console.log(err))
    })
};