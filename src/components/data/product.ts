export interface ProductSpecification {
  name: string;
  value: string | number;
}

export interface ProductItem {
  id: string;
  name: string;
  description: string;
  image: string;
  price: {
    min: number;
    max: number;
    currency: string;
  };
  specifications: ProductSpecification[];
  features: string[];
  applications: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  items: ProductItem[];
}

export const products: Record<string, ProductCategory> = {
  "electro-actuated-pumps": {
    id: "electro-actuated-pumps",
    name: "Milton Roy Electro Actuated Diaphragm Pumps",
    description: "Advanced electronic dosing pumps for precise chemical metering",
    image: "/placeholder.svg?height=200&width=200",
    items: [
      {
        id: "v-a-series",
        name: "V and A Series Electro Magnetically Actuated Diaphragm Dosing Pump",
        description: "High-precision electromagnetic dosing pump for accurate chemical metering",
        image: "/assets/products/V-A-Series-Electro-Magnetically-Actuated-Diaphragm-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 26500,
          max: 39000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "12 LPH" },
          { name: "Pressure", value: "12 kgf/cm2" },
          { name: "Power", value: "Electric" },
          { name: "Material", value: "Metal" },
          { name: "Size", value: "Different Available" }
        ],
        features: [
          "Accurate and reliable metering",
          "Robust construction for industrial use",
          "Wide range of flow rates",
          "Easy maintenance and operation"
        ],
        applications: [
          "Water treatment",
          "Chemical processing",
          "Food and beverage industry",
          "Pharmaceutical manufacturing"
        ]
      },
      {
        id: "phob-series",
        name: "PhoB Series Electro Magnetically Actuated Diaphragm Type Dosing Pump",
        description: "Compact and reliable electromagnetic dosing solution",
        image: "/assets/products/V-A-Series-Electro-Magnetically-Actuated-Diaphragm-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 22000,
          max: 35000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "10 LPH" },
          { name: "Pressure", value: "10 kgf/cm2" },
          { name: "Power", value: "Electric" },
          { name: "Material", value: "PVDF" },
          { name: "Size", value: "Compact" }
        ],
        features: [
          "Compact design for space-saving installation",
          "High chemical resistance",
          "Precise dosing control",
          "Low maintenance requirements"
        ],
        applications: [
          "Municipal water treatment",
          "Industrial wastewater treatment",
          "Swimming pool maintenance",
          "Agriculture and irrigation"
        ]
      },
      {
        id: "unichlor",
        name: "Unichlor - UC 11 / UC12 Electronic Dosing Pump For Chlorination",
        description: "Specialized electronic dosing pump for chlorination applications",
        image: "/assets/products/V-A-Series-Electro-Magnetically-Actuated-Diaphragm-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 18000,
          max: 28000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "6 LPH" },
          { name: "Pressure", value: "4 kgf/cm2" },
          { name: "Power", value: "Electric" },
          { name: "Material", value: "PVC" },
          { name: "Size", value: "Compact" }
        ],
        features: [
          "Specifically designed for chlorine dosing",
          "Corrosion-resistant materials",
          "Automatic air bleed valve",
          "Digital control interface"
        ],
        applications: [
          "Drinking water disinfection",
          "Swimming pool chlorination",
          "Cooling tower treatment",
          "Wastewater disinfection"
        ]
      },
      {
        id: "d-series",
        name: "D Series Electro Magnetically Actuated Diaphragm Dosing Pump",
        description: "Versatile electromagnetic pump for various industrial applications",
        image: "/assets/products/V-A-Series-Electro-Magnetically-Actuated-Diaphragm-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 30000,
          max: 45000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "90 LPH" },
          { name: "Pressure", value: "15 kgf/cm2" },
          { name: "Power", value: "Electric" },
          { name: "Material", value: "Stainless Steel" },
          { name: "Size", value: "Medium" }
        ],
        features: [
          "High flow rate capacity",
          "Durable stainless steel construction",
          "Multiple control modes",
          "Self-priming capability"
        ],
        applications: [
          "Oil and gas industry",
          "Chemical manufacturing",
          "Pulp and paper processing",
          "Mining operations"
        ]
      },
    ],
  },
  "mechanical-actuated-pumps": {
    id: "mechanical-actuated-pumps",
    name: "Milton Roy Actuated Diaphragm Type Dosing Pumps",
    description: "Reliable mechanical dosing pumps for industrial applications",
    image: "/placeholder.svg?height=200&width=200",
    items: [
      {
        id: "gb-series",
        name: "GB Series Mechanically Actuated Diaphragm Type Dosing Pump",
        description: "Heavy-duty mechanical dosing pump for demanding applications",
        image: "/assets/products/GB-Series-Mechanically-Actuated-Diaphragm-Type-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 35000,
          max: 55000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "150 LPH" },
          { name: "Pressure", value: "20 kgf/cm2" },
          { name: "Power", value: "Mechanical" },
          { name: "Material", value: "Cast Iron" },
          { name: "Size", value: "Large" }
        ],
        features: [
          "Robust cast iron construction",
          "High flow rate and pressure capabilities",
          "Manual stroke length adjustment",
          "Low-maintenance design"
        ],
        applications: [
          "Heavy industry",
          "Petrochemical processing",
          "Municipal water treatment",
          "Power generation plants"
        ]
      },
      {
        id: "m-series",
        name: "M Series Mechanically Actuated Diaphragm Type Dosing Pump",
        description: "Robust mechanical pump designed for continuous operation",
        image: "/assets/products/GB-Series-Mechanically-Actuated-Diaphragm-Type-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 28000,
          max: 42000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "100 LPH" },
          { name: "Pressure", value: "18 kgf/cm2" },
          { name: "Power", value: "Mechanical" },
          { name: "Material", value: "Ductile Iron" },
          { name: "Size", value: "Medium" }
        ],
        features: [
          "Continuous duty operation",
          "Precision-engineered for reliability",
          "Easy-to-adjust stroke length",
          "Suitable for hazardous environments"
        ],
        applications: [
          "Chemical processing",
          "Textile industry",
          "Food and beverage production",
          "Pharmaceutical manufacturing"
        ]
      },
    ],
  },
  "hydraulic-actuated-pumps": {
    id: "hydraulic-actuated-pumps",
    name: "Milton Roy Hydraulically Actuated Diaphragm Pumps",
    description: "High-performance hydraulic pumps for precise fluid control",
    image: "/placeholder.svg?height=200&width=200",
    items: [
      {
        id: "m-roy-series",
        name: "m-Roy Series A B H and P Hydraulically Actuated Diaphragm Type Dosing Pump",
        description: "Advanced hydraulic dosing pump for high-pressure applications",
        image: "/assets/products/m-Roy-Series-A-B-H-P-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 50000,
          max: 75000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "200 LPH" },
          { name: "Pressure", value: "30 kgf/cm2" },
          { name: "Power", value: "Hydraulic" },
          { name: "Material", value: "Stainless Steel" },
          { name: "Size", value: "Large" }
        ],
        features: [
          "High-pressure capability",
          "Precise flow control",
          "Multiple diaphragm options",
          "Suitable for corrosive fluids"
        ],
        applications: [
          "Oil and gas industry",
          "High-pressure chemical injection",
          "Reverse osmosis systems",
          "Offshore platforms"
        ]
      },
      {
        id: "phl-series",
        name: "PHL Series Hydraulically Actuated Diaphragm Type Dosing Pump",
        description: "High-capacity hydraulic pump for industrial processes",
        image: "/assets/products/m-Roy-Series-A-B-H-P-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 45000,
          max: 65000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "180 LPH" },
          { name: "Pressure", value: "25 kgf/cm2" },
          { name: "Power", value: "Hydraulic" },
          { name: "Material", value: "Alloy Steel" },
          { name: "Size", value: "Large" }
        ],
        features: [
          "High flow rate capacity",
          "Robust construction for harsh environments",
          "Adjustable stroke length",
          "Low-pulsation output"
        ],
        applications: [
          "Petrochemical industry",
          "Mining operations",
          "Wastewater treatment",
          "Chemical manufacturing"
        ]
      },
      {
        id: "b145-series",
        name: "B145 Series Hydraulically Actuated Diaphragm Type Dosing Pump",
        description: "Premium hydraulic pump for critical applications",
        image: "/assets/products/m-Roy-Series-A-B-H-P-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 55000,
          max: 80000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "220 LPH" },
          { name: "Pressure", value: "35 kgf/cm2" },
          { name: "Power", value: "Hydraulic" },
          { name: "Material", value: "Duplex Stainless Steel" },
          { name: "Size", value: "Extra Large" }
        ],
        features: [
          "Highest pressure rating in the series",
          "Advanced hydraulic technology",
          "Precision-engineered components",
          "Extended service life"
        ],
        applications: [
          "Offshore oil and gas platforms",
          "High-pressure chemical processing",
          "Nuclear power plants",
          "Desalination plants"
        ]
      },
      {
        id: "b105-series",
        name: "B105 Series Hydraulically Actuated Diaphragm Type Dosing Pump",
        description: "Compact hydraulic pump for precise metering",
        image: "/assets/products/B105-Series-Hydraulically-Actuated-Diaphragm-Type-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 40000,
          max: 60000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "150 LPH" },
          { name: "Pressure", value: "20 kgf/cm2" },
          { name: "Power", value: "Hydraulic" },
          { name: "Material", value: "316 Stainless Steel" },
          { name: "Size", value: "Compact" }
        ],
        features: [
          "Compact design for space-constrained installations",
          "High accuracy and repeatability",
          "Easy maintenance and calibration",
          "Suitable for continuous operation"
        ],
        applications: [
          "Chemical dosing in water treatment",
          "Pharmaceutical manufacturing",
          "Food and beverage processing",
          "Textile industry"
        ]
      },
    ],
  },
  "plunger-pumps": {
    id: "plunger-pumps",
    name: "Milton Roy Packed Plunger Dosing Pumps",
    description: "Durable plunger pumps for high-pressure applications",
    image: "/placeholder.svg?height=200&width=200",
    items: [
      {
        id: "pnk-series",
        name: "PNK Series Packed Plunger Dosing Pump",
        description: "High-performance plunger pump for demanding environments",
        image: "/assets/products/PNM-Series-Packed-Plunger-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 38000,
          max: 58000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "250 LPH" },
          { name: "Pressure", value: "40 kgf/cm2" },
          { name: "Power", value: "Mechanical" },
          { name: "cm2", value: "Stainless Steel" },
          { name: "Power", value: "Mechanical" },
          { name: "Material", value: "Stainless Steel" },
          { name: "Size", value: "Large" }
        ],
        features: [
          "High-pressure capability",
          "Durable plunger design",
          "Precise flow control",
          "Suitable for abrasive fluids"
        ],
        applications: [
          "Oil and gas industry",
          "High-pressure cleaning systems",
          "Reverse osmosis",
          "Chemical injection"
        ]
      },
      {
        id: "pnl-series",
        name: "PNL Series Packed Plunger Dosing Pump",
        description: "Heavy-duty plunger pump for industrial applications",
        image: "/assets/products/PNP-Series-Packed-Plunger-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 42000,
          max: 62000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "300 LPH" },
          { name: "Pressure", value: "45 kgf/cm2" },
          { name: "Power", value: "Mechanical" },
          { name: "Material", value: "Duplex Stainless Steel" },
          { name: "Size", value: "Extra Large" }
        ],
        features: [
          "Highest flow rate in the series",
          "Robust construction for continuous operation",
          "Multiple plunger material options",
          "Low-maintenance design"
        ],
        applications: [
          "Petrochemical processing",
          "Mining operations",
          "Wastewater treatment",
          "Industrial cleaning"
        ]
      },
      {
        id: "pnm-series",
        name: "PNM Series Packed Plunger Dosing Pump",
        description: "Medium-capacity plunger pump for various industries",
        image: "/assets/products/PNM-Series-Packed-Plunger-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 35000,
          max: 55000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "200 LPH" },
          { name: "Pressure", value: "35 kgf/cm2" },
          { name: "Power", value: "Mechanical" },
          { name: "Material", value: "316 Stainless Steel" },
          { name: "Size", value: "Medium" }
        ],
        features: [
          "Versatile for various applications",
          "Balanced performance between flow and pressure",
          "Easy installation and maintenance",
          "Adjustable stroke length"
        ],
        applications: [
          "Chemical processing",
          "Food and beverage industry",
          "Pharmaceutical manufacturing",
          "Water treatment"
        ]
      },
      {
        id: "pnp-series",
        name: "PNP Series Packed Plunger Dosing Pump",
        description: "Premium plunger pump for specialized applications",
        image: "/assets/products/PNP-Series-Packed-Plunger-Dosing-Pump.jpg?height=300&width=300",
        price: {
          min: 48000,
          max: 68000,
          currency: "INR"
        },
        specifications: [
          { name: "Flow Rate", value: "180 LPH" },
          { name: "Pressure", value: "50 kgf/cm2" },
          { name: "Power", value: "Mechanical" },
          { name: "Material", value: "Hastelloy" },
          { name: "Size", value: "Compact" }
        ],
        features: [
          "Highest pressure rating in the series",
          "Corrosion-resistant materials",
          "Precision-engineered for accuracy",
          "Suitable for aggressive chemicals"
        ],
        applications: [
          "Specialty chemical production",
          "High-pressure injection systems",
          "Offshore platforms",
          "Nuclear power plants"
        ]
      },
    ],
  },
}

export type ProductCategories = keyof typeof products;