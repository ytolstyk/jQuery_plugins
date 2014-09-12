(function () {
  
  var Thumbnails = $.Thumbnails = function (el) {
    this.$el = $(el);
    this.$img = this.$el.find(".items img");
    this.displayedThumbnails = [0, 1, 2];
    this.$imageNav = $("<div class='imagenav'></div>");
    
    this.$imageNav.append($('<a href="javascript:void(0)" class="left">Left</a>'));
    this.$imageNav.append($('<ul class="gutter"></ul>'));
    this.$imageNav.append($('<a href="javascript:void(0)" class="right">Right</a>'));    
    this.$el.append(this.$imageNav);
    
    this.fillGutter();
    this.setActiveImage(this.$img[0]);
    this.currentImage = $(this.$img[0]);
    this.setActiveThumb($(".gutter img")[0]);
    
    $(this.$imageNav).on("click", "a", this.moveGutterStart.bind(this));
    $(this.$imageNav).on("click", "li", this.changeMainImage.bind(this));
    $(this.$imageNav).on("mouseenter", "li", this.previewMainImage.bind(this));
    $(this.$imageNav).on("mouseleave", "li", this.resetMainImage.bind(this));
  };

  Thumbnails.prototype.fillGutter = function () {
    $(".gutter").empty();
    for (var i = 0; i < this.displayedThumbnails.length; i++) {
      var $li = $("<li></li>");
      $li.append($(this.$img[this.displayedThumbnails[i]]).clone());
      $(".gutter").append($li);
    }
  };
  
  Thumbnails.prototype.previewMainImage = function () {
    var matchingURL = $(event.target).attr("src");
    var newMainImage = $(".items img[src='" + matchingURL + "']");
    this.previousImg = this.currentImg;
    this.setActiveImage(newMainImage);
  };
   
  Thumbnails.prototype.resetMainImage = function () {
    this.setActiveImage(this.previousImg);
  };
   
  Thumbnails.prototype.setActiveImage = function (newMainImage) {
    this.currentImg = newMainImage;
    this.$img.removeClass("active");
    $(newMainImage).addClass("active");
  };  
   
  Thumbnails.prototype.changeMainImage = function () {
    this.setActiveThumb($(event.target));
    var matchingURL = $(event.target).attr("src");
    var newMainImage = $(".items img[src='" + matchingURL + "']");
    this.previousImg = newMainImage;
    this.setActiveImage(newMainImage);
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


  
  Thumbnails.prototype.setActiveThumb = function (matchingThumb) {
    $(".gutter img").removeClass("active");
    $(matchingThumb).addClass("active");
  };

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnails(this);
    });
  };
})();