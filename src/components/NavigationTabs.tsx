// type NavigationTabsProps = {
//   onAddRow: () => void;
//   onClearAll: () => void;
//   onDownload: () => void;
// };

const NavigationTabs: React.FC = () => {
  return (
    <div className="flex justify-end mt-8 font-medium">
      <button  className="btn btn-tab">Прайс-лист СК</button>
      <button  className="btn btn-tab ml-1">СКОП</button>
    </div>
  );
}

export default NavigationTabs;
