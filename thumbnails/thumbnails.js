(function () {
  
  var Thumbnails = $.Thumbnails = function (el) {
    this.$el = $(el);
    this.$img = this.$el.find("img");
    this.$imageNav = $("<div class='imagenav'></div>");
    this.$imageNav.append($('<a href="#" class="left">Left</a>'));
    this.$imageNav.append($('<ul class="gutter"></ul>'));
    this.$imageNav.append($('<a href="#" class="right">Right</a>'));    
    this.$el.append(this.$imageNav);
  };

  $.fn.thumbnails = function () {
    return this.each(function () {
      new $.Thumbnails(this);
    });
  };
})();