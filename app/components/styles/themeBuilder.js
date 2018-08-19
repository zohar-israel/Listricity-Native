// import stylesDark from './main'
// import { settingsStyles as settingsStylesDark } from './main'
// import ColorsDark from './colors';

// import stylesLight from './mainLight'
// import { settingsStyles as settingsStylesLight } from './mainLight'
// import ColorsLight from './colors';

// let Colors = {
//     Dark: ColorsDark,
//     Light: ColorsLight
// }
// let Styles = {
//     Dark: {
//         settingsStyles: settingsStylesDark,
//         styles: stylesDark
//     },
//     Light: {
//         settingsStyles: settingsStylesLight,
//         styles: stylesLight
//     }
// }
import { getThemeColors } from './colors'

import { getStyle as moodStyles } from './moods'
import { getStyle as moodItemsStyles } from './moodsItems'
import { getStyle as homeStyles } from './home'
import { getStyle as loadingStyles } from './loading'
import { getStyle as mainToolbarStyles } from './mainToolbar'
import { getStyle as playlistStyles } from './playlist'
import { getStyle as playlistsStyles } from './playlists'
import { getStyle as searchResultsStyles } from './searchResults'
import { getStyle as settingsStyles } from './settings'
import { getStyle as arrangablePlaylistStyles } from './arrangablePlaylist'
import { getStyle as playlistItemDetailsStyles } from './playlistItemDetailsStyles'
import { getStyle as styles } from './main'

let styleBuliders = {
    styles,
    moodStyles,
    moodItemsStyles,
    homeStyles,
    loadingStyles,
    mainToolbarStyles,
    playlistStyles,
    playlistsStyles,
    searchResultsStyles,
    settingsStyles,
    arrangablePlaylistStyles,
    playlistItemDetailsStyles
}
export const getThemedStyles = (themeName, styles) => {
    Colors = getThemeColors(themeName)
    let stylesObj = { Colors }
    for (let i = 0; i < styles.length; i++) {
        let style = styles[i]
        stylesObj[style] = getThemedStyle(Colors, style, themeName)
    }
    return stylesObj
}

getThemedStyle = (colors, style, themeName) => {
    return styleBuliders[style](colors, themeName)
}

