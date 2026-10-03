
const hospitals = [
  {
    id: 1,
    name: "Apollo Hospitals",
    location: "Greams Road, Chennai",
    doctors: [
      {
        name: "Dr. Priya Sharma",
        specialty: "Cardiology",
        experience: 12,
        rating: 4.8,
        reviews: 126,
        fee: 800,
        slots: ["10:00 AM", "11:30 AM", "3:00 PM"],
      },
      {
        name: "Dr. Rahul Kumar",
        specialty: "General Medicine",
        experience: 8,
        rating: 4.6,
        reviews: 94,
        fee: 500,
        slots: ["9:30 AM", "1:00 PM", "4:30 PM"],
      },
    ],
  },

  {
    id: 2,
    name: "MIOT International",
    location: "Manapakkam, Chennai",
    doctors: [
      {
        name: "Dr. Ananya Rao",
        specialty: "Dermatology",
        experience: 10,
        rating: 4.9,
        reviews: 158,
        fee: 700,
        slots: ["10:30 AM", "12:00 PM", "4:00 PM"],
      },
      {
        name: "Dr. Arjun Menon",
        specialty: "Orthopedics",
        experience: 9,
        rating: 4.7,
        reviews: 112,
        fee: 750,
        slots: ["11:00 AM", "2:00 PM", "5:00 PM"],
      },
    ],
  },

  {
    id: 3,
    name: "Fortis Malar Hospital",
    location: "Adyar, Chennai",
    doctors: [
      {
        name: "Dr. Meera Iyer",
        specialty: "Pediatrics",
        experience: 11,
        rating: 4.8,
        reviews: 137,
        fee: 650,
        slots: ["9:00 AM", "12:30 PM", "3:30 PM"],
      },
      {
        name: "Dr. Vikram Singh",
        specialty: "Neurology",
        experience: 14,
        rating: 4.9,
        reviews: 181,
        fee: 900,
        slots: ["10:00 AM", "1:30 PM", "4:00 PM"],
      },
    ],
  },
];

export default hospitals;
