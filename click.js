function letter_with_mutation(letter) {
	alert('Вы нажали на '+letter.innerHTML);
	var letter_id = Number(letter.id)
	console.log(letter_id)
	var table_element = document.getElementsByClassName('table')[letter_id]
	console.log(table_element)
	table_element.innerHTML.style.background == "yellow"
}
