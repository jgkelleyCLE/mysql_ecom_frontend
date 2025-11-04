import React from 'react';
import { Badge } from '@/components/ui/badge';

const CartBadge = ({ cart }) => {
  return (
    <Badge className="h-5 min-w-5 bg-red-500 text-white dark:bg-purple-700 rounded-full px-1 font-mono tabular-nums absolute -top-3.5 -right-3">
      {cart.length}
    </Badge>
  );
};

export default CartBadge;
