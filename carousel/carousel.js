(function(){
  
  var Carousel = $.Carousel = function (el) {
    this.$el = $(el);
    this.$img = this.$el.find("img");
    this.listLength = this.$img.length;
    $(this.$img[0]).addClass("active");
    this.activeIndex = this.$img.index($('.active'));
    $(".slide-left").on("click", this.slideLeft.bind(this));
    $(".slide-right").on("click", this.slideRight.bind(this));
  };

  $.fn.carousel = function () {
    return this.each(function () {
      new $.Carousel(this);
    });
  };
  
  Carousel.prototype.slide = function (direction) {
    var $oldItem = $(this.$img[this.activeIndex]);
    this.activeIndex += direction;
    if (this.activeIndex >= this.listLength) {
      this.activeIndex = this.activeIndex % this.listLength;
    } else if (this.activeIndex < 0) {
      this.activeIndex = this.listLength - 1;
    }
    var $newItem = $(this.$img[this.activeIndex]);
    $newItem.addClass("active");

    if (direction === 1) {
      var classToAdd = "right";
      var oldItemClass = "left";
    } else {
      var classToAdd = "left";
      var oldItemClass = "right";
    }    
    $newItem.addClass(classToAdd);
    $oldItem.addClass(oldItemClass);
    setTimeout(function() {
      $newItem.removeClass("left right");
    }, 0);
    
    $oldItem.one("transitionend", function () {
      // debugger;
      $(this).removeClass("active");
      $(this).removeClass("left right");
    })
  };
  
  Carousel.prototype.slideLeft = function () {
    this.slide(-1);
  };
  
  Carousel.prototype.slideRight = function () {
    this.slide(1);
  };
  
})();