'use client';

import { useState } from 'react';

import NavigationTabs from './ui/NavigationTabs';
import CsvEditor from './CsvEditor';

import type { CsvEditorProps, TemplateKey, RowData } from '@/helpers/types';

type Props = Pick<CsvEditorProps, 'selectOptions'>;

export default function CsvEditorShell({ selectOptions }: Props) {
  const [activeTab, setActiveTab] = useState<TemplateKey>('scop');
  const [rows, setRows] = useState<RowData[]>([]);
  const [isClearing, setIsClearing] = useState(false);

  const handleTabChange = (tab: TemplateKey) => {
    if (tab === activeTab) return;

    setIsClearing(true);

    setTimeout(() => {
      setRows([]);
      setIsClearing(false);
      setActiveTab(tab);
    }, 300);
  };

  return (
    <>
      <NavigationTabs value={activeTab} onChange={handleTabChange} />
      <main>
        <CsvEditor
          activeTab={activeTab}
          selectOptions={selectOptions}
          rows={rows}
          setRows={setRows}
          isClearing={isClearing}
        />
      </main>
    </>
  );
}
