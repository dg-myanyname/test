(function($){

	let $window = $(window),
		$articlesNumInput = $('#articles_num');

	let scrolledBottom = debounce(() => {

		if($window.scrollTop() >= $(document).height() - $window.height() - 50) {

			$window.off('scroll.getArticles');

			addArticles();

		}

	}, 250);

	$window.on('scroll.getArticles', scrolledBottom);
	$articlesNumInput.on('change',() => {$window.on('scroll.getArticles', scrolledBottom)});

	function addArticles(){

		let maxArticles = parseInt($articlesNumInput.val()),
			articlesOnPage = $('article').length,
			perPage = 5;

		if(maxArticles && maxArticles <= articlesOnPage) return;

		let articlesNum = maxArticles ? Math.min(maxArticles - articlesOnPage, perPage) : perPage;
		
		let articlesData = getArticlesData(articlesOnPage, articlesNum),
			articlesHtml = [];

		$.each(articlesData, function(index, articleData) {
			
			let articleHtml = createArticle(articleData);

			if(articleHtml)
				articlesHtml.push(articleHtml);
		});

		$('#content').append(articlesHtml);

		$window.on('scroll.getArticles', scrolledBottom);
	}

	function getArticlesData(offset, num){

		num = num == null ? 5 : num;

		offset = offset == null ? 0 : offset;

		offset = typeof offset == "number" ? offset : 0;

		let strings = [
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum non velit interdum, faucibus leo eget, maximus sem.',
			'Fusce nibh nisl, auctor sit amet mauris eu, egestas efficitur ipsum. Nullam est lectus, auctor quis ipsum a, dignissim fringilla.',
			'Proin sit amet ipsum dolor. Vestibulum tempor, mi ac imperdiet ornare, odio risus dapibus ligula, in sagittis est lectus vel.',
			'In scelerisque ligula eget nulla aliquet viverra. Nullam interdum purus eget ante volutpat rhoncus.',
			'Nullam sagittis imperdiet dui, rutrum semper diam venenatis vel. Donec faucibus hendrerit nisl, ut porta tellus dapibus ultricies.',
			'Fusce quis quam mauris. Curabitur placerat sapien eget ipsum aliquet facilisis.'
		];

		let articlesData = [];

		for(let i = offset+1; i <= offset + num; i++){
			let randomStrings = strings.slice(0, Math.floor(3 + Math.random() * 5));
			let newArticle = {
				id: i,
				title: 'Title ' + i,
				img: {
					src: 'https://via.placeholder.com/150',
					width: 150,
					height: 150,
					alt: 'alt text ' + i,
					title: 'title text ' + i
				},
				text: randomStrings.join(' ')
			}

			articlesData.push(newArticle);
		}

		return articlesData;

	}

	function createArticle(elData){

		if( !elData.id )
			return false;

		let innerEls = [],
			article;

		if(elData.img && elData.img.src){

			let img = $('<img />');

			$.each(elData.img, function(attrName, attrVal) {

				img.attr(attrName, attrVal);

			});

			innerEls.push(img);

		}
		
		if(elData.title)
			innerEls.push($('<h3>'+elData.title+'</h3>'));

		if(elData.text)
			innerEls.push($('<p>'+elData.text+'</p>'));

		if(innerEls.length){

			article = $('<article />').append(innerEls);
			
		}

		return article;

	}
})(jQuery);

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

function initMap() {
	var eiffel = {lat: 48.858430, lng: 2.294512};
	var map = new google.maps.Map(
	document.getElementById('g-map'), {zoom: 8, center: eiffel});
	// var marker = new google.maps.Marker({position: eiffel, map: map});
}