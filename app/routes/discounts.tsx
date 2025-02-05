import type { Route } from './+types/home';
import Discounts from '../discounts/discounts';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Акции и скидки' }];
}

export default function DiscountsPgae() {
  return <Discounts />;
}
