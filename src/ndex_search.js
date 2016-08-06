
export default function ndexSearch(type, query, resultSize, mod) {
  return (dispatch, getState) => {
    const server = getState().ndex.server.toJS()
    if (server.loggedIn) {
      headers['Authorization'] = 'Basic ' + btoa(server.userName + ':' + server.userPass)
    }
    fetch(server.serverAddress + '/' + type + '/search/0/' + resultSize, {
      method: 'post',
      body: JSON.stringify({searchString: query})
    }).then(response => {
      return response.json()
    }).then(summaries => {
     dispatch(mod.clear())
     summaries.map((S) => {
       dispatch(mod.add(S.externalId, S))
     })
    }).catch(e => console.log(e))
  }
}
