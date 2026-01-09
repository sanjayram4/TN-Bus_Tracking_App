import { District, Bus } from './types';

export const TAMIL_NADU_DISTRICTS: District[] = [
  { name: 'Ariyalur', taluks: [{ name: 'Ariyalur', stands: ['Ariyalur Main', 'Jayankondam', 'Sendurai'] }] },
  { name: 'Chengalpattu', taluks: [{ name: 'Chengalpattu', stands: ['Chengalpattu Junc', 'Maduranthakam', 'Tambaram South'] }] },
  { name: 'Chennai', taluks: [
    { name: 'Chennai Central', stands: ['CMBT Koyambedu', 'Broadway', 'Central Station', 'Egmore'] },
    { name: 'Chennai South', stands: ['Tambaram', 'Adyar', 'Guindy', 'Velachery', 'Thiruvanmiyur'] },
    { name: 'Chennai North', stands: ['Madhavaram', 'Tiruvottiyur', 'Perambur', 'Red Hills'] },
    { name: 'Chennai West', stands: ['Poonamallee', 'Avadi', 'Ambattur'] }
  ]},
  { name: 'Coimbatore', taluks: [
    { name: 'Coimbatore North', stands: ['Gandhipuram', 'Mettupalayam Road'] },
    { name: 'Coimbatore South', stands: ['Ukkadam', 'Singanallur', 'Sulur'] },
    { name: 'Pollachi', stands: ['Pollachi Central'] }
  ]},
  { name: 'Cuddalore', taluks: [{ name: 'Cuddalore', stands: ['Old Town', 'New Town', 'Chidambaram', 'Panruti'] }] },
  { name: 'Dharmapuri', taluks: [{ name: 'Dharmapuri', stands: ['Dharmapuri Stand', 'Harur', 'Palacode'] }] },
  { name: 'Dindigul', taluks: [
    { name: 'Dindigul', stands: ['Dindigul Central'] },
    { name: 'Palani', stands: ['Palani Stand'] },
    { name: 'Kodaikanal', stands: ['Kodaikanal Stand'] }
  ]},
  { name: 'Erode', taluks: [{ name: 'Erode', stands: ['Central Stand', 'Bhavani', 'Gobi'] }] },
  { name: 'Kallakurichi', taluks: [{ name: 'Kallakurichi', stands: ['Kallakurichi Stand', 'Ulundurpet'] }] },
  { name: 'Kancheepuram', taluks: [{ name: 'Kancheepuram', stands: ['Kanchi Central', 'Sriperumbudur'] }] },
  { name: 'Kanniyakumari', taluks: [{ name: 'Nagercoil', stands: ['Christopher Stand', 'Anna Stand'] }] },
  { name: 'Karur', taluks: [{ name: 'Karur', stands: ['Karur New Stand', 'Kulithalai'] }] },
  { name: 'Krishnagiri', taluks: [{ name: 'Krishnagiri', stands: ['Krishnagiri Stand', 'Hosur'] }] },
  { name: 'Madurai', taluks: [
    { name: 'Madurai North', stands: ['Mattuthavani (MGR Stand)', 'Anna Nagar', 'K.Pudur', 'Othakadai', 'Iyer Bungalow', 'Kadachanendhal', 'Alagar Kovil Road', 'Bibikulam', 'Tallakulam'] },
    { name: 'Madurai South', stands: ['Periyar Stand', 'Railway Station', 'Crime Branch', 'Nelpettai', 'Simmakkal', 'Goripalayam', 'South Gate', 'Munichalai', 'Therku Vaasal', 'Keelavasal'] },
    { name: 'Thirumangalam', stands: ['Thirumangalam New Stand', 'Old Stand', 'Kappalur Checkpost', 'Uchappatti', 'Kalligudi', 'T.Kallupatti'] },
    { name: 'Thiruparankundram', stands: ['Thiruparankundram Temple Stand', 'Pasumalai', 'Pykara', 'Palanganatham', 'Austinpatti', 'Harveypatti'] },
    { name: 'Melur', stands: ['Melur Municipal Stand', 'Alagarkoil', 'Kottampatti', 'Vellalur', 'Therkutheru'] },
    { name: 'Usilampatti', stands: ['Usilampatti Town Stand', 'Chellampatti', 'Elumalai', 'Sedapatti', 'Vikkiramangalam'] },
    { name: 'Vadipatti', stands: ['Vadipatti Stand', 'Sholavandan', 'Alanganallur', 'Palamedu', 'Thanichiyam'] }
  ]},
  { name: 'Mayiladuthurai', taluks: [{ name: 'Mayiladuthurai', stands: ['Mayiladuthurai Stand', 'Sirkazhi'] }] },
  { name: 'Nagapattinam', taluks: [{ name: 'Nagapattinam', stands: ['Nagai Stand', 'Velankanni'] }] },
  { name: 'Namakkal', taluks: [{ name: 'Namakkal', stands: ['Namakkal Stand', 'Tiruchengode'] }] },
  { name: 'Nilgiris', taluks: [{ name: 'Ooty', stands: ['Ooty Central', 'Coonoor'] }] },
  { name: 'Perambalur', taluks: [{ name: 'Perambalur', stands: ['Perambalur Stand'] }] },
  { name: 'Pudukkottai', taluks: [{ name: 'Pudukkottai', stands: ['Pudukkottai New Stand'] }] },
  { name: 'Ramanathapuram', taluks: [{ name: 'Ramnad', stands: ['Ramnad Stand', 'Rameswaram'] }] },
  { name: 'Ranipet', taluks: [{ name: 'Ranipet', stands: ['Arcot', 'Walajapet'] }] },
  { name: 'Salem', taluks: [{ name: 'Salem', stands: ['New Bus Stand', 'Old Bus Stand', 'Mettur'] }] },
  { name: 'Sivaganga', taluks: [{ name: 'Sivaganga', stands: ['Sivaganga Stand', 'Karaikudi'] }] },
  { name: 'Tenkasi', taluks: [{ name: 'Tenkasi', stands: ['Tenkasi Stand', 'Sankarankovil'] }] },
  { name: 'Thanjavur', taluks: [{ name: 'Thanjavur', stands: ['New Bus Stand', 'Kumbakonam'] }] },
  { name: 'Theni', taluks: [{ name: 'Theni', stands: ['Theni Stand', 'Cumbum'] }] },
  { name: 'Thoothukudi', taluks: [{ name: 'Tuticorin', stands: ['Tuticorin Central', 'Tiruchendur'] }] },
  { name: 'Tiruchirappalli', taluks: [{ name: 'Trichy', stands: ['Central Stand', 'Chatram', 'Srirangam'] }] },
  { name: 'Tirunelveli', taluks: [{ name: 'Nellai', stands: ['Nellai Junc', 'New Stand'] }] },
  { name: 'Tirupathur', taluks: [{ name: 'Tirupathur', stands: ['Tirupathur Stand', 'Ambur'] }] },
  { name: 'Tiruppur', taluks: [{ name: 'Tiruppur', stands: ['Old Stand', 'New Stand', 'Dharapuram'] }] },
  { name: 'Tiruvallur', taluks: [{ name: 'Tiruvallur', stands: ['Tiruvallur Stand', 'Avadi'] }] },
  { name: 'Tiruvannamalai', taluks: [{ name: 'Tiruvannamalai', stands: ['TV Malai Central'] }] },
  { name: 'Tiruvarur', taluks: [{ name: 'Tiruvarur', stands: ['Tiruvarur Stand'] }] },
  { name: 'Vellore', taluks: [{ name: 'Vellore', stands: ['Vellore New Stand', 'Katpadi'] }] },
  { name: 'Viluppuram', taluks: [{ name: 'Viluppuram', stands: ['Viluppuram Stand', 'Tindivanam'] }] },
  { name: 'Virudhunagar', taluks: [{ name: 'Virudhunagar', stands: ['Virudhunagar Stand', 'Sivakasi'] }] }
];

export const MOCK_BUSES: Bus[] = [
  {
    id: 'B1',
    number: '21G',
    type: 'Local',
    origin: 'Parrys',
    destination: 'Tambaram',
    nextStop: 'Central Station',
    majorStops: ['Central', 'LIC', 'Saidapet', 'Guindy', 'Chromepet'],
    estimatedDuration: '1h 15m',
    remainingTime: '1h 10m',
    eta: '5 mins',
    arrivalTime: '10:45 AM',
    status: 'On Time',
    lastUpdated: '1 min ago',
    occupancy: 'Medium',
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'B2',
    number: '576',
    type: 'Express',
    origin: 'Mattuthavani',
    destination: 'Periyar',
    nextStop: 'Goripalayam',
    majorStops: ['K.Pudur', 'Anna Nagar', 'District Court', 'Goripalayam', 'Simmakkal'],
    estimatedDuration: '45m',
    remainingTime: '33m',
    eta: '12 mins',
    arrivalTime: '11:02 AM',
    status: 'Approaching',
    lastUpdated: 'Now',
    occupancy: 'High',
    coordinates: { lat: 13.0067, lng: 80.2206 }
  },
  {
    id: 'B3',
    number: '12C',
    type: 'AC',
    origin: 'Adyar',
    destination: 'Mylapore',
    nextStop: 'Mandaveli',
    majorStops: ['Kotturpuram', 'Mylapore Tank', 'Mandaveli'],
    estimatedDuration: '30m',
    remainingTime: '5m',
    eta: '25 mins',
    arrivalTime: '11:15 AM',
    status: 'Delayed',
    lastUpdated: '5 mins ago',
    occupancy: 'Low',
    coordinates: { lat: 13.0012, lng: 80.2564 }
  }
];