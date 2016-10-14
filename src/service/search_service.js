
export default class SearchService {

  constructor(type) {
    this.entityType = type
    this.symbol = 'ndex/' + type + 's/'
    this.ADD = this.symbol + 'ADD'
    this.REMOVE = this.symbol + 'REMOVE'
    this.REPLACE = this.symbol + 'REPLACE'
    this.CLEAR = this.symbol + 'CLEAR'
  }

  add(id, summary) {
    return { type: this.ADD, id, summary }
  }

  remove(id) {
    return { type: this.REMOVE, id }
  }

  replace(summaries) {
    return {
      type: this.REPLACE, summaries }
  }

  clear() {
    return { type: this.CLEAR }
  }

  search(query) {
    return (dispatch, getState) => {
      var headers = {}
      headers['Accept'] = 'application/json'
      headers['Content-Type'] = 'application/json'
      const settings = getState().ndex.settings
      const server = getState().ndex.servers.get(settings.get('server'))
      if (server.login.name) {
        headers['Authorization'] = 'Basic ' + btoa(server.login.name + ':' + server.login.pass)
      }
      if (server.version = "v1") {
        v1Fetch(server, headers, query)
      } else {
        v2Fetch(server, headers, query)
      }
    }
  }
  
  v1Fetch(server, headers, query) {
     fetch(server.address + '/rest/' + this.entityType + '/search/0/' + settings.get('resultSize'), {
        method: 'post',
        headers: headers,
        body: JSON.stringify({searchString: query})
      }).then(response => {
        return response.json()
      }).then(summaries => {
        dispatch(this.clear())
        dispatch(this.replace(this.format(summaries)))
      }).catch(e => console.log(e))
  }
  
  v2Fetch(server, headers, query) {
    fetch(server.address + '/v2/search/' + this.entityType, {
        method: 'post',
        headers: headers,
        body: JSON.stringify({searchString: query})
      }).then(response => {
        return response.json()
      }).then(summaries => {
        dispatch(this.clear())
        dispatch(this.replace(this.format(summaries.networks)))
      }).catch(e => console.log(e))
  }

  convertTime(T) {
    var d = new Date(0)
    d.setUTCSeconds(T/1000.0)
    return d.toLocaleDateString()
  }

  format(summaries) {
    return summaries.reduce((Sums, S) => {
      S.modificationTime = this.convertTime(S.modificationTime)
      S.creationTime = this.convertTime(S.creationTime)
      Sums[S.externalId] = S
      return Sums
    }, {})
  }

}
