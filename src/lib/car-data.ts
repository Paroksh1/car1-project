
import { Car } from '@/types/car';

// Mock car data
export const mockCars: Car[] = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 25999,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 15000,
    transmission: 'Automatic',
    color: 'Silver',
    images: [
      'https://images.unsplash.com/photo-1621007947382-bb3c3994e3ab?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1583876011168-3115274f1086?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Toyota Camry is a reliable midsize sedan known for its comfort, fuel efficiency, and longevity.',
    features: ['Bluetooth', 'Backup Camera', 'Lane Departure Warning', 'Adaptive Cruise Control', 'Sunroof']
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'CR-V',
    year: 2023,
    price: 31500,
    fuel: 'Hybrid',
    seating: 5,
    mileage: 8000,
    transmission: 'Automatic',
    color: 'White',
    images: [
      'https://images.unsplash.com/photo-1617469767053-d3b16ee15d16?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1635401446161-29ab5804154c?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Honda CR-V is a compact SUV offering excellent fuel economy and a spacious interior.',
    features: ['Apple CarPlay', 'Android Auto', 'Heated Seats', 'Panoramic Sunroof', 'Wireless Charging']
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'F-150',
    year: 2022,
    price: 42000,
    fuel: 'Diesel',
    seating: 6,
    mileage: 12000,
    transmission: 'Automatic',
    color: 'Blue',
    images: [
      'https://images.unsplash.com/photo-1605893477799-b99e3b8b93fb?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1571172938703-aef6acb5b673?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Ford F-150 is America\'s best-selling pickup truck, known for its power, towing capacity, and durability.',
    features: ['360-degree Camera', 'Pro Trailer Backup Assist', 'SYNC 4', 'Power Tailgate', 'LED Headlights']
  },
  {
    id: 4,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2023,
    price: 48990,
    fuel: 'Electric',
    seating: 5,
    mileage: 5000,
    transmission: 'Automatic',
    color: 'Red',
    images: [
      'https://images.unsplash.com/photo-1619815585678-0c25337296ba?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1641467063219-0d26b39bd108?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Tesla Model 3 is an all-electric sedan with impressive range, acceleration, and cutting-edge technology.',
    features: ['Autopilot', '15" Touchscreen', 'OTA Updates', 'Glass Roof', 'Sentry Mode']
  },
  {
    id: 5,
    brand: 'Chevrolet',
    model: 'Equinox',
    year: 2022,
    price: 26500,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 18000,
    transmission: 'Automatic',
    color: 'Black',
    images: [
      'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Chevrolet Equinox is a compact SUV with a comfortable ride and good fuel economy.',
    features: ['Wi-Fi Hotspot', 'Teen Driver Technology', 'Rear Park Assist', 'Remote Start', 'Heated Seats']
  },
  {
    id: 6,
    brand: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 45000,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 9000,
    transmission: 'Automatic',
    color: 'Gray',
    images: [
      'https://images.unsplash.com/photo-1556800572-1b8aedf82985?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The BMW 3 Series is a luxury compact sedan known for its performance and handling.',
    features: ['iDrive 7.0', 'Ambient Lighting', 'Parking Assistant', 'Live Cockpit Professional', 'Comfort Access']
  },
  {
    id: 7,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    price: 29000,
    fuel: 'Hybrid',
    seating: 5,
    mileage: 12000,
    transmission: 'Automatic',
    color: 'Green',
    images: [
      'https://images.unsplash.com/photo-1633434531882-170966ac03c9?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1605652513173-313424ac3e2c?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Hyundai Tucson is a stylish compact SUV offering good value for money and excellent warranty coverage.',
    features: ['Digital Key', 'Bose Premium Audio', 'Blind-Spot View Monitor', 'Remote Smart Parking Assist', 'Ventilated Seats']
  },
  {
    id: 8,
    brand: 'Audi',
    model: 'Q5',
    year: 2023,
    price: 52000,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 7000,
    transmission: 'Automatic',
    color: 'White',
    images: [
      'https://images.unsplash.com/photo-1614162692292-7ac56d7f557e?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1550829434-c8bfcae201c4?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Audi Q5 is a luxury compact SUV that combines performance, technology, and refinement.',
    features: ['Virtual Cockpit', 'Bang & Olufsen Sound', 'Quattro AWD', 'Matrix LED Headlights', 'Adaptive Damping']
  },
  {
    id: 9,
    brand: 'Subaru',
    model: 'Outback',
    year: 2022,
    price: 33000,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 16000,
    transmission: 'CVT',
    color: 'Brown',
    images: [
      'https://images.unsplash.com/photo-1669218457272-2bb2f540d1bc?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1635095954656-e6be823e6ee2?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Subaru Outback is a versatile crossover wagon with standard AWD and excellent off-road capability.',
    features: ['EyeSight Driver Assist', 'StarLink Infotainment', 'X-Mode', 'Power Liftgate', 'Roof Rails']
  },
  {
    id: 10,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2023,
    price: 28500,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 10000,
    transmission: 'Automatic',
    color: 'Red',
    images: [
      'https://images.unsplash.com/photo-1611194301710-79acf5b20fab?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1637363990764-de84fd247316?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Mazda CX-5 is a compact crossover SUV known for its upscale interior and engaging driving dynamics.',
    features: ['i-Activsense', 'Mazda Connect', 'Bose Sound System', 'Active Driving Display', 'G-Vectoring Control']
  },
  {
    id: 11,
    brand: 'Kia',
    model: 'Telluride',
    year: 2022,
    price: 43000,
    fuel: 'Gasoline',
    seating: 8,
    mileage: 14000,
    transmission: 'Automatic',
    color: 'Black',
    images: [
      'https://images.unsplash.com/photo-1669413457445-3dfbdfa9fbfb?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1622046237530-6878caec535e?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Kia Telluride is a midsize SUV with a spacious interior, upscale amenities, and impressive value.',
    features: ['Drive Mode Select', 'Harman Kardon Audio', 'Blind-Spot Collision-Avoidance', 'Highway Driving Assist', 'Wireless Charging']
  },
  {
    id: 12,
    brand: 'Nissan',
    model: 'Rogue',
    year: 2023,
    price: 30500,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 9000,
    transmission: 'CVT',
    color: 'Blue',
    images: [
      'https://images.unsplash.com/photo-1609623253751-39436a06379b?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1613467143018-cf189cda6a89?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Nissan Rogue is a compact crossover SUV offering practicality, fuel efficiency, and modern technology.',
    features: ['ProPILOT Assist', 'Divide-N-Hide Cargo', 'NissanConnect', 'Intelligent Around View Monitor', 'Motion Activated Liftgate']
  },
  {
    id: 13,
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2022,
    price: 40000,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 15000,
    transmission: 'Manual',
    color: 'Green',
    images: [
      'https://images.unsplash.com/photo-1546614042-7df3c24c9e5d?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1593055357429-92bfaaeee62c?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Jeep Wrangler is an iconic off-road SUV known for its ruggedness, capability, and removable doors and roof.',
    features: ['Rock-Trac 4x4', 'Skid Plates', 'Electronic Front Sway Bar Disconnect', 'Washout Interior', 'Trail Rated Badge']
  },
  {
    id: 14,
    brand: 'Volkswagen',
    model: 'Tiguan',
    year: 2023,
    price: 32000,
    fuel: 'Gasoline',
    seating: 7,
    mileage: 8000,
    transmission: 'Automatic',
    color: 'Silver',
    images: [
      'https://images.unsplash.com/photo-1636978655050-91697f0afb3c?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1636978864217-8dafa9b1cc5f?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Volkswagen Tiguan is a compact SUV offering European styling, versatile seating, and solid performance.',
    features: ['Digital Cockpit Pro', 'IQ.DRIVE', 'Fender Premium Audio', '4MOTION AWD', 'App-Connect']
  },
  {
    id: 15,
    brand: 'Lexus',
    model: 'RX',
    year: 2022,
    price: 51000,
    fuel: 'Hybrid',
    seating: 5,
    mileage: 11000,
    transmission: 'Automatic',
    color: 'Gray',
    images: [
      'https://images.unsplash.com/photo-1625988577180-0feed22196a3?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1625988577180-0feed22196a3?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Lexus RX is a luxury midsize SUV known for its refined ride, hybrid efficiency, and excellent build quality.',
    features: ['Mark Levinson Audio', 'Lexus Safety System+', 'Head-Up Display', 'Touch-Free Power Liftgate', 'F SPORT Handling']
  },
  {
    id: 16,
    brand: 'Mercedes-Benz',
    model: 'GLC',
    year: 2023,
    price: 58000,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 6000,
    transmission: 'Automatic',
    color: 'Black',
    images: [
      'https://images.unsplash.com/photo-1626669291908-7040f570b359?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1625168674356-f201710d65ec?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Mercedes-Benz GLC is a luxury compact SUV with elegant styling, advanced technology, and refined performance.',
    features: ['MBUX', 'Burmester Surround Sound', 'AIR BODY CONTROL', 'ENERGIZING Comfort', '64-Color Ambient Lighting']
  },
  {
    id: 17,
    brand: 'Volvo',
    model: 'XC60',
    year: 2022,
    price: 49500,
    fuel: 'Hybrid',
    seating: 5,
    mileage: 13000,
    transmission: 'Automatic',
    color: 'White',
    images: [
      'https://images.unsplash.com/photo-1614027930102-5bc0f7865d63?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1625077359114-931e8752cc23?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Volvo XC60 is a luxury compact SUV featuring Scandinavian design, advanced safety features, and plug-in hybrid options.',
    features: ['Pilot Assist', 'Bowers & Wilkins Audio', 'Four-Zone Climate', 'Orrefors Crystal Gearshift', '360° Camera']
  },
  {
    id: 18,
    brand: 'Acura',
    model: 'MDX',
    year: 2023,
    price: 47000,
    fuel: 'Gasoline',
    seating: 7,
    mileage: 7500,
    transmission: 'Automatic',
    color: 'Red',
    images: [
      'https://images.unsplash.com/photo-1622484212850-eb596d769edc?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1622653966896-fc2f0b89e066?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Acura MDX is a luxury three-row SUV with sporty handling, a spacious interior, and high-end features.',
    features: ['Super Handling All-Wheel Drive', 'ELS STUDIO 3D Audio', 'AcuraWatch', 'CabinTalk', 'Dynamic Mode Selector']
  },
  {
    id: 19,
    brand: 'Porsche',
    model: 'Macan',
    year: 2022,
    price: 68000,
    fuel: 'Gasoline',
    seating: 5,
    mileage: 10000,
    transmission: 'Automatic',
    color: 'Blue',
    images: [
      'https://images.unsplash.com/photo-1614812513172-567d2fe96a62?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1618093583654-5a37615d5028?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Porsche Macan is a luxury compact SUV that delivers sports car-like performance in a practical package.',
    features: ['Porsche Active Suspension Management', 'Sport Chrono Package', 'Porsche Communication Management', 'BOSE Surround Sound', 'Lane Keep Assist']
  },
  {
    id: 20,
    brand: 'Toyota',
    model: 'RAV4',
    year: 2023,
    price: 34000,
    fuel: 'Hybrid',
    seating: 5,
    mileage: 6000,
    transmission: 'Automatic',
    color: 'Green',
    images: [
      'https://images.unsplash.com/photo-1633358823325-8c2dce50edf8?auto=format&q=75&fit=crop&w=600',
      'https://images.unsplash.com/photo-1596723230730-66cf53f50c4d?auto=format&q=75&fit=crop&w=600',
    ],
    description: 'The Toyota RAV4 is a compact SUV renowned for its reliability, fuel efficiency, and resale value.',
    features: ['Toyota Safety Sense 2.0', 'Dynamic Torque Vectoring AWD', 'Digital Rearview Mirror', 'JBL Audio', 'Multi-Terrain Select']
  }
];

// Utility functions to simulate API calls
export const carsAPI = {
  // Get cars with filters and pagination
  getCars: (filters: {
    brand?: string;
    minPrice?: number;
    maxPrice?: number;
    fuel?: string;
    seating?: number;
    sortBy?: 'price-asc' | 'price-desc';
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    let filteredCars = [...mockCars];
    
    // Filter by brand
    if (filters.brand && filters.brand !== 'all') {
      filteredCars = filteredCars.filter(car => car.brand === filters.brand);
    }
    
    // Filter by price range
    if (filters.minPrice) {
      filteredCars = filteredCars.filter(car => car.price >= filters.minPrice!);
    }
    
    if (filters.maxPrice) {
      filteredCars = filteredCars.filter(car => car.price <= filters.maxPrice!);
    }
    
    // Filter by fuel type
    if (filters.fuel && filters.fuel !== 'all') {
      filteredCars = filteredCars.filter(car => car.fuel === filters.fuel);
    }
    
    // Filter by seating capacity
    if (filters.seating) {
      filteredCars = filteredCars.filter(car => car.seating >= filters.seating!);
    }
    
    // Search by text
    if (filters.search && filters.search.trim() !== '') {
      const searchTerm = filters.search.toLowerCase().trim();
      filteredCars = filteredCars.filter(car => 
        car.brand.toLowerCase().includes(searchTerm) || 
        car.model.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort results
    if (filters.sortBy) {
      if (filters.sortBy === 'price-asc') {
        filteredCars.sort((a, b) => a.price - b.price);
      } else if (filters.sortBy === 'price-desc') {
        filteredCars.sort((a, b) => b.price - a.price);
      }
    }
    
    // Count total results
    const total = filteredCars.length;
    
    // Handle pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // Return paginated results
    const paginatedCars = filteredCars.slice(startIndex, endIndex);
    
    return {
      cars: paginatedCars,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    };
  },
  
  // Get car details by ID
  getCarById: (id: number) => {
    return mockCars.find(car => car.id === id);
  },
  
  // Get available brands for filtering
  getBrands: () => {
    const brands = [...new Set(mockCars.map(car => car.brand))];
    return brands;
  },
  
  // Get available fuel types for filtering
  getFuelTypes: () => {
    const fuelTypes = [...new Set(mockCars.map(car => car.fuel))];
    return fuelTypes;
  },
  
  // Get max price for range filter
  getMaxPrice: () => {
    return Math.max(...mockCars.map(car => car.price));
  }
};
