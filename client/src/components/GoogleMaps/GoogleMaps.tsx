// tslint:disable-next-line: no-submodule-imports
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/first */
import React, { useState, useEffect } from 'react';
import { Segment, Form, Dimmer, Loader } from 'semantic-ui-react';
import { GoogleMap, useLoadScript, StandaloneSearchBox, Marker } from '@react-google-maps/api';
import moment from 'moment';
import { getTimes } from 'suncalc';
import { IAddress } from '../../models';
import { EGoogleMapsTypes } from '../../enums';
import mapStylesDarkMode from './darkMode.json';
import 'moment/locale/de';

interface IStateProps {
  hasSearchBox?: boolean;
  getAddress?: (e: IAddress) => void;
  storedAddress: IAddress;
}

const GOOGLE_MAPS_LIBARIES = ['places'];
const GoogleMaps: React.FC<IStateProps> = (props) => {
  const { getAddress, storedAddress, hasSearchBox } = props;
  const { isLoaded, loadError } = useLoadScript({
    id: 'script-loader',
    version: 'weekly',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    language: 'de',
    preventGoogleFontsLoading: true,
    region: 'de',
    libraries: GOOGLE_MAPS_LIBARIES
  });

  const [zoom, setZoom] = useState(14);
  const [searchBox, setStandaloneSearchBox] = useState<google.maps.places.SearchBox>();
  const [postion, setPosition] = useState({ lat: 51.48217, lng: 11.9658 });
  const [formattedAddress, setFormattedAddress] = useState<string>('');
  const [address, setAddress] = useState<IAddress>({
    streetName: '',
    streetNumber: '',
    zipCode: '',
    city: '',
    state: '2',
    formattedAddress: '',
    location: { coordinates: [] }
  });

  useEffect(() => {
    if (storedAddress) {
      setPosition({
        lat: storedAddress?.location!.coordinates[1],
        lng: storedAddress?.location!.coordinates[0]
      });
      // setAddress(storedAddress);
      // setFormattedAddress(storedAddress.formattedAddress!);
      setZoom(17);
      setFormattedAddress(storedAddress.formattedAddress!);
    }
    getAddress!(address);
  }, [storedAddress, address, getAddress]);

  const onLoadMap = (searchbox: google.maps.places.SearchBox) => setStandaloneSearchBox(searchbox);
  const handleOnChangeSearchbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length === 0) {
      setAddress({
        streetName: '',
        streetNumber: '',
        zipCode: '',
        city: '',
        state: '',
        location: { coordinates: [] }
      });
      setPosition({ lat: 51.48217, lng: 11.9658 });
      setZoom(14);
      setFormattedAddress('');
    } else {
      getAddress!(address);
      setFormattedAddress(event.target.value);
    }
  };

  const handleOnPlaceChanged = () => {
    if (searchBox?.getPlaces()[0]) {
      const getPlacesFromMapsApi: google.maps.GeocoderAddressComponent[] | undefined = searchBox?.getPlaces()[0].address_components;
      const getPlacesFormattedAddress: string | undefined = searchBox?.getPlaces()[0]?.formatted_address;
      const lngLat = searchBox?.getPlaces()[0].geometry!.location;
      const newPostion: { lng: number; lat: number } = {
        lng: lngLat?.lng(),
        lat: lngLat?.lat()
      };

      if (!getPlacesFromMapsApi!.length || !getPlacesFormattedAddress) {
        return new Error('Could not connect to google maps api');
      }

      setAddress({
        streetNumber: hasAttribute(EGoogleMapsTypes.streetNumber, getPlacesFromMapsApi!),
        streetName: hasAttribute(EGoogleMapsTypes.route, getPlacesFromMapsApi!),
        city: hasAttribute(EGoogleMapsTypes.locality, getPlacesFromMapsApi!),
        sublocalityLevel1: hasAttribute(EGoogleMapsTypes.sublocalityLevel1, getPlacesFromMapsApi!),
        sublocalityLevel2: hasAttribute(EGoogleMapsTypes.sublocalityLevel2, getPlacesFromMapsApi!),
        state: hasAttribute(EGoogleMapsTypes.administrativeAreaLevel1, getPlacesFromMapsApi!),
        zipCode: hasAttribute(EGoogleMapsTypes.postalCode, getPlacesFromMapsApi!),
        formattedAddress: getPlacesFormattedAddress,
        location: { coordinates: [newPostion.lng, newPostion.lat] }
      });

      setFormattedAddress(getPlacesFormattedAddress!);
      setPosition(newPostion);
      getAddress!(address);
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      return false;
    }
  };

  const renderMap = () => (
    <>
      {hasSearchBox && (
        <Segment.Group>
          <Segment>
            <StandaloneSearchBox onLoad={onLoadMap} onPlacesChanged={handleOnPlaceChanged}>
              <Form.Input
                onKeyDown={handleOnKeyDown}
                error={!formattedAddress}
                type="text"
                iconPosition="left"
                icon="map"
                placeholder="Adresse"
                value={formattedAddress}
                onChange={handleOnChangeSearchbox}
              />
            </StandaloneSearchBox>
          </Segment>
        </Segment.Group>
      )}

      <GoogleMap
        id="google-maps"
        options={checkDarkMode() ? { styles: mapStylesDarkMode as never[] } : {}}
        zoom={zoom}
        center={postion}
        mapContainerStyle={{ height: '30em', width: '100%' }}
        mapContainerClassName="google-maps-container"
      >
        {true && <Marker position={postion} />}
      </GoogleMap>
    </>
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

const checkDarkMode = (): boolean => {
  const { sunset, sunriseEnd } = getTimes(new Date(), 51.48217, 11.9658);
  return moment().isAfter(sunset) || moment().isBefore(sunriseEnd);
};

// eslint-disable-next-line max-len
const hasAttribute = (key: string, getPlace: google.maps.GeocoderAddressComponent[]): string | undefined => {
  const type = getPlace.filter((o) => o.types.includes(key));
  return type[0]?.long_name || undefined;
};
