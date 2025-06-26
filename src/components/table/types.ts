import type { FieldConfig, RowData, SelectOptions, TemplateKey } from '@/helpers/types';

export type TableProps = {
    template: TemplateKey;
    fields: FieldConfig[];
    rows: RowData[];
    selectOptions: SelectOptions;
    isClearing?: boolean;
    onDeleteRow: (index: number) => void;
    deleteRowIndex?: number | null;
};
