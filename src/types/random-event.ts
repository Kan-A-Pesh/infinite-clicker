export type RandomEvent = {
  emojiIcon: string;
  title: string;
  description: string;
  actions: {
    label: string;
    unit: number;
  }[];
};
