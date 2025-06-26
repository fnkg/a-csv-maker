'use client';

import { useEffect, useState } from 'react';

import Buttons from '@/ui/Buttons';
import ErrorMessage from '@/ui/ErrorMessage';
import Form from '@/components/form';
import Table from '@/components/table';

import type { CsvEditorProps, IScopRow, IPriceListRow, RowData, TemplateConfig, TemplateKey } from '@/helpers/types';
import { templates } from '@/helpers/templates';
import { downloadCsv, formatDate } from '@/helpers/utils';

type ExtendedProps = CsvEditorProps & {
  rows: RowData[];
  setRows: React.Dispatch<React.SetStateAction<RowData[]>>;
  isClearing: boolean;
};

const CsvEditor: React.FC<ExtendedProps> = ({ activeTab, selectOptions, rows, setRows, isClearing }) => {
  let fields: TemplateConfig;
  activeTab === 'scop' ? fields = templates.scop : fields = templates.priceList

  const initialRows: Record<TemplateKey, RowData> = {
    scop: templates.scop.fields.reduce((acc, f) => ({
      ...acc,
      [f.name]: f.defaultValue ?? (f.multiple ? [] : ''),
    }), {} as IScopRow),
    priceList: templates.priceList.fields.reduce((acc, f) => ({
      ...acc,
      [f.name]: f.defaultValue ?? (f.multiple ? [] : ''),
    }), {} as IPriceListRow),
  };

  const [newRow, setNewRow] = useState<RowData>(initialRows[activeTab]);
  const [error, setError] = useState<string | undefined>();
  const [deleteRowIndex, setDeleteRowIndex] = useState<number | null>(null);

  useEffect(() => {
    setError(undefined);
    setNewRow(initialRows[activeTab]);
  }, [activeTab]);

  function validate(tab: TemplateKey, draft: RowData) {
    return templates[tab].fields.every(f => {
      const v = (draft as any)[f.name];
      return f.required
        ? (f.multiple ? Array.isArray(v) && v.length > 0 : Boolean(v))
        : true;
    });
  }

  function makeRows(tab: TemplateKey, draft: RowData): RowData[] {
    return templates[tab].makeRows(draft);
  }

  const handleAddRow = () => {
    setError(undefined);
    if (!validate(activeTab, newRow)) {
      setError('Пожалуйста, заполните все обязательные поля ✏️');
      return;
    }
    const produced = makeRows(activeTab, newRow);
    setRows((prev: RowData[]) => [...prev, ...produced]);
  };

  const handleClearAll = () => {
    setRows([]);
    setNewRow({
      legal_entity_id: '',
      contract_id: '',
      code: '',
      legal_id: '',
      user_id: '',
      organization_id: '',
      maxAmountToPay: 0,
      currency: 'RUB',
      scheduledOn: '',
    });
    setError('');
  };

  const handleDeleteRow = (index: number) => {
    setDeleteRowIndex(index);
    setTimeout(() => {
      setRows((prevRows: RowData[]) => prevRows.filter((_, i) => i !== index));
      setDeleteRowIndex(null);
    }, 500);
  };

  const handleDownload = () => {
    const filename = activeTab === 'scop' ? 'max-amount.csv' : 'price-list.csv';
    downloadCsv(rows, filename)
  };

  return (
    <div className="p-8">
      <ErrorMessage error={error} />

      <div className="min-h-[200px] sm:min-h-30">
        <Form
          template={activeTab}
          fields={templates[activeTab].fields}
          newRow={newRow}
          selectOptions={selectOptions}

          handleSelectChange={(option, fieldName) => {
            const value = Array.isArray(option)
              ? option.map(o => o.value)
              : option
                ? option.value
                : '';

            setNewRow(prev => ({ ...prev, [fieldName]: value }));
          }}

          handleInputChange={(e) => {
            const { name, min, max, value: inputValue } = e.target;
            const parsed = Number(inputValue);

            const clamped = Math.max(Number(min), Math.min(Number(max), parsed));

            setNewRow(prev => ({
              ...prev,
              [name]: isNaN(clamped) ? null : clamped
            }));
          }}

          handleDateChange={(date: Date | null) => {
            const formattedDate = date ? formatDate(date) : '';
            setNewRow({ ...newRow, scheduledOn: formattedDate });
          }}
        />
      </div>

      <Buttons
        onAddRow={handleAddRow}
        onClearAll={handleClearAll}
        onDownload={handleDownload}
      />

      <Table
        template={activeTab}
        fields={templates[activeTab].fields}
        rows={rows}
        selectOptions={selectOptions}
        deleteRowIndex={deleteRowIndex}
        onDeleteRow={handleDeleteRow}
        isClearing={isClearing}
      />
    </div>
  );
};

export default CsvEditor;
