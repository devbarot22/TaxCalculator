const formFields = [
  { label: 'Enter gross annual income', placeholder: 'Enter gross annual income', type: 'number' },
  { label: 'Enter extra income', placeholder: 'Enter extra income', type: 'number' },
  { label: 'Enter age group', placeholder: '', type: 'select', options: ['Select You Age Group', 'age < 40', 'age ≥ 40 & < 60', 'age ≥ 60'] },
  { label: 'Enter total applicable deductions', placeholder: 'Add total applicable deduction', type: 'number' },
  { label: '', type: 'submit' }
];

const form = document.getElementById('form');

for (const field of formFields) {

  if (field.label == "") {
    const submit = document.createElement('input');
    submit.type = field.type;
    submit.className = 'subBtn';
    form.appendChild(submit);
  }
  else {
    const label = document.createElement('label');
    label.textContent = field.label;
    label.innerHTML += '<img class="question-mark" src="assets/question-mark-button-svgrepo-com.svg" alt="info mark">';
    label.className = 'labelField';

    const inputWrapper = document.createElement('div');
    inputWrapper.className = "inputparent";
    
    const inputContainer = document.createElement('div');
    inputContainer.className = 'inputConSubParent';
    inputContainer.style.position = 'relative'; 
    inputContainer.style.width = '100%';

    const warning = document.createElement('i');
    warning.className = 'excla-mark';
    warning.innerHTML += '<img src="assets/exclamation-mark-circle-svgrepo-com.svg" alt="warning mark">';

    if (field.type === 'select') {
      const select = document.createElement('select');
      select.className = "inputFields";
      for (const option of field.options) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
      }
      inputContainer.appendChild(select); // Change this line
    } else {
      const input = document.createElement('input');
      input.type = field.type;
      input.className = "inputFields"
      input.placeholder = field.placeholder;
      inputContainer.appendChild(input); // Change this line
    }

    inputContainer.appendChild(warning); 
    inputWrapper.appendChild(inputContainer); 
    form.appendChild(label);
    form.appendChild(inputWrapper);
  }
}