// utils.js

export function selectOption({ value, onChange, multiple }, option) {
  if (multiple) {
    if (value.includes(option)) {
      onChange(value.filter((o) => o !== option));
    } else {
      onChange([...value, option]);
    }
  } else {
    if (option !== value) onChange(option);
  }
}

export function isOptionSelected({ value, multiple }, option) {
  return multiple ? value.includes(option) : option === value;
}
