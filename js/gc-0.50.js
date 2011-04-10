////////////////
////////////////
//// The Formula
////////////////
////////////////
function getRand() {
	var rand = [];
	rand.push('ABBCDEFGGG');
	rand.push('ABCDEFGXXYYZZZ13579');
	rand.push('ABDFHJLNPRTVXZ2468');
	rand.push('BDFHJLMOPRSUVXY2222244444666668888899999');
	
	return rand.reverse();
}

function getSwitch() {
	return [1,6,11,15];
}

function getStrength() {
	return 20;
}

function package(code) {
	return code.replace(/(\w{5})(\w{5})(\w{5})(\w{5})/, '$1-$2-$3-$4');
}

function genVerif(code) {
	var num = code.replace(/[^0-9]/g, '').length;
	num = (num > 0) ? num : 5;
	
	var odd = code.replace(/[^13579]/g, '').length;
	odd = (odd > 0) ? odd : 2;
	
	var alpha = code.replace(/[^ABCDXYZ]/g, '').length;
	alpha = (alpha > 0) ? alpha : 7;
	
	var seed = Math.abs(Math.ceil(num * alpha * (odd - alpha) * (odd + alpha) * Math.PI)).toString();
	return seed.lpad('5', 4).substr(0, 4);
}

function genCode() {

	var randArray = getRand();
	var switchArray = getSwitch();
	var len = getStrength(); 
	
	var code = ''; var pool = '';
	
	for (var p=0; p<len; p++) {
		if (switchArray.indexOf(p+1) !== -1) pool = randArray.pop();

		randloc = parseInt(Math.random() * pool.length);
		code += pool.substring(randloc, randloc + 1);
	}
	return package(code);
};

function validate(code) {
	var valid = true;

	code = code.replace(/-/g,'').trim();

	var randArray = getRand();
	var switchArray = getSwitch();
	var len = getStrength(); 
	
	var pool = '';
	
	for (var p=0; p<len && valid; p++) {
		if (switchArray.indexOf(p) !== -1) pool = randArray.pop();
		if (pool.indexOf(code.substr(p, 1)) == -1) return false;
	}
	
	return valid;
}

function verify(code, verif) {
	return (genVerif(code) === verif);
}

function certify(code, verif) {
	return validate(code) && verify(code, verif);
}

//pads left
String.prototype.lpad = function(padString, length) {
	var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
}
