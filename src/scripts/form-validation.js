export default function validate(form) {
  const errorElements = form.querySelectorAll('.error');
  const inputs = form.querySelectorAll('input');
  errorElements.forEach((errorElement) => {
    errorElement.textContent = '';
    errorElement.classList.add('hidden');
  });

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      const errorElement = form.querySelector(`#${input.id}+.error`);
      errorElement.textContent = input.validationMessage;
      errorElement.classList.remove('hidden');
    }
  });

  return form.checkValidity();
}
