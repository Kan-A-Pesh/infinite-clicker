import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Generator } from "../types/generator";
import { baseGenerators } from "../constants/base-generators";

interface SaveState {
  availableGenerators: {
    [key: string]: Generator;
  };
  purchasedGenerators: {
    [key: string]: number;
  };
  unitCount: number;
  addGenerator: (generator: Generator) => void;
  updateGeneratorCost: (generatorName: string, cost: number) => void;
  purchaseGenerator: (generator: Generator) => void;
  updateUnitCount: (count: number) => void;
  reset: () => void;
}

export const useSaveStore = create<SaveState>()(
  persist(
    (set) => ({
      availableGenerators: baseGenerators.reduce((acc, generator) => {
        acc[generator.name] = generator;
        return acc;
      }, {} as Record<string, Generator>),
      purchasedGenerators: {},
      unitCount: 0,
      addGenerator: (generator) =>
        set((state) => ({
          availableGenerators: {
            ...state.availableGenerators,
            [generator.name]: generator,
          },
        })),
      updateGeneratorCost: (generatorName, cost) =>
        set((state) => ({
          availableGenerators: {
            ...state.availableGenerators,
            [generatorName]: {
              ...state.availableGenerators[generatorName],
              inflationCost: cost,
            },
          },
        })),
      purchaseGenerator: (generator) =>
        set((state) => ({
          purchasedGenerators: {
            ...state.purchasedGenerators,
            [generator.name]:
              (state.purchasedGenerators[generator.name] || 0) + 1,
          },
        })),
      updateUnitCount: (count) =>
        set(() => ({
          unitCount: count,
        })),
      reset: () =>
        set(() => ({
          availableGenerators: baseGenerators.reduce((acc, generator) => {
            acc[generator.name] = generator;
            return acc;
          }, {} as Record<string, Generator>),
          purchasedGenerators: {},
          unitCount: 0,
        })),
    }),
    {
      name: "milk-clicker-save",
    }
  )
);
