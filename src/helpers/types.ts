export interface IFetchOptions {
    method: string;
    headers: Record<string, string>;
}

export interface IFormattedOptions {
    legalPayers: SelectOption[];
    services: SelectOption[];
    legalClinics: SelectOption[];
    doctors: SelectOption[];
    organizations: SelectOption[];
};

type WithId = { id: string };
type WithName = { name: string };
type WithType = { type: string };

export type LegalEntity = WithId & WithName & WithType;
export type Organization = WithId & WithName;
export type Doctor = WithId & {
    lastName: string;
    firstName: string;
    patronymic?: string;
};
export type Service = {
    code: string;
    name: string;
}

export type SelectOption = {
    value: string;
    label: string;
}

export type SelectOptions = Record<
    'legalPayers' | 'services' | 'legalClinics' | 'doctors' | 'organizations' | 'currencies',
    SelectOption[]
>;

export type CsvEditorProps = {
    activeTab: TemplateKey;
    selectOptions: SelectOptions;
    rows: RowData[];
    setRows: (rows: any) => void;
};

interface IBaseRow {
    code: string;
    organization_id: string;
    legal_id: string;
    currency: string;
}
export interface IScopRow extends IBaseRow {
    legal_entity_id: string;
    contract_id: string;
    user_id: string;
    maxAmountToPay: number;
    scheduledOn: string;
}
export interface IPriceListRow extends IBaseRow { value: number; }

export type RowData = IScopRow | IPriceListRow;

export type DraftRow = Partial<RowData>;

export type TemplateKey = 'priceList' | 'scop';

export interface FieldConfig {
    name: keyof IScopRow | keyof IPriceListRow
    required?: boolean;
    disabled?: boolean;
    multiple?: boolean;
    component: 'Select' | 'AsyncSelect' | 'NumberInput' | 'DatePicker';
    optionsKey?: keyof SelectOptions;
    defaultValue?: string | number | Array<string | number>;
    placeholder?: string;
}

export interface TemplateConfig {
    fields: FieldConfig[];
    makeRows: (draft: any) => RowData[];
}
