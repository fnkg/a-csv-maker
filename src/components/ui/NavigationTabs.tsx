'use client';

import type { NavigationTabProps } from './types';

const NavigationTabs: React.FC<NavigationTabProps> = ({ value, onChange }) => (
  <nav className="flex justify-end gap-2 mt-6 mb-4 bg-gray-100 px-4 py-2 rounded-md border border-gray-200">
    <button
      className={`tab ${value === 'priceList' ? 'tab-active' : ''}`}
      onClick={() => onChange('priceList')}
    >
      Прайс лист СК
    </button>
    <button
      className={`tab ${value === 'scop' ? 'tab-active' : ''}`}
      onClick={() => onChange('scop')}
    >
      СКОП
    </button>
  </nav>
);

export default NavigationTabs; 