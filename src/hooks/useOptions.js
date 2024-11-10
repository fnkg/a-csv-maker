import {
  useMemo
} from 'react';

export const useOptions = (services, payers, doctors, data) => {
  const payerOptions = useMemo(() => {
    return payers.insuranceCompanies.map(payer => ({
      value: payer.legal_entity_id,
      label: payer.name
    }));
  }, [payers]);

  const serviceOptions = useMemo(() => {
    return services.services.map(service => ({
      value: service.code,
      label: `${service.name} (code: ${service.code})`,
      code: service.code
    }));
  }, [services]);

  const clinicLegalEntityOptions = useMemo(() => {
    return data.clinicLegalEntities.map(entity => ({
      value: entity.legal_id,
      label: entity.name
    }));
  }, [data]);

  const doctorOptions = useMemo(() => {
    return doctors.doctors.map(doctor => ({
      value: doctor.user_id,
      label: `${doctor.last_name} ${doctor.first_name} ${doctor.patronymic}`
    }));
  }, [doctors]);

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
    payerOptions,
    serviceOptions,
    clinicLegalEntityOptions,
    doctorOptions,
    organizationOptions,
    currencyOptions
  };
};