import type { TemplateKey, TemplateConfig, RowData } from './types';
import { moscowClinics } from './constants';

const defaultLegals = Object.values(moscowClinics);

export const templates: Record<TemplateKey, TemplateConfig> = {
    scop: {
        fields: [
            {
                name: 'legal_entity_id',
                required: true,
                component: 'Select',
                optionsKey: 'legalPayers',
                placeholder: 'Плательщик'
            },
            {
                name: 'contract_id',
                disabled: true,
                component: 'Select',
                optionsKey: undefined,
                placeholder: 'Contract ID (пустое значение)'
            },
            {
                name: 'code',
                required: true,
                component: 'AsyncSelect',
                optionsKey: 'services',
                placeholder: 'Услуга'
            },
            {
                name: 'legal_id',
                required: true,
                component: 'Select',
                optionsKey: 'legalClinics',
                placeholder: 'Юрлицо клиники'
            },
            {
                name: 'user_id',
                required: true,
                component: 'AsyncSelect',
                optionsKey: 'doctors',
                placeholder: 'Доктор'
            },
            {
                name: 'organization_id',
                component: 'Select',
                optionsKey: 'organizations',
                placeholder: 'Клиника'
            },
            {
                name: 'maxAmountToPay',
                required: true,
                component: 'NumberInput',
                placeholder: 'Максимальная сумма к доплате'
            },
            {
                name: 'currency',
                required: true,
                component: 'Select',
                optionsKey: 'currencies',
                defaultValue: 'RUB',
                placeholder: 'Валюта'
            },
            {
                name: 'scheduledOn',
                required: true,
                component: 'DatePicker'
            },
        ],
        makeRows: (d) => [
            ({
                ...d,
                maxAmountToPay: (d.maxAmountToPay as number) * 100,
            } as RowData),
        ],
    },
    priceList: {
        fields: [
            {
                name: 'code',
                required: true,
                component: 'AsyncSelect',
                optionsKey: 'services',
                placeholder: 'Услуга'
            },
            {
                name: 'organization_id',
                required: false,
                component: 'Select',
                optionsKey: 'organizations',
                placeholder: 'Клиника'
            },
            {
                name: 'legal_id',
                required: true,
                multiple: true,
                component: 'Select',
                optionsKey: 'legalClinics',
                placeholder: 'Юрлицо клиники',
                defaultValue: defaultLegals,
            },

            {
                name: 'value',
                required: true,
                component: 'NumberInput',
                placeholder: 'Цена'
            },

            {
                name: 'currency',
                required: true,
                component: 'Select',
                optionsKey: 'currencies',
                placeholder: 'Валюта',
                defaultValue: 'RUB'
            },
        ],
        makeRows: (d) =>
            (d.legal_id as string[]).map((clinicId) =>
            ({
                code: d.code,
                organization_id: d.organization_id || '',
                legal_id: clinicId,
                value: (d.value as number) * 100,
                currency: d.currency,
            } as RowData)
            ),
    },
};
