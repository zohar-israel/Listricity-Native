// Removes all the redundent data 
// from the track object, 
// and truncates the description at the first 
// line containing a link

import unescape from 'lodash/unescape'
export const optimizeResults = (data) => {
    return data.map(e => optimizeResultItem(e))
}
export const optimizeResultItem = (rowData) => {
    let description = null
    if (rowData.snippet.description) {
        description = rowData.snippet.description.split('http')[0]
        if (description !== rowData.snippet.description) description = description.substring(0, description.lastIndexOf('\n'))
        if (description === rowData.snippet.title) description = null
        if (description) description = unescape(description)
    }
    let title = unescape(rowData.snippet.title)
    let newRow = {
        uuid: rowData.uuid,
        id: { videoId: rowData.id.videoId },
        snippet: {
            title,
            description,
            thumbnails: { default: { url: rowData.snippet.thumbnails.default.url } }
        }
    }
    return newRow
}

