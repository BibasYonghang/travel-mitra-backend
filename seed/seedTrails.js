import mongoose from "mongoose";
import dotenv from "dotenv";
import Trail from "../models/Trail.js";

dotenv.config();

const trails = [
    {
        name: "Kalinchowk Bhagwati Trek",
        location: "Dolakha",
        difficulty: "Moderate",
        distance: 4,
        duration: "2-3 hours",
        description: "Short and popular pilgrimage hike with stunning views of Gaurishankar Himal.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762567391/OIP_psmovo.webp",
        coordinates: { lat: 27.6719, lng: 86.0243 }
    },
    {
        name: "Phulchoki Hike",
        location: "Lalitpur",
        difficulty: "Moderate",
        distance: 8,
        duration: "4-6 hours",
        description: "A lush forest hike to the highest hill in Kathmandu valley, known for bird watching.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762569882/phulchoki-hill-hiking_fb90oz.webp",
        coordinates: { lat: 27.5819, lng: 85.3913 }
    },
    {
        name: "Champadevi Hike",
        location: "Kirtipur, Kathmandu",
        difficulty: "Moderate",
        distance: 7,
        duration: "3-5 hours",
        description: "A popular ridge hike offering panoramic views of the Kathmandu valley.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762570031/Hikers-starting-their-Champadevi-Hiking-from-Bhanjyang-Dakshinkali_puag3i.jpg",
        coordinates: { lat: 27.6553, lng: 85.2641 }
    },
    {
        name: "Sundarijal to Chisapani Trek",
        location: "Shivapuri National Park",
        difficulty: "Moderate",
        distance: 14,
        duration: "5-7 hours",
        description: "Forest trail with waterfalls and scenic village landscapes.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762570062/stairs-in-hiking-1_qywqts.jpg",
        coordinates: { lat: 27.7955, lng: 85.3975 }
    },
    {
        name: "Dhulikhel to Namobuddha Hike",
        location: "Kavrepalanchok",
        difficulty: "Easy",
        distance: 8,
        duration: "3-4 hours",
        description: "Peaceful countryside walk to a sacred Buddhist monastery.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762570086/ec_ied1zd.jpg",
        coordinates: { lat: 27.6150, lng: 85.5934 }
    },
    {
        name: "Khopra Ridge Trek",
        location: "Annapurna Region",
        difficulty: "Hard",
        distance: 45,
        duration: "5-7 days",
        description: "Less crowded alternative to ABC with wide mountain range visibility.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762573970/BlogspotImageUrl-66097-Bikat-Adventures_azajjt.jpg",
        coordinates: { lat: 28.4735, lng: 83.7431 }
    },
    {
        name: "Makalu Base Camp Trek",
        location: "Makalu-Barun National Park",
        difficulty: "Hard",
        distance: 75,
        duration: "14-18 days",
        description: "Remote trek through rugged terrain leading to the base of the 5th highest peak.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574009/makalu-base-camp_tomja5.jpg",
        coordinates: { lat: 27.8867, lng: 87.0870 }
    },
    {
        name: "Helambu Trek",
        location: "Sindhupalchowk",
        difficulty: "Moderate",
        distance: 35,
        duration: "4-6 days",
        description: "A scenic trek passing through Sherpa villages and rhododendron forests.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574258/helambu-trek_jwokow.webp",
        coordinates: { lat: 28.1280, lng: 85.5304 }
    },
    {
        name: "Upper Mustang Trek",
        location: "Mustang",
        difficulty: "Hard",
        distance: 80,
        duration: "10-14 days",
        description: "A dramatic desert-like landscape with Tibetan culture preserved for centuries.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574476/why-trek-upper-mustang-nepal.jpg_q6xgsn.webp",
        coordinates: { lat: 29.1781, lng: 83.9702 }
    },
    {
        name: "Rara Lake Trek",
        location: "Mugu",
        difficulty: "Moderate",
        distance: 20,
        duration: "3-5 days",
        description: "A serene trek to the largest lake in Nepal, known for crystal clear waters.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574536/image_vbmroq.jpg",
        coordinates: { lat: 29.5237, lng: 82.0885 }
    },
    {
        name: "Tsho Rolpa Lake Trek",
        location: "Rolwaling Valley",
        difficulty: "Hard",
        distance: 32,
        duration: "5-7 days",
        description: "High-altitude glacial lake trek offering peaceful alpine views.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574571/bdeing-village_wxgdwe.png",
        coordinates: { lat: 27.8694, lng: 86.4062 }
    },
    {
        name: "Ghandruk Village Trek",
        location: "Kaski",
        difficulty: "Easy",
        distance: 6,
        duration: "2-3 hours",
        description: "One of the easiest treks with rich Gurung culture and views of Annapurna & Machhapuchhre.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574627/ghandruk-village_lrvqaq.jpg",
        coordinates: { lat: 28.3769, lng: 83.8021 }
    },
    {
        name: "Khumai Danda (Machhapuchhre Model Trek)",
        location: "Kaski",
        difficulty: "Moderate",
        distance: 18,
        duration: "2-3 days",
        description: "New trending trek with close-up views of Mt. Machhapuchhre.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574680/maxresdefault_shten6.jpg",
        coordinates: { lat: 28.3706, lng: 83.9516 }
    },
    {
        name: "Shey Phoksundo Lake Trek",
        location: "Dolpa",
        difficulty: "Hard",
        distance: 34,
        duration: "5-7 days",
        description: "Remote trek to a turquoise alpine lake inside Shey Phoksundo National Park.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762574766/big-c7841c01b98201b8f16522f34e03c3d4_gavqzq.jpg",
        coordinates: { lat: 29.1851, lng: 82.9333 }
    },
    {
        name: "Ghorepani Poon Hill Trek",
        location: "Annapurna Region",
        difficulty: "Moderate",
        distance: 32,
        duration: "4-5 days",
        description: "Popular trek known for panoramic sunrise views over the Annapurna & Dhaulagiri ranges.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762575841/Ghorepani-pool-hill-trek_snbs7t.jpg",
        coordinates: { lat: 28.4006, lng: 83.9142 }
    },
    {
        name: "Langtang Valley Trek",
        location: "Langtang National Park",
        difficulty: "Moderate",
        distance: 40,
        duration: "5-7 days",
        description: "Scenic trek through Langtang Valley with views of Langtang Lirung, villages, and alpine meadows.",
        image: "https://res.cloudinary.com/dorwxf5yq/image/upload/v1762575898/langtang-trek-7-days-I_im6ts4.jpg",
        coordinates: { lat: 28.2133, lng: 85.5333 }
    }
];

const seedDB = async () => {
    await mongoose.connect(process.env.MONGO_URL);
    await Trail.deleteMany({}); // Clear old data
    await Trail.insertMany(trails); // Add new data
    console.log("Database seeded with trails!");
    mongoose.disconnect();
};

seedDB();
