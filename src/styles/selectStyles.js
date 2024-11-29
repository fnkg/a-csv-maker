export const selectStyles = {
  menu: (base) => ({
    ...base,
    borderRadius: '16px',
    marginTop: '0.4rem',
    zIndex: '11'
  }),

  menuList: (base) => ({
    ...base,
    borderRadius: '16px',
    paddingTop: '0px',
    paddingBottom: '0px',
    '::-webkit-scrollbar': {
      width: '12px',
      height: '12px',
      zIndex: '-100',
    },
    '::-webkit-scrollbar-track': {
      background: 'tranparent',
      margin: '7.5px',
    },
    '::-webkit-scrollbar-thumb': {
      background: 'rgba(0, 0, 0, 0.08)',
      borderRadius: '16px',
      cursor: 'pointer',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'rgba(0, 0, 0, 0.08)',
    },
  }),

  option: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isSelected ? 'rgb(14, 13, 71)' : 'rgb(14, 13, 71)',
    backgroundColor: state.isSelected ? '#eef4ff' : 'white',
    ':hover': {
      backgroundColor: '#eef4ff',
    },
    padding: '10px',
    fontSize: '15px',
    cursor: 'pointer',
  }),

  control: (defaultStyles, state) => ({
    ...defaultStyles,
    // backgroundColor: 'white',
    // border: state.isFocused ? '2px solid #0354f1' : '1px solid #d1d5db', // граница изменяется при фокусе
    borderRadius: '12px',
    // boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
    ':hover': {
      borderColor: '#3b82f6',
    },
    padding: '2px',
    minHeight: '40px',
  }),

  singleValue: (defaultStyles) => ({
    ...defaultStyles,
    color: '#1f2937',
  }),

  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#9ca3af',
  }),

  dropdownIndicator: (defaultStyles, state) => ({
    ...defaultStyles,
    color: state.isDisabled ? '#9ca3af' : '#3b82f6',
    ':hover': {
      color: '#3b82f6',
      cursor: 'pointer',
    },
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),

  clearIndicator: (defaultStyles) => ({
    ...defaultStyles,
    color: '#cccccc',
    ':hover': {
      color: '#0e0d47'
    },
  }),
};