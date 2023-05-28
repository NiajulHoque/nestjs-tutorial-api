import { z, SafeParseReturnType, ZodSchema } from 'zod';

export type ValidationResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export const isValid = <T>(
  _: unknown,
  parseResult: SafeParseReturnType<unknown, T>,
): _ is T => parseResult.success;

export const getValidationResult = <T>(
  input: unknown,
  schema: ZodSchema,
): ValidationResult<T> => {
  const parseResult = schema.safeParse(input);

  if (isValid<T>(input, parseResult)) {
    return { success: true, value: input };
  } else if (parseResult.success === false) {
    return { success: false, error: parseResult.error.message };
  }

  return { success: false, error: 'Unknown error with the input' };
};

// ------------------------------------------------

const pokemonTypeSchema = z.enum([
  'Normal',
  'Fire',
  'Water',
  'Grass',
  'Electric',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dark',
  'Dragon',
  'Steel',
  'Fairy',
]);

const pokemonSchema = z.object({
  id: z.string().nonempty(),
  name: z.string().nonempty(),
  type: pokemonTypeSchema,
  specialMove: z.string().nonempty(),
});

export type Pokemon = z.infer<typeof pokemonSchema>;
export const validatePokemon = (data: unknown) =>
  getValidationResult<Pokemon>(data, pokemonSchema);

const pokemonToCreateSchema = z.object({
  name: z.string().nonempty(),
  type: pokemonTypeSchema,
  specialMove: z.string().nonempty(),
});

export type PokemonCreate = z.infer<typeof pokemonToCreateSchema>;
export const validatePokemonToCreate = (data: unknown) =>
  getValidationResult<PokemonCreate>(data, pokemonToCreateSchema);

const pokemonUpdateSchema = z.object({
  name: z.string().nonempty().optional(),
  type: pokemonTypeSchema.optional(),
  specialMove: z.string().nonempty().optional(),
});

export type PokemonUpdate = z.infer<typeof pokemonUpdateSchema>;
export const validatePokemonToUpdate = (data: unknown) =>
  getValidationResult<Pokemon>(data, pokemonUpdateSchema);

export const validatePokemons = (data: unknown) =>
  getValidationResult<Pokemon[]>(data, z.array(pokemonSchema));

// ------------------------------------------------

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
