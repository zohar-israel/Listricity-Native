export const moveUpPlaylistItem = (state, action) => {
    var baseState = state
    var newPlaylistData = [...baseState.playlistData.videos]
    let index = newPlaylistData.findIndex(e => e.uuid == action.rowData.uuid)
    if(index>0){
        let tmp=newPlaylistData[index-1]
        newPlaylistData[index-1]=newPlaylistData[index]
        newPlaylistData[index]=tmp
    }
    return Object.assign({}, baseState, {
        playlistData: { videos: newPlaylistData },
        playlistSubmenuVisible: false,
        playlistShortcut:'moveUp'
    })
}
