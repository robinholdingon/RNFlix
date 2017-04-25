import React from 'react'
import Movies from './Movies'
import Movie from './Movie'
import TopRatedMovies from './TopRatedMovies'
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

const NavMovies = ({ onNavChange, isTopRatedMovies }) => (
	<Navigator
		style={{ paddingTop: navBarHeight }}
		initialRoute={{ key: 'movies' }}
		renderScene={(route, navigator) => {
			onNavChange(navigator)
			navRef = navigator
			if (route.key === 'movies') {
				if (!isTopRatedMovies) {
					return (
						<TopRatedMovies 
							onSelectMovie=
								{movie => 
									navigator.push({key: 'details', movie})
								}
						/>
					)
				} else {
					return (
						<Movies 
							onSelectMovie=
								{movie => 
									navigator.push({key: 'details', movie})
								}
						/>
					)
				}
			}
			return (
				<View style={{ flex: 1, backgroundColor: 'rgb(200, 200, 200)'}}>
					<Movie movie={route.movie}/>
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
							if (isTopRatedMovies) {
								return <Text>Top Rated</Text>
							} else {
								return <Text>Now Playing</Text>
							}
						}
						return null;
					},
				}}
			/>
		}
	/>
)
NavMovies.propTypes = {
	onNavChange: React.PropTypes.func,
	isTopRatedMovies: React.PropTypes.bool.isRequired,
}
export default NavMovies