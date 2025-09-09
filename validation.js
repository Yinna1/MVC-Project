const form = document.getElementById('form');
const id_card_input = document.getElementById('id-card-input');
const full_name_input = document.getElementById('fullname-input');
const email_input = document.getElementById('email-input');
const password_input = document.getElementById('password-input');
const repeat_password_input = document.getElementById('repeat-password-input');
const error_message = document.getElementById('error-message');
const signup_title = document.getElementById('signup');
const login_title = document.getElementById('login');
const reset_password_title = document.getElementById('reset-password');

form.addEventListener('submit', (e) => {
  let errors = [];
  if (signup_title && signup_title.innerText === 'MVC Library') {
    errors = getSignupFormErrors(
      full_name_input.value,
      email_input.value,
      password_input.value,
      repeat_password_input.value,
      id_card_input.value
    );
  } else if (login_title && login_title.innerText === 'Login') {
    errors = getLoginFormErrors(id_card_input.value, password_input.value);
  }
  else if (reset_password_title && reset_password_title.innerText === 'Resetpassword') {
    errors= getEmailformErrors(email_input.value);
  }
  if (errors.length > 0) {
    e.preventDefault();
    error_message.innerText = errors.join('\n');
  }
});

function getSignupFormErrors(fullname, email, password, repeatPassword, idCard) {
  let errors = [];
  if (!fullname || fullname.trim() === '') {
    errors.push('กรุณากรอกชื่อ-นามสกุล');
    if (full_name_input) full_name_input.parentElement.classList.add('incorrect');
  }
  if (!email || email.trim() === '') {
    errors.push('กรุณากรอกอีเมล');
    if (email_input) email_input.parentElement.classList.add('incorrect');
  }
  if (!password || password.trim() === '') {
    errors.push('กรุณากรอกรหัสผ่าน');
    if (password_input) password_input.parentElement.classList.add('incorrect');
  }
  if (!idCard || idCard.trim() === '') {
    errors.push('กรุณากรอกเลขบัตรนักเรียน');
    if (id_card_input) id_card_input.parentElement.classList.add('incorrect');
  }
  if (idCard && idCard.trim() !== '' && isNaN(idCard)) {
    errors.push('เลขบัตนักเรียนต้องเป็นตัวเลขเท่านั้น');
    if (id_card_input) id_card_input.parentElement.classList.add('incorrect');
  }
  if (password && password.length < 8) {
    errors.push('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร');
    if (password_input) password_input.parentElement.classList.add('incorrect');
  }
  if (password !== repeatPassword) {
    errors.push('รหัสผ่านไม่ตรงกัน');
    if (password_input) password_input.parentElement.classList.add('incorrect');
    if (repeat_password_input) repeat_password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

function getLoginFormErrors(idCard, password) {
  let errors = [];
  if (!idCard || idCard.trim() === '') {
    errors.push('กรุณากรอกเลขบัตรนักเรียน');
    if (id_card_input) id_card_input.parentElement.classList.add('incorrect');
  }
  if (idCard && idCard.trim() !== '' && isNaN(idCard)) {
    errors.push('เลขบัตรนักเรียนต้องเป็นตัวเลขเท่านั้น');
    if (id_card_input) id_card_input.parentElement.classList.add('incorrect');
  }
  if (!password || password.trim() === '') {
    errors.push('กรุณากรอกรหัสผ่าน');
    if (password_input) password_input.parentElement.classList.add('incorrect');
  }
  return errors;
}
function getEmailformErrors(email) {
  let errors = [];
  if (!email || email.trim() === '') {
    errors.push('กรุณากรอกอีเมล');
    if (email_input) email_input.parentElement.classList.add('incorrect');
  }
  return errors;
}

// ตรวจสอบ input ไม่เป็น null ก่อน addEventListener
const allInputs = [id_card_input, full_name_input, email_input, password_input, repeat_password_input];
allInputs.forEach(input => {
  if (!input) return;
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect');
      error_message.innerText = '';
    }
  });
});