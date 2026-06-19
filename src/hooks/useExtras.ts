import { useTranslation } from 'react-i18next';

export interface ExtraDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  price: number;
}

const EXTRA_PRICES: Record<string, number> = {
  water: 1.5,
  beer: 3,
  chips: 2,
  coke: 2,
  cokezero: 2,
  carseat: 0,
  grocery: 43.8,
  ferrycoz: 48.1,
  ferryisla: 43.4,
};

const EXTRA_ORDER = [
  'water', 'beer', 'chips', 'coke', 'cokezero', 'carseat', 'grocery', 'ferrycoz', 'ferryisla',
];

export function useExtras(): ExtraDefinition[] {
  const { t } = useTranslation();

  return EXTRA_ORDER.map((id) => {
    const item = t(`extras.items.${id}`, { returnObjects: true }) as string[];
    return {
      id,
      name: item[0],
      description: item[1],
      icon: item[2],
      price: EXTRA_PRICES[id],
    };
  });
}

export function useExtrasTotal(extrasState: Record<string, number>, twoTerminals: boolean, vehiclePrice: number): number {
  let sum = 0;
  for (const id of EXTRA_ORDER) {
    sum += (extrasState[id] || 0) * EXTRA_PRICES[id];
  }
  const terminalFee = twoTerminals ? 18.8 : 0;
  return vehiclePrice + sum + terminalFee;
}
