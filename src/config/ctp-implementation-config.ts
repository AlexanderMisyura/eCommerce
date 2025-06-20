const IMPLEMENTATION_CONFIG = {
  CATEGORY_STAR_WARS_ID: import.meta.env.VITE_CTP_CATEGORY_STAR_WARS_ID,
  CATEGORY_LOTR_ID: import.meta.env.VITE_CTP_CATEGORY_LOTR_ID,
  CATEGORY_TECHNIC_ID: import.meta.env.VITE_CTP_CATEGORY_TECHNIC_ID,
  CATEGORY_BATMAN_ID: import.meta.env.VITE_CTP_CATEGORY_BATMAN_ID,
  CATEGORY_SPACESHIPS_ID: import.meta.env.VITE_CTP_CATEGORY_SPACESHIPS_ID,
  CATEGORY_CARS_ID: import.meta.env.VITE_CTP_CATEGORY_CARS_ID,
} as const;

export default IMPLEMENTATION_CONFIG;
