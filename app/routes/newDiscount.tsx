import NewDiscount from '~/discounts/newDiscount';
import type { Route } from './+types/home';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Новая Акция' }];
}

export default function DiscountsPgae() {
  return <NewDiscount />;
}
