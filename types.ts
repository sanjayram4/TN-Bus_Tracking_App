export type Language = 'ta' | 'en' | 'hi';

export interface Bus {
  id: string;
  number: string;
  type: 'Local' | 'Express' | 'Deluxe' | 'AC';
  origin: string;
  destination: string;
  nextStop: string;
  majorStops: string[];
  estimatedDuration: string;
  remainingTime: string; // "Time to go" until final destination
  eta: string; // Time to user's nearest stop
  arrivalTime: string;
  status: 'On Time' | 'Delayed' | 'Approaching';
  lastUpdated: string;
  occupancy: 'Low' | 'Medium' | 'High';
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface District {
  name: string;
  taluks: {
    name: string;
    stands: string[];
  }[];
}

export interface SearchState {
  from: string;
  to: string;
}

export type View = 
  | 'Home' 
  | 'Search' 
  | 'Tracking' 
  | 'DistrictExplorer' 
  | 'MoreTools'
  | 'SOS'
  | 'Nearby'
  | 'Fare'
  | 'Tourism'
  | 'LostFound'
  | 'Weather'
  | 'AIAssistant';