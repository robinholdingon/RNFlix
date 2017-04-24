import React from 'react'
import Movies from './Movies'
import {
	Navigator,
	Text,
	View,
	TouchableOpacity,
	BackAndroid,
	Platform,
} from 'react-native'

const navBarHeight = 60
const navBarStyle = {
	backgroundColor: 'rgb(100, 100, 100)',
	height: navBarHeight, 
}

let navRef = null
if (Platform.OS === 'android') {
	BackAndroid.addEventListener('hardwareBackPress', () => {
		if (navRef && navRef.getCurrentRoutes().length > 1) {
			navRef.pop()
			return true
		}
		return false;
	})	
}

const App = () => (
	<Navigator
		style={{ paddingTop: navBarHeight }}
		initialRoute={{ key: 'movies' }}
		renderScene={(route, navigator) => {
			navRef = navigator
			if (route.key === 'movies') {
				return (
					<Movies 
						onSelectMovie=
							{movie => 
								navigator.push({key: 'details', movie})
							}
					/>
				)
			}
			return (
				<View style={{ flex: 1, backgroundColor: 'rgb(200, 200, 200)'}}>
					<Text> Placeholder for ... </Text>
					<Text>{route.movie.title}</Text>
				</View>
			)
		}}
		configureScene={() => Navigator.SceneConfigs.FloatFromRight}
		navigationBar={
			<Navigator.NavigationBar
				style={navBarStyle}
				routeMapper={{
					LeftButton: (route, navigator) => {
						if (route.key === 'movies') return null;
						return (
							<TouchableOpacity onPress={() => navigator.pop()}>
								<Text>Back</Text>
							</TouchableOpacity>
						)
					},
					RightButton: () => {},
					Title: (route) => {
						if (route.key === 'movies') {
							return <Text>Now Playing</Text>
						}
						return null;
					},
				}}
			/>
		}
	/>
)
export default App;