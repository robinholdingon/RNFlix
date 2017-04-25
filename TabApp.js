import React from 'react';
import {
  Text,
  Platform,
  BackAndroid,
} from 'react-native';

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import NavMovies from './NavMovies'
import TopRatedMovies from './TopRatedMovies'

let navRef = null

class TabApp extends React.Component {
	componentDidMount() {
		if (Platform.OS === 'android') {
			BackAndroid.addEventListener('hardwareBackPress', this.onHardwareBackPress)
		}
	}
	componentWillUnmount() {
		if (Platform === 'android') {
			BackAndroid.removeEventListener('hardwareBackPress', this.onHardwareBackPress)
		}
	}
	onHardwareBackPress = () => {
		if (this.currentTab === 0 && this.navRef && this.navRef.getCurrentRoutes().length > 1) {
			this.navRef.pop()
			return true
		}
		return false;
	}
	navRef = null
	currentTab = 0
	render() {
	    return (
	    	<ScrollableTabView
		    	style={{marginTop: 20, }}
		    	locked={true}
		    	onChangeTab={({ i }) => (this.currentTab = i)}
		    	renderTabBar={() => <DefaultTabBar />}
		    	>
		    	<NavMovies tabLabel='Now Playing' onNavChange={nav => (this.navRef = nav)} isTopRatedMovies={false}/>
		    	<NavMovies tabLabel='Top Rated' onNavChange={nav => (this.navRef = nav)} isTopRatedMovies={true}/>
		    </ScrollableTabView>
	    )
	}
}
export default TabApp