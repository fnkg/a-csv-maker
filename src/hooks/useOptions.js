import { useMemo } from 'react';
import { debounce } from 'lodash';

const loadOptions = (data, labelKey, valueKey) => {
  const debouncedLoad = debounce((inputValue, callback) => {
    const filteredOptions = data
      .filter(item => item[labelKey].toLowerCase().includes(inputValue.toLowerCase()))
      .map(item => ({
        value: item[valueKey],
        label: item[labelKey],
      }));
    callback(filteredOptions);
  }, 300);

  return debouncedLoad;
};

const loadFormattedOptions = (data, labelKeyFormatter, valueKey) => {
  const debouncedLoad = debounce((inputValue, callback) => {
    console.log('Data:', data); // Логирование для проверки вызовов
    const filteredOptions = data
      .filter(item => labelKeyFormatter(item).toLowerCase().includes(inputValue.toLowerCase()))
      .map(item => ({
        value: item[valueKey],
        label: labelKeyFormatter(item),
      }));
    callback(filteredOptions);
  }, 300);

  return debouncedLoad;
};

const useOptions = (data) => {
  const clinicLegalEntityOptions = useMemo(() => {
    return data.clinicLegalEntities.map(entity => ({
      value: entity.legal_id,
      label: entity.name
    }));
  }, [data]);

  const organizationOptions = useMemo(() => {
    return data.organizations.map(org => ({
      value: org.organization_id,
      label: org.name
    }));
  }, [data]);

  const currencyOptions = useMemo(() => {
    return data.currencies.map(currency => ({
      value: currency,
      label: currency
    }));
  }, [data]);

  return {
    clinicLegalEntityOptions,
    organizationOptions,
    currencyOptions
  };
};

export {
  loadOptions,
  loadFormattedOptions,
  useOptions
}