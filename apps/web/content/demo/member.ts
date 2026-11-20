// SYNTHETIC DEMO DATA. An invented member and clinician for the demo dashboard.
// None of this belongs to a real person and none of it is medical guidance.

export const demoMember = {
  firstName: 'Alex',
  lastName: 'Morgan',
  unreadNotifications: 2,
} as const;

// an invented person with a real credential, so the demo reads like the product would
export const demoClinician = { name: 'Jordan Lee', credential: 'NP' } as const;

export const demoClinicianName = `${demoClinician.name}, ${demoClinician.credential}`;
