export type EnvironmentVariables = {
  PORT: string;
  API_URL: string;
};

export type Todo = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
};
