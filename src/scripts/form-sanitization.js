import sanitizeHtml from 'sanitize-html';

export default function sanitizeForm(form) {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    input.value = sanitizeHtml(input.value, {
      allowedTags: [],
      allowedAttributes: {},
    });
  });
}
