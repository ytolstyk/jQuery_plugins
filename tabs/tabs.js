(function(){

  $.Tabs = function (el) { 
    this.$el = $(el);
    this.$contentTabs = $("#" + this.$el.data("content-tabs"));
    this.$activeTab = this.$contentTabs.children('.active');
    this.$el.on("click", "a", this.clickTab.bind(this));
  };
  
  $.Tabs.prototype.clickTab = function () {
    event.preventDefault();
    this.$contentTabs.children().removeClass("active");
    $(event.currentTarget).addClass("active");
    $($(event.target).attr("href")).addClass("active");
  };

  $.fn.tabs = function () {
    return this.each(function () {
      new $.Tabs(this);
    });
  };
})();