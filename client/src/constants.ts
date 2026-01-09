import { Filter } from "./types";

/** Predefined roles */
export const roles: string[] = [
    "Software Engineer",
    "Business Analyst",
    "Project Manager",
    "Scrum Master",
    "Product Owner"
];

/** User status options */
export const statuses: string[] = [
    "ACTIVE",
    "INACTIVE",
    "SUSPENDED",
]

/** Helper function that returns a filter object with default settings */
export const getEmptyFilter = (): Filter => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return {
        startDate: new Date(0).toISOString().split('T')[0],
        endDate: tomorrow.toISOString().split('T')[0],
        status: "NONE",
        pageNumber: 1,
        pageLimit: 10,
        nameContainsChars: ""
    }
};