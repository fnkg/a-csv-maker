import { byField, fetchData } from '@/helpers/utils';
import type { IFormattedOptions, LegalEntity, Service, Doctor, Organization } from '@/helpers/types';

export const fetchFormattedOptions = async (): Promise<IFormattedOptions> => {
  const [legalEntities, services, doctors, organizations] = await Promise.all([
    fetchData<{ legalEntities: LegalEntity[] }>('/legal-entity?status=active'),
    fetchData<{ services: Service[] }>('/service?statuses=active'),
    fetchData<{ users: Doctor[] }>('/user?locale=ru&isDoctor=true&statuses=active'),
    fetchData<{ organizations: Organization[] }>('/organization?statuses=active&types=clinic'),
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
        return entity.type === 'clinic' && entity.name.includes('Чайка');
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
