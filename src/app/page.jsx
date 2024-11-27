import CsvEditor from "@/src/components/CsvEditor";
import { fetchData, byField } from "@/src/utils/utils";

export const revalidate = 3600;

export default async function Page() {
  let legalEntities, services, doctors, organizations;
  //складываем в переменные результат выполнения всех промисов, дожидаемся, пока выполнится каждый промис
  try {
    [legalEntities, services, doctors, organizations] = await Promise.all([
      fetchData('/legal-entity?status=active'),
      fetchData('/service?statuses=active'),
      fetchData('/user?locale=ru&isDoctor=true&statuses=active'),
      fetchData('/organization?statuses=active&types=clinic'),
    ])
  } catch (err) {
    console.error('Ошибка при загрузке данных:', err);
    return <div>Не удалось загрузить данные 😔</div>;
  }

  const formattedOptions = {
    legalPayers: legalEntities.legalEntities
      .filter((entity) => {
        return entity.type === 'insuranceCompany' || entity.type === 'charity'
      })
      .map((entity) => ({
        value: entity.id,
        label: entity.name,
      }))
      .sort(byField('label')),
    services: services.services
      .map((service) => ({
        value: service.code,
        label: `${service.name} (code: ${service.code})`,
      }))
      .sort(byField('value')),
    legalClinics: legalEntities.legalEntities
      .filter((entity) => {
        return entity.type === 'clinic' && entity.name.includes('Чайка') || entity.name === 'Kandinsky Clinic';
      })
      .map((entity) => ({
        value: entity.id,
        label: entity.name,
      }))
      .sort(byField('label')),
    doctors: doctors.users
      .map((doctor) => ({
        value: doctor.id,
        label: `${doctor.lastName} ${doctor.firstName} ${doctor.patronymic || ''}`,
      }))
      .sort(byField('label')),
    organizations: organizations.organizations
      .map((organization) => ({
        value: organization.id,
        label: organization.name,
      }))
      .sort(byField('label')),
  };

  return (
    <div className='min-h-full rounded-lg bg-[#f0f1f5]'>
      <header className='flex justify-between pt-8 pl-8 pr-8 text-gray-800 font-semibold'>
        <h1 className='text-2xl'>Редактор CSV</h1>
        <h2 className='text-xl'>v0.2.1</h2>
      </header>
      <main>
        <CsvEditor selectOptions={formattedOptions} />
      </main>
    </div>
  );
}