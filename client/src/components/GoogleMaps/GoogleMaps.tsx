import React, { useState, Fragment, useEffect } from "react";
import { GoogleMap, useLoadScript, StandaloneSearchBox, Marker } from "@react-google-maps/api";
import { Input } from "semantic-ui-react";

const GoogleMaps: React.FC = () => {
	const { isLoaded, loadError } = useLoadScript({
		id: "script-loader",
		version: "weekly",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		language: "de",
		preventGoogleFontsLoading: true,
		region: "de",
		libraries: [ "places" ]
	});

	const [ searchBox, setStandaloneSearchBox ] = useState();
	const [ postion, setPosition ] = useState({ lat: 51.48217, lng: 11.9658 });
	const [ zoom, setZoom ] = useState(14);

	const handleOnloadSearchBox = (ref: any) => {
		console.log(ref);
		setStandaloneSearchBox(ref);
	};

	const handleOnPlaceChanged = () => {
		console.log("placeChanged", searchBox.getPlaces());
		const newPostion = {
			lat: searchBox.getPlaces()[0].geometry.location.lat(),
			lng: searchBox.getPlaces()[0].geometry.location.lng()
		};
		setPosition(newPostion);
		setZoom(18);
	};

	const handleOnDragEnd = (e: any) => {
		console.log("e", e);
	};

	const renderMap = () => (
		<Fragment>
			<GoogleMap
				id="google-maps"
				zoom={zoom}
				center={postion}
				mapContainerStyle={{ height: "500px", width: "840px" }}
				mapContainerClassName="google-maps-container"
			>
				<StandaloneSearchBox
					options={{ componentRestrictions: { country: "de" } }}
					onLoad={handleOnloadSearchBox}
					onPlacesChanged={handleOnPlaceChanged}
				>
					<Input
						onChange={() => setZoom(14)}
						fluid
						inverted
						type="text"
						label="Adresse"
						placeholder="Einfach tippen ..."
						style={{
							width: `auto`
						}}
					/>
				</StandaloneSearchBox>
				<Marker
					// draggable
					onDragEnd={handleOnDragEnd}
					onLoad={(marker) => {
						console.log("marker: ", marker);
					}}
					position={postion}
				/>
			</GoogleMap>
		</Fragment>
	);

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>;
	}
	return isLoaded ? renderMap() : <h1>Loading...</h1>;
};

export default GoogleMaps;
