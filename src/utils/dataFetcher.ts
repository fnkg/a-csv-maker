// src/utils/dataFetcher.ts
import { fetchData, byField } from "@/src/utils/utils";

type Option = {
  value: string;
  label: string;
};

type FormattedOptions = {
  legalPayers: Option[];
  services: Option[];
  legalClinics: Option[];
  doctors: Option[];
  organizations: Option[];
};

export const fetchFormattedOptions = async (): Promise<FormattedOptions> => {
  let legalEntities, services, doctors, organizations;

  [legalEntities, services, doctors, organizations] = await Promise.all([
    fetchData('/legal-entity?status=active'),
    fetchData('/service?statuses=active'),
    fetchData('/user?locale=ru&isDoctor=true&statuses=active'),
    fetchData('/organization?statuses=active&types=clinic'),
  ]);

  return {
    legalPayers: legalEntities.legalEntities
      .filter((entity: { type: string }) => entity.type === 'insuranceCompany' || entity.type === 'charity')
      .map((entity: { id: string; name: string }) => ({
        value: entity.id,
        label: entity.name,
      }))
      .sort(byField('label')),
    services: services.services
      .map((service: { code: string; name: string }) => ({
        value: service.code,
        label: `${service.name} (code: ${service.code})`,
      }))
      .sort(byField('value')),
    legalClinics: legalEntities.legalEntities
      .filter((entity: { type: string; name: string }) => {
        return entity.type === 'clinic' && entity.name.includes('Чайка') || entity.name === 'Kandinsky Clinic';
      })
      .map((entity: { id: string; name: string }) => ({
        value: entity.id,
        label: entity.name,
      }))
      .sort(byField('label')),
    doctors: doctors.users
      .map((doctor: { id: string; lastName: string; firstName: string; patronymic?: string }) => ({
        value: doctor.id,
        label: `${doctor.lastName} ${doctor.firstName} ${doctor.patronymic || ''}`,
      }))
      .sort(byField('label')),
    organizations: organizations.organizations
      .map((organization: { id: string; name: string }) => ({
        value: organization.id,
        label: organization.name,
      }))
      .sort(byField('label')),
  };
};
