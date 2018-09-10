"use strict";

function cSqrt(param) {
	return (param < 0)? "Invalid input" : Math.sqrt(Number(param));
}
function cReciproc(param) {
    return (param == 0)? "Cannot devide by zero" : (1 / Number(param));
}
function cNegate(param) {
    return -Number(param);
}
function add(param1, param2) {
    return (Number(param1)*10 + Number(param2)*10) / 10;
}
function minus(param1, param2) {
    return (Number(param1)*10 - Number(param2)*10) / 10;
}
function multiple(param1, param2) {
    return (Number(param1)*10 * Number(param2)*10) / 100;
}
function devide(param1, param2) {
    return (param2 == 0)? "Cannot devide by zero" : ((Number(param1)*10 / Number(param2)*10) / 100);
}
function modulo(param1, param2) {
    return (param2 == 0)? "Cannot devide by zero" : (Number(param1) % Number(param2));
}


function controlFontSize(leng) {
	if (leng < 12) {
		$(".result_area").css("font-size", "36px");
	} else if (leng >= 12 && leng <= 16) {
		$(".result_area").css("font-size", "24px");
	} else {
		$(".result_area").css("font-size", "18px");
	}
}

// clear
function clearCalculationArea() {
	$(".calculation_area").text('');
}

function clearResultArea() {
	$(".result_area").text('0');
}

function clearScreen() {
    clearCalculationArea();
	clearResultArea();
}


function calculationValue(res, str, num) {
	return (res == '')? str + '(' + num + ')' : str + '(' + res + ')';
}


function setNumber(num) {
	return Number(num.join(''));
}

function resetAll() {
	canEditResultArea 		= false;
	canEditCalculationArea 	= false;
	canEditBasicOperator 	= true;
	canAddDot 				= true;
	error 					= false;
	toContinue				= true;
	lastBasicOperator 		= '';
	// firstNumber;
	// lastNumber;
	currentNumber 			= ['0'];
	dynamicDisplay 			= ''; // extraCalcution
	calculationDisplay 		= '';
	finalZone				= false;
	var resultChanged		= false;
	clearScreen();
	controlFontSize(1);
}


var canEditResultArea 		= false;
var canEditCalculationArea 	= false;
var canEditBasicOperator 	= true;
var canAddDot 				= true;
var error 					= false;
var toContinue				= true; 
var lastBasicOperator 		= '';
var firstNumber;
var lastNumber;
var currentNumber 			= ['0'];
const dot 					= '.';
var dynamicDisplay 			= ''; // extraCalcution
var calculationDisplay 		= '';
var finalZone 				= false;
var resultChanged			= false; 

// Control
$(document).ready(function () {

	/*-----------------------------------------------------*/

	$(".number").click(function() {
		if (error) return;

		// if (changedNumber == false) changedNumber = true; // Dit me, deo hieu minh lam gi luon

		resultChanged		 = true;
		canEditBasicOperator = true;
		toContinue			 = true; 
		if (finalZone == true && calculationDisplay == '') {
			resetAll();
		} 

		var value = $(this).text();
		dynamicDisplay = '';

		if (canEditResultArea == true) {
			if (currentNumber.length < 16) {
				if ($(".result_area").text() == '0') {
					if (value != '0') {
						if (value == dot) {
							canAddDot = false;
							currentNumber.push(dot);
							$(".result_area").append(value);
						} else {
							currentNumber[0] = value;
							$(".result_area").text(value);
						}
					}	
				} else {
					if (value == dot) {
						if (canAddDot == true) {
							canAddDot = false;
							$(".result_area").append(value);
							currentNumber.push(value);
						}
					} else {
						$(".result_area").append(value);
						currentNumber.push(value);
					}
				}
			} // if (currentNumber.length < 16)
		} else { // if (canEditResultArea == false)
			
			calculationDisplay += lastBasicOperator;
			currentNumber = ['0'];
			if (value == dot) {
				canAddDot = false;
				currentNumber.push(dot);
				$(".result_area").text('0'+value);
			} else {
				currentNumber[0] = value;
				$(".result_area").text(value);
			}	
			
			canEditResultArea = true;
		}

		controlFontSize(currentNumber.length);

	});

	/*-----------------------------------------------------*/

	$(".basic_operator").click(function() {
		// +, -, *, /, %

		if (error) return;

		var currentOperator = '';
		canAddDot 			= true;
		canEditResultArea 	= false;
		resultChanged		= false;

		if (finalZone == true) {
			finalZone =  false;
			lastBasicOperator = '';
		} // "="   =>  +, -, *, /

		if (canEditBasicOperator == true) {
			currentOperator = (lastBasicOperator != '')? lastBasicOperator : '';
			canEditBasicOperator = false;
		}
		
		lastBasicOperator = $(this).val();
		
		if (currentOperator == '') {
			firstNumber = $(".result_area").text();

		} else { // currentOperator != ''
			
			lastNumber = $(".result_area").text();

			switch (currentOperator) {
				case '+':
					firstNumber = add(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '-':
					firstNumber = minus(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '*':
					firstNumber = multiple(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '/':
					firstNumber = devide(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '%':
					firstNumber = modulo(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
			}

			if (isNaN(firstNumber)) {
				error = true;
				// console.log("error: true");
			}

		}

		if (dynamicDisplay != '') {
			calculationDisplay += dynamicDisplay;
		} else {
			if (toContinue == true) {
				if (currentOperator == '') {
					calculationDisplay += Number(firstNumber);
				} else {
					calculationDisplay += Number(lastNumber);
				}
				toContinue = false;
			}	
		}

		$(".calculation_area").text(calculationDisplay + lastBasicOperator);
		controlFontSize($(".result_area").text().length);
		dynamicDisplay = '';	


	});

	/*-----------------------------------------------------*/

	$(".extra_operator").click(function() {
		// sqrt, negate, reciproc

		if (error) return;

		var extra_operator 		= $(this).val();
		canAddDot 				= true;
		canEditResultArea 		= false;
		canEditBasicOperator 	= true;
		toContinue				= true;
		var finalZoneCopy		= finalZone;

		if (finalZone == true) {
			finalZone = false;
			lastBasicOperator = '';
		}
		var temp = $(".result_area").text();
		lastNumber = Number(temp);

		dynamicDisplay = calculationValue(dynamicDisplay, extra_operator, lastNumber);

		if (lastBasicOperator != '' && resultChanged == false) {
			if (finalZoneCopy == false) 
				calculationDisplay += lastBasicOperator;
		}
		$(".calculation_area").text(calculationDisplay + dynamicDisplay);
		switch (extra_operator) {
			case 'negate':
				lastNumber = cNegate(lastNumber);
				break;
			case 'sqrt':
				lastNumber = cSqrt(lastNumber);
				break;
			case 'reciproc':
				lastNumber = cReciproc(lastNumber);
				break;
		}
		if (isNaN(lastNumber)) {
			error = true;
		} else {
			currentNumber = [lastNumber];
		}
		controlFontSize(lastNumber.toString().length);
		$(".result_area").text(lastNumber);
	});

	/*-----------------------------------------------------*/

	$("#clrc").click(function() {
		if (error) return;

		if (canEditResultArea) {
			if (currentNumber[currentNumber.length - 1] == dot) {
				canAddDot = true;
			}
			currentNumber.pop();
			if (currentNumber.length == 0) {
				currentNumber = ['0'];
			}
			controlFontSize(currentNumber.length);
			$(".result_area").text(currentNumber.join(''));
		}	
	});

	$("#clrn").click(function() {
		if (error) return;

		if (dynamicDisplay != '') {
			calculationDisplay = $(".calculation_area").text();
			var index = calculationDisplay.lastIndexOf(dynamicDisplay);
			if (index != -1) {
				calculationDisplay = calculationDisplay.substr(0, index);
				$(".calculation_area").text(calculationDisplay);
				$(".result_area").text(0);
			}
		} else {
			clearResultArea();
			// canEditBasicOperator = true;
			if (lastBasicOperator == '') {
				calculationDisplay = '';
				clearCalculationArea();
			}
		}
		currentNumber = ['0'];
		controlFontSize(1);
		canAddDot = true;
		canEditResultArea = true;
		
	});

	$("#clrscr").click(function() {
		resetAll();
	});

	/*-----------------------------------------------------*/

	$("#equal").click(function() {
		if (error) return;

		finalZone 				= true;
		dynamicDisplay 			= '';
		canEditResultArea 		= true;
		canAddDot 				= true;
		canEditResultArea 		= false;
		canEditCalculationArea 	= false;
		canEditBasicOperator 	= true;
		toContinue 				= true;
		resultChanged			= false;

		if (lastBasicOperator != '') {
			if (calculationDisplay != '') {
				lastNumber = $(".result_area").text();
			}

			switch (lastBasicOperator) {
				case '+':
					firstNumber = add(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '-':
					firstNumber = minus(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '*':
					firstNumber = multiple(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '/':
					firstNumber = devide(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
				case '%':
					firstNumber = modulo(firstNumber, lastNumber);
					$(".result_area").text(firstNumber);
					break;
			}

			if (isNaN(firstNumber)) {
				error = true;
				// console.log("error: true");
			}

			controlFontSize(firstNumber.toString().length);
			calculationDisplay = '';
			clearCalculationArea();

		}

	});
});
