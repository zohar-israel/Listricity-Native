// Converts a YouTube style timestamp 
// to HH:mm:ss format, only showing the hours 
// segment if more than zero 

export const duration = (duration) => {
    if (!duration) return ''
    var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/)
    if (!match || match.length < 3) return ''

    var hours = (parseInt(match[1]) || 0);
    var minutes = (parseInt(match[2]) || 0);
    var seconds = (parseInt(match[3]) || 0);

    return (hours > 0 ? hours + ':' : '') + (minutes < 10 && hours > 0 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}