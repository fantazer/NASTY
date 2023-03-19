$(document).ready(function () {
	body = $('body')

	//modals
	var modalState = {
		"isModalShow": false, //state show modal
		"scrollPos": 0
	};
	var scrollWidth= window.innerWidth - $(document).width();
	var openModal = function () {
		if (!$('.modal-layer').hasClass('active')) {
			$('.modal-layer').addClass('active');
			modalState.scrollPos = $(window).scrollTop();
			body.css({
				overflowY: 'hidden',
				top: -modalState.scrollPos,
				width: '100%',
				paddingRight:scrollWidth
			});
		}
		modalState.isModalShow = true;
	};

	var closeModal = function () {
		body.css({
			overflow: '',
			position: '',
			top: modalState.scrollPos,
			paddingRight:0
		});
		$(window).scrollTop(modalState.scrollPos);
		$('.modal').addClass('modal-hide-animation');
		setTimeout(function(){
			$('.modal').removeClass('modal-hide-animation');
			$('.modal').removeClass('active');
			$('.modal-layer').removeClass('active');
		},400);
		modalState.isModalShow = false;
	};

	var initModal = function (el) {
		openModal();
		$('.modal').each(function () {
			if ($(this).data('modal') === el) {
				$(this).addClass('active')
			} else {
				$(this).removeClass('active')
			}
		});
		var modalHeightCont = $(window).height();
		$('.modal-filter').height(modalHeightCont);
	};

	$('.js-modal').click(function () {
		initModal($(this).data("modal"));
	});

	$('.js-modal-close').click(function () {
		closeModal();
	});

	body.on('mousedown',function(e){
		e.target.className === 'modal-wrap' ? closeModal() : false
	});

	$(document).on('keyup',function(e){
		e.key === 'Escape' ? closeModal() : ''
	})
	//modals===end

	// fix top-menu
/*	var shrinkHeader = 250;
	var head = $('.header');
	var heightHeader = head.height();
	$(window).scroll(function() {
		var scroll = $(this).scrollTop();
		if ( scroll >= shrinkHeader ) {
				body.css('paddingTop',heightHeader);
				head.addClass('shrink');
			}
			else {
					body.css('paddingTop',0);
					head.removeClass('shrink');
			}
	});*/
	// fix top-menu === end

	// ============ TRIGGER EVENT ============

	// toggle single
	body.on('click','.js-toggle',function(){
		$(this).toggleClass("active")
	})
	// toggle single === end

	// slide toggle
	body.on('click','.js-slide',function(){
		$(this).closest('.js-slide-wrap').find('.js-slide-cont').slideToggle(500);
	});
	// slide toggle === end

	// toggle class one from list
	var actionTick;
	(
		actionTick = function(){
				body.on('click','.js-tick',function(){
					var parent = $(this).closest('.js-tick-cont');
					parent.find('.js-tick').removeClass('active');
					$(this).addClass('active')
				});
			}
	)()
	// toggle class one from list === end

	//toggle class + neighbor
	body.on('click','.js-commutator-el', function(){
		var thisItem = $(this).data("item");
		var thisGroup = $(this).data("group") || false;
		var isEach = $(this).data("each") || false;
		var selector;
		$(this).toggleClass("active")
		if($('.js-commutator-cont').data('group')) {
			selector = $(".js-commutator-cont[data-group=" + thisGroup + "");
		}else{
			selector = $(".js-commutator-cont");
		}
		selector.each(function(){
			if($(this).data("item")=== thisItem){
				$(this).toggleClass('active');
			}else{
				isEach ? $(this).removeClass("active") : false
			}
		})
	})
	//toggle class + neighbor === end

	// switch
	body.on('click', '.js-switch', function (e) {
		if (e.target.className != 'style-input') {
			var typeItem = $(this).data("item");
			if ($(this).closest('.js-switch-wrap').length < 0) {
				var groupItem = $(this).data("group");
				var selector = $('.js-switch[data-group=' + groupItem + ']');
				var size = selector.size()
				selector.each(function () {
					$(this).removeClass("active");
				});
				$('.js-switch-cont').each(function () {
					if ($(this).data("group") === groupItem) {
						if ($(this).data("item") === typeItem) {
							if (size === 0) {
								$(this).toggleClass("hidden")
							} else {
								$(this).removeClass("hidden")
							}
						} else {
							$(this).addClass("hidden");
						}
					}
				});
			}else{
				var parent = $(this).closest('.js-switch-wrap');
				parent.find('.js-switch').removeClass('active')
				parent.find('.js-switch-cont').each(function () {
						if($(this).data("item") === typeItem) {
							$(this).removeClass("hidden")
						} else {
							$(this).addClass("hidden");
						}
				});
			}
			$(this).addClass("active");
		}
	});
	// switch === end

	// Tab toggle
	var actionTab;
	(
		actionTab = function(){
			body.on('click','.js-tab',function(){
				var current = $(this).index();
				var parent = $(this).closest('.js-tab-wrap')
				parent.find('.js-tab-cont').removeClass('active')
				parent.find('.js-tab-cont').eq(current).addClass('active')
			});
		}
	)()
	// Tab toggle  === end

	// accordion row toggle
	body.on('click','.js-accordion-head', function(e){
		var current = $(this).closest('.js-accordion-el').index()
		$(this).closest('.js-accordion').find('.js-accordion-el').each(function(){
			if($(this).index()!=current){
				 $(this).find('.js-accordion-head').removeClass('active')
				 $(this).find('.js-accordion-content').slideUp('active')
			}else{
				 $(this).find('.js-accordion-content').slideToggle('active')
				 $(this).find('.js-accordion-head').toggleClass('active')
			}
		})
	});
	// accordion row toggle === end

	// ============ TRIGGER EVENT END ============

	// dropdown
	$('.dropdown').click(function () {
		$(this).attr('tabindex', 1).focus();
		$(this).toggleClass('active');
		$(this).find('.dropdown-menu').slideToggle(300);
	});
	$('.dropdown').focusout(function () {
		$(this).removeClass('active');
		$(this).find('.dropdown-menu').slideUp(300);
	});
	$('.dropdown .dropdown-menu__el').click(function () {
		var parent = $(this).parents('.dropdown')
		parent.find('.dropdown-current__val').html($(this).html());
		parent.find('input').attr('value', $(this).data('value'));
	});
	// dropdown === end

	// incr
	var incrEl = {}
	body.on('click', '.js-inc-nav', function (e) {
		incrEl.parent = $(this).closest(".js-incr-wrap");
		incrEl.value = parseInt(incrEl.parent.find('.js-incr-val').html());
		incrEl.state = incrEl.parent.find('.js-incr-val')
		incrEl.min = incrEl.parent.data('min')*1 || 0
	});
	body.on('click', '.js-inc-nav--minus', function (e) {
		incrEl.value = incrEl.value <= incrEl.min ? incrEl.min : --incrEl.value
		incrEl.state.html(incrEl.value);
		console.log(incrEl.value);
	});
	body.on('click', '.js-inc-nav--plus', function (e) {
		++incrEl.value;
		incrEl.value = incrEl.value > 100 ? 100 : incrEl.value;
		incrEl.state.html(incrEl.value);
	});
	// incr === end

	//bubble
	var limit = 2400 * 3600 * 1000; // 24 часа
	var localStorageInitTime = localStorage.getItem('localStorageInitTime');
	//console.log(localStorageInitTime);
	//console.log(+new Date() - localStorageInitTime);
	if (localStorageInitTime === null) {
			localStorage.setItem('localStorageInitTime', +new Date());
	} else if(+new Date() - localStorageInitTime > limit){
			localStorage.setItem('localStorageInitTime', +new Date());
			localStorage.setItem('bubble', '1');
	};

	if(localStorage.getItem('bubble')!='0'){
		setTimeout(function(){
			$('.cookie').addClass('cookie--active');
			//console.log('111');
		},3000);
	}

	$('.cookie .icon-close').click(function(){
		$(this).closest('.cookie').removeClass('cookie--active');
		localStorage.setItem('bubble', '0');
	});
	//bubble===end

	// slide menu
	var hideSlideMenu = function(el){
		$(".head-toggle").removeClass('active');
		$(".slide-block").removeClass("active");
	}
	$('.js-slide-block-toggle').click(function (event) {
		$(".js-slide-block-toggle").not(this).removeClass('active');
		var current = $(this).data("menu");
		$(".slide-block").each(function () {
			if ($(this).data("menu") === current) {
				$(this).toggleClass("active")
			} else {
				$(this).removeClass("active")
			}
		})
		$(this).toggleClass('active');
	});

	$(document).mouseup(function (e) {
		var parent = $(".slide-block").add('.js-slide-block-toggle');
		if (!parent.is(e.target) && parent.has(e.target).length === 0) {
			hideSlideMenu();
		}
	});
	// slide menu === end

	// === custom arrow el ===
	$('.js-control-right').click(function () {
		$(this).closest(".js-slider-wrap").find(".js-slider").slick('slickNext');
	});

	$('.js-control-left').click(function () {
		$(this).closest(".js-slider-wrap").find(".js-slider").slick('slickPrev');
	});
	// custom arrow el === end

	// animate scroll to id
	$(".js-scroll-to").mPageScroll2id({
		offset: 0,
	});
	$(".js-scroll-toNavWrap .js-scroll-to").click(function () {
		$('.slide-block').removeClass('slide-block--open');
		$('.head-toggle').removeClass('slide-block-toggle--open');
	});
	// animate scroll to id === end

	// review slider
	if ($('.slider-review').length) {
		$('.slider-review').slick({
			slidesToShow: 3,
			speed: 800,
			dots: false,
			arrows: false,
			rows: 0,
			responsive: [{
				breakpoint: 1200,
				settings: {
					slidesToShow: 3.2,
					slidesToScroll: 1,
					infinite: false,
					arrows: false,
					dots: false,

				}
			},
				{
					breakpoint: 769,
					settings: {
						slidesToShow: 2.2,
						slidesToScroll: 1,
						infinite: false,
						arrows: false,
						dots: false,

					}
				},
				{
					breakpoint: 640,
					settings: {
						slidesToShow: 1.2,
						slidesToScroll: 1,
						infinite: false,
						arrows: false,
						dots: false,

					}
				}
			]
		});
	}
	// review slider === end

		// FORM validate
	$.validator.addMethod("wordCount",
		function (value, element, params) {
			var count = getWordCount(value);
			if (count >= params[0]) {
				return true;
			}
		},
		jQuery.validator.format("A minimum of {0} words is required here.")
	);
	$.validator.addMethod('fnType', function (value, element) {
		return value.match(/^[+-]?\d+$/);
	}, 'Введите правильный телефон');


	var validateConfig = {
		"name": {
			required: true,
			minlength: 3,
			messages: {
				required: 'Обязательно для заполнения',
				minlength: 'Коротное имя',
				wordCount: "Необходимо: Фамилия Имя и Отчество"
			},
		},
		"simpleText": {
			required: false,
			minlength: 5,
			messages: {
				required: 'Обязательно для заполнения',
				minlength: 'Текст должен быть длиннее',
			},
		},
		"email": {
			required: true,
			email:true,
			messages: {
				required: 'Это поле обязательно для заполнения',
				email: 'Введите правильный адресс'
			},
		},
		"phone": {
			required: true,
			minlength: 16,
			messages: {
				required: 'Обязательное поле',
				number: 'Введите правильный номер',
				minlength: 'Номер должен быть длиннее',
			},
		},
		"age": {
			required: true,
			minlength: 2,
			number:true,
			messages: {
				required: 'Обязательное поле',
				number: 'Не правильный возраст',
				minlength: 'Номер должен быть длиннее',
			},
		}
	}

	$('.js-validate').each(function () {
		var currentForm = $(this);
		$(this).validate({
			highlight: function (element) { //даем родителю класс если есть ошибка
				$(element).parent().addClass("field-error");
			},
			unhighlight: function (element) {
				$(element).parent().removeClass("field-error");
			},
			rules: {
				agree: {
					required: true
				}
			},
			messages: {
				agree: {
					required: false
				}
			},
			submitHandler: function () {
				var currentSendData = '';
				currentForm.each(function(){
					$(this).find(".js-input-data").each(function(){
						currentSendData += "&"+$(this).data('condition')+"="+$(this).val()
					})
				})
				currentSendData += "&subject="+currentForm.data('subject')
				$.ajax({
					type: "POST",
					url: "/main.html",
					data: currentSendData.slice(1),
					success: function (data) {
						console.log(currentSendData.slice(1));
						closeModal();
						initModal('orderTrue');
						$(':input') //очитска формы от данных
								.not(':button, :submit, :reset, :hidden')
								.val('')
								.removeAttr('checked')
								.removeAttr('selected')
						setTimeout(function () {
							$('.modal-close').click();
							location.reload();
						}, 5000);
					}
				});
			}
		})
		$(this).find(".input").each(function () {
			$(this).rules("add", validateConfig[$(this).data("type")]);
		});
	});
	// FORM validate === end

	// phone mask
	var isFieldStart = true;
	var phoneMaskOption = {
		'translation': {
			A: {
				pattern: /[7,8]/,
				fallback: '7',
			},
		},
		onKeyPress: function (cep, event, currentField, options) {
			//console.log("key PRESS");
			if (cep == '+7(8' && isFieldStart) {
				currentField.val("+7(")
				//return isFieldStart = false;
			}
			if (cep.indexOf("+8") == 0 && isFieldStart) {
				//console.log(0);
				currentField.val(cep.replace("+8(", '+7('))
				//return isFieldStart = false;
			}
			if (cep == '+8' && isFieldStart) {
				currentField.val("+7")
				//console.log(cep);
				//return isFieldStart = false;
			}

			if (currentField.val().length < 4) {
				isFieldStart = true
			}
		},

	}

	$('.input-mask--phone').on('change', function (e) {
		$(this).unmask()
		var data = e.target.value
		var reg = data.replace(new RegExp('\\+7\\(|8\\(|\\+7|^[8]', 'g'), "")
		$(this).val(reg).mask('+7(000)000-00-00', phoneMaskOption);
	})

	$('.input-mask--phone').mask('+A(000)000-00-00', phoneMaskOption);
	$('.js-mask--date').mask('00/00/0000');
	// phone mask === end


	//window.condition = {};
	//window.condition.info = info;
	//upload-btn === end
});
