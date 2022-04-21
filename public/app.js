// import the dataset to be used here

let seasonFilter = 'All';
let genderFilter = 'All';

let refreshTokens = [];

const seasonOptions = document.querySelector('.seasons');
const genderOptions = document.querySelector('.genders');
const searchResultsElem = document.querySelector('.searchResults');
const priceRangeElem = document.querySelector('.priceRange');
const showPriceRangeElem = document.querySelector('.showPriceRange');
const userInput = document.querySelector('.textInput');
const addUserBtn = document.querySelector('.userLogin')
const displayUser = document.querySelector('.username')
// const garments = require('./garments.json');

const garmentsTemplateText = document.querySelector('.garmentListTemplate');
const garmentsTemplate = Handlebars.compile(garmentsTemplateText.innerHTML);

addUserBtn.addEventListener('click', function(){
	let username = userInput.value
	// if(username !== undefined){
	// 	displayUser.innerHTML = username;
	// }
	loginUser();
});

if(localStorage['tokens']){
    refreshTokens = JSON.parse(localStorage.getItem('tokens'));
};

const loginUser = ()=>{
	axios
	.get(`http://localhost:4017/api/login`)
	.then(function(result){
		username = result.data
		localStorage.setItem('myTokens', JSON.stringify(username));
	})
};

const postRoute = ()=>{
	axios
	.get(`http://localhost:4017/api/posts`, {})
	.then(function(result){
		searchResultsElem.innerHTML = garmentsTemplate({
			garments: result.data.garments
		})
	})
}

postRoute();


seasonOptions.addEventListener('click', function(evt){
	seasonFilter = evt.target.value;
	filterData();
});

genderOptions.addEventListener('click', function(evt){
	genderFilter = evt.target.value;
	filterData();
});

function filterData() {
	axios
		.get(`/api/garments?gender=${genderFilter}&season=${seasonFilter}`)
		.then(function(result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments : result.data.garments
			})
		});
}

priceRangeElem.addEventListener('change', function(evt){
	const maxPrice = evt.target.value;
	showPriceRangeElem.innerHTML = maxPrice;
	axios
		.get(`/api/garments/price/${maxPrice}`)
		.then(function(result) {
			searchResultsElem.innerHTML = garmentsTemplate({
				garments : result.data.garments
			})
		});
});

filterData();
