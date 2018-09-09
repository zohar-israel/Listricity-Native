import bg from '../../../res/global/background'
// import bgLight from '../../../res/global/backgroundLight';
const bgSpring = require('../../../res/global/backgroundSpring.png')
const bgLight = require('../../../res/global/backgroundLight.png')
// const bgDark = require('../../../res/global/backgroundDark.png')

const Colors = {
    background: '#333',
    background_toolbar: '#333',
    background_toolbar_image: { uri: bg },
    background_toolbar_image_reasize_mode: 'stretch',
    background_blank: '#000',
    background_deep: '#111',
    background_progress: '#111',
    background_item: '#222',
    background_selected_item: '#542100',
    background_existing_item: '#0a5100',
    background_submenu: '#444',
    background_info: 'rgba(0, 0, 0, 0.92)',
    border_submenu: '#111',
    border_submenu_text: '#777',
    border_item: '#555',
    border_container: '#333',
    search_underlay: '#444',
    text: '#EFEFEF',
    text_caption: '#fff',
    text_main: '#aaa',
    text_link: 'lightblue',
    text_description: '#444',
    background_button: '#aaa',
    background_details_button: '#222',
    background_action_button: '#444',
    shadow_action_button: '#000',
    border_action_button: '#000',
    photo_background: 'transparent', // '#000000',
    icon: '#777',
    tool_text: '#777',
    toolbar_border: '#777',
    seek_tracker: '#777',
    transparent: 'rgba(0,0,0,0)',
    bars_icon: '#aaa',
    activity_indicator: '#444',
    seperator_playlists: '#444',
    background_playlists: '#000',
    background_search_results: '#000',
    border_search_results: '#444',
}

const ColorsLight = {
    ...Colors,
    background: '#ccc',
    background_toolbar: '#ccc',
    background_toolbar_image: bgLight,
    background_blank: '#777',
    background_deep: '#eee',
    background_progress: '#eee',
    background_item: '#ddd',
    background_selected_item: 'gold',
    background_existing_item: 'lightgreen',
    background_submenu: '#aaa',
    background_info: '#bbb',
    border_submenu: '#111',
    border_submenu_text: '#777',
    border_item: '#aaa',
    border_container: '#ccc',
    search_underlay: '#bbb',
    text: '#101010',
    text_caption: '#000',
    text_main: '#444',
    text_link: 'blue',
    text_description: '#333',
    background_button: '#999',
    background_details_button: '#ddd',
    background_action_button: '#bbb',
    shadow_action_button: '#ddd',
    border_action_button: '#000',
    photo_background: 'transparent', // '#000000',
    icon: '#888',
    tool_text: '#888',
    toolbar_border: '#888',
    seek_tracker: '#888',
    transparent: 'rgba(0,0,0,0)',
    bars_icon: '#555',
    activity_indicator: '#bbb',
    seperator_playlists: '#bbb',
    background_playlists: '#fff',
    background_search_results: '#fff',
    border_search_results: '#bbb'
}


const ColorsSpring = {
    ...ColorsLight,
    background: '#d0a6a7',
    background_toolbar: '#e5a7eb',
    background_toolbar_image: bgSpring,
    background_toolbar_image_reasize_mode: 'stretch',
    background_blank: '#d0a6a7',
    background_deep: '#f6ada6',
    background_progress: '#ffd2b1',
    background_item: '#e4dcd1',
    background_selected_item: '#d2aad5',
    background_existing_item: '#d2aad5',
    background_submenu: '#d4ccc1',
    background_info: '#d4ccc1',
    border_submenu: '#111',
    border_submenu_text: '#777',
    border_item: '#aaa',
    border_container: '#ccc',
    search_underlay: '#bbb',
    text: '#1a2b3f',
    text_caption: '#000',
    text_main: '#1a2b3f',
    text_link: 'blue',
    text_description: '#333',
    background_button: '#999',
    background_details_button: '#d0a6a7',
    background_action_button: '#d0a6a7',
    shadow_action_button: '#ddd',
    border_action_button: '#000',
    photo_background: 'transparent', // '#000000',
    icon: '#006931',
    tool_text: '#888',
    toolbar_border: '#888',
    seek_tracker: '#888',
    bars_icon: '#1a2b3f',
    activity_indicator: '#bbb',
    seperator_playlists: '#bbb',
    background_playlists: '#ffd2b1',
    background_search_results: '#ffd2b1',
    border_search_results: '#bbb'
}

export default Colors
export const getThemeColors = (themeName) => {
    switch (themeName) {
        case 'Light':
            return ColorsLight
        case 'Spring':
            return ColorsSpring
        default:
            return Colors
    }
}