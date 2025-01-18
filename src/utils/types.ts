export type LegalEntity = {
    id: string;
    name: string;
    type: string;
};

export type Service = {
    code: string;
    name: string;
};

export type Doctor = {
    id: string;
    lastName: string;
    firstName: string;
    patronymic?: string;
};

export type Organization = {
    id: string;
    name: string;
};

export type BaseRow = {
    legal_entity_id: string;
    contract_id: string;
    code: string;
    legal_id: string;
    user_id: string;
    organization_id: string;
    maxAmountToPay: number | string;
    currency: string;
    scheduledOn: string | null;
};

export type RowData = BaseRow;

export type FormRow = Partial<BaseRow>;

export type TableRow = Omit<BaseRow, "scheduledOn"> & { scheduledOn: string | null };

export type SelectOption = {
    value: string;
    label: string;
}

export type OptionType = SelectOption;

export type CsvEditorProps = {
    selectOptions: {
        legalPayers: SelectOption[];
        services: SelectOption[];
        legalClinics: SelectOption[];
        doctors: SelectOption[];
        organizations: SelectOption[];
    };
};

export type FormProps = {
    newRow: FormRow;
    legalPayers: SelectOption[];
    services: SelectOption[];
    legalClinics: SelectOption[];
    doctors: SelectOption[];
    organizations: SelectOption[];
    handleSelectChange: (option: SelectOption | null, field: string) => void;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (date: Date | null) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export type TableProps = {
    rows: TableRow[];
    onDeleteRow: (index: number) => void;
    deleteRowIndex?: number | null;
    legalPayers: SelectOption[];
    services: SelectOption[];
    legalClinics: SelectOption[];
    doctors: SelectOption[];
    organizations: SelectOption[];
};
