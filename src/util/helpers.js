export function addClassModifiers(base, modifiers = []) {
  if (!Array.isArray(modifiers)) {
    modifiers = modifiers.split(' ');
  }

  modifiers = modifiers.map(modifier => `${base}--${modifier}`);

  return [base, ...modifiers];
}
