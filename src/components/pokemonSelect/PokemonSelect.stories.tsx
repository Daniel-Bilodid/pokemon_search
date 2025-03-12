import type { Meta, StoryObj } from "@storybook/react";
import PokemonSelect from "./PokemonSelect";

const meta: Meta<typeof PokemonSelect> = {
  title: "Components/PokemonSelect",
  component: PokemonSelect,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PokemonSelect>;

export const Default: Story = {};
