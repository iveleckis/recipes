type Migration = {
  version: number;
  file: string;
};

export const migrations: Migration[] = [
  {
    version: 1,
    file: "/001_recipes_drop_column_description.sql",
  },
];
