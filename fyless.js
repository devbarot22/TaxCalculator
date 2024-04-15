// buiding UI dynamically


const formFields = [
  { label: 'Enter gross annual income', placeholder: 'Enter gross annual income', type: 'text', tooltip:'Gross annual income is your total salary in a year before any deductions' },
  { label: 'Enter extra income', placeholder: 'Enter extra income from other sources', type: 'text', tooltip:'' },
  { label: 'Enter age group', placeholder: '', type: 'select', options: ['Select Your Age Group', 'age < 40', 'age ≥ 40 & < 60', 'age ≥ 60'], tooltip:'' },
  { label: 'Enter total applicable deductions', placeholder: 'Add total applicable deduction', type: 'text', tooltip:''},
  { label: '', type: 'submit' }
];

function formatNumber(num) {
  if (num >= 100000) {
    const lakh = Math.floor(num / 100000);
    const thousand = Math.floor((num % 100000) / 1000);
    const remainder = num % 1000;
    return `${lakh} lakh ${thousand ? ',' + thousand + ',' : ''}${remainder}`;
  } else {
    return num.toLocaleString('en-IN');
  }
}

const form = document.getElementById('form');

for (const field of formFields) {

  if (field.label == "") {
    const submit = document.createElement('input');
    submit.type = field.type;
    submit.className = 'subBtn';
    submit.name = 'submit'; 
    submit.value = 'Submit';
    form.appendChild(submit);
  }
  else {
    const label = document.createElement('label');
    label.textContent = field.label;
    label.className = 'labelField'; 
    label.innerHTML += `<img class="question-mark" src="assets/question-mark-button-svgrepo-com.svg" alt="info mark" data-tooltip="${field.tooltip}"/>`;

    const inputWrapper = document.createElement('div');
    inputWrapper.className = "inputparent";
    
    const inputContainer = document.createElement('div');
    inputContainer.className = 'inputConSubParent';
    inputContainer.style.position = 'relative'; 
    inputContainer.style.width = '100%';

    const warning = document.createElement('i');
    warning.className = 'excla-mark';
    warning.style.width = 'none';

    if (field.type === 'select') {
      const select = document.createElement('select');
      select.className = "inputFields";
      select.name = field.label;
      for (const option of field.options) {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.text = option;
        select.appendChild(optionElement);
      }
      inputContainer.appendChild(select); 
    } else {
      const input = document.createElement('input');
      input.type = field.type;
      input.className = "inputFields"
      input.name = field.label; 
      input.autocomplete = 'off'; 
      input.placeholder = field.placeholder;
      inputContainer.appendChild(input); 
    }

    inputContainer.appendChild(warning); 
    inputWrapper.appendChild(inputContainer); 
    form.appendChild(label);
    form.appendChild(inputWrapper);
  }
}

window.onload = function() {
  var inputFields = document.querySelectorAll('.inputFields[type=text]');
  inputFields.forEach(function(inputField) {
    inputField.addEventListener('input', function() {
      var exclaMark = this.nextElementSibling;
      var value = this.value;

      if (value === '' || /^\d+(\.\d+)?$/i.test(value) || /^\d+(\.\d+)?k$/i.test(value) || /^\d+(\.\d+)?M$/i.test(value)) {
        exclaMark.style.display = 'none';
      } else {
        exclaMark.style.display = 'block';
      }
    });
  });
}


// Functionality and calculator building


function parseIncome(incomeStr) {
  let income = parseFloat(incomeStr);

  if (incomeStr.toLowerCase().endsWith('k')) {
    income *= 1000;
  } else if (incomeStr.toLowerCase().endsWith('m')) {
    income *= 1000000;
  }

  return income;
}

function calculateTax(income, extraIncome, deductions, ageGroup) {
  const taxableIncome = (income + extraIncome - deductions) / 100000;
  let tax = 0;

  if (taxableIncome > 8) {
    if (ageGroup === 'age < 40') {
      tax = 0.3 * (taxableIncome - 8);
    } else if (ageGroup === 'age ≥ 40 & < 60') {
      tax = 0.4 * (taxableIncome - 8);
    } else if (ageGroup === 'age ≥ 60') {
      tax = 0.1 * (taxableIncome - 8);
    }
  }

  return tax;
}

form.addEventListener('submit', function(event) {
  event.preventDefault();

  const income = parseIncome(document.querySelector('.inputFields[name="Enter gross annual income"]').value);
  const extraIncome = parseIncome(document.querySelector('.inputFields[name="Enter extra income"]').value);
  const deductions = parseIncome(document.querySelector('.inputFields[name="Enter total applicable deductions"]').value);
  const ageGroup = document.querySelector('.inputFields[name="Enter age group"]').value;

  const tax = calculateTax(income, extraIncome, deductions, ageGroup);
  const overallIncome = (income + extraIncome) - (tax * 100000); 

  const modal = createModal();


  modal.firstChild.innerHTML = `
  <h1>Your Overall income will be</h1>
  <h3>${formatNumber(overallIncome.toLocaleString())}</h3>
  <p>after tax deductions</p>`;

  // Create the close button
  const closeButton = document.createElement('button');
  closeButton.id = 'close-modal';
  closeButton.innerHTML = `<img src="./assets/x-close-delete-svgrepo-com.svg" class='svg-x' alt="Close">`;
 
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  // Append the close button to the modal
  modal.firstChild.appendChild(closeButton);

  // Show the modal
  modal.style.display = 'block';
});







function createModal() {
  // Create the modal and its elements
  const modal = document.createElement('div');
  const modalContentWrapper = document.createElement('div'); // This is the new wrapper div
  const closeButton = document.createElement('button');

  // Set the attributes and content of the modal and its elements
  modal.id = 'modal';

  // Set the attributes and content of the wrapper div
  modalContentWrapper.id = 'modalContentWrapper'

  closeButton.id = 'close-modal';
  closeButton.innerHTML = `<img src="./assets/x-close-delete-svgrepo-com.svg" alt="Close">`;
  closeButton.style.cursor = 'pointer'
  
    // Append the modal content and close button to the modal
    modalContentWrapper.appendChild(closeButton);

  // Append the wrapper to the modal
  modal.appendChild(modalContentWrapper);

  // Append the modal to the body
  document.body.appendChild(modal);

  // Add an event listener to the close button that hides the modal when clicked
  closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
  });

  return modal;
}