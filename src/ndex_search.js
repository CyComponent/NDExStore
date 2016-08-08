
export function ndexSearch(type, query, resultSize, mod) {
  return (dispatch, getState) => {
    const server = getState().ndex.server.toJS()
    if (server.loggedIn) {
      headers['Authorization'] = 'Basic ' + btoa(server.userName + ':' + server.userPass)
    }
    fetch(server.serverAddress + '/rest/' + type + '/search/0/' + resultSize, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({searchString: query})
    }).then(response => {
      return response.json()
    }).then(summaries => {
      dispatch(mod.clear())
      dispatch(mod.replace(summaries))
    }).catch(e => console.log(e))
  }
}
