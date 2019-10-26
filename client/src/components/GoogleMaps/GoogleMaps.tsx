import { Segment, Form, Dimmer, Loader } from "semantic-ui-react";
import React, { useState, useEffect, Fragment } from "react";
import {
	GoogleMap,
	useLoadScript,
	StandaloneSearchBox,
	StandaloneSearchBoxProps,
	Marker
} from "@react-google-maps/api";
import { IAddress } from "../../models";
import { isNil, isEmpty } from "lodash";

interface IAddressComponent {
	long_name: string;
	short_name: string;
	types: [""];
}

interface IStateProps {
	getAddress: any;
	storedAddress: IAddress;
}

const mapStyles = [ { backgroundColor: "red" } ];
const GOOGLE_MAPS_LIBARIES = [ "places" ];

const GoogleMaps: React.FC<IStateProps> = (props) => {
	const { getAddress, storedAddress } = props;
	const { isLoaded, loadError } = useLoadScript({
		id: "script-loader",
		version: "weekly",
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
		language: "de",
		preventGoogleFontsLoading: true,
		region: "de",
		libraries: GOOGLE_MAPS_LIBARIES
	});

	const [ zoom, setZoom ] = useState(14);
	const [ searchBox, setStandaloneSearchBox ] = useState();
	const [ postion, setPosition ] = useState({ lat: 51.48217, lng: 11.9658 });
	const [ address, setAddress ] = useState<IAddress>({
		streetName: "",
		streetNumber: "",
		zipCode: "",
		city: "",
		state: "2",
		location: { coordinates: [] }
	});

	useEffect(
		() => {
			if (storedAddress) {
				setPosition({ lat: storedAddress.location.coordinates[1], lng: storedAddress.location.coordinates[0] });
				setZoom(17);
			}
		},
		[ address, storedAddress ]
	);

	const handleOnloadSearchBox = (ref: StandaloneSearchBoxProps) => {
		setStandaloneSearchBox(ref);
	};

	const handleOnChangeSearchbox = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.value.length === 0) {
			setAddress({
				streetName: "",
				streetNumber: "",
				zipCode: "",
				city: "",
				state: "",
				location: { coordinates: [] }
			});
			setPosition({ lat: 51.48217, lng: 11.9658 });
			setZoom(14);
			getAddress(address);
		}
	};

	const mapGetPlacesToAddress = (
		address_components: IAddressComponent[] | any,
		newPostion: { lng: number; lat: number }
	) => {
		switch (+address_components.length) {
			case 2:
				setAddress({
					city: address_components[0].long_name,
					state: address_components[1].long_name,
					location: { coordinates: [ newPostion.lng, newPostion.lat ] }
				});
				setZoom(14);
				break;
			case 4:
				setAddress({
					streetName: address_components[0].long_name,
					city: address_components[1].long_name,
					state: address_components[2].long_name,
					zipCode: address_components[3].long_name,
					location: { coordinates: [ newPostion.lng, newPostion.lat ] }
				});
				setZoom(17);
				break;
			case 5:
				setAddress({
					streetNumber: address_components[0].long_name,
					streetName: address_components[1].long_name,
					city: address_components[2].long_name,
					state: address_components[3].long_name,
					zipCode: address_components[4].long_name,
					location: { coordinates: [ newPostion.lng, newPostion.lat ] }
				});
				setZoom(18);
				break;
			default:
				break;
		}
	};

	const handleOnPlaceChanged = () => {
		if (!isEmpty(searchBox.getPlaces()[0]) && !isNil(searchBox.getPlaces()[0])) {
			const addressComponents: [] = searchBox!.getPlaces()[0]!.address_components;
			const lngLat = searchBox.getPlaces()[0].geometry.location;
			const newPostion: { lng: number; lat: number } = {
				lng: lngLat.lng(),
				lat: lngLat.lat()
			};
			if (addressComponents) {
				const types = [ "street_number", "route", "locality", "administrative_area_level_1", "postal_code" ];
				const filterByMapTypes: IAddressComponent[] = [];

				// Filter map types
				addressComponents.forEach((o: IAddressComponent) => {
					o.types.forEach((e: string) => {
						if (types.includes(e)) {
							filterByMapTypes.push(o);
						}
					});
				});
				mapGetPlacesToAddress(filterByMapTypes, newPostion);
				setPosition(newPostion);
			} else {
				return;
			}
		}
	};

	const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			return false;
		}
	};

	getAddress(address);

	const renderMap = () => (
		<Fragment>
			<Segment.Group>
				<Segment>
					<StandaloneSearchBox
						options={{ componentRestrictions: { country: "de" } }}
						onLoad={handleOnloadSearchBox}
						onPlacesChanged={handleOnPlaceChanged}
					>
						<Form.Input
							onKeyDown={handleOnKeyDown}
							error={address.city.length > 0 ? false : true}
							fluid
							type="text"
							iconPosition="left"
							icon="map"
							placeholder="Adresse"
							onChange={handleOnChangeSearchbox}
						/>
					</StandaloneSearchBox>
				</Segment>
			</Segment.Group>

			<GoogleMap
				id="google-maps"
				zoom={zoom}
				center={postion}
				mapContainerStyle={{ height: "30em", width: "100%" }}
				mapContainerClassName="google-maps-container"
				options={{ styles: mapStyles }}
			>
				{true && <Marker position={postion} />}
			</GoogleMap>
		</Fragment>
	);

	if (loadError) {
		return <div>Map cannot be loaded right now, sorry.</div>;
	}
	return isLoaded ? (
		renderMap()
	) : (
		<Dimmer active inverted page>
			<Loader inline />
		</Dimmer>
	);
};

export default GoogleMaps;
