import React from 'react';

import { Button } from './styles';

export default function ContentButton({ children, ...props }) {
  return (
    <Button type="button" {...props}>
      {children}
    </Button>
  );
}
