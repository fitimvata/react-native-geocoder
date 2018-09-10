
export interface Geocoder {
    fallbackToGoogle: (apiKey: string) => void;
    enableGoogleGeocoderIOS: () => void;
}
