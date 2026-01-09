import { Filter } from "./types";

export const roles: string[] = [
    "Software Engineer",
    "Business Analyst",
    "Project Manager",
    "Scrum Master",
    "Product Owner"
];

export const statuses: string[] = [
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
]

export const getEmptyFilter = (): Filter => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return {
        startDate: new Date(0).toISOString().split('T')[0],
        endDate: tomorrow.toISOString().split('T')[0],
        status: "NONE",
        pageNumber: 1,
        pageLimit: 10
    }
};