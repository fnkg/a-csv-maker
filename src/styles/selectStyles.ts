const themeColors = {
  primary: '#3b82f6',
  primaryLight: '#eef4ff',
  primaryDark: '#0354f1',
  hoverBg: '#c6d9ff',
  textPrimary: '#0e0d47',
  textGray: '#9ca3af',
  textDark: '#1f2937',
  grayLight: '#cccccc',
};

export const selectStyles = {
  menu: (base: React.CSSProperties) => ({
    ...base,
    borderRadius: '16px',
    marginTop: '0.4rem',
    zIndex: 11,
  }),

  menuList: (base: React.CSSProperties) => ({
    ...base,
    borderRadius: '16px',
    paddingTop: 0,
    paddingBottom: 0,
  }),

  option: (defaultStyles: React.CSSProperties, state: { isSelected: boolean }) => ({
    ...defaultStyles,
    color: themeColors.textPrimary,
    backgroundColor: state.isSelected ? themeColors.primaryLight : 'white',
    ':hover': {
      backgroundColor: themeColors.primaryLight,
    },
    padding: '10px',
    fontFamily: 'ApercuPro, sans-serif',
    fontSize: '15px',
    fontWeight: 300,
    cursor: 'pointer',
  }),

  control: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    borderRadius: '12px',
    ':hover': {
      borderColor: themeColors.primary,
    },
    padding: '2px',
    minHeight: '40px',
  }),

  valueContainer: (base: React.CSSProperties) => ({
    ...base,
    maxHeight: '80px',
    overflowY: 'auto',
    paddingRight: '8px',
    scrollbarWidth: 'thin',
  }),

  singleValue: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    color: themeColors.textDark,
  }),

  multiValue: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    backgroundColor: themeColors.primaryLight,
  }),

  multiValueLabel: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    color: themeColors.textPrimary,
  }),

  multiValueRemove: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    color: themeColors.primaryDark,
    fontSize: '18px',
    padding: '0 4px',
    ':hover': {
      backgroundColor: themeColors.hoverBg,
      color: themeColors.primaryDark,
    },
  }),

  placeholder: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    color: themeColors.textGray,
    fontFamily: 'ApercuPro, sans-serif',
    fontWeight: 300,
  }),

  dropdownIndicator: (defaultStyles: React.CSSProperties, state: { isDisabled: boolean }) => ({
    ...defaultStyles,
    color: state.isDisabled ? themeColors.textGray : themeColors.primary,
    ':hover': {
      color: themeColors.primary,
      cursor: 'pointer',
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  clearIndicator: (defaultStyles: React.CSSProperties) => ({
    ...defaultStyles,
    color: themeColors.grayLight,
    ':hover': {
      color: themeColors.textPrimary,
    },
  }),
};
