window.formsProcessors = {}; // Функция из данного объекта будет вызвана в случае успешной валидации формы. Значение атрибута data-formprocessor формы будут служить ключами для функций-обработчиков
window.formsSending = {}; // Хранилище индикаторов отправки для избежания повторной отправки
//window.formsProcessors должны добавляться в additional.js

//включать в formsProcessors в случае успешной отправки там, где это требуется
function defaultAfterSubmit(form, doReset) {
    if(doReset===true){
        let fileFields = form.querySelectorAll('.field-file[data-js="formField"]')
        form.reset();

        //сбрасываем поле ФАЙЛ
        if(fileFields.length > 0) {
            fileFields.forEach(fileField => {
                let placeholderText = fileField.getAttribute('data-placeholder');
                let fileName = fileField.querySelector('[data-js="fileName"]');

                fileField.classList.remove('field-file--full');
                fileName.innerHTML = placeholderText;
            });
        }
    }

    //проверяем какой тип благодарности в форме и показываем его
    if(form.querySelector("[data-js='form-thanks']") !== null) {
        form.style.minHeight = form.offsetHeight + 'px'
        form.classList.add("form--sent")
    } else {
        thanksMessageShow();
    }

    toggleLoading(form, false)
}

function validation() {

    let forms = document.querySelectorAll('[data-validate]')
    forms = [ ...forms].filter(item => !item.hasAttribute('data-validated'))

    if (!forms.length) return


    forms.forEach(form => {

        inputMasksInit(form);
        form.setAttribute('data-validated', '')

        form.addEventListener('submit', event => {
            event.preventDefault()

            const inputFields = form.querySelectorAll('[data-js="formField"]');

            const dataReqexp = {
                email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/,
                space: /^(\s)+$/,
                date: /([0-9]{2})\.([0-9]{2})\.([0-9]{4})/
            }

            function error(el, errorText = "") {
                let errorField = el.querySelector("[data-js='fieldError']")
                return {
                    set: () => {
                        el.classList.add("field--invalid")
                        errorField.innerHTML = errorText
                    },
                    remove: () => {
                        el.classList.remove("field--invalid")
                        errorField.innerHTML = errorText
                    },
                }
            }

            function validateInput(input) {
                const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                if(!field) return

                const name = field.getAttribute('data-v-name');
                let valueField = name === "file" ? field.files : field.value;
                let spaceTrigger = name === "file" ? true : !valueField.match(dataReqexp.space);

                if (field.hasAttribute('required') && !field.hasAttribute('disabled')) {
                    if (valueField !== '' && spaceTrigger) {
                        switch (name) {
                            case 'email':
                                if (valueField.match(dataReqexp.email)) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести корректный email').set()
                                }
                                break
                            case 'phone':
                                valueField = valueField.replace(/\D/g, "")

                                if (valueField.length === 11) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо ввести номер телефона').set()
                                }
                                break                              
                            case 'file':
                                if (valueField.length > 0) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо прикрепить файл').set()
                                }
                                break
                            case 'checkbox':
                                if (field.checked) {
                                    error(input).remove()
                                } else {
                                    error(input, 'Необходимо согласие').set()
                                }
                                break                            
                            default:
                                if (valueField.length !== 0) {
                                    error(input).remove()
                                } else {
                                    error(input, "Необходимо заполнить это поле").set()
                                }
                        }
                    } else {
                        error(input, 'Необходимо заполнить это поле').set()
                    }
                }
            }

            function checkFields() {
            
                inputFields.forEach(input => {
                    validateInput(input)
                })
            }

            function lifeValidate() {
                inputFields.forEach(input => {
                    input.addEventListener('click', () => {
                        if (form.getAttribute('data-validate')) {
                            const field = input.querySelector('input') ? input.querySelector('input') : input.querySelector('textarea') ? input.querySelector('textarea') : input.querySelector('select')

                            if(!field) return

                            field.addEventListener('input', () =>
                                validateInput(input),
                            )

                            checkFields()

                            if(field.dataset.js === 'formSelect') {
                                field.closest('[data-js="formField"]').classList.remove('field--invalid')
                            }

                        }
                    })
                })
            }

            function validate() {
                let errors = 0

                inputFields.forEach(input => {
                    if (input.classList.contains('field--invalid')) {
                        errors += 1
                    }
                })

                // тут отправляем данные
                if (errors === 0) {

                    toggleLoading(form, true)

                    window.ajaxForm(form, form.getAttribute('action'))
                }
            }

            lifeValidate()
            checkFields()
            form.setAttribute('data-validate', 'true')

            validate()

        })
    })
}

function toggleLoading(form, on) {
    const formSubmitBtn = form.querySelector(".btn.form__submit")

    if(on) {
        const loadingIcon = document.createElement('span')
        loadingIcon.classList.add('load-icon')
        loadingIcon.innerHTML = `<svg fill="none" height="24" viewBox="0 0 48 48" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M4 24C4 35.0457 12.9543 44 24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/></svg>`

        formSubmitBtn.appendChild(loadingIcon)
        formSubmitBtn.classList.add('loading')
    } else {
        formSubmitBtn.classList.remove('loading')
        const loadingIcon = formSubmitBtn.querySelector('.load-icon')

        if(loadingIcon) {
            loadingIcon.remove()
        }
    }
}

function inputMasksInit(form) {

    const phones = form.querySelectorAll('input[data-type="phoneNumber"]');
    const dates = form.querySelectorAll('input[data-type="date"]');
    const numbers = form.querySelectorAll('input[data-type="number"]');
    const letters = form.querySelectorAll('input[data-type="letters"]');

    if(phones.length > 0) {
        phones.forEach(phone => {
            Inputmask({
                'mask': '+7 (999) 999-99-99',
                'showMaskOnHover': false
            }).mask(phone); 
        })
    }

    if(dates.length > 0) {
        dates.forEach(date => {
            const dateMaskFormat =  '99.99.9999';
            const today = new Date()

            new AirDatepicker(date, {
                dateFormat: 'dd.MM.yyyy',
                minDate: today,
            })
    
            Inputmask({
                'mask': dateMaskFormat,
                'showMaskOnHover': false
            }).mask(date);

            date.addEventListener('input', dateMask)

        })
    }

    if(numbers.length > 0) {
        numbers.forEach(number => {
            number.addEventListener('input', function(e){
                let val = e.target.value.replace(/\D/g, "");
                this.value = val;
            })
        })
    }

    if(letters.length > 0) {
        letters.forEach(letter => {
            letter.addEventListener('input', function(e){
                
                let val = e.target.value.replace(/[^А-Яа-яA-Za-z\s-]/g, "");
                this.value = val;
            })
        })
    }

    function dateMask(e) {

        let val = e.target.value.replace(/\D/g, "");

 

        if(val.length == 1 && parseInt(val) > 3) {
            val = '3'
        }

        if(val.length == 2 && parseInt(val) > 31) {
        val = '31'
        }

        if(val.length == 3 && parseInt(val.substring(2)) > 1) {
        val = val.slice(0, 2) + "1";
        }
        
        if(val.length == 4 && parseInt(val.substring(2)) > 12) {
        val = val.slice(0, 2) + "12";
        }

        if(val.length == 10 && parseInt(val.substring(8)) > 23) {
            val = val.slice(0, 8) + "23";
        }
        
        if(val.length == 12 && parseInt(val.substring(10)) > 59) {
            val = val.slice(0, 10) + "59";
        }
        
        this.value = val;
    }
}