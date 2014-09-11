(function () {
  
  var Thumbnails = $.Thumbnails = function (el) {
    this.$el = $(el);
    this.$img = this.$el.find(".items img");
    this.displayedThumbnails = [0, 1, 2];
    this.$imageNav = $("<div class='imagenav'></div>");
    this.currentImage = this.$img.find(".active");
    
    this.$imageNav.append($('<a href="javascript:void(0)" class="left">Left</a>'));
    this.$imageNav.append($('<ul class="gutter"></ul>'));
    this.$imageNav.append($('<a href="javascript:void(0)" class="right">Right</a>'));    
    this.$el.append(this.$imageNav);
    
    this.fillGutter();
    this.setActiveImage();
    this.setActiveThumb();
    
    $(this.$imageNav).on("click", "a", this.moveGutterStart.bind(this));
  };

  Thumbnails.prototype.fillGutter = function () {
    $(".gutter").empty();
    for (var i = 0; i < this.displayedThumbnails.length; i++) {
      var $li = $("<li></li>");
      $li.append($(this.$img[this.displayedThumbnails[i]]).clone());
      $(".gutter").append($li);
    }
  };

  Thumbnails.prototype.setGutterStart = function (direction) {    
    for (var i = 0; i < this.displayedThumbnails.length; i++) {
      this.displayedThumbnails[i] += direction;
      if (this.displayedThumbnails[i] < 0) {
        this.displayedThumbnails[i] = this.$img.length - 1;    
      } 
      if (this.displayedThumbnails[i] >= this.$img.length) {
        this.displayedThumbnails[i] = 0;
      }
    }
    this.fillGutter();
  };
  
  Thumbnails.prototype.moveGutterStart = function () {
    var direction;
    if ($(event.target).text() === "Right") {
      direction = 1;
    } else {
      direction = -1;
    }
    this.setGutterStart(direction);
  };

  Thumbnails.prototype.setActiveImage = function () {
    $(this.$img[0]).addClass("active");
  };
  
  Thumbnails.prototype.setActiveThumb = function () {
    var matchingText = $(".active").attr("href");
    var matchingThumb = $('.gutter img[href=' + matchingText + ']');
    matchingThumb.addClass("active");
  };

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnails(this);
    });
  };
})();