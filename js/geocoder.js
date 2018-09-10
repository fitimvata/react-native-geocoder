import { NativeModules, Platform } from 'react-native';
import GoogleApi from './googleApi.js';

const { RNGeocoder } = NativeModules;

export default {
  apiKey: null,
  useGoogleOnIOS: false,

  fallbackToGoogle(key) {
    this.apiKey = key;
  },

  enableGoogleGeocoderIOS() {
    this.useGoogleOnIOS = Platform.OS === 'ios';
  },

  geocodePosition(position) {
    if (!position || !position.lat || !position.lng) {
      return Promise.reject(new Error("invalid position: {lat, lng} required"));
    }

    if (this.useGoogleOnIOS) {
      if (!this.apiKey) { 
        return Promise.reject(new Error("No api key"));
      }
      return GoogleApi.geocodePosition(this.apiKey, position);
    }

    return RNGeocoder.geocodePosition(position).catch(err => {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodePosition(this.apiKey, position);
    });
  },

  geocodeAddress(address) {
    if (!address) {
      return Promise.reject(new Error("address is null"));
    }

    if (this.useGoogleOnIOS) {
      if (!this.apiKey) { 
        return Promise.reject(new Error("No api key"));
      }
      return GoogleApi.geocodeAddress(this.apiKey, position);
    }

    return RNGeocoder.geocodeAddress(address).catch(err => {
      if (!this.apiKey) { throw err; }
      return GoogleApi.geocodeAddress(this.apiKey, address);
    });
  },
}
