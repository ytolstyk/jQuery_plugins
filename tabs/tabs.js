(function(){

  $.Tabs = function (el) { 
    this.$el = $(el);
    this.$contentTabs = $("#" + this.$el.data("content-tabs"));
    this.$activeTab = this.$contentTabs.children('.active');
    this.$el.on("click", "a", this.clickTab.bind(this));
  };
  
  $.Tabs.prototype.clickTab = function () {
    event.preventDefault();

    $(event.currentTarget).children("li").children().removeClass("active");
    var that = this;
    var $tabPane = $($(event.target).attr("href"));
    this.$activeTab.one("transitionend", function () {
      that.$activeTab.removeClass("transitioning");
      $tabPane.addClass("transitioning");
      setTimeout(function () {
        $tabPane.addClass("active");        
        $tabPane.removeClass("transitioning");
        that.$activeTab = $tabPane;
      }, 0);
    });
    
    this.$activeTab.removeClass('active');    
    this.$activeTab.addClass('transitioning');
    
    $(event.target).addClass("active");
  };
  
  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };
})();