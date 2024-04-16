// buiding UI dynamically


const formFields = [
  { label: 'Enter gross annual income', placeholder: 'Enter gross annual income', type: 'text', tooltip: 'Annual income reflects pre-deduction earnings' },
  { label: 'Enter extra income', placeholder: 'Enter extra income from other sources', type: 'text', tooltip: 'More moolah on top of your salary dough!' },
  { label: 'Enter age group', placeholder: '', type: 'select', options: ['Select Your Age Group', 'age < 40', 'age ≥ 40 & < 60', 'age ≥ 60'], tooltip: 'Age groups: where tax rates get sassy with the classy!' },
  { label: 'Enter total applicable deductions', placeholder: 'Add total applicable deduction', type: 'text', tooltip: 'Total deductions: Giving your taxes a break, not your paycheck!' },
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

for (const [index, field] of formFields.entries()) {

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


    const tooltipContainer = document.createElement('div');
    tooltipContainer.className = 'tooltip-container';

    const questionMark = document.createElement('img');
    questionMark.className = 'question-mark';
    questionMark.src = 'assets/question-mark-button-svgrepo-com.svg';
    questionMark.alt = 'info mark';

    const tooltip = document.createElement('div');
    tooltip.className = `tooltipQ tooltipQ${index + 1}`;
    tooltip.innerHTML = `<span class="tooltiptextQ" style="background: #36454F">${field.tooltip}</span>`;
    tooltip.style.display = 'none';





    tooltipContainer.appendChild(questionMark);
    tooltipContainer.appendChild(tooltip);

    label.appendChild(tooltipContainer);

    let tooltipTimeout;


    // question mark mouseover event

    questionMark.addEventListener('mouseover', () => {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        const rect = questionMark.getBoundingClientRect();

        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 30}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.display = 'block';
      }, 200);
    });



    // question mark mouseout event


    questionMark.addEventListener('mouseout', () => {
      clearTimeout(tooltipTimeout);
      tooltipTimeout = setTimeout(() => {
        tooltip.style.display = 'none';
      }, 200);
    });





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




// excla mark warning will block on input's except number. 




window.onload = function () {
  var inputFields = document.querySelectorAll('.inputFields[type=text]');
  inputFields.forEach(function (inputField) {
    inputField.addEventListener('input', function () {
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



// for user convenience parsing m and k for million and thousand.

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





// modal which pops-up to show the overall Income after tax deduction

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const income = parseIncome(document.querySelector('.inputFields[name="Enter gross annual income"]').value) || 0;
  const extraIncome = parseIncome(document.querySelector('.inputFields[name="Enter extra income"]').value) || 0;
  const deductions = parseIncome(document.querySelector('.inputFields[name="Enter total applicable deductions"]').value) || 0;
  const ageGroupField = document.querySelector('.inputFields[name="Enter age group"]');
  const ageGroup = ageGroupField.value;

  if (ageGroup === 'Select Your Age Group') {

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerHTML = `
      <span class="tooltiptext">Please select your age group</span>
    `;


    ageGroupField.parentNode.insertBefore(tooltip, ageGroupField);


    tooltip.querySelector('.tooltiptext').style.visibility = 'visible';
    tooltip.querySelector('.tooltiptext').style.opacity = '1';

    ageGroupField.addEventListener('change', () => {
      tooltip.style.display = 'none';
    });

    return;
  }

  const tax = calculateTax(income, extraIncome, deductions, ageGroup);
  const overallIncome = (income + extraIncome) - (tax * 100000);

  const modal = createModal();

  modal.firstChild.innerHTML = `
    <h1>Your Overall income will be</h1>
    <h3>${formatNumber(overallIncome.toLocaleString())}</h3>
    <p>after tax deductions</p>`;


  const closeButton = document.createElement('button');
  closeButton.id = 'close-modal';
  closeButton.innerHTML = `<img src="./assets/x-close-delete-svgrepo-com.svg" class='svg-x' alt="Close">`;

  closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });


  modal.firstChild.appendChild(closeButton);

  modal.style.display = 'block';
});




// createModal create the modal




function createModal() {

  const modal = document.createElement('div');
  const modalContentWrapper = document.createElement('div');
  const closeButton = document.createElement('button');


  modal.id = 'modal';


  modalContentWrapper.id = 'modalContentWrapper'

  closeButton.id = 'close-modal';
  closeButton.innerHTML = `<img src="./assets/x-close-delete-svgrepo-com.svg" alt="Close">`;
  closeButton.style.cursor = 'pointer'


  modalContentWrapper.appendChild(closeButton);


  modal.appendChild(modalContentWrapper);


  document.body.appendChild(modal);


  closeButton.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  return modal;
}