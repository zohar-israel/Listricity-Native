export const existsInPlaylist = (video, playlistData) => {
    return playlistData.findIndex(e => {
        if (e.id.videoId === video.id.videoId
            || tooResembling(e.snippet.title, video.snippet.title)) {
            //console.log('Too DUP: ' + e.snippet.title + ' , ' + video.title + '  (' + e.id.videoId + ' ~ ' + video.id + ')')
            return true;
        }
    }) > -1
}

tooResembling = (title1, title2) => {
    let ctitle1 = title1.replace(/[^a-zA-Z\s1-9]/gi, '').replace(/\s\s/gi, '').toLowerCase().trim();
    let ctitle2 = title2.replace(/[^a-zA-Z\s1-9]/gi, '').replace(/\s\s/gi, '').toLowerCase().trim();
    if (ctitle1 === ctitle2) return true;
    if (title1.indexOf('-') > -1) ctitle1 = title1.substring(title1.indexOf('-') + 1).trim()
    if (title2.indexOf('-') > -1) ctitle2 = title2.substring(title2.indexOf('-') + 1).trim()
    if (ctitle1.substring(0, 10) === ctitle2.substring(0, 10)) return true
    return false
}
export const existsInArrays = (video, arr1, arr2) => {
    if (arr1.findIndex(e => e.id.videoId === video.id.videoId
        || tooResembling(e.snippet.title, video.snippet.title)) > -1) return true
    if (arr2.findIndex(e => e.id.videoId === video.id.videoId
        || tooResembling(e.snippet.title, video.snippet.title)) > -1) return true
    return false
}
