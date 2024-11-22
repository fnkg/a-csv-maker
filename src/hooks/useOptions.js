import { useMemo } from 'react';

export const useOptions = (data) => {
  const payersOptions = useMemo(() => {
    return data.payers.map(entity => ({
      value: entity.legal_entity_id,
      label: entity.name
    }));
  }, [data]);

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
    payersOptions,
    clinicLegalEntityOptions,
    organizationOptions,
    currencyOptions
  };
};