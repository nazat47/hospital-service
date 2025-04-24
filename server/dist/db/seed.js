"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Start seeding...");
        yield db_1.db.appointment.deleteMany({});
        yield db_1.db.service.deleteMany({});
        yield db_1.db.hospital.deleteMany({});
        yield db_1.db.user.deleteMany({});
        const hospitals = [
            {
                name: "City General Hospital",
                address: "123 Main Street, Downtown, City",
            },
            {
                name: "Mercy Medical Center",
                address: "456 Park Avenue, Midtown, City",
            },
            {
                name: "St. Luke's Hospital",
                address: "789 Oak Road, Westside, City",
            },
            {
                name: "Memorial Healthcare",
                address: "101 Pine Street, Northside, City",
            },
            {
                name: "University Medical Center",
                address: "202 University Blvd, College District, City",
            },
            {
                name: "Harbor View Hospital",
                address: "303 Coastal Highway, Oceanside, City",
            },
            {
                name: "Mountain View Clinic",
                address: "404 Summit Drive, Highland District, City",
            },
            {
                name: "Sunshine Children's Hospital",
                address: "505 Rainbow Lane, Eastside, City",
            },
            {
                name: "Green Valley Medical",
                address: "606 Valley Road, Greenfields, City",
            },
            {
                name: "Central Community Hospital",
                address: "707 Center Street, Midcity, City",
            },
        ];
        const createdHospitals = [];
        for (const hospital of hospitals) {
            const createdHospital = yield db_1.db.hospital.create({
                data: hospital,
            });
            console.log(`Created hospital with id: ${createdHospital.id}`);
            createdHospitals.push(createdHospital);
        }
        const serviceTemplates = [
            {
                name: "General Checkup",
                description: "Complete physical examination and health assessment",
            },
            {
                name: "Emergency Care",
                description: "24/7 emergency medical treatment for acute conditions",
            },
            {
                name: "Cardiology",
                description: "Diagnosis and treatment of heart conditions",
            },
            {
                name: "Pediatrics",
                description: "Medical care for infants, children, and adolescents",
            },
            {
                name: "Orthopedics",
                description: "Treatment of musculoskeletal system disorders",
            },
            {
                name: "Neurology",
                description: "Diagnosis and treatment of nervous system disorders",
            },
            {
                name: "Dermatology",
                description: "Treatments for skin, hair, and nail conditions",
            },
            { name: "Gynecology", description: "Healthcare services for women" },
            {
                name: "Ophthalmology",
                description: "Diagnosis and treatment of eye disorders",
            },
            { name: "Dentistry", description: "Oral health treatments and procedures" },
            { name: "Radiology", description: "Diagnostic imaging services" },
            {
                name: "Laboratory Services",
                description: "Medical testing and analysis",
            },
        ];
        for (const hospital of createdHospitals) {
            const numServices = Math.floor(Math.random() * 3) + 3;
            const shuffled = [...serviceTemplates].sort(() => 0.5 - Math.random());
            const selectedServices = shuffled.slice(0, numServices);
            for (const service of selectedServices) {
                yield db_1.db.service.create({
                    data: {
                        name: service.name,
                        description: service.description,
                        hospitalId: hospital.id,
                    },
                });
                console.log(`Added ${service.name} to ${hospital.name}`);
            }
        }
        console.log("Seeding finished.");
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.db.$disconnect();
}));
