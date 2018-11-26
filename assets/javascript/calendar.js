const calendar1 = document.querySelector('.datepicker-start');
var today = new Date();
var tomorrow = new Date();
var nextWeek = new Date();
tomorrow.setDate(today.getDate()+1);
nextWeek.setDate(today.getDate()+7);


M.Datepicker.init(calendar1,{
    showClearBtn: true,
    autoClose: true,
    format: 'yyyy-mm-dd',
    defaultDate: today,
    setDefaultDate: true,
    minDate : today
});
 
const calendar2 = document.querySelector('.datepicker-end');
M.Datepicker.init(calendar2,{
    showClearBtn: true,
    autoClose: true,
    format: 'yyyy-mm-dd', 
    defaultDate: nextWeek,
    setDefaultDate: true,
    minDate : today
});