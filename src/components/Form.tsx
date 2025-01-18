import { useCallback } from 'react';
import { AsyncedSelect, BasicSelect, DatePickerInput, NumberInput } from '@/src/components';
import { currencies } from '../utils/utils';

type SelectOption = { value: string; label: string };

type FormProps = {
  newRow: {
    legal_entity_id?: string;
    code?: string;
    legal_id?: string;
    user_id?: string;
    organization_id?: string;
    maxAmountToPay?: number | string;
    currency?: string;
    scheduledOn?: string;
  };
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

const Form: React.FC<FormProps> = ({
  newRow,
  legalPayers,
  services,
  legalClinics,
  doctors,
  organizations,
  handleSelectChange,
  handleInputChange,
  handleDateChange,
  handleKeyDown,
}) => {
  return (
    <form className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
      <BasicSelect
        options={legalPayers || []}
        onChange={(option) => handleSelectChange(option, 'legal_entity_id')}
        value={
          newRow.legal_entity_id
            ? {
              value: newRow.legal_entity_id,
              label: legalPayers.find((opt) => opt.value === newRow.legal_entity_id)?.label || '',
            }
            : null
        }
        placeholder='Плательщик'
      />

      <BasicSelect
        options={[]}
        onChange={() => { }}
        isDisabled={true}
        value={{ value: ',', label: 'contract_id' }}
        placeholder='Contract ID (пустое значение)'
      />

      <AsyncedSelect
        loadOptions={useCallback(
          (inputValue) =>
            Promise.resolve(
              (services || []).filter((service) =>
                service.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            ),
          [services]
        )}
        onChange={useCallback((option) => handleSelectChange(option, 'code'), [handleSelectChange])}
        value={
          newRow.code
            ? { value: newRow.code, label: services.find((s) => s.value === newRow.code)?.label }
            : null
        }
        placeholder='Услуга'
        noOptionsMessage={() => 'начните вводить текст ⌨️'}
      />

      <BasicSelect
        options={legalClinics || []}
        onChange={(option) => handleSelectChange(option, 'legal_id')}
        value={
          newRow.legal_id
            ? {
              value: newRow.legal_id,
              label: legalClinics.find((opt) => opt.value === newRow.legal_id)?.label || '',
            }
            : null
        }
        placeholder='Юрлицо клиники'
      />

      <AsyncedSelect
        loadOptions={useCallback(
          (inputValue) =>
            Promise.resolve(
              (doctors || []).filter((doctor) =>
                doctor.label.toLowerCase().includes(inputValue.toLowerCase())
              )
            ),
          [doctors]
        )}
        onChange={useCallback((option) => handleSelectChange(option, 'user_id'), [handleSelectChange])}
        value={
          newRow.user_id
            ? {
              value: newRow.user_id,
              label: doctors.find((d) => d.value === newRow.user_id)?.label || '',
            }
            : null
        }
        placeholder='Доктор'
        noOptionsMessage={() => 'начните вводить текст ⌨️'}
      />

      <BasicSelect
        options={organizations || []}
        onChange={(option) => handleSelectChange(option, 'organization_id')}
        value={
          newRow.organization_id
            ? {
              value: newRow.organization_id,
              label: organizations.find((opt) => opt.value === newRow.organization_id)?.label || '',
            }
            : null
        }
        placeholder='Клиника'
      />

      <NumberInput
        name='maxAmountToPay'
        value={newRow.maxAmountToPay}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder='Максимальная сумма к доплате'
        className='number-input'
      />

      <BasicSelect
        options={currencies || []}
        onChange={(currency) => handleSelectChange(currency, 'currency')}
        value={newRow.currency ? { value: newRow.currency, label: newRow.currency } : null}
        placeholder='Валюта'
      />

      <DatePickerInput
        selected={newRow.scheduledOn ? new Date(newRow.scheduledOn + "T00:00:00Z") : null}
        onChange={handleDateChange}
      />
    </form>
  );
}

export default Form;
