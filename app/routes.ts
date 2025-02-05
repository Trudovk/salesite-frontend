import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layout.tsx', [
    index('routes/home.tsx'),
    route('discounts', 'routes/discounts.tsx'),
    route('newDiscount', 'routes/newDiscount.tsx'),
  ]),
] satisfies RouteConfig;
